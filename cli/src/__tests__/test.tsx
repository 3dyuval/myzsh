import React from 'react';
import chalk from 'chalk';
import * as ava from 'ava';
import {render} from 'ink-testing-library';
import App from '../App.js';

const test = ava.default;

test('greet unknown user', t => {
	const {lastFrame} = render(<App name={undefined} />);

	t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`);
});

test('greet user with a name', t => {
	const {lastFrame} = render(<App name="Jane" />);

	t.is(lastFrame(), `Hello, ${chalk.green('Jane')}`);
});


