/** Get a random number between 0 and x */
export const random = (x: number) => Math.floor(Math.random() * x)

/** Get a random number between min and max */
export const randomBetween = (min: number, max: number) => Math.floor((Math.random() * max) + min)

/** Get a random element from an array */
export const randomSelect = <T>(x: T[]): T => x[random(x.length)]

/** Clears the entire terminal */
export const clearScreen = () => Deno.stdout.write(new TextEncoder().encode('\u001b[2J'))

/** Move cursor to given row and column */
export const cursorMoveTo = (r: number, c: number) => `\u001b[${r};${c}H`
