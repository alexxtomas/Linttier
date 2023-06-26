#!/usr/bin/env node

import { parseArgs } from 'node:util'
import { type Options } from './types'

const FRAMEWORKS = ['Next', 'React', 'Vanilla']
const TEMPLATES = ['TypeScript', 'JavaScript']

try {
	const {
		values: { framework, template }
	} = parseArgs({
		args: process.argv.slice(2),
		options: {
			framework: {
				type: 'string',
				short: 'f'
			},
			template: {
				type: 'string',
				short: 't'
			}
		},
		strict: true
	})

	if (typeof framework === 'undefined' || typeof template === 'undefined') {
		throw new Error(`Missing ${framework ? 'template' : 'framework'} argument`)
	}
	if (!FRAMEWORKS.includes(framework)) {
		throw new Error(
			`Invalid framework '${framework}'.\nValid options:\n\t${FRAMEWORKS.join(
				',\n\t'
			)}`
		)
	}
	if (!TEMPLATES.includes(template)) {
		throw new Error(
			`Invalid template '${template}'.\nValid options:\n\t${TEMPLATES.join(
				',\n\t'
			)}`
		)
	}
} catch (e: any) {
	console.error(e.message)
}
