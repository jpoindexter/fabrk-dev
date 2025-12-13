#!/usr/bin/env node
/**
 * Fabrk MCP Server Setup Script
 * Generates config files for various AI tools
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const TOOLS = {
  'claude-code': {
    name: 'Claude Code',
    configPath: '.mcp.json',
    configTemplate: (serverPath) => ({
      mcpServers: {
        fabrk: {
          command: 'node',
          args: [serverPath],
        },
      },
    }),
  },
  cursor: {
    name: 'Cursor',
    configPath: null, // Manual configuration in settings
    instructions: `
To configure Cursor:
1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP"
3. Add the following server configuration:
   - Name: fabrk
   - Command: node
   - Args: ./mcp-servers/fabrk/dist/index.js
`,
  },
  'claude-desktop': {
    name: 'Claude Desktop',
    configPath: null, // Platform-specific
    getConfigPath: () => {
      if (process.platform === 'darwin') {
        return path.join(
          process.env.HOME,
          'Library',
          'Application Support',
          'Claude',
          'claude_desktop_config.json'
        );
      } else if (process.platform === 'win32') {
        return path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');
      }
      return null;
    },
    configTemplate: (serverPath) => ({
      mcpServers: {
        fabrk: {
          command: 'node',
          args: [serverPath],
        },
      },
    }),
  },
};

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    FABRK MCP SERVER SETUP                     ║
║                                                               ║
║  This script will configure your AI tool to use the Fabrk    ║
║  MCP server for design system knowledge and code generation. ║
╚═══════════════════════════════════════════════════════════════╝
`);

  // Check if MCP server is built
  const serverPath = path.join(projectRoot, 'mcp-servers', 'fabrk', 'dist', 'index.js');
  if (!fs.existsSync(serverPath)) {
    console.log('[ERROR] MCP server not built. Running build...\n');
    const { execSync } = await import('child_process');
    try {
      execSync('npm run build', {
        cwd: path.join(projectRoot, 'mcp-servers', 'fabrk'),
        stdio: 'inherit',
      });
    } catch {
      console.error('[ERROR] Failed to build MCP server');
      process.exit(1);
    }
  }

  console.log('[OK] MCP server found at:', serverPath);
  console.log('\nWhich AI tool do you want to configure?\n');
  console.log('  1. Claude Code (recommended)');
  console.log('  2. Cursor');
  console.log('  3. Claude Desktop');
  console.log('  4. All of the above');
  console.log('');

  const choice = await prompt('Enter your choice (1-4): ');

  const toolsToSetup = [];
  switch (choice) {
    case '1':
      toolsToSetup.push('claude-code');
      break;
    case '2':
      toolsToSetup.push('cursor');
      break;
    case '3':
      toolsToSetup.push('claude-desktop');
      break;
    case '4':
      toolsToSetup.push('claude-code', 'cursor', 'claude-desktop');
      break;
    default:
      console.log('\n[ERROR] Invalid choice. Exiting.');
      process.exit(1);
  }

  for (const toolId of toolsToSetup) {
    const tool = TOOLS[toolId];
    console.log(`\n[SETUP] Configuring ${tool.name}...`);

    if (toolId === 'claude-code') {
      // Create .mcp.json in project root
      const configPath = path.join(projectRoot, tool.configPath);
      const config = tool.configTemplate('./mcp-servers/fabrk/dist/index.js');

      // Check if file exists and merge
      if (fs.existsSync(configPath)) {
        const existing = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        config.mcpServers = { ...existing.mcpServers, ...config.mcpServers };
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log(`[OK] Created ${configPath}`);
      console.log('\n  To use: Restart Claude Code in this project');
    } else if (toolId === 'cursor') {
      console.log(tool.instructions);
    } else if (toolId === 'claude-desktop') {
      const configPath = tool.getConfigPath();
      if (!configPath) {
        console.log('[WARN] Claude Desktop config path not found for this platform');
        continue;
      }

      const config = tool.configTemplate(serverPath);

      // Check if file exists and merge
      if (fs.existsSync(configPath)) {
        const existing = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        config.mcpServers = { ...existing.mcpServers, ...config.mcpServers };
      } else {
        // Create directory if needed
        const dir = path.dirname(configPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log(`[OK] Created ${configPath}`);
      console.log('\n  To use: Restart Claude Desktop');
    }
  }

  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                        SETUP COMPLETE                         ║
╚═══════════════════════════════════════════════════════════════╝

The Fabrk MCP server is now configured. Your AI tool will have access to:

  • Design System: 77 components, 12 themes, design tokens
  • Tools: generate_component, generate_page, query_component, validate_code
  • Prompts: build_landing_page, add_dashboard_feature, create_form

Try asking your AI:
  "Use the Fabrk MCP to show me available components"
  "Generate a pricing card component using Fabrk"
  "Create a dashboard page with hero and features sections"
`);
}

main().catch(console.error);
