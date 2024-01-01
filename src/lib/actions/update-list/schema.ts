import * as z from "zod";

export const UpdateListSchema = z.object({
  title: z
    .string({
      required_error: "Title is Required",
      invalid_type_error: "Title is too short",
    })
    .min(3, {
      message: "Title is too short",
    }),
  id: z.number(),
  boardId: z.number(),
});
