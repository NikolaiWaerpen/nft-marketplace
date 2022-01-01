import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonSpinner() {
  return (
    <div className="animate-spin">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
}

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  icon?: IconDefinition;
  rightIcon?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  onClick,
  type,
  icon,
  rightIcon = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="inline-flex items-center px-3 py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="flex justify-center items-center gap-2 w-full">
        {/* Default icon */}
        {icon && !rightIcon && <FontAwesomeIcon icon={icon} />}
        {loading ? <ButtonSpinner /> : <>{children}</>}
        {/* Right icon */}
        {icon && rightIcon && <FontAwesomeIcon icon={icon} />}
      </div>
    </button>
  );
}
