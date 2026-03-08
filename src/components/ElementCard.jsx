import React from 'react';
import { getCategoryColor } from '../utils/colors';

const ElementCard = ({ element, onClick, isSelected, isDimmed }) => {
    // Lanthanides and Actinides have weird ypos/xpos in some JSONs natively, 
    // but usually xpos is 3-17 and ypos is 9, 10 for them to be separated.
    // In the Bowserinator JSON: 
    //   La is xpos: 3, ypos: 9
    //   Ac is xpos: 3, ypos: 10
    //   Ce is xpos: 4, ypos: 9
    // We'll just map xpos to gridColumn and ypos to gridRow.

    const bgClass = getCategoryColor(element.category);

    // Style for the grid layout
    const gridStyle = {
        gridColumn: element.xpos,
        gridRow: element.ypos,
    };

    // State styling
    let opacityClass = isDimmed ? 'opacity-30 grayscale' : 'opacity-100';
    let borderClass = isSelected
        ? 'border-2 border-slate-900 dark:border-white scale-110 z-10 shadow-lg'
        : 'border border-black/10 dark:border-white/10 hover:scale-110 hover:z-10 hover:shadow-md';

    return (
        <button
            onClick={() => onClick(element)}
            className={`
        relative flex flex-col justify-between p-1 text-left
        w-full h-full min-h-[4rem] sm:min-h-[5rem] rounded-md transition-all duration-200
        ${bgClass} ${opacityClass} ${borderClass}
      `}
            style={gridStyle}
            title={element.name}
        >
            <div className="flex justify-between items-start w-full leading-none">
                <span className="text-[0.6rem] sm:text-xs font-semibold text-black/70 dark:text-white/80">
                    {element.number}
                </span>
            </div>
            <div className="text-center w-full">
                <span className="text-lg sm:text-xl font-bold text-black/90 dark:text-white/90 leading-none block">
                    {element.symbol}
                </span>
            </div>
            <div className="text-center w-full">
                <span className="text-[0.5rem] sm:text-[0.6rem] leading-none text-black/70 dark:text-white/70 block truncate px-1">
                    {element.name}
                </span>
            </div>
        </button>
    );
};

export default ElementCard;
