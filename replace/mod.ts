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

async function walkDir(path: string, cb: (filePath: string) => void) {
    for await (const dirEntry of Deno.readDir(path)) {
        dirEntry.isDirectory
            ? walkDir(join(path, dirEntry.name), cb)
            : cb(join(path, dirEntry.name))
    }
}
walkDir(join(Deno.cwd(), path), async (filePath: string) => {
    console.log(filePath)
    let contents = await Deno.readTextFile(filePath)
    contents = contents.replace(regex, replace)
    Deno.writeTextFile(filePath, contents)
})

//  TODO: Allow selection of a single file
//  TODO: Allow filters for filePath?
//  TODO: Improve log messages
// TODO: --verbose flag to show every replacement