"use client";
import React from 'react';
import { 
  TrendingUp, Users, Eye, Clock, ArrowUp, ArrowDown, 
  Calendar, Download 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const viewsData = [
  { month: 'Jan', views: 125000, unique: 98000 },
  { month: 'Feb', views: 145000, unique: 112000 },
  { month: 'Mar', views: 168000, unique: 135000 },
  { month: 'Apr', views: 158000, unique: 128000 },
  { month: 'May', views: 189000, unique: 152000 },
  { month: 'Jun', views: 215000, unique: 178000 },
];

const categoryData = [
  { name: 'Economics', value: 35 },
  { name: 'Politics', value: 25 },
  { name: 'Technology', value: 20 },
  { name: 'Environment', value: 15 },
  { name: 'Halal Economy', value: 5 },
];

const COLORS = ['#A68B5C', '#3D8F6F', '#4A90E2', '#50C878', '#9B59B6'];

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Track your content performance</p>
        </div>
        <div className="flex gap-3">
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <button className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={<Eye className="text-[#A68B5C]" />}
          label="Total Views"
          value="1.2M"
          change="+12.5%"
          positive={true}
        />
        <MetricCard 
          icon={<Users className="text-[#3D8F6F]" />}
          label="Unique Visitors"
          value="845K"
          change="+8.3%"
          positive={true}
        />
        <MetricCard 
          icon={<Clock className="text-[#4A90E2]" />}
          label="Avg. Read Time"
          value="4m 25s"
          change="-2.1%"
          positive={false}
        />
        <MetricCard 
          icon={<TrendingUp className="text-[#9B59B6]" />}
          label="Bounce Rate"
          value="42.3%"
          change="-3.2%"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-serif mb-4">Traffic Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#A68B5C" strokeWidth={2} />
                <Line type="monotone" dataKey="unique" stroke="#3D8F6F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-serif mb-4">Views by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-serif">Top Performing Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FBFBFB] text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left">Article</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Views</th>
                <th className="px-6 py-4 text-left">Unique Views</th>
                <th className="px-6 py-4 text-left">Avg. Time</th>
                <th className="px-6 py-4 text-left">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { title: 'The Global Economy Outlook', category: 'Economics', views: '158.3K', unique: '142.1K', time: '5m 20s', engagement: '78%' },
                { title: 'Political Change in Europe', category: 'Politics', views: '132.7K', unique: '118.4K', time: '4m 45s', engagement: '72%' },
                { title: 'Technology Trends in 2023', category: 'Tech', views: '110.5K', unique: '98.2K', time: '3m 55s', engagement: '65%' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">{item.views}</td>
                  <td className="px-6 py-4">{item.unique}</td>
                  <td className="px-6 py-4">{item.time}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-[#A68B5C] rounded-full" style={{ width: item.engagement }}></div>
                      </div>
                      <span className="text-sm">{item.engagement}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, change, positive }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <h2 className="text-3xl font-serif mb-2">{value}</h2>
      <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {change} vs last period
      </div>
    </div>
  );
}