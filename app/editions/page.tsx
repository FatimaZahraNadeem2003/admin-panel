"use client";
import React, { useState } from 'react';
import { Search, Plus, Calendar, FileText, Edit2, Trash2 } from 'lucide-react';

export default function EditionsPage() {
  const [editions, setEditions] = useState([
    { id: 1, title: 'Q1 2024 Economic Review', volume: 'Vol. 12', articles: 12, status: 'Published', date: '2024-03-15' },
    { id: 2, title: 'Technology Special Edition', volume: 'Vol. 11', articles: 8, status: 'Draft', date: '2024-02-28' },
    { id: 3, title: 'Halal Investment Guide', volume: 'Vol. 10', articles: 15, status: 'Published', date: '2024-02-01' },
  ]);

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Editions</h1>
          <p className="text-gray-500 text-sm mt-1">Manage magazine editions and special issues</p>
        </div>
        <button className="bg-[#A68B5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8e764d]">
          <Plus size={18} />
          New Edition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Editions</p>
          <h2 className="text-3xl font-serif">24</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Published</p>
          <h2 className="text-3xl font-serif text-green-600">18</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Drafts</p>
          <h2 className="text-3xl font-serif text-gray-500">6</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editions.map((edition) => (
          <div key={edition.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                edition.status === 'Published' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {edition.status}
              </span>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit2 size={16} className="text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-serif mb-2">{edition.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{edition.volume}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FileText size={14} />
                {edition.articles} articles
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {edition.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}