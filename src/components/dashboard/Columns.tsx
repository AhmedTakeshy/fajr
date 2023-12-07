"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "name",
        header: "الاسم",
    },
    {
        accessorKey: "email",
        header: "البريد الالكتروني",
    },
    {
        accessorKey: "role",
        header: "الصلاحيات",
    },
    {
        accessorKey: "postsNumber",
        header: "عدد المقالات",
    },
    {
        accessorKey: "options",
        // header: ({ column }) => { return (<div className="text-left">اجراءات</div>) },
        header: () => <div className="text-left">اجراءات</div>,
        cell: ({ row }) => {
            <Button asChild >
                <Link href={{ pathname: `/admin/accounts/`, query: { id: row.id } }}>
                    اجراء تعديلات
                </Link>
            </Button>
        },
    },
]