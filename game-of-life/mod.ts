//  Library
import { parse } from 'https://deno.land/std@0.123.0/flags/mod.ts'
import Grid from './Grid.ts'

//  PARSE ARGUMENTS
//  ---------------

let { character, fps, rows, columns } = parse(Deno.args, {
    string: ['character', 'fps', 'rows', 'columns'],
    alias: {
        character: ['c'],
        fps: ['f'],
        rows: ['r'],
        columns: ['c']
    },
    default: {
        character: '🦕',
        fps: 60,
        ...Deno.consoleSize(Deno.stdout.rid)
    }
})

rows = parseInt(rows)
columns = parseInt(columns)
fps = parseInt(fps)

//  SETUP
//  =====

//  -----------------------------------------------------
const GRID = new Grid({ rows, columns, randomize: true })
//  -----------------------------------------------------

//  DRAW
//  ====

setInterval(() => {
    GRID.evolve()
    GRID.render(character)
}, 1000 / fps)