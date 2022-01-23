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
deno run --allow-net fetch/mod.ts <URL>
```

### Local Install

To install the script locally use
[`deno install`](https://deno.land/manual/tools/script_installer)

```sh
deno install --allow-net fetch/mod.ts
```

then invoke the script as

```sh
fetch <URL>
```

## Flags

| flag        | aliases | description                                           |
| ----------- | ------- | ----------------------------------------------------- |
| `--headers` |         | Display response headers in addition to response body |
| `--method`  |         | Change the HTTP verb (default: `GET`)                 |
| `--body`    |         | Set the body to send with the request                 |

<!-- TODO: Substitute symlink/mod.ts with actual URL -->
