import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import FormLabel from "./form-label";
import FormError from "./form-error";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

const FormTextarea = ({ label, name, ...textareaProps }: FormTextAreaProps) => {
  const { register, formState } = useFormContext();

  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea id={name} {...textareaProps} {...register(name)} />
      {formState.errors[name] && (
        <FormError>{String(formState.errors[name]?.message)}</FormError>
      )}
    </div>
  );
};

export default FormTextarea;
