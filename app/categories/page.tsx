"use client";
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MoreHorizontal, ChevronDown } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Economics', slug: 'economics', articles: 45, createdAt: '2024-01-15' },
    { id: 2, name: 'Politics', slug: 'politics', articles: 38, createdAt: '2024-01-20' },
    { id: 3, name: 'Technology', slug: 'technology', articles: 52, createdAt: '2024-02-05' },
    { id: 4, name: 'Environment', slug: 'environment', articles: 27, createdAt: '2024-02-18' },
    { id: 5, name: 'Halal Economy', slug: 'halal-economy', articles: 19, createdAt: '2024-03-01' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your article categories</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#A68B5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8e764d] transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>Sort by Latest</option>
            <option>Sort by Name</option>
            <option>Sort by Articles</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FBFBFB] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">#{cat.id}</td>
                <td className="px-6 py-4 font-medium text-[#2D2E32]">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">/{cat.slug}</td>
                <td className="px-6 py-4 text-sm">{cat.articles} articles</td>
                <td className="px-6 py-4 text-sm text-gray-500">{cat.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 size={16} className="text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1 to 5 of 12 categories</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 bg-[#A68B5C] text-white rounded-md text-sm">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">3</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">Next</button>
        </div>
      </div>

      {showAddModal &&  (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-serif mb-4">Add New Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-md p-2"
                  placeholder="e.g., Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input 
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  className="w-full border border-gray-200 rounded-md p-2"
                  placeholder="technology"
                />
                <p className="text-xs text-gray-400 mt-1">URL-friendly version of the name</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#A68B5C] text-white rounded-md text-sm">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}