import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';
import type { MenuItem } from '../App';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  categories: { id: string; label: string; icon: string }[];
  onCreate: (item: Omit<MenuItem, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<MenuItem>) => void;
  onDelete: (id: string) => void;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  popular: boolean;
}

export function AdminPanel({
  isOpen,
  onClose,
  menuItems,
  categories,
  onCreate,
  onUpdate,
  onDelete,
}: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'starters',
    popular: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'starters',
      popular: false,
    });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      category: item.category,
      popular: item.popular || false,
    });
    setEditingId(item.id);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      onUpdate(editingId, {
        name: formData.name,
        description: formData.description,
        price,
        image: formData.image,
        category: formData.category,
        popular: formData.popular,
      });
    } else {
      onCreate({
        name: formData.name,
        description: formData.description,
        price,
        image: formData.image,
        category: formData.category,
        popular: formData.popular,
      });
    }
    
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
      if (editingId === id) {
        resetForm();
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Admin Panel */}
      <div
        className={`
          fixed left-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e8e4de] sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-[#2d2520]">Menu Management</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f5f1ec] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#8b7f76]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Create Button */}
            {!isCreating && !editingId && (
              <button
                onClick={handleCreate}
                className="w-full mb-6 bg-[#c86f3c] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b4632f] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Item</span>
              </button>
            )}

            {/* Form */}
            {(isCreating || editingId) && (
              <form onSubmit={handleSubmit} className="mb-6 bg-[#faf8f5] rounded-lg p-6 border border-[#e8e4de]">
                <h3 className="text-[#2d2520] mb-4">
                  {editingId ? 'Edit Menu Item' : 'Create New Item'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#2d2520] text-sm mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c86f3c]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2520] text-sm mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c86f3c] resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2520] text-sm mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c86f3c]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2520] text-sm mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c86f3c]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2520] text-sm mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c86f3c]"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="popular"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="w-4 h-4 text-[#c86f3c] border-[#e8e4de] rounded focus:ring-[#c86f3c]"
                    />
                    <label htmlFor="popular" className="text-[#2d2520] text-sm">
                      Mark as Popular
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-[#c86f3c] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b4632f] transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingId ? 'Update' : 'Create'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-[#e8e4de] rounded-lg hover:bg-[#f5f1ec] transition-colors text-[#2d2520]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Menu Items List */}
            <div className="space-y-3">
              <h3 className="text-[#2d2520] mb-4">All Menu Items ({menuItems.length})</h3>
              {menuItems.map(item => (
                <div
                  key={item.id}
                  className={`
                    bg-white rounded-lg p-4 border-2 transition-colors
                    ${editingId === item.id ? 'border-[#c86f3c]' : 'border-[#e8e4de]'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#2d2520] truncate">{item.name}</h4>
                          <p className="text-[#8b7f76] text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[#c86f3c]">${item.price.toFixed(2)}</span>
                            <span className="text-[#8b7f76] text-sm">
                              {categories.find(c => c.id === item.category)?.label}
                            </span>
                            {item.popular && (
                              <span className="text-xs bg-[#c86f3c] text-white px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 hover:bg-[#f5f1ec] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-[#c86f3c]" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-[#f5f1ec] rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
