/**
 * Axe-Core Configuration for Accessibility Testing
 * Configured for WCAG 2.1 Level AA compliance
 */

import { AxeResults, Result, RunOptions } from 'axe-core';

export const axeConfig: RunOptions = {
  // Test against WCAG 2.1 Level AA standards
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',        // WCAG 2.0 Level A
      'wcag2aa',       // WCAG 2.0 Level AA
      'wcag21a',       // WCAG 2.1 Level A
      'wcag21aa',      // WCAG 2.1 Level AA
      'best-practice', // Best practices
    ],
  },

  // Enable all accessibility rules
  rules: {
    // Color contrast (WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text)
    'color-contrast': { enabled: true },

    // Ensure all images have alt text
    'image-alt': { enabled: true },

    // Proper heading hierarchy
    'heading-order': { enabled: true },

    // Keyboard navigation
    'focus-order-semantics': { enabled: true },
    'focusable-content': { enabled: true },
    'tabindex': { enabled: true },

    // ARIA attributes
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-required-children': { enabled: true },
    'aria-required-parent': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },

    // Forms
    'label': { enabled: true },
    'label-title-only': { enabled: true },
    'form-field-multiple-labels': { enabled: true },

    // Semantic HTML
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },

    // Screen readers
    'empty-heading': { enabled: true },
    'skip-link': { enabled: true },
  },

  // Report only violations and incomplete tests (not passes)
  resultTypes: ['violations', 'incomplete'],
};

/**
 * Format axe violations for console output
 */
export function formatViolations(violations: Result[]): string {
  if (violations.length === 0) {
    return '✅ No accessibility violations found!';
  }

  let output = `\n❌ Found ${violations.length} accessibility violation(s):\n\n`;

  violations.forEach((violation, index) => {
    output += `${index + 1}. ${violation.id} (${violation.impact})\n`;
    output += `   Description: ${violation.description}\n`;
    output += `   Help: ${violation.help}\n`;
    output += `   WCAG: ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}\n`;
    output += `   Affected elements: ${violation.nodes.length}\n`;

    violation.nodes.forEach((node, nodeIndex) => {
      output += `   ${nodeIndex + 1}) ${node.html}\n`;
      output += `      Target: ${node.target.join(' ')}\n`;
      if (node.failureSummary) {
        output += `      Issue: ${node.failureSummary}\n`;
      }
    });
    output += `   Learn more: ${violation.helpUrl}\n\n`;
  });

  return output;
}

/**
 * Generate HTML report from axe results
 */
export function generateHTMLReport(
  componentName: string,
  results: AxeResults
): string {
  const violations = results.violations;
  const passes = results.passes;
  const incomplete = results.incomplete;

  const totalChecks = violations.length + passes.length + incomplete.length;
  const passRate = totalChecks > 0
    ? Math.round((passes.length / totalChecks) * 100)
    : 0;

  const statusColor = violations.length === 0 ? '#22c55e' : '#ef4444';
  const statusText = violations.length === 0 ? 'PASSED' : 'FAILED';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Report - ${componentName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
      padding: 2rem;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .status {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.875rem;
      background: ${statusColor};
      color: white;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .stat-label {
      color: #6b7280;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .violations, .incomplete, .passes {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
    }
    .violation-item, .incomplete-item {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      border-radius: 4px;
    }
    .incomplete-item {
      background: #fefce8;
      border-left-color: #eab308;
    }
    .violation-header {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .impact {
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-left: 0.5rem;
      text-transform: uppercase;
    }
    .impact.critical { background: #dc2626; color: white; }
    .impact.serious { background: #f97316; color: white; }
    .impact.moderate { background: #eab308; color: white; }
    .impact.minor { background: #3b82f6; color: white; }
    .violation-title { font-weight: 600; font-size: 1.125rem; }
    .violation-description {
      color: #4b5563;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }
    .wcag-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .wcag-tag {
      padding: 0.125rem 0.5rem;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    .node {
      background: white;
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
    }
    .node-html {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      background: #f3f4f6;
      padding: 0.5rem;
      border-radius: 4px;
      overflow-x: auto;
      margin-bottom: 0.5rem;
    }
    .node-target {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    .node-issue {
      color: #dc2626;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .help-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #2563eb;
      text-decoration: none;
      font-size: 0.875rem;
    }
    .help-link:hover { text-decoration: underline; }
    .timestamp {
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Accessibility Report: ${componentName}</h1>
      <span class="status">${statusText}</span>
      <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value" style="color: #ef4444;">${violations.length}</div>
        <div class="stat-label">Violations</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #eab308;">${incomplete.length}</div>
        <div class="stat-label">Incomplete</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #22c55e;">${passes.length}</div>
        <div class="stat-label">Passes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #3b82f6;">${passRate}%</div>
        <div class="stat-label">Pass Rate</div>
      </div>
    </div>

    ${violations.length > 0 ? `
      <div class="violations">
        <h2>❌ Violations (${violations.length})</h2>
        ${violations.map((v, i) => `
          <div class="violation-item">
            <div class="violation-header">
              <span class="violation-title">${i + 1}. ${v.id}</span>
              <span class="impact ${v.impact}">${v.impact}</span>
            </div>
            <p class="violation-description">${v.description}</p>
            <div class="wcag-tags">
              ${v.tags.filter(t => t.startsWith('wcag')).map(tag =>
                `<span class="wcag-tag">${tag}</span>`
              ).join('')}
            </div>
            <strong>Affected Elements (${v.nodes.length}):</strong>
            ${v.nodes.map((node, ni) => `
              <div class="node">
                <div class="node-html">${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                <div class="node-target"><strong>Target:</strong> ${node.target.join(' ')}</div>
                ${node.failureSummary ? `<div class="node-issue">${node.failureSummary}</div>` : ''}
              </div>
            `).join('')}
            <a href="${v.helpUrl}" target="_blank" class="help-link">Learn more →</a>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${incomplete.length > 0 ? `
      <div class="incomplete">
        <h2>⚠️ Incomplete (${incomplete.length})</h2>
        <p style="margin-bottom: 1rem; color: #6b7280;">These checks could not be completed automatically and require manual verification.</p>
        ${incomplete.map((item, i) => `
          <div class="incomplete-item">
            <div class="violation-header">
              <span class="violation-title">${i + 1}. ${item.id}</span>
            </div>
            <p class="violation-description">${item.description}</p>
            <strong>Affected Elements (${item.nodes.length}):</strong>
            ${item.nodes.map(node => `
              <div class="node">
                <div class="node-html">${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                <div class="node-target"><strong>Target:</strong> ${node.target.join(' ')}</div>
              </div>
            `).join('')}
            <a href="${item.helpUrl}" target="_blank" class="help-link">Learn more →</a>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${passes.length > 0 ? `
      <div class="passes">
        <h2>✅ Passed Checks (${passes.length})</h2>
        <ul style="list-style: none;">
          ${passes.map(p => `
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">
              <strong>${p.id}</strong> - ${p.description}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}
  </div>
</body>
</html>
  `.trim();
}

/**
 * Severity levels for filtering
 */
export type ImpactLevel = 'minor' | 'moderate' | 'serious' | 'critical';

/**
 * Filter violations by severity
 */
export function filterViolationsBySeverity(
  violations: Result[],
  minImpact: ImpactLevel
): Result[] {
  const impactOrder: ImpactLevel[] = ['minor', 'moderate', 'serious', 'critical'];
  const minLevel = impactOrder.indexOf(minImpact);

  return violations.filter(v => {
    const violationLevel = impactOrder.indexOf(v.impact as ImpactLevel);
    return violationLevel >= minLevel;
  });
}
