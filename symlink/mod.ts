//  Library
//  -------

import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'
import { bgWhite, dim, black } from 'https://deno.land/x/std@0.121.0/fmt/colors.ts'

//  Type Definitions
//  ----------------

/** Symlink Type */
type symlinkType = 'dir' | 'file'

/** Shape of the parsed command-line arguments */
type cliArguments = {
    from?: string,
    to?: string,
    _: string[]
}

//  ===============
//  PARSE ARGUMENTS
//  ===============

/** Parse the provided command-line arguments */
async function parseArguments() {

    //  Parse command-line arguments
    const args = parse(Deno.args, {
        alias: {
            from: ['src', 'origin', 'oldpath'],
            to: ['target', 'dest', 'newpath'],
        },
        string: ['from', 'to'],
    }) as cliArguments

    //  Extract parameters
    let from = args.from || args._.shift() || prompt(bgWhite('From: '), '')
    const to = args.to || args._.shift() || prompt(bgWhite('To: '), '')

    //  Handle exceptions
    if (!from) {
        console.error('Could not parse parameter: from')
        Deno.exit(1)
    }
    if (!to) {
        console.error('Could not parse parameter: to')
        Deno.exit(1)
    }

    from = await Deno.realPath(from)    //  Get Absolute path for 'from'
    // to = await Deno.realPath(to) //  Relative paths work for 'to'

    //  Determine SymlinkType
    const fromStats = await Deno.stat(from)
    const type: symlinkType = fromStats.isDirectory ? 'dir' : 'file'

    return { from, to, type }

}

//  ---------------------------------------------
const { from, to, type } = await parseArguments()
//  ---------------------------------------------

//  ==============
//  CREATE SYMLINK
//  ==============

//  ----------------------------------
await Deno.symlink(from, to, { type })
//  ----------------------------------

console.log(
    bgWhite(black(` Created Symlink (${type === 'dir' ? '📂' : '📄'} ${type}) \n`)) +
    `${dim('from:')} ${from}\n` +
    `${dim('to:')} ${to}`
)