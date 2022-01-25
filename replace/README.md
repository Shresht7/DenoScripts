# Fetch

---

Perform Regex-Replace on files

## Permissions

|                 |                                 |
| --------------- | ------------------------------- |
| `--allow-read`  | Read access to the file-system  |
| `--allow-write` | Write access to the file-system |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions).

## Usage

### From the Web

```sh
deno run --allow-read --allow-write replace/mod.ts <REGEX> <REPLACE>
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-read --allow-write replace/mod.ts
```

then invoke the script as

```sh
replace <REGEX> <REPLACE>
```

## Flags

| flag        | aliases | description                                                                                                 |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `--regex`   |         | Specify the Regular Expression. Takes the first non-positional argument by default if unspecified           |
| `--replace` |         | Specify the Replacement Expression. Takes the non-positional argument after regex by default if unspecified |
| `--flags`   |         | Specify the RegEx flags. Defaults to `gm`                                                                   |
| `--path`    |         | Specifies the target directory or file to perform the regex-replace on                                      |
| `--filter`  |         | Regular expression to filter and perform regex-replace on select files                                      |

<!-- TODO: Substitute symlink/mod.ts with actual URL -->
