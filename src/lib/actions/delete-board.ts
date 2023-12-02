"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function deleteBoard(id: number) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath(
    "/organization/org_2YZcgtjPhXU3c9Sk1VM1C7ZVsF0?title=salman+sheriff",
  );
}
