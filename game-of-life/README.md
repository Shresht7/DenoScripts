# Game of Life

---

Game of deno-life!

## Permissions

|              |                                                       |
| ------------ | ----------------------------------------------------- |
| `--unstable` | uses `Deno.consoleSize()` to get terminal window size |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions).

## Usage

### From the Web

```sh
deno run --unstable  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/game-of-life/mod.ts
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --unstable  https://raw.githubusercontent.com/Shresht7/DenoScripts/main/game-of-life/mod.ts
```

then invoke the script as

```sh
game-of-life
```

## Flags

| flag          | aliases | description                                    |
| ------------- | ------- | ---------------------------------------------- |
| `--character` | `-c`    | Character that represents one life. Default: 🦕 |
| `--fps`       | `-f`    | Frame-rate. Default 60                         |
| `--rows`      | `-r`    | Number of rows                                 |
| `--columns`   | `-c`    | Number of columns                              |
