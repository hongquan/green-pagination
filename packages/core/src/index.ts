interface Params {
  totalPages: number,
  currentPage: number,
}

export interface PagingItem {
  label: string,
  page: number,
  isEllipsis: boolean,
  isCurrent: boolean,
}

export function genItems({ totalPages, currentPage }: Params): PagingItem[] {
  const padWidth = 3
  const totalDisplay = padWidth * 2 + 1
  if (totalPages <= totalDisplay) {
    return Array.from(
      Array(totalPages),
      (_v, i) => {
        i += 1
        return {
          label: i.toString(),
          page: i,
          isEllipsis: false,
          isCurrent: (i === currentPage),
        }
      })
  }
  let ellipsisIndex = padWidth
  if (currentPage === padWidth) {
    ellipsisIndex = currentPage + 1
  } else if (currentPage === totalPages - padWidth + 1) {
    ellipsisIndex = totalDisplay - padWidth - 2
  }
  return Array.from(
    Array(totalDisplay),
    (_v, i) => {
      let iPage = 0
      let isEllipsis = false
      // When current page is around beginning or around the end, we show one ellipsis
      if (currentPage <= padWidth || currentPage > totalPages - padWidth) {
        isEllipsis = (i === ellipsisIndex)
        iPage = (i < ellipsisIndex) ? i + 1 : totalPages - 2 * padWidth + i
      } else {
      // When current page is at the middle, we show two ellipses.
      // We don't base on ellipsisIndex anymore.
        if (i === 0) {
          // Always show first page
          iPage = 1
        } else if (i === totalDisplay - 1) {
          // Always show last page
          iPage = totalPages
        } else {
          // Show closest neighbor pages
          iPage = currentPage - padWidth + i
        }
        isEllipsis = (i === 1 || i === totalDisplay - 2)
      }
      return {
        label: isEllipsis ? '…' : iPage.toString(),
        page: iPage,
        isEllipsis,
        isCurrent: (iPage === currentPage),
      }
    },
  )
}
