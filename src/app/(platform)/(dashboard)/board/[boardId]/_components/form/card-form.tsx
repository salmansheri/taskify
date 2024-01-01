"use client";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/ui/form/form-button";
import { FormTextArea } from "@/components/ui/form/form-textarea";
import { Plus, X } from "lucide-react";
import { ElementRef, KeyboardEventHandler, forwardRef } from "react";
import { useAction } from "@/hooks/use-action";
import { CreateCardSchema } from "@/lib/actions/create-card/schema";
import { createCard } from "@/lib/actions/create-card";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "@/hooks/use-toast";

interface CardFormProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  listId: number;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId, ...props }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, FieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        disableEditing();
        toast({
          title: "Success",
          description: "Successfully Created the Card ",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Cannot Create the Card, Please Try Again!",
          variant: "destructive",
        });
      },
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      event,
    ) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId");
      const boardId = formData.get("boardId") as string;

      execute({
        title: title,
        listId: Number(listId),
        boardId: Number(boardId),
      });
    };

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextArea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder="Enter a Title"
            errors={FieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a Card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
