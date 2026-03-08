import React from 'react';
import ElementCard from './ElementCard';

// The grid layout depends on `grid-cols-18` defined in our globally injected 
// index.css from Tailwind configuration.

const PeriodicTableGrid = ({ elements, onElementClick, selectedElementId, highlightMatches }) => {
    return (
        <div className="w-full overflow-x-auto pb-8">
            {/* 
        This is an 18-column grid representing the standard table shape.
        Each ElementCard sets its own gridColumn and gridRow based on xpos/ypos.
        We'll define a wide min-width to ensure it doesn't squish too much on mobile.
      */}
            <div
                className="grid grid-cols-18 gap-[2px] sm:gap-1 p-2 sm:p-4 min-w-[800px] lg:min-w-[1000px] xl:min-w-[1200px]"
                style={{
                    gridTemplateRows: 'repeat(10, minmax(40px, auto))',
                }}
            >
                {elements.map((el) => {
                    const isSelected = selectedElementId === el.number;
                    // Determine if we should dim this element based on search/filters
                    const isMatched = highlightMatches ? highlightMatches.has(el.number) : true;
                    const isDimmed = !isMatched && highlightMatches !== null;

                    return (
                        <ElementCard
                            key={el.number}
                            element={el}
                            onClick={onElementClick}
                            isSelected={isSelected}
                            isDimmed={isDimmed}
                        />
                    );
                })}

                {/* Decorative gap labels or group numbers (optional, omitted for cleanliness here) */}
            </div>
        </div>
    );
};

export default PeriodicTableGrid;
