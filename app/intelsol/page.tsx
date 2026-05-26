'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, CodeBlock, InfoCard, ListItem } from '../components/ContentSection';
import TasksTab, { INTELSOL_DEFAULT_TASKS } from '../components/TasksTab';
import PerformanceTab, { INTELSOL_DEFAULT_METRICS } from '../components/PerformanceTab';
import StatusBadge, { getClientStatus, setClientStatus, DEFAULT_STATUSES, type ClientStatus } from '../components/StatusBadge';
import { FileText, BarChart3, CheckSquare, TrendingUp, Target, Filter, Code, Users } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'icp', label: 'ICP Profile', icon: Target },
  { id: 'filters', label: 'Clay Filters', icon: Filter },
  { id: 'prompts', label: 'AI Prompts', icon: Code },
  { id: 'personas', label: 'Buyer Personas', icon: Users },
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
              <p className="text-slate-600">B2B Lead Generation Agency — Cold Email Campaigns for Intelsol Services</p>
            </div>
          </div>
          <a
            href="https://www.intelsol.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-violet-600 hover:underline"
          >
            Visit Website →
          </a>
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
          {activeTab === 'icp' && <ICPTab />}
          {activeTab === 'filters' && <FiltersTab />}
          {activeTab === 'prompts' && <PromptsTab />}
          {activeTab === 'personas' && <PersonasTab />}
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
      <ContentSection title="Company Overview" icon={<FileText className="w-5 h-5" />}>
        <div className="space-y-4">
          <p>
            Intelsol is a B2B lead generation agency based in Slovenia. We help companies build
            outbound sales pipelines through targeted cold email campaigns, Clay-based lead enrichment,
            and AI-powered ICP qualification.
          </p>
          <p>
            This dashboard tracks Intelsol's own lead generation campaigns — we run the same
            methodology for ourselves that we deliver to clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Industry" value="B2B Lead Generation Services" />
            <InfoCard label="Business Model" value="Agency (Service-Based)" />
            <InfoCard label="Location" value="Ljubljana, Slovenia" />
            <InfoCard label="Channel" value="Cold Email via SmartLead" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Core Services" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">What Intelsol Sells:</h4>
          <ul className="space-y-2">
            <ListItem type="check">B2B lead generation and prospecting</ListItem>
            <ListItem type="check">Cold email campaign management (SmartLead)</ListItem>
            <ListItem type="check">ICP development and Clay enrichment pipelines</ListItem>
            <ListItem type="check">AI-powered lead qualification (Anthropic via Clay)</ListItem>
            <ListItem type="check">Apollo email enrichment and verification</ListItem>
            <ListItem type="check">Campaign monitoring and reply management</ListItem>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title="Campaign Strategy" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <h4 className="font-semibold text-slate-900">Build Lead Lists</h4>
              <p className="text-sm text-slate-600">Use Clay to identify and enrich companies matching our ICP across EU, UK, and USA markets.</p>
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

function ICPTab() {
  return (
    <>
      <ContentSection title="Ideal Customer Profile" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded">
            <p className="font-semibold text-violet-900 mb-2">Primary Target</p>
            <p className="text-violet-800">
              B2B companies (10-200 employees) that rely on outbound sales but don't have an in-house
              SDR team or are looking to scale their pipeline without hiring.
            </p>
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Must-Have Characteristics:</h4>
          <ul className="space-y-2">
            <ListItem type="check">B2B company selling to other businesses</ListItem>
            <ListItem type="check">10-200 employees (SMB to mid-market)</ListItem>
            <ListItem type="check">Sells a service or SaaS product (not physical goods)</ListItem>
            <ListItem type="check">Has a website with clear value proposition</ListItem>
            <ListItem type="check">Revenue: $500K - $50M annual</ListItem>
            <ListItem type="check">English-speaking markets or English website</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Target Verticals:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'SaaS Companies',
              'Digital Agencies',
              'IT Consulting',
              'Marketing Agencies',
              'HR/Recruitment Tech',
              'FinTech / Payments',
              'Cybersecurity',
              'Data & Analytics',
              'Professional Services',
            ].map((vertical) => (
              <div key={vertical} className="bg-slate-100 px-3 py-2 rounded text-sm">
                {vertical}
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Red Flags (Disqualifiers)" icon={<Target className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="cross">B2C companies (selling to consumers)</ListItem>
          <ListItem type="cross">Companies under 10 employees (too small for agency spend)</ListItem>
          <ListItem type="cross">Enterprise companies (500+ employees) — they have in-house teams</ListItem>
          <ListItem type="cross">Physical product / eCommerce companies</ListItem>
          <ListItem type="cross">Companies already working with a lead gen agency</ListItem>
          <ListItem type="cross">Non-English website with no English market presence</ListItem>
          <ListItem type="cross">Outdated or broken website</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Target Geography" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 mb-3">Primary Markets:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'United States',
              'United Kingdom',
              'Germany',
              'Netherlands',
            ].map((country) => (
              <div key={country} className="bg-violet-100 px-3 py-2 rounded text-sm font-medium">
                {country}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-4 mb-3">Secondary Markets:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'Canada',
              'Australia',
              'Ireland',
              'Nordics (Sweden, Norway, Denmark)',
            ].map((country) => (
              <div key={country} className="bg-slate-100 px-3 py-2 rounded text-sm">
                {country}
              </div>
            ))}
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function FiltersTab() {
  return (
    <>
      <ContentSection title="Clay Search Criteria" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Primary Location" value="USA, UK, Germany, Netherlands" color="bg-violet-600 text-white" />
            <InfoCard label="Business Type" value="B2B Services & SaaS" color="bg-violet-600 text-white" />
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Company Size:</h4>
          <ul className="space-y-2">
            <ListItem>11-50 employees</ListItem>
            <ListItem>51-200 employees</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Industry Filters:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'IT Services and IT Consulting',
              'Software Development',
              'Technology, Information and Internet',
              'Marketing Services',
              'Business Consulting',
              'Staffing and Recruiting',
              'Financial Services',
              'Computer and Network Security',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Keywords:</h4>
          <CodeBlock code={`(SaaS OR "software company" OR "digital agency" OR "IT consulting" OR "marketing agency") AND (B2B OR "business to business" OR enterprise)`} />

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Revenue Filter:</h4>
          <ul className="space-y-2">
            <ListItem>$500K - $5M (sweet spot for SMB)</ListItem>
            <ListItem>$5M - $50M (mid-market)</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Additional Filters:</h4>
          <ul className="space-y-2">
            <ListItem type="check">Has active website</ListItem>
            <ListItem type="check">B2B filter enabled</ListItem>
            <ListItem type="check">LinkedIn company page active</ListItem>
            <ListItem type="check">Currently hiring for sales/SDR roles (buying signal)</ListItem>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded mt-4">
            <p className="font-semibold text-violet-900 mb-2">Buying Signals (High-Priority):</p>
            <p className="text-violet-800">
              Companies hiring for SDR/BDR roles, recently raised funding, or posting about
              scaling sales — these indicate active need for pipeline generation.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function PromptsTab() {
  const icpPrompt = `Determine whether this company matches the ICP for Intelsol lead generation services.

A match should be:
- B2B company (sells to other businesses)
- offers a service or SaaS product
- 10-200 employees
- has a clear value proposition on their website
- could benefit from outbound email campaigns to grow their pipeline

Not a match if:
- B2C company (sells to consumers)
- eCommerce or physical products only
- under 10 employees or over 500 employees
- website is outdated or broken
- already has a large in-house sales team (unlikely to outsource)
- non-English website with no English market

Only use information visible on the domain.`;

  const personalizationPrompt = `Based on the company website and LinkedIn data provided, write a personalized opening sentence for a cold email.

Rules:
- Reference something specific about the company (recent news, service they offer, market they serve)
- Keep it to 1 sentence, under 25 words
- Sound like a peer, not a salesperson
- Do NOT use hype words (revolutionary, game-changing, cutting-edge)
- Do NOT mention Intelsol or our services in the opener

Output only the personalized sentence, nothing else.`;

  return (
    <>
      <ContentSection title="ICP Matching Prompt (Anthropic)" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This prompt is used in Clay to analyze company websites and determine if they match Intelsol's ICP.
          </p>
          <CodeBlock code={icpPrompt} language="text" />
        </div>
      </ContentSection>

      <ContentSection title="Personalization Prompt" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Used to generate personalized email openers based on website and LinkedIn data.
          </p>
          <CodeBlock code={personalizationPrompt} language="text" />
        </div>
      </ContentSection>

      <ContentSection title="Matching Criteria Summary" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="font-medium text-green-900">GOOD MATCH</p>
            <p className="text-green-800 text-sm mt-1">
              B2B SaaS or services company with 10-200 employees, clear website, selling to businesses, could use outbound pipeline.
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="font-medium text-red-900">NOT A MATCH</p>
            <p className="text-red-800 text-sm mt-1">
              B2C company, physical products, too small or too large, broken website, or already has large in-house sales team.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function PersonasTab() {
  return (
    <>
      <ContentSection title="Buyer Personas" icon={<Users className="w-5 h-5" />}>
        <div className="space-y-6">
          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded">
            <p className="font-semibold text-violet-900 mb-2">Primary Decision-Makers</p>
            <p className="text-violet-800 text-sm">
              Target the people who own revenue growth and sales pipeline. They feel the pain of
              not having enough leads and have budget authority to hire an agency.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
              Founders & CEOs (Companies 10-50 employees)
            </h4>
            <ul className="ml-10 space-y-2">
              <ListItem>CEO / Founder / Co-Founder</ListItem>
              <ListItem>Managing Director</ListItem>
              <ListItem>Owner</ListItem>
              <ListItem>General Manager</ListItem>
            </ul>
            <div className="ml-10 mt-3 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              <p className="text-sm text-slate-700">
                <strong>Why:</strong> At this size, the founder typically owns sales and pipeline.
                They are doing outbound themselves and want to offload it.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
              Sales Leaders (Companies 50-200 employees)
            </h4>
            <ul className="ml-10 space-y-2">
              <ListItem>VP of Sales</ListItem>
              <ListItem>Head of Sales</ListItem>
              <ListItem>Sales Director</ListItem>
              <ListItem>Head of Business Development</ListItem>
              <ListItem>Director of Growth</ListItem>
              <ListItem>Revenue Operations Manager</ListItem>
            </ul>
            <div className="ml-10 mt-3 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              <p className="text-sm text-slate-700">
                <strong>Why:</strong> At this size, a dedicated sales leader owns pipeline targets.
                They need more leads than their SDR team can generate.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
              Marketing Leaders (Secondary)
            </h4>
            <ul className="ml-10 space-y-2">
              <ListItem>VP of Marketing</ListItem>
              <ListItem>Head of Demand Generation</ListItem>
              <ListItem>Marketing Director</ListItem>
              <ListItem>Growth Marketing Manager</ListItem>
            </ul>
            <div className="ml-10 mt-3 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              <p className="text-sm text-slate-700">
                <strong>Why:</strong> In some companies, marketing owns lead generation including outbound.
                Secondary target — only if sales leader not available.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Apollo Enrichment Settings" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 mb-2">Required Fields:</h4>
          <ul className="space-y-2">
            <ListItem type="check">First Name</ListItem>
            <ListItem type="check">Last Name</ListItem>
            <ListItem type="check">Job Title</ListItem>
            <ListItem type="check">Email Address</ListItem>
            <ListItem type="check">LinkedIn URL</ListItem>
            <ListItem type="check">Company Name</ListItem>
            <ListItem type="check">Company Website</ListItem>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded mt-4">
            <p className="font-semibold text-violet-900 mb-1">Enrichment Strategy:</p>
            <p className="text-violet-800 text-sm">
              Use Apollo enrichment first (1 credit). For personalization campaigns, also scrape
              LinkedIn posts and company website via Apify for opener generation.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
