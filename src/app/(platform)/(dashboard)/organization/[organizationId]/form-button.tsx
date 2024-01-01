"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  actionLabel: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "ghost"
    | "secondary"
    | "primary"
    | "outline";
}

const FormButton = ({ actionLabel, variant }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} disabled={pending} type="submit">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>{actionLabel}</>
      )}
    </Button>
  );
};

export default FormButton;
