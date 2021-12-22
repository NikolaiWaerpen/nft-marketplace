import { ExclamationCircleIcon } from "@heroicons/react/solid";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  description?: string;
  error?: string | undefined;
};

export default function Input({
  placeholder = "",
  required,
  type,
  value,
  label,
  description,
  error,
  onChange,
}: InputProps) {
  return (
    <div>
      <div
        className={`relative border shadow-sm rounded-md px-3 py-2 focus-within:ring-1 ${
          error
            ? "border-red-300  focus:border-red-500 focus:ring-red-500 focus:outline-none focus-within:border-red-500 focus-within:ring-red-600"
            : "border-gray-300 focus-within:ring-indigo-600 focus-within:border-indigo-600"
        } `}
      >
        {label && (
          <label
            htmlFor={type}
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            {label}
            {required && (
              <span className="text-gray-500 font-thin"> (required)</span>
            )}
          </label>
        )}
        {description && <p>{description}</p>}
        <input
          type={type}
          name={type}
          id={type}
          className={`block w-full border-0 p-0 focus:ring-0 sm:text-sm ${
            error
              ? "text-red-900 placeholder-red-300"
              : "text-gray-900 placeholder-gray-500"
          }  `}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          aria-invalid="true"
          aria-describedby={`${type}-error`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 text-right" id={`${type}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
