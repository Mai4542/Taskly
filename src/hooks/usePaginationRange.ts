export function usePaginationRange(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  pages.push(1);

  if (currentPage === 1 || currentPage === 2) {
    pages.push(2, 3, '...', totalPages);
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    pages.push('...', totalPages - 2, totalPages - 1, totalPages);
  } else if (currentPage === 3) {
    pages.push(2, 3, 4, '...', totalPages);
  } else if (currentPage === totalPages - 2) {
    pages.push(
      '...',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  } else {
    pages.push(
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    );
  }

  return pages;
}
