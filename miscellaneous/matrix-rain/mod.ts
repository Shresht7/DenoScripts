//  Library
import { MatrixStream } from './matrixStream.ts'
import { randomBetween, clearScreen } from './utils.ts'

//  Type Definitions
import type { RGB, MatrixMode } from './types.ts'

//  -------------
//  CONFIGURATION
//  -------------

const ROWS = 80
const COLUMNS = 120
const COLUMN_SPACING = 3

const STREAM_MINCOUNT = 3
const STREAM_MAXCOUNT = 7

const STREAM_COLOR: RGB = [0, 255, 70]

const FPS = 15

const MODE: MatrixMode = 'original'

//  =====
//  SETUP
//  =====

const STREAMS: MatrixStream[] = []

for (let c = 0; c < COLUMNS; c = c + COLUMN_SPACING) {
    const stream = new MatrixStream(STREAM_MINCOUNT, STREAM_MAXCOUNT, STREAM_COLOR)
    const rSpeedOffset = randomBetween(0, 10)
    stream.generateEntities(c, rSpeedOffset, MODE)
    STREAMS.push(stream)
}

//  TODO: PARSE FLAGS AND OPTIONS

//  DRAW
//  ----

setInterval(() => {
    clearScreen()
    STREAMS.forEach(stream => stream.render(ROWS))
}, 1000 / FPS)