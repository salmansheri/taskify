"use client";
import { KeyboardEventHandler, forwardRef, HTMLAttributes } from "react";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  id: string;

  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  label?: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      placeholder,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}

          <Textarea
            {...props}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            disabled={pending || disabled}
            id={id}
            name={id}
            className={cn(
              "resize-none, focus-visible:ring-0 focus-visible:ring-offset-0  ring-0 focus:ring-0 outline-none shadow-sm",
              className,
            )}
            aria-describedby={`${id} - error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormTextArea.displayName = "FormTextArea";
