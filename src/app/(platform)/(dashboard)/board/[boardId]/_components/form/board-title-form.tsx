"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form/form-input";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { updateBoard } from "@/lib/actions/update-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/hooks/use-toast";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm: React.FC<BoardTitleFormProps> = ({ data }) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast({
        title: "Success",
        variant: "success",
        description: "Successfully updated the Board",
      });

      disableEditing();
      setTitle(data.title);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 1000);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
        <Button type="submit">Update</Button>
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-"
    >
      {title}
    </Button>
  );
};
