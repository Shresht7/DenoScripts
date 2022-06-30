//  Library
import { walk, move, WalkOptions } from "https://deno.land/std@0.145.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.145.0/path/mod.ts";
import { parse } from 'https://deno.land/std@0.145.0/flags/mod.ts'

// ---------------
// PARSE ARGUMENTS
// ---------------

/** Parsed command-line arguments */
type Arguments = {
    dir: string,
    overwrite?: boolean,
    maxDepth?: number,
    match?: RegExp[],
    skip?: RegExp[],
    exts?: string[],
    yes?: boolean,
}

/** Parse the command-line arguments */
function parseArguments(): Arguments {
    const args = parse(Deno.args, {
        string: ['dir', 'depth', 'match', 'skip', 'extensions'],
        boolean: ['overwrite', 'yes'],
        default: { depth: 1 },
        alias: {
            yes: ['y', 'confirm', 'c'],
        }
    })

    //  Extract directory
    const dir = args.dir || args._.shift()?.toString() || Deno.cwd()

    //  Extract maxDepth
    const maxDepth = parseInt(args.depth.toString())

    //  Extract match, skip and extensions
    const match = args.match?.split(/\s+/).map(m => new RegExp(`${m}`, 'g'))
    const skip = args.skip?.split(/\s+/).map(m => new RegExp(`${m}`, 'g'))
    const exts = args.extensions?.split(/\s+/)

    //  Extract booleans
    const overwrite = args.overwrite
    const yes = args.yes

    return { dir, maxDepth, overwrite, match, skip, exts, yes }

}

//  -------------------------------------------------------------------------
const { dir, maxDepth, overwrite, match, skip, exts, yes } = parseArguments()
//  -------------------------------------------------------------------------

// =================
// FLATTEN DIRECTORY
// =================

const walkOptions: WalkOptions = {
    includeDirs: false,
    includeFiles: true,
    maxDepth,
    match,
    skip,
    exts,
}

for await (const f of walk(dir, walkOptions)) {
    const src = f.path
    const dest = join(dir, f.name)
    const confirm = yes || prompt(`Are you sure you want to move ${src} --> ${dest} (Y/N):`, 'N')?.toLowerCase() === 'y'
    if (confirm) {
        console.log('moving', src, '-->', dest)
        move(src, dest, { overwrite })
    }

}
