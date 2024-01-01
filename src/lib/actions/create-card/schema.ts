import { z } from "zod";

export const CreateCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is Required",
      invalid_type_error: "Title are required",
    })
    .min(3, {
      message: "Title is Too Short ",
    }),
  boardId: z.number(),
  listId: z.number(),
});
