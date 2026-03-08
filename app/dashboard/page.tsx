"use client";
import React from 'react';
import { 
  LayoutDashboard, FileText, Layers, Library, Tag, Megaphone, 
  BarChart3, Users, Search, Bell, ChevronDown, MessageSquare, MoreHorizontal 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', views: 300000 },
  { name: 'Feb', views: 400000 },
  { name: 'Mar', views: 550000 },
  { name: 'Apr', views: 500000 },
  { name: 'May', views: 700000 },
  { name: 'Jun', views: 850000 },
  { name: 'Jul', views: 800000 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F9F7F2] font-sans text-[#2D2E32]">
      <aside className="hidden lg:flex w-64 bg-[#2D2E32] text-gray-400 flex-col">
        <div className="p-6 text-white text-xl font-serif">EmaanMall <span className="text-[#A68B5C]">Insights</span></div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<FileText size={20} />} label="Articles" />
          <NavItem icon={<Layers size={20} />} label="Categories" />
          <NavItem icon={<Library size={20} />} label="Editions" />
          <NavItem icon={<Tag size={20} />} label="Tags" />
          <NavItem icon={<Megaphone size={20} />} label="Ads" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <div className="pt-10">
            <NavItem icon={<Users size={20} />} label="Admin Users" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-8">
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
                <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Articles" value="1,254" />
            <StatCard title="Total Views" value="982,450" />
            <StatCard title="Weekly Growth" value="+4.8%" highlight />
            <StatCard title="Active Ads" value="12" />
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <h3 className="text-lg font-serif mb-6">Traffic Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
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
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-serif text-gray-800">Top Articles</h3>
              <button className="bg-[#A68B5C] text-white px-4 py-2 rounded text-sm hover:bg-[#8e764d] transition-colors">
                Create New Article
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FBFBFB] text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">#</th>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Views</th>
                    <th className="px-6 py-4 font-medium">Comments</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {[
                    { id: 1, title: 'The Global Economy Outlook', cat: 'Economics', views: '158,300', comments: 320 },
                    { id: 2, title: 'Political Change in Europe', cat: 'Politics', views: '132,750', comments: 289 },
                    { id: 3, title: 'Technology Trends in 2023', cat: 'Tech', views: '110,540', comments: 215 },
                    { id: 4, title: 'The Future of Renewable Energy', cat: 'Environment', views: '98,120', comments: 187 },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400">{row.id}.</td>
                      <td className="px-6 py-4 font-medium">{row.title}</td>
                      <td className="px-6 py-4 text-gray-500">{row.cat}</td>
                      <td className="px-6 py-4">{row.views}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        {row.comments} <MessageSquare size={14} className="text-gray-400" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
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

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-[#3D3E44] text-white shadow-sm' : 'hover:text-white'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, highlight = false }: { title: string, value: string, highlight?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
      <h2 className={`text-4xl font-serif ${highlight ? 'text-[#3D8F6F]' : 'text-[#2D2E32]'}`}>{value}</h2>
    </div>
  );
}