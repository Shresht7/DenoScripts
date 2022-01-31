//  Library
import { parse } from 'https://deno.land/std@0.123.0/flags/mod.ts'
import { bgWhite, dim, black } from 'https://deno.land/x/std@0.123.0/fmt/colors.ts'

//  Type Definitions
type symlinkType = 'dir' | 'file'

//  ===============
//  PARSE ARGUMENTS
//  ===============

/** Parsed command-line arguments */
type Arguments = {
    from: string,
    to: string,
    type: symlinkType
}

/** Parse the command-line arguments */
async function parseArguments(): Promise<Arguments> {
    let { from, to, _ } = parse(Deno.args, {
        alias: {
            from: ['src', 'origin'],
            to: ['target', 'dest'],
        },
        string: ['from', 'to'],
    })

    //  Extract parameters
    from = from || _.shift() || prompt(bgWhite(' From: '), '')
    to = to || _.shift() || prompt(bgWhite(' To: '), '')

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