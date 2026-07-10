import { describe, expect, it } from "vitest";
import { hasPermission, ROLE_PERMISSIONS } from "@/lib/auth/permissions";

describe("permissions", () => {
  it("admin inherits everything managers and viewers can do", () => {
    for (const permission of ROLE_PERMISSIONS.viewer) {
      expect(hasPermission("admin", permission)).toBe(true);
    }
    for (const permission of ROLE_PERMISSIONS.manager) {
      expect(hasPermission("admin", permission)).toBe(true);
    }
  });

  it("viewer is read-only", () => {
    expect(hasPermission("viewer", "employees:read")).toBe(true);
    expect(hasPermission("viewer", "employees:create")).toBe(false);
    expect(hasPermission("viewer", "employees:delete")).toBe(false);
  });

  it("manager can create but not delete or manage settings", () => {
    expect(hasPermission("manager", "employees:create")).toBe(true);
    expect(hasPermission("manager", "employees:delete")).toBe(false);
    expect(hasPermission("manager", "settings:manage")).toBe(false);
  });

  it("returns false when there is no role", () => {
    expect(hasPermission(null, "employees:read")).toBe(false);
  });
});
