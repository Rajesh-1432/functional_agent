import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const options = [
    { label: 'Supply Chain', path: '/', icon: '📦' },
    { label: 'COA', path: '/coa', icon: '📝' }
];

const Layout = () => {
    const location = useLocation();
    const [selectedLabel, setSelectedLabel] = useState("");

    useEffect(() => {
        const currentOption = options.find(option => option.path === location.pathname);
        setSelectedLabel(currentOption ? currentOption.label : "");
    }, [location.pathname]);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            <aside className="w-64 bg-blue-900 text-white p-6 shadow-md flex flex-col">
                <h1 className="text-2xl font-bold mb-8">Functional Agent</h1>
                <nav className="flex flex-col gap-4">
                    {options.map((option) => (
                        <Link
                            key={option.path}
                            to={option.path}
                            className={`flex items-center p-2 w-full rounded-lg transition duration-300 ${location.pathname === option.path
                                ? "bg-white text-[#073161]"
                                : "text-white hover:bg-white/10"
                                }`}
                        >
                            <span className="mr-2">{option.icon}</span>
                            <div className="text-sm">
                                <div className="font-medium">{option.label}</div>
                            </div>
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedLabel}</h2>
                </header>
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;