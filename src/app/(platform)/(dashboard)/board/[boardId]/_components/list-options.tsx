import { List } from "@prisma/client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal, Plus, Trash, X } from "lucide-react";
import FormSubmit from "@/components/ui/form/form-button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/hooks/use-toast";
import { deleteList } from "@/lib/actions/delete-list";
import { ElementRef, useRef } from "react";
import { copyList } from "@/lib/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      closeRef.current?.click();

      toast({
        title: "Success",
        description: "Successfully deleted the List",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Unsuccessfully",
        description: "Cannot Delete the List, Please Try again",
        variant: "destructive",
      });
    },
  });

  const { execute: executeCopy, FieldErrors } = useAction(copyList, {
    onSuccess: (data) => {
      closeRef.current?.click();

      toast({
        title: "Success",
        description: "Successfully Copies the List",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Unsuccessfully",
        description: "Cannot Copy the List, Please Try again",
        variant: "destructive",
      });
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id");
    const boardId = formData.get("boardId");
    executeDelete({
      id: Number(id),
      boardId: Number(boardId),
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id");
    const boardId = formData.get("boardId");

    executeCopy({
      id: Number(id),
      boardId: Number(boardId),
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4 ">
          List Actions
        </div>
        <PopoverClose ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm "
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="destructive"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete List{" "}
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
