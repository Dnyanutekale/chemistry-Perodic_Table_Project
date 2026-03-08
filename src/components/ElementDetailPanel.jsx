import React from 'react';
import { X, ExternalLink, Atom } from 'lucide-react';
import { getCategoryColor } from '../utils/colors';

const ElementDetailPanel = ({ element, onClose }) => {
    if (!element) return null;

    const bgClass = getCategoryColor(element.category);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header Ribbon */}
                <div className={`h-32 w-full flex items-end justify-between p-6 ${bgClass}`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-white drop-shadow-md">
                        <h2 className="text-5xl font-black">{element.symbol}</h2>
                        <p className="text-2xl font-light opacity-90">{element.name}</p>
                    </div>

                    <div className="text-right text-white drop-shadow-md pb-1">
                        <p className="text-3xl font-bold">{element.number}</p>
                        <p className="text-sm opacity-90 uppercase tracking-wider">{element.category}</p>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">

                    {/* Summary */}
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                        {element.summary}
                    </p>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard label="Atomic Mass" value={`${element.atomic_mass.toFixed(3)} u`} />
                        <StatCard label="Phase" value={element.phase || 'Unknown'} />
                        <StatCard label="Group" value={element.xpos || '-'} />
                        <StatCard label="Period" value={element.ypos || '-'} />
                        <StatCard label="Electronegativity" value={element.electronegativity_pauling || 'N/A'} />
                        <StatCard label="Melting Point" value={element.melt ? `${element.melt} K` : 'N/A'} />
                        <StatCard label="Boiling Point" value={element.boil ? `${element.boil} K` : 'N/A'} />
                        <StatCard label="Density" value={element.density ? `${element.density} g/cm³` : 'N/A'} />
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-200 font-semibold">
                            <Atom size={20} className="text-blue-500" /> Electron Configuration
                        </div>
                        <p className="font-mono text-lg text-slate-600 dark:text-slate-300">
                            {element.electron_configuration}
                        </p>
                        {element.electron_configuration_semantic && (
                            <p className="font-mono text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Shortcut: {element.electron_configuration_semantic}
                            </p>
                        )}

                        <div className="mt-4">
                            <span className="text-sm text-slate-500 block mb-1">Shells</span>
                            <div className="flex gap-2">
                                {element.shells.map((count, i) => (
                                    <span key={i} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm font-medium border dark:border-slate-600 shadow-sm">
                                        {count}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Link */}
                    {element.source && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
                            <a
                                href={element.source}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Read more on Wikipedia <ExternalLink size={16} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="flex flex-col p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        <span className="text-xs text-slate-500 uppercase font-semibold mb-1">{label}</span>
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</span>
    </div>
);

export default ElementDetailPanel;
