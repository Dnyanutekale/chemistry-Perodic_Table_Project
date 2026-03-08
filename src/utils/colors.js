export const categoryColors = {
    "diatomic nonmetal": "bg-[var(--color-nonmetal)] dark:bg-[var(--color-dark-nonmetal)]",
    "noble gas": "bg-[var(--color-noble)] dark:bg-[var(--color-dark-noble)]",
    "alkali metal": "bg-[var(--color-alkali)] dark:bg-[var(--color-dark-alkali)]",
    "alkaline earth metal": "bg-[var(--color-alkaline)] dark:bg-[var(--color-dark-alkaline)]",
    "metalloid": "bg-[var(--color-metalloid)] dark:bg-[var(--color-dark-metalloid)]",
    "polyatomic nonmetal": "bg-[var(--color-nonmetal)] dark:bg-[var(--color-dark-nonmetal)]",
    "post-transition metal": "bg-[var(--color-post-transition)] dark:bg-[var(--color-dark-post-transition)]",
    "transition metal": "bg-[var(--color-transition)] dark:bg-[var(--color-dark-transition)]",
    "lanthanide": "bg-[var(--color-lanthanide)] dark:bg-[var(--color-dark-lanthanide)]",
    "actinide": "bg-[var(--color-actinide)] dark:bg-[var(--color-dark-actinide)]",
    "unknown, probably transition metal": "bg-[var(--color-unknown)] dark:bg-[var(--color-dark-unknown)]",
    "unknown, probably post-transition metal": "bg-[var(--color-unknown)] dark:bg-[var(--color-dark-unknown)]",
    "unknown, probably metalloid": "bg-[var(--color-unknown)] dark:bg-[var(--color-dark-unknown)]",
    "unknown, predicted to be noble gas": "bg-[var(--color-noble)] dark:bg-[var(--color-dark-noble)]",
    "unknown, but predicted to be an alkali metal": "bg-[var(--color-alkali)] dark:bg-[var(--color-dark-alkali)]"
};

export const getCategoryColor = (category) => {
    if (!category) return "bg-[var(--color-unknown)] dark:bg-[var(--color-dark-unknown)]";

    // Normalize checking
    const cat = category.toLowerCase().trim();
    if (categoryColors[cat]) return categoryColors[cat];

    // Fallbacks
    if (cat.includes("nonmetal")) return categoryColors["diatomic nonmetal"];
    if (cat.includes("transition metal")) return categoryColors["transition metal"];

    return "bg-[var(--color-unknown)] dark:bg-[var(--color-dark-unknown)]";
};
