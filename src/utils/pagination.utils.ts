export interface PaginationInfo {
  totalPages: number;
  hasNextPage: (page: number) => boolean;
  hasPreviousPage: (page: number) => boolean;
}

export function getPaginationInfo(
  totalCount: number,
  limit: number,
): PaginationInfo {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    totalPages,
    hasNextPage: (page: number) => page < totalPages,
    hasPreviousPage: (page: number) => page > 1,
  };
}

export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages;
}
