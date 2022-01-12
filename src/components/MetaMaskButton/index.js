import clsx from "clsx";
import Icon from "./Icon";

const MetaMaskButton = ({ className, children, ...props }) => (
  <button
    className={clsx(
      "text-gray-900",
      "bg-white",
      "hover:bg-gray-100",
      "border",
      "border-gray-200",
      "focus:ring-4",
      "focus:ring-gray-100",
      "font-medium",
      "rounded-lg",
      "text-sm",
      "px-5",
      "py-2.5",
      "text-center",
      "inline-flex",
      "items-center",
      "dark:focus:ring-gray-600",
      "dark:bg-gray-800",
      "dark:border-gray-700",
      "dark:text-white",
      "dark:hover:bg-gray-700",
      "mr-2",
      "mb-2",
      className
    )}
    {...props}
  >
    <Icon />
    {children}
  </button>
);

export default MetaMaskButton;
