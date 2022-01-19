//  Library
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

/** Parse command-line arguments */
function parseArguments() {
    const { headers, _ } = parse(Deno.args)

    const url = _.shift() || prompt('URL: ')
    if (!url) {
        console.error('Invalid URL')
        Deno.exit(1)
    }

    return { url, headers }
}

//  -------------------------------------
const { url, headers } = parseArguments()
//  -------------------------------------

//  -------------
//  FETCH REQUEST
//  -------------

//  Make the fetch request to the given URL
const response = await fetch(url.toString())

//  If the content-type of the response is json then parse as json, otherwise parse as text
const data = (response.headers.get('content-type')?.includes('json'))
    ? response.json()
    : response.text()

//  ------------
//  SHOW RESULTS
//  ------------

//  Show method url and response
console.log('\n' + `GET ${response.url} ${response.status} ${response.statusText}` + '\n')

//  Show headers if --headers flags was passed
if (headers) {
    for (const [header, value] of response.headers) {
        console.log(header, value)
    }
    console.log('\n')
}

//  Show response body
console.log(await data)