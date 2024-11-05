import { PropsWithChildren } from "react";

const FormError = ({ children }: PropsWithChildren) => (
  <div className="text-red-600 text-sm mt-0.5">{children}</div>
);

export default FormError;
