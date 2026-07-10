export type Role = "admin" | "manager" | "viewer";

export type Permission =
  | "employees:read"
  | "employees:create"
  | "employees:delete"
  | "users:read"
  | "settings:manage";

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Sales",
  "Operations",
  "Support",
] as const;
export type Department = (typeof DEPARTMENTS)[number];

export const STATUSES = ["active", "on_leave", "invited"] as const;
export type EmployeeStatus = (typeof STATUSES)[number];

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: Department;
  title: string;
  status: EmployeeStatus;
  createdAt: string;
}

export interface Paginated<T> {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type SortableField = "name" | "department" | "status" | "createdAt";
