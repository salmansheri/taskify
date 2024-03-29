import { Board } from "@prisma/client";
import { BoardTitleForm } from "./form/board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  id: number;
  board: Board;
}

export const BoardNavbar = ({ id, board }: BoardNavbarProps) => {
  return (
    <header className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={board} />
      <div className="ml-auto">
        <BoardOptions id={id as number} />
      </div>
    </header>
  );
};
