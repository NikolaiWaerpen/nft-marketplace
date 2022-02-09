import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import range from "utils/range";

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalLength: number;
  pageSize: number;
};

export default function Pagination({
  page,
  setPage,
  totalLength,
  pageSize,
}: PaginationProps) {
  const [previousDisabled, setPreviousDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const totalPages = Math.ceil(totalLength / pageSize);

  useEffect(() => {
    if (page === 1) setPreviousDisabled(true);
    else setPreviousDisabled(false);
  }, [page]);

  useEffect(() => {
    if (page === totalPages) setNextDisabled(true);
    else setNextDisabled(false);
  }, [page]);

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-8">
      <div className="-mt-px w-0 flex-1 flex">
        <button
          onClick={() => setPage((previous) => previous - 1)}
          disabled={previousDisabled}
          className={classNames(
            "border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300",
            {
              "hover:cursor-not-allowed": previousDisabled,
            }
          )}
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </button>
      </div>

      {/* TODO: TEMPORARILY REMOVED THIS TO AVOID TOO MANY PAGE TO PAGINATE OVER BUG - FIX THIS IN THE FUTURE */}
      {/* <div className="hidden md:-mt-px md:flex">
        {totalPages &&
          range(totalPages).map((totalPage, key) => {
            return (
              <button
                key={key}
                className={classNames(
                  key === page - 1
                    ? "border-theme-5 text-theme-4"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                )}
                onClick={() => setPage(totalPage)}
              >
                {totalPage}
              </button>
            );
          })}
      </div> */}
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <button
          disabled={nextDisabled}
          onClick={() => setPage((previous) => previous + 1)}
          className={classNames(
            "border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300",
            {
              "hover:cursor-not-allowed": nextDisabled,
            }
          )}
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
