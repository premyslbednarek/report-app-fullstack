import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import FormLabel from "./form-label";

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
        <p className="text-red-600">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
