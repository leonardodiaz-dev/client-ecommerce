import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: URLSearchParams;
  basePath: string;
  maxVisible?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  searchParams,
  basePath,
  maxVisible = 5,
}) => {
  const navigate = useNavigate();

  if (totalPages <= 1) return null;

  const cambiarPagina = (paginaActual: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(paginaActual));
    navigate(`${basePath}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = () => {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center w-full gap-2 my-4">

      <button
        onClick={() => cambiarPagina(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md text-white ${currentPage === 1
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => cambiarPagina(1)}
            className={`px-3 py-1 border rounded-md ${currentPage === 1
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => cambiarPagina(page)}
          className={`px-3 py-1 border rounded-md ${page === currentPage
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => cambiarPagina(totalPages)}
            className={`px-3 py-1 border rounded-md ${currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => cambiarPagina(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md text-white ${currentPage === totalPages
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
