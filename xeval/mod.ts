

//  Library
import { readStringDelim } from 'https://deno.land/std@0.146.0/io/buffer.ts'
import { parse } from 'https://deno.land/std@0.146.0/flags/mod.ts'

/**
 * AsyncFunction constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
 */
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor

/** Default Delimiter - New Line */
const DEFAULT_DELIMITER = '\n'

export interface XEvalOptions {
    delimiter?: string
}

export async function xEval(
    reader: Deno.Reader,
    xevalFunction: (code: string) => void,
    { delimiter = DEFAULT_DELIMITER }: XEvalOptions = {}
) {
    for await (const chunk of readStringDelim(reader, delimiter)) {
        if (chunk.length > 0) {
            await xevalFunction(chunk)
        }
    }
}

async function main() {

    const { delimiter, replvar, help, _ } = parse(Deno.args, {
        boolean: ['help'],
        string: ['delimiter', 'replvar'],
        alias: {
            delimiter: ['d'],
            replvar: ['I'],
            help: ['h']
        },
        default: {
            delimiter: DEFAULT_DELIMITER,
            replvar: '$'
        }
    })

    if (_.length !== 1) {
        // console.log(HELP_MESSAGE)
        // console.log(parsedArgs._)
        Deno.exit(1)
    }

    if (help) {
        // console.log(HELP_MESSAGE)
    }

    // new AsyncFunction()'s error message for this particular case isn't great.
    if (!replvar.match(/^[_$A-z][_$A-z0-9]*$/)) {
        console.error(`Bad replvar identifier: "${replvar}"`)
        Deno.exit(1)
    }

    const code = _[0]
    const XEvalFunction = new AsyncFunction(replvar, code)

    await xEval(Deno.stdin, XEvalFunction, { delimiter })
}

if (import.meta.main) {
    main()
}
