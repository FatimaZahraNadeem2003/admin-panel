"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { 
  Search, Bell, ChevronDown, MessageSquare, MoreHorizontal, Plus
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Link from 'next/link';
import Sidebar from './components/Sidebar';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    weeklyGrowth: '+4.8%',
    activeAds: 0,
  });
  const [trafficData, setTrafficData] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, trafficRes, articlesRes] = await Promise.all([
        fetch('/api/analytics/overview'),
        fetch('/api/analytics/traffic'),
        fetch('/api/analytics/top-articles'),
      ]);
      
      const statsData = await statsRes.json();
      const trafficData = await trafficRes.json();
      const articlesData = await articlesRes.json();
      
      setStats({
        totalArticles: statsData.totalArticles,
        totalViews: statsData.totalViews,
        weeklyGrowth: '+4.8%',
        activeAds: statsData.totalAds,
      });
      setTrafficData(trafficData);
      setTopArticles(articlesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F7F2] font-sans text-[#2D2E32]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-500 cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer border-l pl-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=A68B5C&color=fff" alt="Admin" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Articles" value={stats.totalArticles.toLocaleString()} />
            <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} />
            <StatCard title="Weekly Growth" value={stats.weeklyGrowth} highlight />
            <StatCard title="Active Ads" value={stats.activeAds.toString()} />
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 mb-8">
            <h3 className="text-lg font-serif mb-6">Traffic Overview</h3>
            <div className="h-[250px] lg:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A68B5C" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#A68B5C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} tickFormatter={(v) => `${v/1000}K`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#A68B5C" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" dot={{ r: 4, fill: '#A68B5C' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 lg:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-serif text-gray-800">Top Articles</h3>
              <Link 
                href="/articles/create"
                className="bg-[#A68B5C] text-white px-4 py-2 rounded text-sm hover:bg-[#8e764d] transition-colors flex items-center gap-2"
              >
                <Plus size={16} /> Create New Article
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FBFBFB] text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 font-medium">#</th>
                    <th className="px-4 lg:px-6 py-4 font-medium">Title</th>
                    <th className="px-4 lg:px-6 py-4 font-medium">Category</th>
                    <th className="px-4 lg:px-6 py-4 font-medium">Views</th>
                    <th className="px-4 lg:px-6 py-4 font-medium">Comments</th>
                    <th className="px-4 lg:px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {topArticles.map((article: any, index) => (
                    <tr key={article._id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 text-gray-400">{index + 1}.</td>
                      <td className="px-4 lg:px-6 py-4 font-medium">{article.title}</td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">{article.category?.name || 'Uncategorized'}</td>
                      <td className="px-4 lg:px-6 py-4">{article.views.toLocaleString()}</td>
                      <td className="px-4 lg:px-6 py-4 flex items-center gap-2">
                        {article.comments} <MessageSquare size={14} className="text-gray-400" />
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <Link href={`/articles/${article._id}`}>
                          <MoreHorizontal size={18} className="text-gray-400 cursor-pointer hover:text-[#A68B5C]" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, highlight = false }: { title: string, value: string, highlight?: boolean }) {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
      <p className="text-xs lg:text-sm text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
      <h2 className={`text-2xl lg:text-4xl font-serif ${highlight ? 'text-[#3D8F6F]' : 'text-[#2D2E32]'}`}>{value}</h2>
    </div>
  );
}