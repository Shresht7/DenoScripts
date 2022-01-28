# Roll

---

Roll dice

<!--
## Permissions

|                 |                                 |
| --------------- | ------------------------------- |
| `--allow-read`  | Read access to the file-system  |
| `--allow-write` | Write access to the file-system |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions). -->

## Usage

### From the Web

```sh
deno run https://raw.githubusercontent.com/Shresht7/DenoScripts/main/roll/mod.ts 3d8
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-read --allow-write  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/roll/mod.ts
```

then invoke the script as

```sh
roll 3d8
```

## Flags

| flag             | aliases               | description                     |
| ---------------- | --------------------- | ------------------------------- |
| `--sum`          | `-s`, `--total`, `-t` | Returns the total               |
| `--advantage`    | `-a`                  | Roll the dice with advantage    |
| `--disadvantage` | `-d`                  | Roll the dice with disadvantage |
