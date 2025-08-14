export const DOTS = 'DOTS'

export function getPaginationRange(currentPage: number, totalPages: number, siblingCount: number = 1) {
  const totalPageNumbers = siblingCount + 5

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1

  const firstPageIndex = 1
  const lastPageIndex = totalPages

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1)
    return [...leftRange, DOTS, totalPages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
    )
    return [firstPageIndex, DOTS, ...rightRange]
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }

  return []
}