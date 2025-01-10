import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ employees, query, sortColumn, sortDirection }) {
    const [search, setSearch] = useState(query || "");
    const [currentSortColumn, setSortColumn] = useState(sortColumn || "emp_no");
    const [currentSortDirection, setSortDirection] = useState(
        sortDirection || "asc"
    );

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/employee", {
            search,
            sortColumn: currentSortColumn,
            sortDirection: currentSortDirection,
        });
    };

    const handleSort = (column) => {
        const newSortDirection =
            currentSortColumn === column && currentSortDirection === "asc"
                ? "desc"
                : "asc";
        setSortColumn(column);
        setSortDirection(newSortDirection);
        router.get("/employee", {
            search,
            sortColumn: column,
            sortDirection: newSortDirection,
        });
    };

    const handlePageChange = (url) => {
        router.get(url);
    };

    return (
        <AuthenticatedLayout>
            <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 min-h-screen text-white">
                <div className="container mx-auto py-10 px-6">
                    <h1 className="text-4xl font-extrabold text-center text-white mb-10">
                        📋 Employee Data
                    </h1>

                    {/* ฟอร์มค้นหา */}
                    <form
                        onSubmit={handleSearch}
                        className="mb-6 flex justify-center items-center gap-4"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="🔍 Search by Name or LastName"
                            className="p-3 rounded-full border border-blue-500 w-full max-w-md bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all hover:scale-105"
                        >
                            Search
                        </button>
                    </form>

                    {/* ตารางข้อมูล */}
                    {employees.data.length === 0 ? (
                        <p className="text-center text-lg text-red-500 font-semibold">
                            No results found
                        </p>
                    ) : (
                        <table className="min-w-full table-auto bg-gray-900 rounded-lg shadow-lg border border-gray-700">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-lg text-white">
                                    <th className="p-4 text-center">
                                        <button
                                            onClick={() => handleSort("emp_no")}
                                            className="hover:text-gray-200 transition duration-300"
                                        >
                                            ID
                                            {currentSortColumn === "emp_no" && (
                                                <span className="inline-block ml-2">
                                                    {currentSortDirection ===
                                                    "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-4 text-center">
                                        <button
                                            onClick={() =>
                                                handleSort("first_name")
                                            }
                                            className="hover:text-gray-200 transition duration-300"
                                        >
                                            Name
                                            {currentSortColumn ===
                                                "first_name" && (
                                                <span className="inline-block ml-2">
                                                    {currentSortDirection ===
                                                    "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-4 text-center">
                                        <button
                                            onClick={() =>
                                                handleSort("last_name")
                                            }
                                            className="hover:text-gray-200 transition duration-300"
                                        >
                                            LastName
                                            {currentSortColumn ===
                                                "last_name" && (
                                                <span className="inline-block ml-2">
                                                    {currentSortDirection ===
                                                    "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-4 text-center">
                                        <button
                                            onClick={() =>
                                                handleSort("position")
                                            }
                                            className="hover:text-gray-200 transition duration-300"
                                        >
                                            Position
                                            {currentSortColumn ===
                                                "position" && (
                                                <span className="inline-block ml-2">
                                                    {currentSortDirection ===
                                                    "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-4 text-center">
                                        <button
                                            onClick={() =>
                                                handleSort("birth_date")
                                            }
                                            className="hover:text-gray-200 transition duration-300"
                                        >
                                            Birth Date
                                            {currentSortColumn ===
                                                "birth_date" && (
                                                <span className="inline-block ml-2">
                                                    {currentSortDirection ===
                                                    "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center divide-y divide-gray-700">
                                {employees.data.map((employee, index) => (
                                    <tr
                                        key={employee.emp_no}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-gray-800"
                                                : "bg-gray-700"
                                        } hover:bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:text-white transition-all duration-300`}
                                    >
                                        <td className="p-4 font-medium">
                                            {employee.emp_no}
                                        </td>
                                        <td className="p-4">
                                            {employee.first_name}
                                        </td>
                                        <td className="p-4">
                                            {employee.last_name}
                                        </td>
                                        <td className="p-4">
                                            {employee.position}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                                                {new Date(
                                                    employee.birth_date
                                                ).toLocaleDateString("en-US")}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-4 mt-10">
                        <button
                            onClick={() =>
                                handlePageChange(employees.prev_page_url)
                            }
                            disabled={!employees.prev_page_url}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg"
                        >
                            Previous
                        </button>

                        {employees.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                className={`px-4 py-2 rounded-full shadow-lg ${
                                    link.active
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                        : "bg-gray-700 text-gray-400"
                                } hover:bg-gray-800`}
                            >
                                {link.label === "&laquo; Previous" ||
                                link.label === "Next &raquo;"
                                    ? ""
                                    : link.label}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                handlePageChange(employees.next_page_url)
                            }
                            disabled={!employees.next_page_url}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
