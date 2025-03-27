import { Feature } from './types.js';

export const features: Feature[] = [
	{
		name: 'zsh',
		description: 'ZSH configuration',
		enabled: false,
		unicode: 'f120', // Terminal icon
	},
	{
		name: 'nvim',
		description: 'Neovim configuration',
		enabled: false,
		unicode: 'f013', // Settings icon
	},
	{
		name: 'git',
		description: 'Git configuration',
		enabled: false,
		unicode: 'f021', // Refresh icon
	},
	{
		name: 'starship',
		description: 'Starship prompt',
		enabled: false,
		unicode: 'f120', // Terminal icon
	},
	{
		name: 'ripgrep',
		description: 'Ripgrep configuration',
		enabled: false,
		unicode: 'f013', // Settings icon
	},
	{
		name: 'bat',
		description: 'bat configuration',
		enabled: false,
		unicode: 'f013', // Settings icon
	},
	{
		name: 'misc',
		description: 'Miscellaneous configurations',
		enabled: false,
		unicode: 'f013', // Settings icon
	},
];
