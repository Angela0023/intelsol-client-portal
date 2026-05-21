'use client';

import ClientLayout from '../components/ClientLayout';
import { Building2, Users, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const clients = [
    {
      id: 'xpose',
      name: 'Xpose Solutions',
      industry: 'Healthcare Technology',
      status: 'Active',
      color: 'bg-blue-100 text-blue-600',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'tslab',
      name: 'TS Lab',
      industry: 'Food Supplement Manufacturing',
      status: 'Active',
      color: 'bg-green-100 text-green-600',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
    },
    {
      id: 'beeit',
      name: 'BeeIt',
      industry: 'eCommerce Development',
      status: 'Active',
      color: 'bg-amber-100 text-amber-600',
      borderColor: 'border-amber-200',
      bgColor: 'bg-amber-50',
    },
  ];

  const stats = [
    {
      label: 'Total Clients',
      value: '3',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Active Campaigns',
      value: '3',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Target Markets',
      value: '15+',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Buyer Personas',
      value: '12+',
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-600">Manage all client campaigns and documentation</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clients Grid */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Active Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/${client.id}`}
                className={`bg-white rounded-lg border-2 ${client.borderColor} p-6 hover:shadow-lg transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${client.color} rounded-lg flex items-center justify-center text-2xl font-bold`}>
                    {client.name.charAt(0)}
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {client.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-[#1a2647] transition-colors">
                  {client.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{client.industry}</p>

                <div className={`${client.bgColor} rounded-lg p-3 border ${client.borderColor}`}>
                  <p className="text-xs font-medium text-slate-600 mb-2">Quick Access:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200">
                      ICP Profile
                    </span>
                    <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200">
                      Clay Filters
                    </span>
                    <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200">
                      AI Prompts
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm font-medium text-[#1a2647] group-hover:underline">
                  View Dashboard
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8 bg-slate-50 rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Platform</p>
              <p className="font-medium text-slate-900">IntElsol Client Portal v1.0</p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Last Updated</p>
              <p className="font-medium text-slate-900">May 21, 2026</p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Access Level</p>
              <p className="font-medium text-slate-900">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
