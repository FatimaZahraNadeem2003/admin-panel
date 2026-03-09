"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Eye, MousePointer, 
  Download
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import Sidebar from '@/app/components/Sidebar';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [overview, setOverview] = useState<any>(null);
  const [trafficData, setTrafficData] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, trafficRes, articlesRes] = await Promise.all([
        fetch('/api/analytics/overview'),
        fetch('/api/analytics/traffic'),
        fetch('/api/analytics/top-articles'),
      ]);
      
      const overviewData = await overviewRes.json();
      const trafficData = await trafficRes.json();
      const articlesData = await articlesRes.json();
      
      setOverview(overviewData);
      setTrafficData(trafficData);
      setTopArticles(articlesData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryData = [
    { name: 'Economics', value: 35 },
    { name: 'Politics', value: 25 },
    { name: 'Technology', value: 20 },
    { name: 'Environment', value: 15 },
    { name: 'Culture', value: 5 },
  ];

  const COLORS = ['#A68B5C', '#8e764d', '#6b5a3c', '#4a3e2a', '#2d2519'];

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-serif">Analytics</h1>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-sm hover:bg-gray-50">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<Eye className="text-[#A68B5C]" />}
                title="Total Views"
                value={overview?.totalViews?.toLocaleString() || '0'}
                change="+12.5%"
              />
              <MetricCard
                icon={<Users className="text-[#A68B5C]" />}
                title="Unique Visitors"
                value="845.2K"
                change="+8.2%"
              />
              <MetricCard
                icon={<MousePointer className="text-[#A68B5C]" />}
                title="Avg. Engagement"
                value="4m 32s"
                change="-2.1%"
                negative
              />
              <MetricCard
                icon={<BarChart3 className="text-[#A68B5C]" />}
                title="Bounce Rate"
                value="42.3%"
                change="+3.4%"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-serif mb-6">Traffic Overview</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} tickFormatter={(v) => `${v/1000}K`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#A68B5C" strokeWidth={2} dot={{ r: 4, fill: '#A68B5C' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-serif mb-6">Categories</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {categoryData.map((cat, index) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <span>{cat.name}</span>
                      </div>
                      <span className="font-medium">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 lg:p-6 border-b border-gray-100">
                <h3 className="text-lg font-serif">Top Performing Articles</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#FBFBFB] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 lg:px-6 py-4">Rank</th>
                      <th className="px-4 lg:px-6 py-4">Article</th>
                      <th className="px-4 lg:px-6 py-4">Category</th>
                      <th className="px-4 lg:px-6 py-4">Views</th>
                      <th className="px-4 lg:px-6 py-4">Engagement</th>
                      <th className="px-4 lg:px-6 py-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topArticles.map((article: any, index) => (
                      <tr key={article._id} className="hover:bg-gray-50">
                        <td className="px-4 lg:px-6 py-4 font-medium text-[#A68B5C]">#{index + 1}</td>
                        <td className="px-4 lg:px-6 py-4 font-medium">{article.title}</td>
                        <td className="px-4 lg:px-6 py-4 text-gray-500">{article.category?.name || '-'}</td>
                        <td className="px-4 lg:px-6 py-4">{article.views?.toLocaleString()}</td>
                        <td className="px-4 lg:px-6 py-4">{article.comments} comments</td>
                        <td className="px-4 lg:px-6 py-4">
                          <TrendingUp size={16} className="text-green-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function MetricCard({ icon, title, value, change, negative = false }: any) {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F9F7F2] rounded-lg">{icon}</div>
        <span className={`text-xs font-medium ${negative ? 'text-red-500' : 'text-green-500'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl lg:text-3xl font-serif">{value}</p>
    </div>
  );
}