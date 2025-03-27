#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './App.js';
import meow from 'meow';

const cli = meow(
	`
	Usage
	  $ my-cli

	Options
	  --help     Show this help
	  --version  Show version

	Examples
	  $ my-cli
`,
	{
		importMeta: import.meta,
		flags: {
			help: {
				type: 'boolean',
				alias: 'h',
			},
			version: {
				type: 'boolean',
				alias: 'v',
			},
		},
	}
);

render(<App />);