export interface IPagination<T> {
  currentPage?: number;
  totalPage?: number;
  totalElements?: number;
  pageSize?: number;
  firstRowOnPage?: number;
  lastRowOnPage?: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasNext?: boolean;
  hasPrevious?: boolean;
  content: Array<T>;
}
