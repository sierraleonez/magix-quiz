type Column<T> = {
    key: string;
    title: React.ReactNode;
    className?: string;
    render?: (item: T) => React.ReactNode;
};

type Props<T> = {
    title?: React.ReactNode;
    items: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    rowKey?: (item: T, idx: number) => string | number;
};


export function MagixTable<T extends Record<string, any>>({
    title,
    items,
    columns,
    onRowClick,
    rowKey,
}: Props<T>) {
    const numberColumn: Column<T> = {
        key: "__number",
        title: "#",
        className: "w-12",
    };

    const displayedColumns = [numberColumn, ...columns];

    return (
        <>
            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden"></div>
            <div className="px-4 py-4 sm:px-6 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                <span className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {displayedColumns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className ?? ""}`}
                                >
                                    {col.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {items.map((item, idx) => {
                            const key = rowKey ? rowKey(item, idx) : item.id ?? idx;
                            return (
                                <tr
                                    key={key}
                                    onClick={() => onRowClick?.(item)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            onRowClick?.(item);
                                        }
                                    }}
                                    role={onRowClick ? "button" : undefined}
                                    tabIndex={onRowClick ? 0 : undefined}
                                    className={onRowClick ? "hover:bg-gray-50 cursor-pointer transition-colors duration-150" : undefined}
                                >
                                    {displayedColumns.map((col) => (
                                        <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {col.key === "__number"
                                                    ? idx + 1
                                                    : col.render
                                                        ? col.render(item)
                                                        : String(item[col.key] ?? "")}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default MagixTable;