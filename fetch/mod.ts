//  Library
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'
import { copy, readerFromStreamReader } from 'https://deno.land/std@0.121.0/streams/conversion.ts'
import { bold, green, red, yellow, blue, gray, inverse } from 'https://deno.land/x/std@0.121.0/fmt/colors.ts'

//  ----------------
//  HELPER FUNCTIONS
//  ----------------

/** Check if number n is between x and y */
const between = (n: number, x: number, y: number) => x >= n && n < y

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

/** Command-line arguments */
type Arguments = {
    /** Flag to show response headers */
    headers: boolean,
    /** HTTP verb */
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    /** Fetch request body */
    body?: BodyInit,
    /** Fetch URL */
    url: string,
    /** Output as JSON */
    json?: boolean,
    /** Output to stdout */
    output?: boolean,
}

/** Parse command-line arguments */
function parseArguments(): Arguments {
    const { headers, method, body, json, output, _ } = parse(Deno.args, {
        boolean: ['headers', 'output', 'json'],
        string: ['method', 'body'],
        alias: {
            headers: ['h'],
            method: ['m', 'verb', 'v'],
            body: ['b', 'data', 'd'],
            output: ['o', 'response', 'r']
        },
        default: {
            method: 'GET'
        }
    })

    const url = _.shift() || prompt('URL: ')
    if (!url) {
        console.error('Invalid URL')
        Deno.exit(1)
    }

    return { url, headers, method, body, json, output } as Arguments
}

//  -----------------------------------------------------------------
const { url, headers, method, body, json, output } = parseArguments()
//  -----------------------------------------------------------------

//  =============
//  FETCH REQUEST
//  =============

//  Make the fetch request to the given URL
const response = await fetch(url.toString(), { method, body })

//  If the output flag is set then write the response to stdout and exit
if (output && response.body) {
    const reader = readerFromStreamReader(response.body.getReader())
    await copy(reader, Deno.stdout)
    Deno.exit(0)
}

//  ------------
//  SHOW RESULTS
//  ------------

//  Build the result
const result = inverse([
    bold(blue(' ' + method + ' ')),
    response.url,
    function () {
        //  Color the string based on status code
        const str = ' ' + response.status + ' ' + response.statusText + ' '
        if (between(response.status, 200, 300)) {
            return green(str)
        } else if (between(response.status, 400, 500)) {
            return red(str)
        } else if (between(response.status, 500, 600)) {
            return yellow(str)
        } else { return blue(str) }
    }(),
].join(' '))

//  Show method url and response
console.log('\n' + result + '\n')

//  Show headers if --headers flags was passed
if (headers) {
    console.log(blue(bold(' Headers ')) + '\n')
    for (const [header, value] of response.headers) {
        console.log(gray(header + ': '), value)
    }
    console.log('\n' + blue(bold(' Response ')) + '\n')
}

//  Show response body

//  If the content-type of the response is json, then parse as json
if (response.headers.get('content-type')?.includes('json') || json) {
    const data = response.json()
    console.log(await data, '\n')
    Deno.exit(0)
}

//  If not json, the output stream to stdout
if (response.body) {
    const reader = readerFromStreamReader(response.body.getReader())
    await copy(reader, Deno.stdout)
    console.log('\n')
}