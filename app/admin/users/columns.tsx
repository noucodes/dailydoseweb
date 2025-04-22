// Columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";

export type ProfileData = {
  username: string;
  email: string;
  role: string;
};

export const profileColumns: ColumnDef<ProfileData>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
