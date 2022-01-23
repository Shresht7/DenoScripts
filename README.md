# DenoScripts

---

An assortment of Deno-Scripts!

## Usage

All of these scripts require [**Deno**](https://deno.land/) to be installed on
your machine.

You can run these scripts directly from the web.

```sh
deno run [...PERMISSIONS] <URL_TO_SCRIPT> [...ARGUMENTS]
```

Scripts can also be [installed](https://deno.land/manual/tools/script_installer)
locally

```sh
deno install [...PERMISSIONS] <URL_TO_SCRIPT> --name <SCRIPT_NAME>
```

and invoked directly.

```sh
<SCRIPT_NAME> [...ARGUMENTS]
```

---

## Scripts

### [fetch](/fetch)

Fetches a URL

```sh
deno run --allow-net fetch/mod.ts <URL>
```

### [symlink](/symlink)

Creates a symlink

```sh
deno run --allow-read --allow-write symlink/mod.ts --from here.txt --to there.txt
```
