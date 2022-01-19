# Symlink
---------

Create a symlink

## Usage

```sh
deno run --allow-read --allow-write symlink/mod.ts --from here.txt --to there.txt
```

## Permissions

|                 |                          |
| --------------- | ------------------------ |
| `--allow-read`  | Read the file-system     |
| `--allow-write` | Write to the file-system |

## Installation

```sh
deno install --allow-read --allow-write symlink/mod.ts
```