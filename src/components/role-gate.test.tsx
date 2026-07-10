import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { RoleGate } from "@/components/role-gate";
import { useAuthStore } from "@/lib/auth/store";

describe("RoleGate", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
  });

  it("hides children when the user lacks the permission", () => {
    useAuthStore.setState({ user: { name: "Viewer", email: "v@acme.example", role: "viewer" } });
    render(
      <RoleGate permission="employees:delete">
        <button>Delete</button>
      </RoleGate>,
    );
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("shows children when the user has the permission", () => {
    useAuthStore.setState({ user: { name: "Admin", email: "a@acme.example", role: "admin" } });
    render(
      <RoleGate permission="employees:delete">
        <button>Delete</button>
      </RoleGate>,
    );
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
