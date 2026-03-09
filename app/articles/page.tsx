"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await fetch(`/api/articles/${id}`, { method: 'DELETE' });
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const filteredArticles = articles.filter((article: any) =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-serif">Articles</h1>
          <Link
            href="/articles/create"
            className="bg-[#A68B5C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8e764d]"
          >
            <Plus size={20} /> New Article
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
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
                  <th className="px-4 lg:px-6 py-4">Title</th>
                  <th className="px-4 lg:px-6 py-4">Category</th>
                  <th className="px-4 lg:px-6 py-4">Status</th>
                  <th className="px-4 lg:px-6 py-4">Views</th>
                  <th className="px-4 lg:px-6 py-4">Created</th>
                  <th className="px-4 lg:px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td>
                  </tr>
                ) : filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">No articles found</td>
                  </tr>
                ) : (
                  filteredArticles.map((article: any) => (
                    <tr key={article._id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-gray-400" />
                          <span className="font-medium">{article.title}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">{article.category?.name || '-'}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">{article.views?.toLocaleString()}</td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/articles/${article._id}`}>
                            <Eye size={18} className="text-gray-400 hover:text-[#A68B5C] cursor-pointer" />
                          </Link>
                          <Link href={`/articles/${article._id}/edit`}>
                            <Edit size={18} className="text-gray-400 hover:text-[#A68B5C] cursor-pointer" />
                          </Link>
                          <button onClick={() => handleDelete(article._id)}>
                            <Trash2 size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}