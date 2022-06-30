//  Library
import { MatrixEntity } from './matrixEntity.ts'
import { random, randomBetween, randomSelect } from './utils.ts'
import type { RGB, MatrixMode } from './types.ts'

export class MatrixStream {

    /** The collection of entities that make up the stream */
    private entities: MatrixEntity[] = []
    /** Count of entities */
    private entityCount: number
    /** Stream color */
    private color: RGB
    /** SpeedOffset for Matrix-Fall */
    private speedOffset = randomSelect([0, 1, 2])

    constructor(minCount: number, maxCount: number, color: RGB) {
        this.entityCount = randomBetween(minCount, maxCount)
        this.color = color
    }

    /** Generate matrix entities */
    generateEntities(x: number, y: number, matrixMode: MatrixMode) {
        let isFirst = random(2) === 1   //  1 in 2 chance for a brighter leading stream entity

        for (let i = 0; i <= this.entityCount; i++) {

            //  Create new entity and initialize symbol
            const entity = new MatrixEntity({ x, y, color: this.color, isFirst, matrixMode })
            entity.setSymbol()

            this.entities.push(entity)  //  Add entity to this stream
            y-- //  Move Y position down stream

            if (isFirst) { isFirst = false }    //  Turn off isFirst flag

        }
    }

    /** Render the stream */
    render(rows: number) {
        this.entities.forEach(entity => {
            entity.render()
            entity.rain(rows, this.speedOffset)
        })
    }
}