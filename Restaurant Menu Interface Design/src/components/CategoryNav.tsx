import React from 'react';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="bg-white border-b border-[#e8e4de] sticky top-[112px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap
                ${
                  selectedCategory === category.id
                    ? 'border-[#c86f3c] text-[#c86f3c]'
                    : 'border-transparent text-[#8b7f76] hover:text-[#2d2520]'
                }
              `}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
