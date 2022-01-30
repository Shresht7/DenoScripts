//  Helpers
import { random, randomSelect, cursorMoveTo } from './utils.ts'

//  Type Definitions
import type { RGB, MatrixMode } from './types.ts'

type MatrixRainProps = {
    x: number
    y: number
    speed?: number
    color: RGB,
    switchInterval?: number,
    isFirst?: boolean,
    matrixMode: MatrixMode
}

export class MatrixEntity {

    /** x position */
    private x: number
    /** y position */
    private y: number
    /** fall speed */
    private speed: number
    /** entity color */
    private color: RGB = [255, 255, 255]
    /** first in stream */
    private isFirst = false

    /** frame count since last switch */
    private frameCount = 0
    /** frame count till switch */
    private switchInterval = 20

    /** Entity's character */
    private symbol = ''
    /** Matrix style */
    private matrixMode: MatrixMode = 'original'

    constructor({ x, y, speed, color, switchInterval, isFirst, matrixMode }: MatrixRainProps) {
        this.x = x
        this.y = y
        this.speed = speed || 1
        this.color = color || this.color
        this.switchInterval = switchInterval || this.switchInterval
        this.isFirst = isFirst || this.isFirst
        this.matrixMode = matrixMode || this.matrixMode
    }

    /** Set entity symbol */
    setSymbol() {
        switch (this.matrixMode) {

            //  Katakana Characters
            case 'original':
                this.symbol = String.fromCharCode(0x30a0 + random(96))
                break

            //  Binary Characters
            case 'binary':
                this.symbol = randomSelect([0, 1]).toString()
                break

            //  ASCII Characters
            case 'ascii':
                this.symbol = String.fromCharCode(0 + random(127))
                break

            //  Braille Characters
            case 'braille':
                this.symbol = String.fromCharCode(0x2840 + random(63))
                break

            default:
                break

        }
    }

    /** Render the entity on the terminal */
    render() {

        if (this.isFirst) { this.color = [200, 255, 200] }  //  First entity in the stream has a brighter color

        Deno.stdout.write(new TextEncoder().encode(cursorMoveTo(Math.floor(this.y), Math.floor(this.x))))
        Deno.stdout.write(new TextEncoder().encode("\u001b[32m" + this.symbol + "\u001b[39m"))

        if (this.frameCount % this.switchInterval === 0) { this.setSymbol() }       //  Switch symbols if frameCount exceeds switch interval
        this.frameCount++

    }

    /** Rain down */
    rain(rows: number, speedOffset: number = random(2)) {
        this.y = this.y > rows ? 0 : this.y + (this.speed + speedOffset) / 6
    }
}