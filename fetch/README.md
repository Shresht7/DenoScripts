# Fetch

---

Fetch a url

## Permissions

|               |                |
| ------------- | -------------- |
| `--allow-net` | Network Access |

Read more about deno
[permissions](https://deno.land/manual/getting_started/permissions).

## Usage

### From the Web

```sh
deno run --allow-net https://raw.githubusercontent.com/Shresht7/DenoScripts/main/fetch/mod.ts <URL>
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-net https://raw.githubusercontent.com/Shresht7/DenoScripts/main/fetch/mod.ts
```

then invoke the script as

```sh
fetch <URL>
```

## Flags

| flag        | aliases                  | description                                                                                                             |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `--headers` | `-h`                     | Display response headers in addition to response body                                                                   |
| `--method`  | `-m`, `--verb`, `-v`     | Change the HTTP method (default: `GET`)                                                                                 |
| `--body`    | `-b`, `--data`, `-d`     | Set the body to send with the request                                                                                   |
| `--json`    |                          | Parse the response body as JSON. This is enabled by default if the `Content-Type` headers are set as `application/json` |
| `--output`  | `-o`, `--response`, `-r` | Prints a plain-text response. Useful when redirecting to other commands                                                 |
