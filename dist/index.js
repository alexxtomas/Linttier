import { parseArgs } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { LinttierError } from './entities/error.js';
import { handleArgsErrors } from './validations/args.validation.js';
import * as url from 'node:url';
import { join } from 'node:path';
import { execaCommand } from 'execa';
import ora from 'ora';
import figlet from 'figlet';
process.removeAllListeners('warning');
function pkgFromUserAgent(userAgent) {
    if (!userAgent)
        return undefined;
    const pkgSpec = userAgent.split(' ')[0];
    const pkgName = pkgSpec.split('/')[0];
    return pkgName;
}
export async function handleArgs() {
    console.log(figlet.textSync('Linttier', { horizontalLayout: 'full' }));
    try {
        const { values: { framework, template } } = parseArgs({
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
        });
        try {
            handleArgsErrors({ framework, template });
        }
        catch (err) {
            if (err instanceof LinttierError) {
                console.error(err.message);
            }
            else {
                console.error('Unknown error, please try again. It it still does not work, please open an issue on GitHub.\nhttps://github.com/alexxtomas/Linttier/issues/new');
            }
            return;
        }
        const _framework = framework;
        const _template = template;
        const baseUrl = `../templates/${_framework}/${_template}`;
        const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        const { default: eslintContent } = await import(`${baseUrl}/.eslintrc.json`, {
            assert: { type: 'json' }
        });
        const { default: prettierContent } = await import(`${baseUrl}/.prettierrc.json`, { assert: { type: 'json' } });
        const dependenciesContent = await readFile(join(__dirname, `../templates/${_framework}/${_template}/dependencies.txt`), 'utf-8').catch((err) => {
            console.error(err);
        });
        const packageManager = pkgFromUserAgent(process.env.npm_config_user_agent) || 'npm';
        const spinner = ora('Creating ESLint and Prettier file and installing required dependencies').start();
        Promise.all([
            writeFile('.eslintrc', JSON.stringify(eslintContent, null, 2)),
            writeFile('.prettierrc', JSON.stringify(prettierContent, null, 2)),
            execaCommand(`${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} -D ${dependenciesContent}`)
        ])
            .then(() => spinner.succeed('Done!'))
            .catch((err) => {
            console.error(err);
            spinner.fail('Something went wrong :(');
        });
    }
    catch (err) {
        if (err instanceof Error || err instanceof LinttierError) {
            console.error(err.message);
        }
        else {
            console.error('Unknown error, please try again. It it still does not work, please open an issue on GitHub.\nhttps://github.com/alexxtomas/Linttier/issues/new');
        }
    }
}
await handleArgs();
