type ErrorName = 'INVALID_PACKAGE_JSON' | 'INVALID_ARGUMENTS'

export class LinttierError extends Error {
	name: ErrorName
	message: string
	cause?: unknown

	constructor({
		name,
		message,
		cause
	}: {
		name: ErrorName
		message: string
		cause?: unknown
	}) {
		super()
		this.name = name
		this.message = message
		this.cause = cause
	}
}
