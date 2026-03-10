"use client";
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, DollarSign, Calendar, BarChart3 } from 'lucide-react';

export default function AdsPage() {
  const [ads, setAds] = useState([
    { id: 1, name: 'Header Banner', position: 'Header', status: 'Active', impressions: '145.2K', clicks: '3.2K', ctr: '2.2%', revenue: '$1,245' },
    { id: 2, name: 'Sidebar Ad', position: 'Sidebar', status: 'Active', impressions: '98.5K', clicks: '1.8K', ctr: '1.8%', revenue: '$890' },
    { id: 3, name: 'In-Article Ad', position: 'Article Body', status: 'Paused', impressions: '67.3K', clicks: '950', ctr: '1.4%', revenue: '$450' },
    { id: 4, name: 'Footer Banner', position: 'Footer', status: 'Draft', impressions: '0', clicks: '0', ctr: '0%', revenue: '$0' },
  ]);

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Ad Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage advertisements and track performance</p>
        </div>
        <button className="bg-[#A68B5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8e764d]">
          <Plus size={18} />
          Create New Ad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Impressions</p>
          <h2 className="text-3xl font-serif">311K</h2>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Clicks</p>
          <h2 className="text-3xl font-serif">5.95K</h2>
          <p className="text-xs text-green-600 mt-2">↑ 8% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Avg. CTR</p>
          <h2 className="text-3xl font-serif">1.9%</h2>
          <p className="text-xs text-yellow-600 mt-2">↓ 0.3% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <h2 className="text-3xl font-serif">$2,585</h2>
          <p className="text-xs text-green-600 mt-2">↑ 15% vs last month</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search ads..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Positions</option>
            <option>Header</option>
            <option>Sidebar</option>
            <option>Article Body</option>
            <option>Footer</option>
          </select>
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FBFBFB] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Ad Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{ad.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{ad.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ad.status === 'Active' ? 'bg-green-100 text-green-700' :
                    ad.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{ad.impressions}</td>
                <td className="px-6 py-4 text-sm">{ad.clicks}</td>
                <td className="px-6 py-4 text-sm">{ad.ctr}</td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">{ad.revenue}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye size={16} className="text-gray-500" />
                    </button>
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