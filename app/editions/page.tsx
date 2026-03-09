"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, BookOpen } from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';

export default function EditionsPage() {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEdition, setEditingEdition] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    volume: '',
    issue: '',
    coverImage: '',
    publishedAt: '',
  });

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const res = await fetch('/api/editions');
      const data = await res.json();
      setEditions(data);
    } catch (error) {
      console.error('Error fetching editions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEdition ? `/api/editions/${editingEdition._id}` : '/api/editions';
      const method = editingEdition ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchEditions();
        setShowModal(false);
        setEditingEdition(null);
        setFormData({ title: '', volume: '', issue: '', coverImage: '', publishedAt: '' });
      }
    } catch (error) {
      console.error('Error saving edition:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this edition?')) {
      try {
        await fetch(`/api/editions/${id}`, { method: 'DELETE' });
        fetchEditions();
      } catch (error) {
        console.error('Error deleting edition:', error);
      }
    }
  };

  const handleEdit = (edition: any) => {
    setEditingEdition(edition);
    setFormData({
      title: edition.title,
      volume: edition.volume,
      issue: edition.issue,
      coverImage: edition.coverImage || '',
      publishedAt: edition.publishedAt ? edition.publishedAt.split('T')[0] : '',
    });
    setShowModal(true);
  };

  const filteredEditions = editions.filter((ed: any) =>
    ed.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-serif">Editions</h1>
          <button
            onClick={() => {
              setEditingEdition(null);
              setFormData({ title: '', volume: '', issue: '', coverImage: '', publishedAt: '' });
              setShowModal(true);
            }}
            className="bg-[#A68B5C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8e764d]"
          >
            <Plus size={20} /> New Edition
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search editions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
            {loading ? (
              <div className="col-span-full text-center py-8 text-gray-400">Loading...</div>
            ) : filteredEditions.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-400">No editions found</div>
            ) : (
              filteredEditions.map((edition: any) => (
                <div key={edition._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center">
                      {edition.coverImage ? (
                        <img src={edition.coverImage} alt={edition.title} className="w-full h-full object-cover rounded" />
                      ) : (
                        <BookOpen size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(edition)}>
                        <Edit size={16} className="text-gray-400 hover:text-[#A68B5C]" />
                      </button>
                      <button onClick={() => handleDelete(edition._id)}>
                        <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">{edition.title}</h3>
                  <p className="text-sm text-gray-500">Vol. {edition.volume}, Issue {edition.issue}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <Calendar size={12} />
                    {new Date(edition.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-xs text-[#A68B5C]">
                    {edition.articleCount || 0} articles
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-serif mb-4">
                {editingEdition ? 'Edit Edition' : 'New Edition'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Volume</label>
                      <input
                        type="text"
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Issue</label>
                      <input
                        type="text"
                        value={formData.issue}
                        onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cover Image URL</label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Publish Date</label>
                    <input
                      type="date"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      required
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
                    {editingEdition ? 'Update' : 'Create'}
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