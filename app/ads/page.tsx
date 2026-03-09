"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await fetch('/api/ads');
      const data = await res.json();
      setAds(data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingAd ? `/api/ads/${editingAd._id}` : '/api/ads';
      const method = editingAd ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchAds();
        setShowModal(false);
        setEditingAd(null);
        setFormData({
          name: '', position: '', imageUrl: '', linkUrl: '',
          startDate: '', endDate: '', status: 'active',
        });
      }
    } catch (error) {
      console.error('Error saving ad:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        await fetch(`/api/ads/${id}`, { method: 'DELETE' });
        fetchAds();
      } catch (error) {
        console.error('Error deleting ad:', error);
      }
    }
  };

  const handleEdit = (ad: any) => {
    setEditingAd(ad);
    setFormData({
      name: ad.name,
      position: ad.position,
      imageUrl: ad.imageUrl || '',
      linkUrl: ad.linkUrl || '',
      startDate: ad.startDate ? ad.startDate.split('T')[0] : '',
      endDate: ad.endDate ? ad.endDate.split('T')[0] : '',
      status: ad.status,
    });
    setShowModal(true);
  };

  const filteredAds = ads.filter((ad: any) =>
    ad.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const positions = ['Header', 'Sidebar', 'Between Articles', 'Footer', 'Pop',
    'Pop-up', 'Banner'
  ];

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-serif">Advertisements</h1>
          <button
            onClick={() => {
              setEditingAd(null);
              setFormData({
                name: '', position: '', imageUrl: '', linkUrl: '',
                startDate: '', endDate: '', status: 'active',
              });
              setShowModal(true);
            }}
            className="bg-[#A68B5C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8e764d]"
          >
            <Plus size={20} /> New Ad
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search ads..."
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
                  <th className="px-4 lg:px-6 py-4">Position</th>
                  <th className="px-4 lg:px-6 py-4">Status</th>
                  <th className="px-4 lg:px-6 py-4">Impressions</th>
                  <th className="px-4 lg:px-6 py-4">Clicks</th>
                  <th className="px-4 lg:px-6 py-4">CTR</th>
                  <th className="px-4 lg:px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
                ) : filteredAds.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-400">No ads found</td></tr>
                ) : (
                  filteredAds.map((ad: any) => {
                    const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0';
                    return (
                      <tr key={ad._id} className="hover:bg-gray-50">
                        <td className="px-4 lg:px-6 py-4 font-medium">{ad.name}</td>
                        <td className="px-4 lg:px-6 py-4 text-gray-500">{ad.position}</td>
                        <td className="px-4 lg:px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ad.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {ad.status}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4">{ad.impressions?.toLocaleString() || 0}</td>
                        <td className="px-4 lg:px-6 py-4">{ad.clicks?.toLocaleString() || 0}</td>
                        <td className="px-4 lg:px-6 py-4">{ctr}%</td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(ad)}>
                              <Edit size={18} className="text-gray-400 hover:text-[#A68B5C]" />
                            </button>
                            <button onClick={() => handleDelete(ad._id)}>
                              <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-serif mb-4">
                {editingAd ? 'Edit Advertisement' : 'New Advertisement'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Ad Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Position</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      required
                    >
                      <option value="">Select Position</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Link URL</label>
                    <input
                      type="url"
                      value={formData.linkUrl}
                      onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="text-[#A68B5C]"
                        />
                        Active
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="inactive"
                          checked={formData.status === 'inactive'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="text-[#A68B5C]"
                        />
                        Inactive
                      </label>
                    </div>
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
                    {editingAd ? 'Update' : 'Create'}
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