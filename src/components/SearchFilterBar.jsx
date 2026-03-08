import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

const SearchFilterBar = ({
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterGroup,
    setFilterGroup,
    onReset
}) => {
    const categories = [
        "Alkali Metal", "Alkaline Earth Metal", "Transition Metal", "Post-Transition Metal",
        "Metalloid", "Diatomic Nonmetal", "Polyatomic Nonmetal", "Halogen", "Noble Gas",
        "Lanthanide", "Actinide"
    ];

    return (
        <div className="w-full glass-panel rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                />
            </div>

            {/* Filters */}
            <div className="flex w-full md:w-auto gap-4 items-center">
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-500 hidden sm:block" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    >
                        <option value="">All Groups</option>
                        {[...Array(18)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Group {i + 1}</option>
                        ))}
                    </select>
                </div>

                {/* Reset Button */}
                <button
                    onClick={onReset}
                    className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-2"
                    title="Reset filters"
                >
                    <RotateCcw size={18} /> <span className="hidden sm:inline">Reset</span>
                </button>
            </div>

        </div>
    );
}

export default SearchFilterBar;
