import degit from 'degit'
import { parseArgs } from 'node:util'
import { readdirSync } from 'node:fs'
import { LinttierError } from './entities/error.js'

const FRAMEWORKS = ['Next', 'React', 'Vanilla']
const TEMPLATES = ['TypeScript', 'JavaScript']

interface HandleArgsErrorsProps {
	framework: string | undefined
	template: string | undefined
}

function handleArgsErrors({ framework, template }: HandleArgsErrorsProps) {
	if (typeof framework === 'undefined' || typeof template === 'undefined') {
		throw new LinttierError({
			name: 'INVALID_ARGUMENTS',
			message: `Missing ${framework ? 'template' : 'framework'} argument`
		})
	}
	if (!FRAMEWORKS.includes(framework)) {
		throw new LinttierError({
			name: 'INVALID_ARGUMENTS',
			message: `Invalid framework '${framework}'.\nValid options:\n\t${FRAMEWORKS.join(
				',\n\t'
			)}`
		})
	}
	if (!TEMPLATES.includes(template)) {
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

export async function handleArgs() {
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
		try {
			handleArgsErrors({ framework, template })
		} catch (err) {
			if (err instanceof LinttierError) {
				console.error(err.message)
			} else {
				console.error(
					'Unknown error, please try again. It it still does not work, please open an issue on GitHub.\nhttps://github.com/alexxtomas/Linttier/issues/new'
				)
			}
			return
		}

		const _framework = framework as string
		const _template = template as string

		console.log(
			`Creating ${_framework} ${_template} ESLint and Prettier config...`
		)

		await degit(`Linttier/${_framework}/${_template}`, { force: true }).clone(
			process.cwd()
		)
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message)
		} else {
			console.error(
				'Unknown error, please try again. It it still does not work, please open an issue on GitHub.\nhttps://github.com/alexxtomas/Linttier/issues/new'
			)
		}
	}
}

await handleArgs()
