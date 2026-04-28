#!/usr/bin/env node
/**
 * memory-preflight.mjs
 *
 * Claude Code PreToolUse hook.
 * 用途：Claude 即将用 Edit/Write 修改非 memory/ 文件时，
 *       自动扫描 memory/_index.md，找到相关条目，输出关键约束提醒。
 *
 * 触发条件：
 * - 工具为 Edit 或 Write
 * - 目标文件不在 memory/ 目录内（改 memory/ 本身不需要预检）
 * - 项目根存在 memory/_index.md
 *
 * 注册方式（项目根 .claude/settings.json）：
 * {
 *   "hooks": {
 *     "PreToolUse": [
 *       {
 *         "matcher": "Edit|Write",
 *         "hooks": [
 *           { "type": "command", "command": "node .claude/hooks/memory-preflight.mjs" }
 *         ]
 *       }
 *     ]
 *   }
 * }
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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

/**
 * 从文件路径推断关键词（文件名、父目录名）
 */
function inferKeywords(filePath) {
    const norm = filePath.replace(/\\/g, '/');
    const parts = norm.split('/');
    const keywords = new Set();

    const fileName = parts[parts.length - 1]?.replace(/\.[^.]+$/, '') || '';
    const parentDir = parts.length >= 2 ? parts[parts.length - 2] : '';

    if (fileName && fileName !== 'index') keywords.add(fileName.toLowerCase());
    if (parentDir && !['src', 'lib', 'app', 'pages', 'components'].includes(parentDir)) {
        keywords.add(parentDir.toLowerCase());
    }

    return [...keywords];
}

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

    const norm = filePath.replace(/\\/g, '/');

    // 目标是 memory/ 内的文件 → 不需要预检
    if (norm.includes('/memory/')) exit(0);

    // 向上找 memory/_index.md
    const parts = norm.split('/');
    let projectRoot = null;
    for (let i = parts.length - 1; i >= 1; i--) {
        const candidate = parts.slice(0, i).join('/');
        if (existsSync(join(candidate, 'memory', '_index.md'))) {
            projectRoot = candidate;
            break;
        }
    }

    if (!projectRoot) exit(0);

    // 推断关键词
    const keywords = inferKeywords(filePath);
    if (keywords.length === 0) exit(0);

    // 扫描 _index.md
    const indexPath = join(projectRoot, 'memory', '_index.md');
    const content = readFileSync(indexPath, 'utf8');
    const lines = content.split(/\r?\n/);

    const matched = [];
    for (const line of lines) {
        if (!line.startsWith('|')) continue;
        const lower = line.toLowerCase();
        for (const kw of keywords) {
            if (lower.includes(kw)) {
                matched.push(line.trim());
                break;
            }
        }
    }

    if (matched.length === 0) exit(0);

    const output = [
        '[memory-preflight] memory/_index.md 中存在与本次修改相关的记录：',
        '',
        ...matched,
        '',
        '请先查看相关记忆文件中的约束，列出来得到用户确认后再写代码。'
    ].join('\n');

    exit(0, JSON.stringify({ additionalContext: output }));
}

main().catch((err) => {
    process.stderr.write(`[memory-preflight] error: ${err?.message || err}\n`);
    process.exit(0);
});
