import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/lib/actions/delete-board";
import React from "react";
import FormButton from "./form-button";

interface BoardProps {
  title: string;
  id: number;
}

const Board: React.FC<BoardProps> = ({ title, id }) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form
      className="flex items-center gap-x-2 "
      action={deleteBoardWithId}
      key={id}
    >
      <p>{title}</p>
      <FormButton variant="destructive" actionLabel="Delete" />
    </form>
  );
};

export default Board;
