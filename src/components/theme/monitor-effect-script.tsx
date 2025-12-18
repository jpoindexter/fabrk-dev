'use client';

import React from 'react';

interface MonitorEffectScriptProps {
  nonce?: string;
}

export function MonitorEffectScript({ nonce }: MonitorEffectScriptProps = {}) {
  const script = `
    (function() {
      try {
        var effect = localStorage.getItem('monitor-preset');
        if (effect && ['none', 'crt', 'lcd', 'vhs'].includes(effect) && effect !== 'none') {
          document.documentElement.classList.add('effect-' + effect);
        }
      } catch (e) {}
    })();
  `;

  // Conditionally spread nonce to avoid hydration mismatch when undefined
  const nonceAttr = nonce ? { nonce } : {};

  return (
    <script {...nonceAttr} dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />
  );
}
