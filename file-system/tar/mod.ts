//  Library
import { Tar, Untar } from 'https://deno.land/std@0.146.0/archive/tar.ts'
import { copy } from 'https://deno.land/std@0.146.0/streams/conversion.ts'
import { walk, ensureFile, ensureDir } from 'https://deno.land/std@0.146.0/fs/mod.ts'
import { basename } from 'https://deno.land/std@0.146.0/path/mod.ts'

//  Helpers
import { FlagParser } from '../../helpers/mod.ts'

// -------------------------
// TAR AND UNTAR DIRECTORIES
// -------------------------

const { src, dest, create, extract, _ } = new FlagParser()
    .flag('create', { isBoolean: true, defaultValue: false })
    .flag('extract', { isBoolean: true, defaultValue: false })
    .flag('src', {})
    .flag('dest', {})
    .parse()

if (create && !extract) {
    tarDirectory(src, dest)
} else if (extract && !create) {
    untarDirectory(src, dest)
}

// --------
// COMMANDS
// --------

async function tarDirectory(src: string = Deno.cwd(), dest = basename(src) + '.tar') {
    const tar = new Tar()
    for await (const file of walk(src, { includeDirs: false, includeFiles: true })) {
        console.log(file.path)
        await tar.append(file.path, {
            filePath: file.path
        })
    }
    const writer = await Deno.open(dest, { write: true, create: true })
    await copy(tar.getReader(), writer)
    writer.close()
}

async function untarDirectory(src: string = Deno.cwd() + '.tar', dest = Deno.cwd()) {
    const reader = await Deno.open(src, { read: true })
    const untar = new Untar(reader)

    Deno.chdir(dest)

    for await (const entry of untar) {

        if (entry.type === 'directory') {
            await ensureDir(entry.fileName)
            continue
        }

        await ensureFile(entry.fileName)
        console.log(entry.fileName)
        const file = await Deno.open(entry.fileName, { write: true })
        await copy(entry, file)

    }

    reader.close()
}
