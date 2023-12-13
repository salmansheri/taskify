"use client";

import { ListWithCards } from "@/type";
import { List } from "@prisma/client";
import { ListForm } from "../../../_components/list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: number;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
