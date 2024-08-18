# @petrichorjs/validator-vinejs

Validate request bodies or query parameters with [vinejs](https://vinejs.dev/docs/introduction).

## Installation

This package requires that you have [vinejs](https://vinejs.dev/docs/introduction) installed.

```shell
$ npm i @vinejs/vine @petrichorjs/validator-vinejs
```

## Docs

To use this validator you just have to pass the `validator` function to either the body or query validator depending on what you want to validate. You also have to pass the vinejs schema to the validator function.

```ts
router
    .post("/users")
    .validate({
        body: validator(
            vine.object({
                id: vine.number().withoutDecimals(),
                email: vine.string().email(),
                profile: vine.object({
                    username: vine.string(),
                }),
            })
        ),
    })
    .handle(async ({ request, response }) => {
        const data = await request.json();
        data; // { id: number, email: string, profile: { username: string }}
    });
```

