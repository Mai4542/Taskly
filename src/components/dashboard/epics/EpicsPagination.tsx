import { useState } from 'react';
import prevIcon from '../../../assets/imgs/left.svg';
import nextIcon from '../../../assets/imgs/right.svg';
import { useEpicsPagination } from '../../../hooks/useEpicsPagination';
interface EpicsPaginationProps {
  cardscount: number;
}

const EpicsPagination: React.FC<EpicsPaginationProps> = ({ cardscount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cardscount / 6);
  const arrayOfPages = useEpicsPagination(currentPage, totalPages);

  return (
    <div className="my-5 justify-between items-center px-4 py-2 hidden md:flex">
      <div className="text-[#434654] text-sm">
        Showing 6 of {cardscount} epics
      </div>
      <div className="flex items-center space-x-2">
        <button
          className={`flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8  
    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={prevIcon} alt="Previous" />
        </button>

        {arrayOfPages.map((page) => {
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
    ${currentPage === page ? 'bg-[#003D9B] text-white border-[#003D9B]' : 'hover:bg-gray-100 cursor-pointer'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          }
        })}

        <button
          className={`flex items-center justify-center px-2 py-1 border-2 rounded-sm border-[#C3C6D64D] w-8 h-8  
    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={nextIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default EpicsPagination;
