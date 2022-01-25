//  Library
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'
import { join } from 'https://deno.land/std@0.121.0/path/mod.ts'
// import { bold, green, red, yellow, blue, inverse } from 'https://deno.land/x/std@0.121.0/fmt/colors.ts'

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

/** Parse command-line arguments */
function parseArguments() {
    let { regex, replace, path, flags, filter, _ } = parse(Deno.args, {
        // boolean: [],
        string: ['regex', 'replace', 'flags', 'path', 'filter'],
        // alias: {},
        default: {
            flags: 'gm',
            path: '.'
        }
    })

    //  Extract regex and replace from rest arguments if not provided using --regex and --replace
    regex = regex || _.shift()
    replace = replace || _.shift()
    if (!regex || !replace) {
        console.error('Invalid Arguments')
        Deno.exit(1)
    }

    //  Generate the actual Regular Expression from the provided string
    regex = new RegExp(regex, flags)
    filter = filter ? new RegExp(filter, 'gim') : null

    return { regex, replace, path, filter }
}

//  -----------------------------------------------------
const { regex, replace, path, filter } = parseArguments()
//  -----------------------------------------------------

//  =============
//  REGEX REPLACE
//  =============

//  Check if the supplied path is a directory or a file
const target = join(Deno.cwd(), path)
const stats = await Deno.stat(target)

if (stats.isDirectory) {
    //  If a directory, then walk the directory and call makeSubstitutions on all valid children
    walkDir(target, (filePath: string) => {
        if (filter && !filter.test(filePath)) { return }
        makeSubstitutions(filePath, regex, replace)
    })
} else if (stats.isFile) {
    if (filter && !filter.test(target)) { Deno.exit(0) }
    //  If a file, then call makeSubstitutions on that file
    makeSubstitutions(target, regex, replace)
}

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