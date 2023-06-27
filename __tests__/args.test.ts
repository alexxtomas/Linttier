import { test, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { SyncOptions, execaCommandSync } from 'execa'
import { join } from 'node:path'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { after } from 'node:test'

const run = (args: string[], options: SyncOptions = {}) => {
	return execaCommandSync(`node ${process.cwd()} ${args.join(' ')}`, options)
}

const dirName = 'test-directory'
const dirPath = join(process.cwd(), dirName)

const createDir = ({
	eslintrc,
	eslintignore,
	prettier,
	prettierignore,
	packageJson,
	tsconfig
}: {
	eslintrc?: boolean
	eslintignore?: boolean
	prettier?: boolean
	prettierignore?: boolean
	packageJson?: boolean
	tsconfig?: boolean
}) => {
	const files: string[] = []
	if (eslintrc) files.push('.eslintrc')
	if (eslintignore) files.push('.eslintignore')
	if (prettier) files.push('.prettier')
	if (prettierignore) files.push('.prettierignore')
	if (packageJson) files.push('package.json')
	if (tsconfig) files.push('tsconfig.json')

	mkdirSync(dirPath)

	files.forEach((file) => {
		writeFileSync(join(dirPath, file), '')
	})
}
beforeEach(() => {
	try {
		rmSync(dirPath, { recursive: true })
	} catch (error) {
		// Do nothing
	}
})

afterAll(() => {
	try {
		rmSync(dirPath, { recursive: true })
	} catch (error) {
		// Do nothing
	}
})

test('if arguments are not defined should throw an error', () => {
	const { stderr } = run([])
	expect(stderr).toMatch(/Missing framework argument/)
})

test('if framework argument is not defined should throw an error', () => {
	const { stderr } = run(['--template=TypeScript'])
	expect(stderr).toMatch(/Missing framework argument/)
})

test('if template argument is not defined should throw an error', () => {
	const { stderr } = run(['--framework=React'])
	expect(stderr).toMatch(/Missing template argument/)
})

test('if framework argument is invalid should throw an error', () => {
	const { stderr } = run(['--framework=Invalid', '--template=TypeScript'])
	expect(stderr).toMatch(/Invalid framework 'Invalid'/)
})

test('if template argument is invalid should throw an error', () => {
	const { stderr } = run(['--framework=React', '--template=Invalid'])
	expect(stderr).toMatch(/Invalid template 'Invalid'/)
})

test('if unknown argument is passed should throw an error', () => {
	const { stderr } = run([
		'--framework=React',
		'--template=TypeScript',
		'--unknown=Option'
	])
	expect(stderr).toMatch(/Unknown option '--unknown'/)
})

test('if positional argument is passed should throw an error', () => {
	const { stderr } = run([
		'--framework=React',
		'--template=TypeScript',
		'positionalArgument'
	])
	expect(stderr).toMatch(
		/Unexpected argument 'positionalArgument'. This command does not take positional arguments/
	)
})

test('if directory does not have a package.json should throw an error', () => {
	createDir({})
	const { stderr } = run(['--framework=React', '--template=TypeScript'], {
		cwd: dirPath
	})
	expect(stderr).toMatch(/No "package.json" found in current directory/)
})

test('if framework and template arguments are valid and directory has a package.json should not throw an error', () => {
	createDir({ packageJson: true })
	const { stderr } = run(['--framework=React', '--template=TypeScript'], {
		cwd: dirPath
	})
	expect(stderr).toBe('')
})

test('if framework and template arguments are valid and directory has a package.json should log a message', () => {
	createDir({ packageJson: true })
	const { stdout } = run(['--framework=React', '--template=TypeScript'], {
		cwd: dirPath
	})
	expect(stdout).toMatch(/Creating React TypeScript ESLint and Prettier config/)
})

// test('package manager should be handled correctly', () => {
// 	const { stdout } = run([
// 		'--framework=React',
// 		'--template=TypeScript',
// 	])
// 	expect(stdout).toMatch(//)
// })
