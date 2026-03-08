import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, BarChart2, LayoutGrid } from 'lucide-react';
import elementData from './data/elements.json';

import SearchFilterBar from './components/SearchFilterBar';
import PeriodicTableGrid from './components/PeriodicTableGrid';
import ElementDetailPanel from './components/ElementDetailPanel';
import Visualization from './components/Visualization';

function App() {
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterGroup, setFilterGroup] = useState('');

  const [selectedElement, setSelectedElement] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  // Initialize
  useEffect(() => {
    setElements(elementData);

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Sync dark mode to document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterGroup('');
  };

  // -------------------------------------------------------------
  // Filtering Logic
  // We want to highlight matched elements rather than hide others
  // completely, to keep the grid shape intact. Or we can dim others.
  // -------------------------------------------------------------
  const highlightMatches = useMemo(() => {
    // If no filters are active, return null (meaning show all normally)
    if (!searchTerm && !filterCategory && !filterGroup) {
      return null;
    }

    const matchedIds = new Set();
    const stLower = searchTerm.toLowerCase();

    elements.forEach(el => {
      let isMatch = true;

      if (searchTerm) {
        const nameMatch = el.name.toLowerCase().includes(stLower);
        const symbolMatch = Math.abs(el.symbol.toLowerCase() === stLower) || el.symbol.toLowerCase().includes(stLower);
        isMatch = nameMatch || symbolMatch;
      }

      if (filterCategory && isMatch) {
        if (!el.category.toLowerCase().includes(filterCategory.toLowerCase())) {
          isMatch = false;
        }
      }

      if (filterGroup && isMatch) {
        if (el.xpos !== parseInt(filterGroup)) {
          isMatch = false;
        }
      }

      if (isMatch) {
        matchedIds.add(el.number);
      }
    });

    return matchedIds;
  }, [elements, searchTerm, filterCategory, filterGroup]);


  // Subset array for charts representation only
  const chartSubset = useMemo(() => {
    if (!highlightMatches) return elements;
    return elements.filter(e => highlightMatches.has(e.number));
  }, [elements, highlightMatches]);

  return (
    <div className="min-h-screen transition-colors font-sans overflow-x-hidden">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full glass-panel shadow-sm px-4 md:px-8 py-4 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
            Pt
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Periodic Explorer
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 flex items-center gap-2"
            title="Toggle Visualizations"
          >
            {showCharts ? <LayoutGrid size={20} /> : <BarChart2 size={20} />}
            <span className="hidden sm:inline font-medium">{showCharts ? 'Grid View' : 'Charts'}</span>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-8">

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterGroup={filterGroup}
          setFilterGroup={setFilterGroup}
          onReset={handleResetFilters}
        />

        {showCharts ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Visualization elements={chartSubset} isDarkMode={isDarkMode} />
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <PeriodicTableGrid
              elements={elements}
              onElementClick={setSelectedElement}
              selectedElementId={selectedElement?.number}
              highlightMatches={highlightMatches}
            />
          </div>
        )}

      </main>

      {/* Modal */}
      {selectedElement && (
        <ElementDetailPanel
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}

    </div>
  );
}

export default App;
