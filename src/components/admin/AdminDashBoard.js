"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdminDashBoard = ({ children }) => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { href: "/admin/result", label: "Results" },
        { href: "/admin/notice", label: "Notices" },
        { href: "/admin/movement", label: "Movements" },
        { href: "/admin/alternative", label: "Alternatives" },
        { href: "/admin/fact", label: "Facts" },
        { href: "/admin/important-fact", label: "Important Facts" },
        { href: "/admin/free-ad", label: "Free Ads" },
        { href: "/admin/important-note", label: "Important Notes" },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-5 text-2xl font-bold border-b dark:border-gray-700">
                <span className="text-orange-500">Satta</span> Admin
            </div>
            <nav className="mt-5">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href} className="px-2 mb-2">
                            <Link
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`block p-3 rounded-lg transition-colors duration-200 ${
                                    pathname === item.href
                                        ? "bg-orange-500 text-white"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <aside className="w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-shrink-0 shadow-lg">
                    <SidebarContent />
                </aside>
                <div className="flex-1 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-shrink-0 shadow-lg flex-col">
                <SidebarContent />
            </aside>

            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-800 dark:text-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                    <div className="text-xl font-bold">
                        <span className="text-orange-500">Satta</span> Admin
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminDashBoard;
