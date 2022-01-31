//  Library
import { parse } from 'https://deno.land/std@0.123.0/flags/mod.ts'

//  ---------------
//  PARSE ARGUMENTS
//  ---------------

type Arguments = {
    count: number,
    sides: number,
    sum: boolean,
    advantage: boolean,
    disadvantage: boolean
}

/** Parse command-line arguments */
function parseArguments(): Arguments {
    const { sum, advantage, disadvantage, _ } = parse(Deno.args, {
        boolean: ['sum', 'advantage', 'disadvantage'],
        // string: [],
        alias: {
            sum: ['s', 'total', 't'],
            advantage: ['a'],
            disadvantage: ['d']
        },
        // default: {
        // }
    })

    //  Extract count and sides from string
    const die = _.shift()?.toString() || 'd6'
    const match = die.match(/(\d*)d(\d+)/i)!
    const count = match?.[1] || 1
    const sides = match?.[2] || 6

    return { count, sides, sum, advantage, disadvantage } as Arguments
}

//  -------------------------------------------------------------------
const { count, sides, sum, advantage, disadvantage } = parseArguments()
//  -------------------------------------------------------------------

//  --------
//  ROLL DIE
//  --------

function rollDice(dice: number, count: number) {
    const rolls: number[] = []
    for (let i = 0; i < count; i++) {
        const roll = (Math.floor(Math.random() * dice)) + 1
        rolls.push(roll)
    }
    return rolls
}

//  --------------------------------
const rolls = rollDice(sides, count)
//  --------------------------------

function showDice(rolls: number[]) {
    if (advantage) {
        console.log('Roll:', rolls.sort((a, b) => a - b)[rolls.length - 1])
    } else if (disadvantage) {
        console.log('Roll:', rolls.sort((a, b) => a - b)[0])
    } else {
        rolls.forEach((roll, idx) => console.log(`Roll ${idx + 1}:`, roll))
    }
}

//  -----------
showDice(rolls)
//  -----------

//  ----------
//  SHOW TOTAL
//  ----------

function getTotal(rolls: number[]): number {
    return rolls.reduce((acc, curr) => acc + curr, 0)
}

function showTotal(rolls: number[]) {
    console.log(`Total: ${getTotal(rolls)}`)
}

//  -------------------------
if (sum) { showTotal(rolls) }
//  -------------------------