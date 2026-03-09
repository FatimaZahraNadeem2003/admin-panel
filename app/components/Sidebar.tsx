"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, Layers, Library, Tag, 
  Megaphone, BarChart3, Users, Menu, X 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Articles", href: "/articles" },
  { icon: Layers, label: "Categories", href: "/categories" },
  { icon: Library, label: "Editions", href: "/editions" },
  { icon: Tag, label: "Tags", href: "/tags" },
  { icon: Megaphone, label: "Ads", href: "/ads" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2D2E32] text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#2D2E32] text-gray-400 flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 text-white text-xl font-serif border-b border-gray-700/50">
          EmaanMall <span className="text-[#A68B5C]">Insights</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                  ${isActive ? 'bg-[#3D3E44] text-white' : 'hover:text-white hover:bg-[#3D3E44]/50'}
                `}
              >
                <item.icon size={20} className={isActive ? 'text-[#A68B5C]' : 'group-hover:text-[#A68B5C]'} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-10">
            <Link 
              href="/admin-users"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:text-white ${pathname === '/admin-users' ? 'text-white' : ''}`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Admin Users</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}