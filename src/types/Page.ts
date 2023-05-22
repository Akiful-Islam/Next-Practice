import { ResponseEmployee } from "./Employee";

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type Page = {
  content: ResponseEmployee[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type Query = {
  page: string;
  size: string;
  sort: string;
  name?: string;
  phoneNumber?: string;
};
