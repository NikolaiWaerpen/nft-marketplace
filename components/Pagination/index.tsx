import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import range from "utils/range";

type PaginationProps = {
  totalPages?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const [previousDisabled, setPreviousDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const maxPage = 10;

  useEffect(() => {
    if (page === 1) setPreviousDisabled(true);
    else setPreviousDisabled(false);
  }, [page]);

  useEffect(() => {
    if (page === maxPage) setNextDisabled(true);
    else setNextDisabled(false);
  }, [page]);

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      {/* TODO: DISABLE NEXT & PREVIOUS BUTTONS */}
      <div className="-mt-px w-0 flex-1 flex">
        <button
          onClick={() => setPage((previous) => previous - 1)}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </button>
      </div>

      {/* TODO: LOGIC IF PAGES IS TOO MUCH - COMPONENT HAS TO WRAP */}
      <div className="hidden md:-mt-px md:flex">
        {totalPages &&
          range(totalPages).map((totalPage, key) => {
            return (
              <button
                className={classNames(
                  key === page
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                )}
                onClick={() => setPage(totalPage - 1)}
              >
                {totalPage}
              </button>
            );
          })}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <button
          onClick={() => setPage((previous) => previous + 1)}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
