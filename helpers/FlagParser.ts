//  Library
import { flags } from '../deps.ts'

interface FlagProperties {
    aliases?: string[]
    isBoolean?: boolean
    defaultValue?: string | boolean
}

export class FlagParser {

    private stringFlags: string[] = []
    private booleanFlags: string[] = []
    private defaultValues: Record<string, string | boolean> = {}
    private alias: Record<string, string[]> = {}
    private negatable: string[] = []

    constructor(private args: string[] = Deno.args, private options: flags.ParseOptions = {}) { }

    private setProperties(name: string, properties: FlagProperties) {
        if (properties.defaultValue) { this.defaultValues[name] = properties.defaultValue }
        if (properties.aliases) { this.alias[name] = properties.aliases }
    }

    private flagB(name: string, params: FlagProperties) {
        this.booleanFlags.push(name)
        this.setProperties(name, params)
        this.negatable.push(name)
    }

    private flagS(name: string, params: FlagProperties) {
        this.stringFlags.push(name)
        this.setProperties(name, params)
    }

    flag = (name: string, params: FlagProperties) => {
        params.isBoolean
            ? this.flagB(name, params)
            : this.flagS(name, params)
        return this
    }

    /** Returns the parsed arguments */
    parse = () => flags.parse(this.args, {
        ...this.options,
        string: this.stringFlags,
        boolean: this.booleanFlags,
        alias: this.alias,
        negatable: this.negatable,
        default: this.defaultValues,
    })

}
