import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import type { MenuItem } from '../App';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#f5f1ec]">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {item.popular && (
          <div className="absolute top-4 right-4 bg-[#c86f3c] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-[#2d2520] flex-1">{item.name}</h3>
          <span className="text-[#c86f3c] ml-3 flex-shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-[#8b7f76] text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        <button
          onClick={handleAddToCart}
          className={`
            w-full bg-[#c86f3c] text-white py-3 rounded-lg
            flex items-center justify-center gap-2
            hover:bg-[#b4632f] transition-all duration-300
            ${isAdding ? 'scale-95 bg-[#8d5328]' : ''}
          `}
        >
          <Plus className={`w-5 h-5 transition-transform ${isAdding ? 'rotate-90' : ''}`} />
          <span>{isAdding ? 'Added!' : 'Add to Order'}</span>
        </button>
      </div>
    </div>
  );
}
