import type { Department, Employee, EmployeeStatus, Paginated, SortableField } from "@/lib/types";
import { DEPARTMENTS } from "@/lib/types";
import type { EmployeeCreateInput } from "@/lib/schemas/employee";

const FIRST_NAMES = [
  "Ava", "Liam", "Noah", "Emma", "Zoe", "Kai", "Mia", "Leo", "Aria", "Ravi",
  "Sara", "Omar", "Ivy", "Nils", "Lena", "Yuki", "Ana", "Tom", "Ida", "Bo",
  "Ella", "Finn", "Nora", "Jude",
];

const LAST_NAMES = [
  "Chen", "Patel", "Okafor", "Kim", "Silva", "Nguyen", "Haddad", "Novak", "Weber", "Rossi",
  "Meyer", "Lopez", "Yildiz", "Ahmed", "Kaya", "Suzuki", "Costa", "Berg", "Dubois", "Wang",
  "Ivanov", "Park", "Demir", "Hansen",
];

const TITLES: Record<Department, string[]> = {
  Engineering: ["Software Engineer", "Senior Software Engineer", "Frontend Engineer", "Mobile Engineer", "Staff Engineer"],
  Product: ["Product Manager", "Associate PM", "Group Product Manager"],
  Design: ["Product Designer", "UX Researcher", "Design Lead"],
  Sales: ["Account Executive", "Sales Development Rep", "Sales Manager"],
  Operations: ["Operations Analyst", "Operations Manager", "People Ops Partner"],
  Support: ["Support Specialist", "Support Lead", "Customer Success Manager"],
};

const STATUS_CYCLE: EmployeeStatus[] = ["active", "active", "active", "on_leave", "active", "invited", "active"];

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function buildSeed(): Employee[] {
  const rows: Employee[] = [];
  const count = 64;
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const block = Math.floor(i / LAST_NAMES.length);
    const last = LAST_NAMES[(i * 7 + block * 5) % LAST_NAMES.length];
    const department = DEPARTMENTS[i % DEPARTMENTS.length];
    const titles = TITLES[department];
    const title = titles[(i * 3) % titles.length];
    const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
    const daysAgo = (i * 11) % 720;
    const createdAt = new Date(now - daysAgo * 86_400_000).toISOString();
    rows.push({
      id: `emp_${(i + 1).toString().padStart(3, "0")}`,
      name: `${first} ${last}`,
      email: `${slug(first)}.${slug(last)}@acme.example`,
      department,
      title,
      status,
      createdAt,
    });
  }
  return rows;
}

// In-memory store — persists for the lifetime of the server process, resets on restart.
// Swap this module for a real database without touching the route handlers.
let store: Employee[] | null = null;
function db(): Employee[] {
  if (!store) store = buildSeed();
  return store;
}

export interface EmployeeQuery {
  page: number;
  pageSize: number;
  search: string;
  sort: SortableField;
  order: "asc" | "desc";
}

export function queryEmployees(q: EmployeeQuery): Paginated<Employee> {
  const search = q.search.toLowerCase();
  const filtered = db().filter(
    (e) => !search || e.name.toLowerCase().includes(search) || e.email.toLowerCase().includes(search),
  );

  const sorted = [...filtered].sort((a, b) => {
    const dir = q.order === "asc" ? 1 : -1;
    const av = a[q.sort];
    const bv = b[q.sort];
    if (av < bv) return -dir;
    if (av > bv) return dir;
    return 0;
  });

  const total = sorted.length;
  const start = (q.page - 1) * q.pageSize;
  return { rows: sorted.slice(start, start + q.pageSize), total, page: q.page, pageSize: q.pageSize };
}

export function createEmployee(input: EmployeeCreateInput): Employee {
  const employee: Employee = {
    id: `emp_${Math.random().toString(36).slice(2, 8)}`,
    ...input,
    createdAt: new Date().toISOString(),
  };
  db().unshift(employee);
  return employee;
}

export function deleteEmployee(id: string): boolean {
  const rows = db();
  const index = rows.findIndex((e) => e.id === id);
  if (index === -1) return false;
  rows.splice(index, 1);
  return true;
}

export function getStats() {
  const rows = db();
  const byDepartment = DEPARTMENTS.map((department) => ({
    department,
    count: rows.filter((e) => e.department === department).length,
  }));
  return {
    total: rows.length,
    active: rows.filter((e) => e.status === "active").length,
    onLeave: rows.filter((e) => e.status === "on_leave").length,
    invited: rows.filter((e) => e.status === "invited").length,
    byDepartment,
  };
}
