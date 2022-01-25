# Symlink

---

Create a symlink

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
deno run --allow-read --allow-write  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/symlink/mod.ts --from here.txt --to there.txt
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-read --allow-write  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/symlink/mod.ts
```

then invoke the script

```sh
symlink --from here.txt --to there.txt
```

## Flags

| flag     | aliases              | description              |
| -------- | -------------------- | ------------------------ |
| `--from` | `--src`, `--origin`  | Source directory or file |
| `--to`   | `--target`, `--dest` | Target directory or file |
