import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title is Required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is Too Short",
    }),
  boardId: z.number(),
});
