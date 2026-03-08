import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCategoryColor } from '../utils/colors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Visualization = ({ elements, isDarkMode }) => {
    // Sort elements by atomic mass for the chart
    const sorted = [...elements]
        .filter(e => e.atomic_mass != null)
        .sort((a, b) => a.number - b.number)
        .slice(0, 30); // Show only top 30 to avoid clutter, or maybe just filter by current search?

    // If we have a filtered list, we'll use that instead of slicing top 30
    const displayElements = elements.length < 118 ? elements : sorted;

    const data = {
        labels: displayElements.map(e => e.symbol),
        datasets: [
            {
                label: 'Atomic Mass (u)',
                data: displayElements.map(e => e.atomic_mass),
                backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                borderColor: isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
            {
                label: 'Electronegativity',
                data: displayElements.map(e => (e.electronegativity_pauling || 0) * 10), // Scale up for visibility
                backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                hidden: true, // Hidden by default, user can click legend to show
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        color: isDarkMode ? '#cbd5e1' : '#475569',
        plugins: {
            legend: {
                position: 'top',
                labels: { color: isDarkMode ? '#cbd5e1' : '#475569' }
            },
            title: {
                display: true,
                text: 'Element Comparison (Current Filter)',
                color: isDarkMode ? '#f8fafc' : '#0f172a',
                font: { size: 16 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        let val = context.parsed.y;
                        if (label === 'Electronegativity') {
                            val = val / 10; // scale down for tooltip
                        }
                        return `${label}: ${val}`;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: { color: isDarkMode ? '#cbd5e1' : '#475569' },
                grid: { color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
            },
            x: {
                ticks: { color: isDarkMode ? '#cbd5e1' : '#475569' },
                grid: { display: false }
            }
        }
    };

    return (
        <div className="w-full h-[400px] bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 animate-in fade-in">
            <Bar data={data} options={options} />
        </div>
    );
};

export default Visualization;
