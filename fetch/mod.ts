//  Library
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

type Arguments = {
    headers: boolean,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: BodyInit,
    url: string
}

/** Parse command-line arguments */
function parseArguments(): Arguments {
    let { headers, method, body, _ } = parse(Deno.args)

    const url = _.shift() || prompt('URL: ')
    if (!url) {
        console.error('Invalid URL')
        Deno.exit(1)
    }

    method = method || 'GET'

    return { url, headers, method, body } as Arguments
}

//  ---------------------------------------------------
const { url, headers, method, body } = parseArguments()
//  ---------------------------------------------------

//  -------------
//  FETCH REQUEST
//  -------------

//  Make the fetch request to the given URL
const response = await fetch(url.toString(), { method, body })

//  If the content-type of the response is json, then parse as json; otherwise parse as text
const data = (response.headers.get('content-type')?.includes('json'))
    ? response.json()
    : response.text()

//  ------------
//  SHOW RESULTS
//  ------------

//  Show method url and response
console.log('\n' + `${method} ${response.url} ${response.status} ${response.statusText}` + '\n')

//  Show headers if --headers flags was passed
if (headers) {
    for (const [header, value] of response.headers) {
        console.log(header, value)
    }
    console.log('\n')
}

//  Show response body
console.log(await data, '\n')