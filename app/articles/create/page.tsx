"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight, Eye, Save, X, Image as ImageIcon,
  Quote, Link2, AlignLeft, ChevronDown, Maximize2, Trash2
} from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';

export default function ArticleEditor() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Editor');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState('draft');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const articleData = {
        title,
        slug,
        summary,
        content,
        category,
        tags,
        status,
        views: 0,
        comments: 0,
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (res.ok) {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="text-xl font-serif">Create Article</div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <span>Articles</span> <ChevronRight size={14} />
              <span className="text-gray-800">Create New</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Auto-save
            </div>
            <button className="flex items-center gap-2 px-3 lg:px-4 py-1.5 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
              <Eye size={16} /> Preview
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-3 lg:px-4 py-1.5 bg-[#A68B5C] text-white rounded-md text-sm hover:bg-[#8e764d] disabled:opacity-50"
            >
              <Save size={16} /> {loading ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="bg-white p-4 lg:p-8 rounded-xl border border-gray-200">
                <div className="mb-8">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Article Title"
                    className="text-3xl lg:text-5xl font-serif w-full outline-none placeholder:text-gray-200"
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 font-mono">
                    /insights/ <span className="text-[#A68B5C]">{slug || 'article-slug'}</span>
                  </div>
                </div>

                <div className="mb-8 border border-gray-100 rounded-lg p-4 bg-[#FCFBFA]">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Summary</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write a brief summary of the article (150-200 words)..."
                    className="w-full bg-transparent outline-none text-gray-600 resize-none h-24"
                  ></textarea>
                  <div className="text-right text-[10px] text-gray-300 mt-2">{summary.length} / 200</div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-4 text-gray-500 overflow-x-auto pb-2">
                    <div className="flex items-center gap-1 border-r pr-4">Paragraph <ChevronDown size={14} /></div>
                    <button className="font-bold">B</button>
                    <button className="italic">I</button>
                    <button className="underline">U</button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-2"></div>
                    <AlignLeft size={18} />
                    <Quote size={18} />
                    <Link2 size={18} />
                    <ImageIcon size={18} />
                  </div>
                  <div className="hidden sm:flex gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-md text-xs">
                      <button 
                        className={`px-4 py-1 rounded ${activeTab === 'Editor' ? 'bg-white shadow-sm' : ''}`} 
                        onClick={() => setActiveTab('Editor')}
                      >
                        Editor
                      </button>
                      <button 
                        className={`px-4 py-1 rounded ${activeTab === 'Preview' ? 'bg-white shadow-sm' : ''}`} 
                        onClick={() => setActiveTab('Preview')}
                      >
                        Preview
                      </button>
                    </div>
                    <Maximize2 size={18} className="text-gray-400" />
                  </div>
                </div>

                <div className="min-h-[400px]">
                  {activeTab === 'Editor' ? (
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start writing your article..."
                      className="w-full h-[400px] outline-none text-gray-600 resize-none"
                    />
                  ) : (
                    <div className="prose max-w-none">
                      <h1 className="text-2xl font-serif">{title}</h1>
                      <p className="text-gray-600">{content}</p>
                    </div>
                  )}
                </div>

                <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-100 text-[11px] text-gray-400 uppercase tracking-widest">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 border border-gray-200 px-3 py-1 rounded">
                      Distraction Free Mode
                    </button>
                  </div>
                  <div className="flex gap-6">
                    <span>Word count: {content.split(/\s+/).filter(Boolean).length}</span>
                    <span>Read time: {Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="text-xs text-gray-400">Auto-save enabled</div>
                <div className="flex gap-4">
                  <button className="px-6 py-2 border border-gray-200 rounded-md bg-white">Save Draft</button>
                  <button 
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-[#A68B5C] text-white rounded-md flex items-center gap-2"
                  >
                    Publish Article <ChevronDown size={16} />
                  </button>
                  <button className="text-red-400 p-2"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>

            <aside className="w-full lg:w-80 space-y-6">
              <ControlSection title="Publishing Controls">
                <div className="space-y-4">
                  <label className="text-xs text-gray-400 uppercase block">Status</label>
                  <div className="flex border border-gray-200 rounded-md p-1 bg-white">
                    <button 
                      onClick={() => setStatus('draft')}
                      className={`flex-1 py-1.5 text-sm rounded ${status === 'draft' ? 'bg-gray-50 border border-gray-100 shadow-sm' : 'text-gray-400'}`}
                    >
                      Draft
                    </button>
                    <button 
                      onClick={() => setStatus('published')}
                      className={`flex-1 py-1.5 text-sm rounded ${status === 'published' ? 'bg-gray-50 border border-gray-100 shadow-sm' : 'text-gray-400'}`}
                    >
                      Published
                    </button>
                  </div>
                </div>
              </ControlSection>

              <ControlSection title="Category">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-md p-2 bg-white text-sm outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </ControlSection>

              <ControlSection title="Tags">
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tags..." 
                    className="flex-1 border border-gray-200 rounded-md p-2 text-sm" 
                  />
                  <button 
                    onClick={addTag}
                    className="px-3 py-2 bg-[#A68B5C] text-white rounded-md text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag} label={tag} onRemove={() => removeTag(tag)} />
                  ))}
                </div>
              </ControlSection>

              <ControlSection title="Featured Image">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 lg:p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white transition-colors">
                  <ImageIcon size={32} className="text-gray-300" />
                  <p className="text-xs text-gray-500 text-center">
                    Drag & Drop image<br />
                    <span className="underline">or Browse</span>
                  </p>
                </div>
              </ControlSection>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function ControlSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">{title}</h4>
      {children}
    </div>
  );
}

function Tag({ label, onRemove }: { label: string, onRemove: () => void }) {
  return (
    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
      {label} <X size={12} className="text-gray-400 cursor-pointer" onClick={onRemove} />
    </span>
  );
}