import clsx from "clsx";

const Button = ({ className = "", children, ...props }) => (
  <button
    role="button"
    type="button"
    className={clsx(
      className,
      `bg-${color}-500`,
      `hover:bg-${color}-40`,
      "text-white",
      "font-bold",
      "py-6",
      "px-16",
      "border-b-4",
      `border-${color}-700`,
      `hover:border-${color}-500`,
      "rounded"
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
