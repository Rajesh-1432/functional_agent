import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-6 shadow-md flex flex-col">
                <h1 className="text-2xl font-bold mb-8">Functional Agent</h1>
                <nav className="flex flex-col gap-4">
                    <Link to="/" className="hover:text-blue-300 transition-colors">Supply Chain</Link>
                    {/* Other links for future pages can go here */}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Supply Chain</h2>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
