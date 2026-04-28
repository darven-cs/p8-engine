#!/usr/bin/env node
/**
 * sync-memory-index.mjs
 *
 * Claude Code PostToolUse hook.
 * 用途：Claude 用 Edit/Write 改动了 memory/modules/** 或 memory/bugs/** 的文件后，
 *       自动把 memory/_index.md 中对应条目的"最后更新"列同步为今天日期。
 *
 * 约束：
 * - 不新建条目（新条目由 Claude 按 CLAUDE.md 规则手动加）
 * - 只替换表格行里已有的 YYYY-MM-DD 格式单元格
 * - 非 memory/ 路径或无匹配行时静默退出 0
 *
 * 注册方式（项目根 .claude/settings.json）：
 * {
 *   "hooks": {
 *     "PostToolUse": [
 *       {
 *         "matcher": "Edit|Write",
 *         "hooks": [
 *           { "type": "command", "command": "node .claude/hooks/sync-memory-index.mjs" }
 *         ]
 *       }
 *     ]
 *   }
 * }
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const readStdin = () =>
    new Promise((resolve) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (chunk) => { data += chunk; });
        process.stdin.on('end', () => resolve(data));
    });

const exit = (code = 0, msg) => {
    if (msg) process.stdout.write(msg);
    process.exit(code);
};

async function main() {
    const raw = await readStdin();
    if (!raw.trim()) exit(0);

    let payload;
    try {
        payload = JSON.parse(raw);
    } catch {
        exit(0);
    }

    if (!['Edit', 'Write'].includes(payload.tool_name)) exit(0);

    const filePath = payload.tool_input?.file_path;
    if (!filePath || typeof filePath !== 'string') exit(0);

    // 路径归一化（Windows 反斜杠 → 正斜杠）
    const norm = filePath.replace(/\\/g, '/');
    const memIdx = norm.indexOf('/memory/');
    if (memIdx < 0) exit(0);

    const memoryRoot = norm.slice(0, memIdx) + '/memory';
    const indexPath = memoryRoot + '/_index.md';
    if (!existsSync(indexPath)) exit(0);

    // 判定条目定位键：modules/<dir_or_file> 或 bugs/<file>
    const afterMemory = norm.slice(memIdx + '/memory/'.length);
    let entryKey = null;

    if (afterMemory.startsWith('modules/')) {
        const rest = afterMemory.slice('modules/'.length);
        const slashIdx = rest.indexOf('/');
        entryKey = slashIdx >= 0
            ? `modules/${rest.slice(0, slashIdx)}`   // 子目录模块
            : `modules/${rest}`;                     // 单文件模块
    } else if (afterMemory.startsWith('bugs/')) {
        entryKey = `bugs/${afterMemory.slice('bugs/'.length)}`;
    } else {
        exit(0);
    }

    // 今天日期
    const today = (() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${dd}`;
    })();

    // 读取 _index.md，查找含 entryKey 的表格行，替换其中的 YYYY-MM-DD 单元格
    const content = readFileSync(indexPath, 'utf8');
    const lineSep = content.includes('\r\n') ? '\r\n' : '\n';
    const lines = content.split(/\r?\n/);

    let updated = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.startsWith('|')) continue;
        if (!line.includes(entryKey)) continue;

        const cells = line.split('|');
        for (let c = 0; c < cells.length; c++) {
            const t = cells[c].trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
                if (t === today) continue; // already today
                cells[c] = cells[c].replace(t, today);
                updated = true;
                break; // 每行只更新一个日期列
            }
        }
        if (updated) {
            lines[i] = cells.join('|');
            break; // 每次 hook 只更新一行
        }
    }

    if (updated) {
        writeFileSync(indexPath, lines.join(lineSep), 'utf8');
        process.stdout.write(JSON.stringify({
            additionalContext: `[memory-index] ${entryKey} last-updated bumped to ${today}`,
        }));
    }
    process.exit(0);
}

main().catch((err) => {
    // hook 脚本出错不要阻塞 Claude；写到 stderr 让用户看到
    process.stderr.write(`[sync-memory-index] error: ${err?.message || err}\n`);
    process.exit(0);
});
