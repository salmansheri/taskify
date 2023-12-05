import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: number };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: Number(params.boardId),
      orgId,
    },
  });

  return {
    title: board?.title || "Baord",
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: number };
}) {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  // const board = null;

  const board = await db.board.findUnique({
    where: {
      id: Number(params.boardId),
      orgId,
    },
  });

  if (!board) {
    return notFound();
  }
  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center opacity-90"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar id={params.boardId} board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
}
