import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-100'
        }`}
      >
        <ChevronLeft size={24} />
      </button>

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-100'
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
