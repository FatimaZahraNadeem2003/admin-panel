"use client";
import React, { useState } from 'react';
import { Search, Plus, X, Edit2, Trash2 } from 'lucide-react';

export default function TagsPage() {
  const [tags, setTags] = useState([
    { id: 1, name: 'Halal Economy', count: 45, color: '#A68B5C' },
    { id: 2, name: 'Finance', count: 38, color: '#3D8F6F' },
    { id: 3, name: 'Technology', count: 52, color: '#4A90E2' },
    { id: 4, name: 'Sustainability', count: 27, color: '#50C878' },
    { id: 5, name: 'Islamic Finance', count: 33, color: '#9B59B6' },
  ]);

  const [newTag, setNewTag] = useState('');

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Tags</h1>
          <p className="text-gray-500 text-sm mt-1">Manage article tags and keywords</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-serif mb-4">Add New Tag</h3>
        <div className="flex gap-3">
          <input 
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name..."
            className="flex-1 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
          />
          <button className="bg-[#A68B5C] text-white px-6 py-2 rounded-md hover:bg-[#8e764d] flex items-center gap-2">
            <Plus size={18} />
            Add Tag
          </button>
        </div>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search tags..." 
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div 
              key={tag.id}
              className="group relative"
            >
              <span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${tag.color}15`, color: tag.color }}
              >
                {tag.name}
                <span className="text-xs opacity-70">({tag.count})</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  <X size={14} className="hover:text-red-500" />
                </button>
              </span>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:flex gap-1 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-10">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit2 size={14} className="text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FBFBFB] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tag Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Usage Count</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{tag.name}</td>
                <td className="px-6 py-4">{tag.count} articles</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: tag.color }}></div>
                    <span className="text-sm text-gray-500">{tag.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 size={16} className="text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}