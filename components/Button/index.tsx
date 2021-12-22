import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

function ButtonSpinner() {
  return (
    <div className="animate-spin">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
}

export default function Button({
  children,
  onClick,
  type,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="grid place-items-center w-full">
        {loading ? <ButtonSpinner /> : <>{children}</>}
      </div>
    </button>
  );
}
