import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import FormLabel from "./form-label";
import FormError from "./form-error";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const FormInput = ({ label, name, ...inputProps }: FormInputProps) => {
  const { register, formState } = useFormContext();

  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        {...inputProps}
        {...register(name, { valueAsNumber: inputProps.type === "number" })}
      />
      {formState.errors[name] && (
        <FormError>{String(formState.errors[name]?.message)}</FormError>
      )}
    </div>
  );
};

export default FormInput;
