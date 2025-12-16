/**
 * Theme Configuration
 *
 * WCAG 2.1 AA Compliance:
 * ✅ Compliant: amber, blue, green, red, spectrum, bw
 * ⚠️ Authentic: purple, atari, c64, vic20, gameboy, gbpocket
 *
 * "Authentic" themes prioritize historical color accuracy over WCAG compliance.
 * They're designed for nostalgic/retro aesthetics where period-accurate colors
 * take precedence. Use WCAG-compliant themes for public-facing production apps.
 */
export const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000', wcag: 'aa' },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff', wcag: 'aa' },
    { id: 'green', name: 'Green CRT', preview: '#33ff66', wcag: 'aa' },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff', wcag: 'authentic' },
    { id: 'red', name: 'Red CRT', preview: '#ff6655', wcag: 'aa' },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070', wcag: 'authentic' },
    { id: 'c64', name: 'C64 Blue', preview: '#352879', wcag: 'authentic' },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff', wcag: 'aa' },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff', wcag: 'authentic' },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f', wcag: 'authentic' },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a', wcag: 'authentic' },
  ],
  Light: [{ id: 'bw', name: 'Black & White', preview: '#ffffff', wcag: 'aa' }],
} as const;

// Flattened list for type safety and easy lookup
export const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
