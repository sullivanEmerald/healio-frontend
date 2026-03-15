import React from "react";

// New column type supporting accessorKey, header (string/function), and cell renderer
export interface CustomTableColumn<T = any> {
    accessorKey: string;
    header: string | (() => React.ReactNode);
    cell?: (info: { row: T; value: any; rowIndex: number }) => React.ReactNode;
    className?: string;
}

export interface CustomTableProps<T = any> {
    columns: CustomTableColumn<T>[];
    data: T[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    onRowClick?: (row: T) => void;
    // ...other props as needed
}

const CustomTable = <T extends Record<string, any>>({
    columns,
    data,
    currentPage,
    totalPages,
    onPageChange,
    className = "",
    onRowClick,
    ...props
}: CustomTableProps<T>) => {
    return (
        <div className={`w-full bg-white border-none outline-none p-4 ${className}`} {...props}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-primary uppercase text-xs font-medium tracking-wider">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={col.accessorKey || idx}
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider"
                                >
                                    {typeof col.header === "function" ? col.header() : col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={`hover:bg-gray-50 transition ${onRowClick ? "cursor-pointer" : ""}`}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                >
                                    {columns.map((col, colIndex) => {
                                        const value = row[col.accessorKey];
                                        return (
                                            <td
                                                key={col.accessorKey || colIndex}
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${col.className || ""}`}
                                            >
                                                {col.cell
                                                    ? col.cell({ row, value, rowIndex })
                                                    : value ?? "-"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border border-gray-300 rounded-l-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "hover:bg-gray-200"}`}
                    >
                        First
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "hover:bg-gray-200"}`}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 border-t border-b border-gray-300 ${page === currentPage
                                ? "bg-primary text-white font-bold"
                                : "hover:bg-blue-100 text-blue-600"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "hover:bg-gray-200"}`}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border border-gray-300 rounded-r-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "hover:bg-gray-200"}`}
                    >
                        Last
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default CustomTable;
