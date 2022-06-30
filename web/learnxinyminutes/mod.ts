//  Library
import { parse } from 'https://deno.land/std@0.142.0/flags/mod.ts';

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

/** Command Line Arguments */
type Arguments = {
    /** Learn X */
    x: string
}

function parseArguments(): Arguments {
    const { _ } = parse(Deno.args)

    const x = _.shift()?.toString() || prompt('Language: ');

    if (!x) {
        console.error('Invalid Language');
        Deno.exit(1);
    }

    return { x }
}

//  --------------------------
const { x } = parseArguments()
//  --------------------------

const url = `https://raw.githubusercontent.com/adambard/learnxinyminutes-docs/master/${x}.html.markdown`;
const response = await fetch(url)

const contents = await response.text()

console.log(contents)