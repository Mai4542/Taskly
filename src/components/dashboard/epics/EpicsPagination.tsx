import { Left } from '../../../components/icons/Left';
import { Right } from '../../../components/icons/Right';
import { useEpicsPagination } from '../../../hooks/useEpicsPagination';
interface EpicsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function EpicsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: EpicsPaginationProps) {
  const pages = useEpicsPagination(currentPage, totalPages);
  return (
    <div className="my-5 justify-between items-center px-4 py-2 hidden md:flex">
      <div className="text-[#434654] text-sm">
        Showing 6 of {totalPages * 6} epics
      </div>
      <div className="flex items-center space-x-2">
        <button
          className={`flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8  
    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Left size={5} color="#434654" />
        </button>

        {pages.map((page) => {
          if (page === '...') {
            return (
              <button
                key={page}
                className="flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8 cursor-not-allowed opacity-50"
                disabled={true}
              >
                {page}
              </button>
            );
          } else {
            return (
              <button
                key={page}
                className={`flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8  
    ${currentPage === Number(page) ? 'bg-[#003D9B] text-white border-[#003D9B]' : 'hover:bg-gray-100 cursor-pointer'}`}
                onClick={() => onPageChange(Number(page))}
              >
                {page}
              </button>
            );
          }
        })}

        <button
          className={`flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8  
    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Right size={5} color="#434654" />
        </button>
      </div>
    </div>
  );
}
