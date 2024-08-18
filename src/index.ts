import vine, { errors } from "@vinejs/vine";
import { Infer, SchemaTypes } from "@vinejs/vine/types";
import type { ValidatorFunction } from "petrichorjs/validation";

/**
 * Used to validate requests with
 * [vinejs](https://vinejs.dev/docs/introduction).
 *
 * @example
 *     router
 *         .post("/users")
 *         .validate({
 *             body: validator(
 *                 vine.object({
 *                     id: vine.number().withoutDecimals(),
 *                     email: vine.string().email(),
 *                     profile: vine.object({
 *                         username: vine.string(),
 *                     }),
 *                 })
 *             ),
 *         })
 *         .handle(async ({ request, response }) => {
 *             const data = await request.json();
 *             data; // { id: number, email: string, profile: { username: string }}
 *         });
 *
 * @see {@link https://petrichorjs.pages.dev/docs/guides/validating-requests/}
 * @see {@link https://vinejs.dev/docs/introduction}
 */
export function validator<T extends SchemaTypes>(
    schema: T
): ValidatorFunction<Infer<T>> {
    const compiled = vine.compile(schema);
    return async (data: unknown) => {
        try {
            const output = await compiled.validate(data);

            return { success: true, data: output };
        } catch (err) {
            if (err instanceof errors.E_VALIDATION_ERROR) {
                return { success: false, errors: err.messages };
            }

            throw err;
        }
    };
}

