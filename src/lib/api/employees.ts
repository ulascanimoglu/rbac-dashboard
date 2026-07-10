import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmployeeCreateInput } from "@/lib/schemas/employee";
import type { Employee, Paginated, SortableField } from "@/lib/types";

export interface EmployeeListParams {
  page: number;
  pageSize: number;
  search: string;
  sort: SortableField;
  order: "asc" | "desc";
}

async function fetchEmployees(params: EmployeeListParams): Promise<Paginated<Employee>> {
  const qs = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    search: params.search,
    sort: params.sort,
    order: params.order,
  });
  const res = await fetch(`/api/employees?${qs.toString()}`);
  if (!res.ok) throw new Error("Failed to load employees");
  return res.json() as Promise<Paginated<Employee>>;
}

export function useEmployees(params: EmployeeListParams) {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => fetchEmployees(params),
    placeholderData: keepPreviousData,
  });
}

async function postEmployee(input: EmployeeCreateInput): Promise<Employee> {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "Failed to create employee");
  }
  return res.json() as Promise<Employee>;
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}

async function deleteEmployeeRequest(id: string): Promise<void> {
  const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete employee");
}

export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployeeRequest,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}

export interface Stats {
  total: number;
  active: number;
  onLeave: number;
  invited: number;
  byDepartment: { department: string; count: number }[];
}

async function fetchStats(): Promise<Stats> {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to load stats");
  return res.json() as Promise<Stats>;
}

export function useStats() {
  return useQuery({ queryKey: ["stats"], queryFn: fetchStats });
}
