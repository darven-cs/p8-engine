#!/usr/bin/env node
/**
 * sync-memory-index.mjs
 *
 * Claude Code PostToolUse hook.
 * 用途：Claude 用 Edit/Write 改动了 memory/modules/** 或 memory/bugs/** 的文件后，
 *       自动把 memory/_index.md 中所有匹配条目的"最后更新"日期同步为今天。
 *
 * 约束：
 * - 不新建条目（新条目由 Claude 按 CLAUDE.md 规则手动加）
 * - 只替换表格行里已有的 YYYY-MM-DD 格式单元格
 * - 一次 hook 调用会更新所有匹配行（一行可能多格日期）；非 memory/ 路径或无匹配行时静默退出 0
 * - entryKey 用词边界匹配（(?<![\w-])...(?![\w-])），避免 modules/auth 误匹配
 *   modules/auth_legacy / modules/authorize
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

    // entryKey 必须作为完整 token 出现，前后不能是 \w 或 -
    // 这样 modules/auth 不会误匹配 modules/auth_legacy / modules/authorize
    const escapedKey = entryKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const entryRe = new RegExp(`(?<![\\w-])${escapedKey}(?![\\w-])`);

    let updatedCount = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.startsWith('|')) continue;
        if (!entryRe.test(line)) continue;

        const cells = line.split('|');
        let lineChanged = false;
        for (let c = 0; c < cells.length; c++) {
            const t = cells[c].trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
                if (t === today) continue; // already today, 跳过避免重复计数
                cells[c] = cells[c].replace(t, today);
                lineChanged = true;
                // 不再 break — 一行可能有"开始日期 + 最后更新"两格，都得更新
            }
        }
        if (lineChanged) {
            lines[i] = cells.join('|');
            updatedCount++;
            // 不再 break — 大模块子目录被改时，索引里可能有多行相关条目，全部更新
        }
    }

    if (updatedCount > 0) {
        writeFileSync(indexPath, lines.join(lineSep), 'utf8');
        process.stdout.write(JSON.stringify({
            additionalContext: `[memory-index] ${entryKey} last-updated bumped to ${today} (${updatedCount} row${updatedCount > 1 ? 's' : ''})`,
        }));
    }
    process.exit(0);
}

main().catch((err) => {
    // hook 脚本出错不要阻塞 Claude；写到 stderr 让用户看到
    process.stderr.write(`[sync-memory-index] error: ${err?.message || err}\n`);
    process.exit(0);
});
