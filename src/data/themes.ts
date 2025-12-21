/**
 * Theme Configuration
 *
 * WCAG 2.1 AA Compliance:
 * ✅ All themes meet WCAG AA standards (4.5:1 text, 3:1 UI)
 *
 * Retro themes have been adjusted to maintain visual authenticity
 * while meeting accessibility requirements.
 */
export const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000', wcag: 'aa' },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff', wcag: 'aa' },
    { id: 'green', name: 'Green CRT', preview: '#33ff66', wcag: 'aa' },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff', wcag: 'aa' },
    { id: 'red', name: 'Red CRT', preview: '#ff6655', wcag: 'aa' },
  ],
  'Bold Red': [
    { id: 'crimson', name: 'Crimson', preview: '#dc143c', wcag: 'aa' },
    { id: 'blood', name: 'Blood', preview: '#8b0000', wcag: 'aa' },
    { id: 'neonred', name: 'Neon Red', preview: '#ff3333', wcag: 'aa' },
  ],
  Futuristic: [
    { id: 'cyberpunk', name: 'Cyberpunk', preview: '#ff0050', wcag: 'aa' },
    { id: 'phosphor', name: 'Phosphor', preview: '#00ff41', wcag: 'aa' },
    { id: 'holographic', name: 'Holographic', preview: '#00ffff', wcag: 'aa' },
    { id: 'navigator', name: 'Navigator', preview: '#ff8c00', wcag: 'aa' },
    { id: 'blueprint', name: 'Blueprint', preview: '#e8e8e8', wcag: 'aa' },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070', wcag: 'aa' },
    { id: 'c64', name: 'C64 Blue', preview: '#352879', wcag: 'aa' },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff', wcag: 'aa' },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff', wcag: 'aa' },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f', wcag: 'aa' },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a', wcag: 'aa' },
  ],
  Light: [{ id: 'bw', name: 'Black & White', preview: '#ffffff', wcag: 'aa' }],
} as const;

// Flattened list for type safety and easy lookup
export const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
