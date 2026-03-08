"use client";
import React, { useState } from 'react';
import { 
  ChevronRight, Eye, Save, Bell, X, Plus, Image as ImageIcon, 
  Type, Quote, Minus, Link2, AlignLeft, MessageSquare, ChevronDown, Maximize2, Trash2
} from 'lucide-react';

export default function ArticleEditor() {
  const [activeTab, setActiveTab] = useState('Editor');

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2E32] font-sans">
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div className="text-xl font-serif">EmaanMall <span className="text-[#A68B5C]">Insights</span></div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <span>Dashboard</span> <ChevronRight size={14} />
            <span>Articles</span> <ChevronRight size={14} />
            <span className="text-gray-800">Create / Edit</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Auto-saved • Just now
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
            <Eye size={16} /> Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-md text-sm bg-[#F3F1ED]">
            <Save size={16} /> Draft
          </button>
          <Bell size={20} className="text-gray-400 mx-2 cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-[#2D2E32] text-white flex items-center justify-center text-xs">AM</div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row p-4 lg:p-8 gap-8">
        
        <div className="flex-1 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-8">
              <input 
                type="text" 
                placeholder="Article Title" 
                className="text-5xl font-serif w-full outline-none placeholder:text-gray-200"
              />
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 font-mono">
                /insights/ <span className="text-[#A68B5C] underline cursor-pointer">the-future-of-halal-economy-in-2025</span>
              </div>
            </div>

            <div className="mb-8 border border-gray-100 rounded-lg p-4 bg-[#FCFBFA]">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Summary</label>
              <textarea 
                placeholder="Write a brief summary of the article (150-200 words)..."
                className="w-full bg-transparent outline-none text-gray-600 resize-none h-24"
              ></textarea>
              <div className="text-right text-[10px] text-gray-300 mt-2">0 / 200</div>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
               <div className="flex items-center gap-4 text-gray-500 overflow-x-auto pb-2">
                  <div className="flex items-center gap-1 border-r pr-4">Paragraph <ChevronDown size={14}/></div>
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
                    <button className={`px-4 py-1 rounded ${activeTab === 'Editor' ? 'bg-white shadow-sm' : ''}`} onClick={()=>setActiveTab('Editor')}>Editor</button>
                    <button className={`px-4 py-1 rounded ${activeTab === 'Preview' ? 'bg-white shadow-sm' : ''}`} onClick={()=>setActiveTab('Preview')}>Preview</button>
                  </div>
                  <Maximize2 size={18} className="text-gray-400" />
               </div>
            </div>

            <div className="min-h-[400px]">
               <h3 className="text-2xl text-gray-300 font-serif mb-4">Start writing your article...</h3>
               <p className="text-gray-300 italic">Type / to insert image, quote, divider, or media</p>
            </div>

            <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-100 text-[11px] text-gray-400 uppercase tracking-widest">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 border border-gray-200 px-3 py-1 rounded">Distraction Free Mode</button>
              </div>
              <div className="flex gap-6">
                <span>Word count: 0</span>
                <span>Read time: 0 min</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="text-xs text-gray-400">Autosave every 10s</div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-gray-200 rounded-md bg-white">Save Draft</button>
              <button className="px-8 py-2 bg-[#A68B5C] text-white rounded-md flex items-center gap-2">
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
                 <button className="flex-1 py-1.5 text-sm bg-gray-50 border border-gray-100 rounded shadow-sm">Draft</button>
                 <button className="flex-1 py-1.5 text-sm text-gray-400">Published</button>
               </div>
               <div className="flex items-center justify-between text-sm py-2">
                 <span className="text-gray-500 italic">Schedule publish date</span>
                 <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
               </div>
             </div>
          </ControlSection>

          <ControlSection title="Category">
             <select className="w-full border border-gray-200 rounded-md p-2 bg-white text-sm outline-none">
               <option>Select Category</option>
             </select>
          </ControlSection>

          <ControlSection title="Tags">
             <input type="text" placeholder="Add tags..." className="w-full border border-gray-200 rounded-md p-2 mb-3 text-sm" />
             <div className="flex flex-wrap gap-2">
               <Tag label="Halal Economy" />
               <Tag label="Finance" />
               <button className="text-[#A68B5C] text-xs font-bold">+ New</button>
             </div>
          </ControlSection>

          <ControlSection title="Featured Image">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white transition-colors">
               <ImageIcon size={32} className="text-gray-300" />
               <p className="text-xs text-gray-500 text-center">Drag & Drop image<br/><span className="underline">or Browse</span></p>
            </div>
          </ControlSection>
        </aside>

      </div>
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

function Tag({ label }: { label: string }) {
  return (
    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
      {label} <X size={12} className="text-gray-400 cursor-pointer" />
    </span>
  );
}