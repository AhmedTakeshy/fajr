"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EditAccountsForm from "@/components/dashboard/EditAccountsForm"
import { useSession } from "next-auth/react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    props: {
        posts:Post[],
        userId: string | undefined
    }
}

export default function DataTable<TData, TValue>({columns, data,props}: DataTableProps<TData, TValue>) {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel()})
    const { data: session } = useSession()
    const sessionUser: ExtendedUser = session?.user
    return (
        <Table dir="rtl">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} className="text-right">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
                {/* <TableRow>
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد الالكتروني</TableHead>
                    <TableHead className="text-right">الصلاحيات</TableHead>
                    <TableHead className="text-right">عدد المقالات</TableHead>
                    {sessionUser?.role === "SuperAdmin" && <TableHead className="text-left">اجراءات</TableHead>}
                </TableRow> */}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
                {/* <EditAccountsForm userId={Number(userId)} users={users} posts={posts} /> */}
            </TableBody>
        </Table>
    )
}
