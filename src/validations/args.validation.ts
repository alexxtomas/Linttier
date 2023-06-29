import { LinttierError } from '../entities/error.js'
import { readdirSync } from 'node:fs'
import { FRAMEWORKS, TEMPLATES } from '../constants.js'
import { Framework, Template } from '../types.js'

interface HandleArgsErrorsProps {
	framework: string | undefined
	template: string | undefined
}

export function handleArgsErrors({
	framework,
	template
}: HandleArgsErrorsProps) {
	if (typeof framework === 'undefined' || typeof template === 'undefined') {
		throw new LinttierError({
			name: 'INVALID_ARGUMENTS',
			message: `Missing ${framework ? 'template' : 'framework'} argument`
		})
	}
	if (!FRAMEWORKS.includes(framework as Framework)) {
		throw new LinttierError({
			name: 'INVALID_ARGUMENTS',
			message: `Invalid framework '${framework}'.\nValid options:\n\t${FRAMEWORKS.join(
				',\n\t'
			)}`
		})
	}
	if (!TEMPLATES.includes(template as Template)) {
		throw new LinttierError({
			name: 'INVALID_ARGUMENTS',
			message: `Invalid template '${template}'.\nValid options:\n\t${TEMPLATES.join(
				',\n\t'
			)}`
		})
	}

	const files = readdirSync(process.cwd())
	if (!files.includes('package.json')) {
		throw new LinttierError({
			name: 'INVALID_PACKAGE_JSON',
			message: 'No "package.json" found in current directory'
		})
	}
}
