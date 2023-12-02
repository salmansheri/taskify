"use client";

import { createBoard } from "@/lib/actions/create-board";

import FormSubmit from "@/components/ui/form/form-button";
import { FormInput } from "@/components/ui/form/form-input";
import { useAction } from "@/hooks/use-action";

const Form = () => {
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data: any) => {
      console.log(data, "Success");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          label="Board Title"
          id="title"
          errors={FieldErrors}
          placeholder="Enter title"
        />
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
};

export default Form;
