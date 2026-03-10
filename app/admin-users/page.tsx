"use client";
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Shield, Mail, Calendar, MoreHorizontal, UserPlus } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmed Mansoor', email: 'ahmed@example.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-03-15 09:30', articles: 45 },
    { id: 2, name: 'Fatima Hassan', email: 'fatima@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-03-14 14:20', articles: 38 },
    { id: 3, name: 'Omar Khalid', email: 'omar@example.com', role: 'Author', status: 'Active', lastLogin: '2024-03-13 11:15', articles: 52 },
    { id: 4, name: 'Zainab Ali', email: 'zainab@example.com', role: 'Author', status: 'Inactive', lastLogin: '2024-02-28 16:45', articles: 27 },
    { id: 5, name: 'Yusuf Ibrahim', email: 'yusuf@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-03-15 10:05', articles: 33 },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="p-6 lg:p-8 bg-[#F9F7F2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2D2E32]">Admin Users</h1>
          <p className="text-gray-500 text-sm mt-1">Manage team members and permissions</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-[#A68B5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8e764d]"
        >
          <UserPlus size={18} />
          Invite Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Admins</p>
          <h2 className="text-3xl font-serif">12</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Super Admins</p>
          <h2 className="text-3xl font-serif">2</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Editors</p>
          <h2 className="text-3xl font-serif">4</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Authors</p>
          <h2 className="text-3xl font-serif">6</h2>
        </div>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search users by name or email..." 
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A68B5C]"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FBFBFB] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2D2E32] text-white flex items-center justify-center text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={12} />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={
                      user.role === 'Super Admin' ? 'text-purple-500' :
                      user.role === 'Editor' ? 'text-blue-500' : 'text-green-500'
                    } />
                    <span className="text-sm">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {user.lastLogin}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{user.articles} articles</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 size={16} className="text-gray-500" />
                    </button>
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

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-serif mb-4">Invite New Admin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-200 rounded-md p-2"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  className="w-full border border-gray-200 rounded-md p-2"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full border border-gray-200 rounded-md p-2">
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>Author</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Full Access
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Can publish articles
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Can manage users
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Can manage ads
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#A68B5C] text-white rounded-md text-sm">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}