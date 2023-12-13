"use client";

import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/ui/form/form-button";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/hooks/use-toast";
import { deleteBoard } from "@/lib/actions/delete-board";
import { Loader2, Trash } from "lucide-react";

interface BoardOptionsProps {
  id: number;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  console.log(typeof Number(id));
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Success",
        description: "Successfully Delete the Board",
      });
    },
  });

  const onSubmit = () => {
    execute({
      id: Number(id),
    });
  };

  return (
    <Button disabled={isLoading} onClick={onSubmit} variant="destructive">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          Loading...
        </>
      ) : (
        <>
          <Trash className="h-5 w-5 mr-2" />
          Delete
        </>
      )}
    </Button>
  );
};
