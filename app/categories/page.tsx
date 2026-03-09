"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}`
        : '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (res.ok) {
        fetchCategories();
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '' });
    setShowModal(true);
  };

  const filteredCategories = categories.filter((cat: any) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-serif">Categories</h1>
          <button
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: '', description: '' });
              setShowModal(true);
            }}
            className="bg-[#A68B5C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8e764d]"
          >
            <Plus size={20} /> New Category
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FBFBFB] text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 lg:px-6 py-4">Name</th>
                  <th className="px-4 lg:px-6 py-4">Slug</th>
                  <th className="px-4 lg:px-6 py-4">Description</th>
                  <th className="px-4 lg:px-6 py-4">Articles</th>
                  <th className="px-4 lg:px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
                ) : filteredCategories.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">No categories found</td></tr>
                ) : (
                  filteredCategories.map((category: any) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 font-medium">{category.name}</td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">{category.slug}</td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">{category.description}</td>
                      <td className="px-4 lg:px-6 py-4">{category.articleCount || 0}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(category)}>
                            <Edit size={18} className="text-gray-400 hover:text-[#A68B5C]" />
                          </button>
                          <button onClick={() => handleDelete(category._id)}>
                            <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-serif mb-4">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#A68B5C] text-white rounded-md hover:bg-[#8e764d]"
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}