# Flatten

---

Flattens a directory.

## Permissions

|                 |                          |
| --------------- | ------------------------ |
| `--allow-read`  | Read the file-system     |
| `--allow-write` | Write to the file-system |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions).

## Usage

### From the Web

```sh
deno run --allow-read --allow-write  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/file-system/flatten/mod.ts
```

### Local Install


To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-read --allow-write  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/file-system/fetch/mod.ts
```

then invoke the script

```sh
flatten ./images --depth 2 --extensions 'png jpg'
```

## Flags

| flag    | aliases | description      |
| ------- | ------- | ---------------- |
| `--dir` |         | Source Directory |

