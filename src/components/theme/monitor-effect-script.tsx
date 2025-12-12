'use client';

import React from 'react';

export function MonitorEffectScript() {
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

  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}
