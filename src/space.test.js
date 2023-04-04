import { test, expect } from 'vitest';

const space = require('./space.js');
const postcss = require('postcss');

test('convert', () => {
	expect('a').toEqual('a');
})