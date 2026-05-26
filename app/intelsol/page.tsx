'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, InfoCard, ListItem } from '../components/ContentSection';
import TasksTab, { INTELSOL_DEFAULT_TASKS } from '../components/TasksTab';
import PerformanceTab, { INTELSOL_DEFAULT_METRICS } from '../components/PerformanceTab';
import StatusBadge, { getClientStatus, setClientStatus, DEFAULT_STATUSES, type ClientStatus } from '../components/StatusBadge';
import { FileText, BarChart3, CheckSquare, TrendingUp, Target, Rocket } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
];

export default function IntelsolPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<ClientStatus>('Active');

  useEffect(() => {
    setStatus(getClientStatus('intelsol', DEFAULT_STATUSES.intelsol));
  }, []);

  const handleStatusChange = (newStatus: ClientStatus) => {
    setStatus(newStatus);
    setClientStatus('intelsol', newStatus);
  };

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-violet-600">I</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-slate-900">Intelsol</h1>
                <StatusBadge status={status} onStatusChange={handleStatusChange} size="md" />
              </div>
              <p className="text-slate-600">Internal Agency Campaigns - Lead Generation for Intelsol Services</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#1a2647] text-[#1a2647] font-medium'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'performance' && (
            <PerformanceTab clientId="intelsol" defaultMetrics={INTELSOL_DEFAULT_METRICS} hasData={true} />
          )}
          {activeTab === 'tasks' && (
            <TasksTab clientId="intelsol" defaultTasks={INTELSOL_DEFAULT_TASKS} />
          )}
        </div>
      </div>
    </ClientLayout>
  );
}

function OverviewTab() {
  return (
    <>
      <ContentSection title="Campaign Overview" icon={<FileText className="w-5 h-5" />}>
        <div className="space-y-4">
          <p>
            Intelsol agency campaigns -- internal lead generation for Intelsol's own services.
            These campaigns target businesses that need outsourced lead generation, cold email outreach,
            and sales pipeline development.
          </p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded">
            <p className="font-semibold text-violet-900 mb-2">Mission:</p>
            <p className="text-violet-800">
              Generate qualified leads for Intelsol's B2B lead generation services through targeted
              cold email campaigns, demonstrating the same methodology we apply for clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InfoCard label="Campaign Type" value="Internal Lead Generation" />
            <InfoCard label="Channel" value="Cold Email via SmartLead" />
            <InfoCard label="Target Market" value="B2B Companies, Agencies, SaaS" />
            <InfoCard label="Geographic Focus" value="EU, UK, USA" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Service Offering" icon={<Rocket className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">What Intelsol Sells:</h4>
          <ul className="space-y-2">
            <ListItem type="check">B2B lead generation and prospecting</ListItem>
            <ListItem type="check">Cold email campaign management</ListItem>
            <ListItem type="check">ICP development and Clay enrichment</ListItem>
            <ListItem type="check">AI-powered lead qualification</ListItem>
            <ListItem type="check">SmartLead campaign setup and optimization</ListItem>
            <ListItem type="check">Apollo and Clay data enrichment pipelines</ListItem>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title="Target Audience" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">SaaS Companies</h4>
              <p className="text-blue-800 text-sm">
                Early-stage SaaS companies (10-100 employees) that need outbound sales pipeline without building an in-house SDR team.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Agencies</h4>
              <p className="text-green-800 text-sm">
                Digital agencies and consultancies that want to grow their client base through systematic outbound prospecting.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h4 className="font-semibold text-amber-900 mb-2">B2B Services</h4>
              <p className="text-amber-800 text-sm">
                Professional services firms that rely on referrals and want to add a scalable outbound channel.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Campaign Strategy" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <h4 className="font-semibold text-slate-900">Build Lead Lists</h4>
              <p className="text-sm text-slate-600">Use Clay to identify and enrich companies matching our target ICP across EU, UK, and USA markets.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div>
              <h4 className="font-semibold text-slate-900">Qualify with AI</h4>
              <p className="text-sm text-slate-600">Run Anthropic-powered ICP matching to score and filter leads before adding to sequences.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <div>
              <h4 className="font-semibold text-slate-900">Launch Sequences</h4>
              <p className="text-sm text-slate-600">Deploy multi-step email sequences via SmartLead with personalized messaging.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <div>
              <h4 className="font-semibold text-slate-900">Optimize and Scale</h4>
              <p className="text-sm text-slate-600">Track performance weekly, A/B test messaging, and scale winning campaigns.</p>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
