import { Button } from "@/components/ui/button";
import { createBoard } from "@/lib/actions/create-board";
import { db } from "@/lib/db";
import Board from "./board";
import Form from "./form";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";

export default async function OrganizationPage() {
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
