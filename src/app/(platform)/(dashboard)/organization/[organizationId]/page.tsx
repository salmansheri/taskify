import { Button } from "@/components/ui/button";
import { createBoard } from "@/lib/actions/create-board";
import { db } from "@/lib/db";
import Board from "./board";
import Form from "./form";

export default async function OrganizationPage() {
  const boards = await db.board.findMany();
  return (
    <div>
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
}
