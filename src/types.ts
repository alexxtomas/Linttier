export interface Options {
	type: 'string' | 'boolean'
	short?: string
	multiple?: boolean // default: false
}

export interface ParsedArgsProps {
	options: { [key: string]: Options } // default: {}
	args?: string[] // default: process.argv.slice(2)
	strict?: boolean // defau lt: true
	allowPositional?: boolean // default: false
}
