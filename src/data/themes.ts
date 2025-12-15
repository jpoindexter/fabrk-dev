export const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
    { id: 'green', name: 'Green CRT', preview: '#33ff66' },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
    { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070' },
    { id: 'c64', name: 'C64 Blue', preview: '#352879' },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff' },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff' },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f' },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a' },
  ],
  Light: [{ id: 'bw', name: 'Black & White', preview: '#ffffff' }],
} as const;

// Flattened list for type safety and easy lookup
export const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
