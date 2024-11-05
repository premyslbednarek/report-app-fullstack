import { Label } from "@radix-ui/react-label";
import clsx from "clsx";

const FormLabel = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <Label
    {...props}
    className={clsx(className, "block text-sm font-medium text-gray-700 mb-1")}
  />
);

export default FormLabel;
