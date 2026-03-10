"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Plus, Edit2, Trash2, Eye, Calendar, 
  User, MessageSquare, MoreHorizontal, Filter 
} from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([
    { id: 1, title: 'The Global Economy Outlook', category: 'Economics', author: 'Ahmed Mansoor', status: 'Published', views: '158.3K', comments: 320, date: '2024-03-15' },
    { id: 2, title: 'Political Change in Europe', category: 'Politics', author: 'Fatima Hassan', status: 'Published', views: '132.7K', comments: 289, date: '2024-03-14' },
    { id: 3, title: 'Technology Trends in 2023', category: 'Tech', author: 'Omar Khalid', status: 'Draft', views: '0', comments: 0, date: '2024-03-13' },
    { id: 4, title: 'The Future of Renewable Energy', category: 'Environment', author: 'Zainab Ali', status: 'Published', views: '98.1K', comments: 187, date: '2024-03-12' },
    { id: 5, title: 'Halal Investment Strategies', category: 'Halal Economy', author: 'Yusuf Ibrahim', status: 'Under Review', views: '45.2K', comments: 56, date: '2024-03-11' },
  ]);

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Articles</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your articles and blog posts</p>
        </div>
        <Link 
          href="/articles/create"
          className="bg-[#A68B5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8e764d] transition-colors"
        >
          <Plus size={18} />
          Create New Article
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Categories</option>
            <option>Economics</option>
            <option>Politics</option>
            <option>Technology</option>
            <option>Environment</option>
          </select>
          <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Under Review</option>
          </select>
          <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
            <Filter size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FBFBFB] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-[#2D2E32]">{article.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} className="text-gray-400" />
                    {article.author}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    article.status === 'Published' ? 'bg-green-100 text-green-700' :
                    article.status === 'Draft' ? 'bg-gray-100 text-gray-500' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{article.views}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <MessageSquare size={14} className="text-gray-400" />
                    {article.comments}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    {article.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/articles/${article.id}`}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Eye size={16} className="text-gray-500" />
                    </Link>
                    <Link 
                      href={`/articles/edit/${article.id}`}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 size={16} className="text-gray-500" />
                    </Link>
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
        <p className="text-sm text-gray-500">Showing 1 to 5 of 24 articles</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 bg-[#A68B5C] text-white rounded-md text-sm">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">3</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">4</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">5</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}