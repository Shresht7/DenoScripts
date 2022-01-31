# Matrix-Rain

---

Matrix-Rain

## Permissions

|              |                                                       |
| ------------ | ----------------------------------------------------- |
| `--unstable` | uses `Deno.consoleSize()` to get terminal window size |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions).

## Usage

### From the Web

```sh
deno run --unstable  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/matrix-rain/mod.ts
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --unstable  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/matrix-rain/mod.ts
```

then invoke the script as

```sh
matrix-rain
```

## Flags

| flag        | aliases | description                              |
| ----------- | ------- | ---------------------------------------- |
| `--mode`    |         | `original`, `binary`, `ascii`, `braille` |
| `--fps`     | `-f`    | Frame-rate. Default 60                   |
| `--rows`    | `-r`    | Number of rows                           |
| `--columns` | `-c`    | Number of columns                        |
