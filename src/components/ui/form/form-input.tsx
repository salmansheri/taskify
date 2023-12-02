"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../label";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;

  errors?: Record<string, string[] | undefined>;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      defaultValue,
      onBlur,
      type,
      disabled,
      label,
      placeholder,
      errors,
      required,

      ...props
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-x-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            {...props}
            onBlur={onBlur}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7 ", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
