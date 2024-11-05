import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import FormLabel from "./form-label";

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
        <p className="text-red-600">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default FormInput;
