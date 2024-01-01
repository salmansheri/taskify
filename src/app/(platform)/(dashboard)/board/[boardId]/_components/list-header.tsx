"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form/form-input";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/hooks/use-toast";
import { updateList } from "@/lib/actions/update-list";
import { List } from "@prisma/client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState, useRef, ElementRef } from "react";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);

  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, isLoading, FieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      setTitle(data.title);
      disableEditing();
      router.refresh();

      toast({
        title: "Success",
        description: "List has been Successfull updated!",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Update UnSuccessfull",
        description:
          "Cannot Update the List, Something went wrong, place try again",
        variant: "destructive",
      });
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as any;
    const boardId = formData.get("boardId") as any;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      id: Number(id),
      boardId: Number(boardId),
      title,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2 ">
      {isEditing ? (
        <form
          ref={formRef}
          action={onSubmit}
          className=" space-y-5 flex-1 px-[2px]"
        >
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormInput
            errors={FieldErrors}
            disabled={isLoading}
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list Title"
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <Button size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
