import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e8e4de]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#c86f3c]" />
              <h2 className="text-[#2d2520]">Your Order</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f5f1ec] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#8b7f76]" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-[#e8e4de] mb-4" />
                <p className="text-[#8b7f76]">Your cart is empty</p>
                <p className="text-[#8b7f76] text-sm mt-2">Add some delicious items to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-[#faf8f5] rounded-lg p-4 border border-[#e8e4de]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-[#2d2520]">{item.name}</h4>
                        <p className="text-[#c86f3c] mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <X className="w-5 h-5 text-[#8b7f76]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-white rounded-lg hover:bg-[#e8e4de] transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#2d2520]" />
                      </button>
                      <span className="text-[#2d2520] min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-white rounded-lg hover:bg-[#e8e4de] transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#2d2520]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#e8e4de] p-6 bg-[#faf8f5]">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[#8b7f76]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8b7f76]">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#2d2520] pt-2 border-t border-[#e8e4de]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#c86f3c] text-white py-4 rounded-lg hover:bg-[#b4632f] transition-colors">
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
