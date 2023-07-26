import { LinttierError } from '../entities/error.js';
import { readdirSync } from 'node:fs';
import { FRAMEWORKS, TEMPLATES } from '../constants.js';
export function handleArgsErrors({ framework, template }) {
    if (typeof framework === 'undefined' || typeof template === 'undefined') {
        throw new LinttierError({
            name: 'INVALID_ARGUMENTS',
            message: `Missing ${framework ? 'template' : 'framework'} argument`
        });
    }
    if (!FRAMEWORKS.includes(framework)) {
        throw new LinttierError({
            name: 'INVALID_ARGUMENTS',
            message: `Invalid framework '${framework}'.\nValid options:\n\t${FRAMEWORKS.join(',\n\t')}`
        });
    }
    if (!TEMPLATES.includes(template)) {
        throw new LinttierError({
            name: 'INVALID_ARGUMENTS',
            message: `Invalid template '${template}'.\nValid options:\n\t${TEMPLATES.join(',\n\t')}`
        });
    }
    const files = readdirSync(process.cwd());
    if (!files.includes('package.json')) {
        throw new LinttierError({
            name: 'INVALID_PACKAGE_JSON',
            message: 'No "package.json" found in current directory'
        });
    }
}
