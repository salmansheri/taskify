"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: Record<string, any>;
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a Board Title"
        className="border-input border p-1 "
        disabled={pending}
      />
      {errors?.title && (
        <div>
          {errors?.title.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
