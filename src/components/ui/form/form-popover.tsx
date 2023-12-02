"use client";

import React from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/lib/actions/create-board";
import { FormInput } from "./form-input";
import FormSubmit from "./form-button";
import { Button } from "../button";
import { X } from "lucide-react";
import { toast } from "../../../hooks/use-toast";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover: React.FC<FormPopoverProps> = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Successfully Created Board",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Failed to Create Board",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="w-80 pt-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4 ">
          <div className="space-y-4">
            <FormInput
              errors={FieldErrors}
              id="title"
              label="Board Title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
