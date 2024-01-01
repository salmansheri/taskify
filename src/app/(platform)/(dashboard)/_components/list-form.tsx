"use client";
import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/ui/form/form-input";
import { useParams } from "next/navigation";
import FormSubmit from "@/components/ui/form/form-button";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/lib/actions/create-list";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const ListForm = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, FieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `List ${data.title} has been Created Successfully `,
        variant: "success",
      });

      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Unsuccessfull",
        description: "Cannot Create the List, Please Try Again",
        variant: "destructive",
      });
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as any;

    execute({
      title: title,
      boardId: Number(boardId),
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md "
        >
          <FormInput
            ref={inputRef}
            // @ts-ignore
            error={FieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-trasparent hover:border-input focus:border-input transition"
            placeholder="Enter List title"
          />

          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5 " />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a list
        </button>
      </form>
    </ListWrapper>
  );
};
