//  Library
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'
import { join } from 'https://deno.land/std@0.121.0/path/mod.ts'
// import { bold, green, red, yellow, blue, inverse } from 'https://deno.land/x/std@0.121.0/fmt/colors.ts'

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

type Arguments = {
    regex: RegExp,
    replace: string,
    flags: string,
    path: string
}

/** Parse command-line arguments */
function parseArguments(): Arguments {
    let { regex, replace, flags, path, _ } = parse(Deno.args, {
        boolean: [],
        string: ['regex', 'replace', 'flags', 'path'],
        alias: {},
        default: {
            flags: 'gm',
            path: '.'
        }
    })

    regex = regex || _.shift()
    replace = replace || _.shift()
    if (!regex || !replace) {
        console.error('Invalid Arguments')
        Deno.exit(1)
    }

    regex = new RegExp(regex, flags)

    return { regex, replace, path } as Arguments
}

//  ---------------------------------------------
const { regex, replace, path } = parseArguments()
//  ---------------------------------------------

const target = join(Deno.cwd(), path)
const stats = await Deno.stat(target)

if (stats.isDirectory) {
    walkDir(target, (filePath: string) => {
        makeSubstitutions(filePath, regex, replace)
    })
} else if (stats.isFile) {
    makeSubstitutions(target, regex, replace)
}


//  TODO: Allow filters for filePath?
//  TODO: Improve log messages
// TODO: --verbose flag to show every replacement

//  ----------------
//  HELPER FUNCTIONS
//  ----------------

/**
 * Makes regex-replace substitutions in the given file
 * @param filePath Path to file
 * @param regex Regular expression to match on
 * @param replace Replacement string
 */
async function makeSubstitutions(filePath: string, regex: RegExp, replace: string) {
    const originalContents = await Deno.readTextFile(filePath)
    const contents = originalContents.replace(regex, replace)
    Deno.writeTextFile(filePath, contents)
}

/**
 * Walks a directory and executes the provided callback
 * @param path Directory to walk
 * @param cb Callback to execute for each file. The callback receives the filePath as an argument
 */
async function walkDir(path: string, cb: (filePath: string) => void) {
    for await (const dirEntry of Deno.readDir(path)) {
        dirEntry.isDirectory
            ? walkDir(join(path, dirEntry.name), cb)
            : cb(join(path, dirEntry.name))
    }
}