"use client";

import { createBoard } from "@/lib/actions/create-board";

import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { FormInput } from "./form-input";

const Form = () => {
  const initialState = {
    message: null,
    error: {},
  };

  // @ts-ignore
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton variant="default" actionLabel="Submit" />
    </form>
  );
};

export default Form;
