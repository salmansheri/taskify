"use client";

import React, { ElementRef, useRef } from "react";
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
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast({
        title: "Successfully Created Board",
        variant: "success",
      });
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to Create Board",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4 ">
          <FormPicker errors={FieldErrors} id="image" />
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
