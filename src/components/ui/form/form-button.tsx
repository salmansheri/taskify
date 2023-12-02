"use client";
import React from "react";
import { Button, ButtonProps, buttonVariants } from "../button";
import { useFormStatus } from "react-dom";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type buttonVariants = typeof buttonVariants;

interface FormSubmitProps extends React.ButtonHTMLAttributes<ButtonProps> {
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "primary"
    | "secondary"
    | "outline"
    | null
    | undefined;
}

const FormSubmit = ({
  children,
  variant,
  disabled,
  className,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      disabled={pending || disabled}
      type="submit"
      variant={variant}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default FormSubmit;
