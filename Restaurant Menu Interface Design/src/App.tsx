import React, { useState } from 'react';
import { CategoryNav } from './components/CategoryNav';
import { MenuCard } from './components/MenuCard';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { ShoppingBag, Settings } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const initialMenuItems: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas, served with tamarind chutney',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1591465619339-60fce055bc82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBpbmRpYW58ZW58MXx8fHwxNjcwNzc3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
    popular: true,
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYXxlbnwxfHx8fDE3Njc0MTk5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  {
    id: '3',
    name: 'Aloo Tikki',
    description: 'Crispy potato patties served with yogurt, tamarind, and mint chutney',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1660715683691-d1614d1dd361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9vJTIwdGlra2l8ZW58MXx8fHwxNzY3NDUwMzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  {
    id: '4',
    name: 'Mixed Pakora',
    description: 'Assorted vegetable fritters with chickpea flour batter',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1666190091191-0cd0c5c8c5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWtvcmElMjBpbmRpYW58ZW58MXx8fHwxNzY3NDUwMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  // Main Course
  {
    id: '5',
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato-based curry with butter and cream',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDF8fHx8MTc2NzMzOTkzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'mains',
    popular: true,
  },
  {
    id: '6',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils with butter, cream, and aromatic spices',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBjdXJyeSUyMGluZGlhbnxlbnwxfHx8fDE3Njc0NTAzODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'mains',
  },
  {
    id: '7',
    name: 'Hyderabadi Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken, herbs, and saffron',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1714611626323-5ba6204453be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwaW5kaWFufGVufDF8fHx8MTc2NzQyODQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'mains',
    popular: true,
  },
  {
    id: '8',
    name: 'Palak Paneer',
    description: 'Fresh spinach curry with cottage cheese cubes in traditional spices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxhayUyMHBhbmVlcnxlbnwxfHx8fDE3NjczNTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'mains',
  },
  // Desserts
  {
    id: '9',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWxhYiUyMGphbXVufGVufDF8fHx8MTc2NzM4NzIzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
    popular: true,
  },
  {
    id: '10',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream with cardamom, saffron, and pistachios',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1760678874444-a9a481c45a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdWxmaSUyMGluZGlhbnxlbnwxfHx8fDE3Njc0NTAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
  },
  {
    id: '11',
    name: 'Rasgulla',
    description: 'Spongy cottage cheese balls in light sugar syrup',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNndWxsYSUyMGRlc3NlcnR8ZW58MXx8fHwxNzY3NDIzMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
  },
  {
    id: '12',
    name: 'Kheer',
    description: 'Creamy rice pudding with cardamom, nuts, and saffron',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGVlciUyMGluZGlhbnxlbnwxfHx8fDE3Njc0NTAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
  },
  // Beverages
  {
    id: '13',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink blended with sweet mango pulp',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxhc3NpfGVufDF8fHx8MTc2NzM5MTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
  {
    id: '14',
    name: 'Masala Chai',
    description: 'Traditional Indian tea brewed with aromatic spices and milk',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1625033405953-f20401c7d848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBjaGFpfGVufDF8fHx8MTc2NzQ1MDM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
  {
    id: '15',
    name: 'Nimbu Pani',
    description: 'Refreshing Indian lemonade with mint and cumin',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1708455398647-9f79425512fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZW1vbmFkZXxlbnwxfHx8fDE3Njc0NTAzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
  {
    id: '16',
    name: 'Sugarcane Juice',
    description: 'Freshly extracted sugarcane juice with ginger and lemon',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBqdWljZXxlbnwxfHx8fDE3Njc0NTAzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
];

const categories = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Main Course', icon: '🍛' },
  { id: 'desserts', label: 'Desserts', icon: '🍮' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('starters');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  // CRUD Operations
  const createMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    // Also remove from cart if present
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8e4de] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#2d2520]">Spice Palace</h1>
              <p className="text-[#8b7f76] mt-1">Authentic North Indian Cuisine</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="relative p-3 bg-[#8b7f76] text-white rounded-full hover:bg-[#6b5f56] transition-colors"
                title="Admin Panel"
              >
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-3 bg-[#c86f3c] text-white rounded-full hover:bg-[#b4632f] transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2d2520] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b7f76]">No items found in this category.</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        categories={categories}
        onCreate={createMenuItem}
        onUpdate={updateMenuItem}
        onDelete={deleteMenuItem}
      />
    </div>
  );
}