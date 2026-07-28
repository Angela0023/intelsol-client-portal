'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, CodeBlock, InfoCard, ListItem } from '../components/ContentSection';
import TasksTab, { INTELSOL_DEFAULT_TASKS } from '../components/TasksTab';
import PerformanceTab, { INTELSOL_DEFAULT_METRICS } from '../components/PerformanceTab';
import StatusBadge, { getClientStatus, setClientStatus, DEFAULT_STATUSES, type ClientStatus } from '../components/StatusBadge';
import { FileText, BarChart3, CheckSquare, TrendingUp, Target, Filter, Code, Users, BookOpen } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'icp', label: 'ICP Profile', icon: Target },
  { id: 'filters', label: 'Clay Filters', icon: Filter },
  { id: 'prompts', label: 'AI Prompts', icon: Code },
  { id: 'personas', label: 'Buyer Personas', icon: Users },
  { id: 'sops', label: 'SOPs', icon: BookOpen },
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
          {activeTab === 'sops' && <SOPsTab />}
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
            <ListItem type="check">20-200 employees (sweet spot: 50-100)</ListItem>
            <ListItem type="check">Sells services, SaaS, OR physical/industrial B2B products</ListItem>
            <ListItem type="check">High-ticket offers ($20K+ per deal)</ListItem>
            <ListItem type="check">Active sales process (not just distributors)</ListItem>
            <ListItem type="check">Has a website with clear value proposition</ListItem>
            <ListItem type="check">EU markets (Belgium, Netherlands, Germany, Austria, Switzerland, France, UK, Nordics)</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Target Verticals:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'SaaS Companies',
              'IT Consulting',
              'Management Consulting',
              'Industrial Automation',
              'Manufacturing Equipment',
              'Medical Equipment (B2B)',
              'Software Development',
              'Cybersecurity',
              'Data & Analytics',
              'Professional Services',
              'Business Consulting',
              'Industrial Machinery',
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
          <ListItem type="cross">eCommerce selling low-ticket consumer goods</ListItem>
          <ListItem type="cross">Companies under 20 employees or over 200 employees</ListItem>
          <ListItem type="cross">Recruitment/staffing agencies</ListItem>
          <ListItem type="cross">Companies selling only through distributors (no direct sales)</ListItem>
          <ListItem type="cross">Commodity/low-margin businesses</ListItem>
          <ListItem type="cross">Non-EU website with no European market presence</ListItem>
          <ListItem type="cross">Outdated or broken website</ListItem>
          <ListItem type="cross">Already has large in-house SDR/sales team</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Target Geography" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 mb-3">Primary Markets:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'Belgium',
              'Netherlands',
              'Germany',
              'Austria',
              'Switzerland',
              'France',
            ].map((country) => (
              <div key={country} className="bg-violet-100 px-3 py-2 rounded text-sm font-medium">
                {country}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-4 mb-3">Secondary Markets:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'United Kingdom',
              'Sweden',
              'Norway',
              'Denmark',
              'Finland',
              'Other EU',
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
            <InfoCard label="Primary Location" value="Belgium, Netherlands, Germany, Austria, Switzerland, France" color="bg-violet-600 text-white" />
            <InfoCard label="Business Type" value="B2B Services, SaaS, & Industrial Products" color="bg-violet-600 text-white" />
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Company Size:</h4>
          <ul className="space-y-2">
            <ListItem>20-50 employees</ListItem>
            <ListItem>51-100 employees (sweet spot)</ListItem>
            <ListItem>101-200 employees</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Industry Filters:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'IT Services and IT Consulting',
              'Software Development',
              'Management Consulting',
              'Business Consulting',
              'Industrial Automation',
              'Automation Machinery Manufacturing',
              'Industrial Machinery Manufacturing',
              'Medical Equipment Manufacturing',
              'Commercial and Service Industry Machinery',
              'Measuring and Control Instrument Manufacturing',
              'Computer and Network Security',
              'Technology, Information and Internet',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Keywords:</h4>
          <CodeBlock code={`(SaaS OR "software company" OR "IT consulting" OR "management consulting" OR "industrial automation" OR "manufacturing equipment" OR "medical equipment" OR "machinery") AND (B2B OR "business to business" OR enterprise OR industrial)`} />

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Revenue Filter:</h4>
          <ul className="space-y-2">
            <ListItem>$10M - $50M (sweet spot)</ListItem>
            <ListItem>$50M - $100M (upper mid-market)</ListItem>
          </ul>
          <p className="text-sm text-slate-600 mt-2">
            High-ticket B2B: Companies selling $20K+ deals typically have $10M+ annual revenue
          </p>

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
- B2B company (sells to other businesses, NOT consumers)
- Offers one of the following:
  • Service company (IT services, consulting, professional services)
  • SaaS product
  • Physical/industrial products sold B2B (manufacturing, industrial equipment, wholesale, machinery, medical equipment, automation, etc.)
- 20-200 employees (sweet spot: 50-100 employees)
- High-ticket offers - Products/services valued at $20K+ per deal
- Active sales process - Need to prospect and acquire new clients (not just passive/distributor model)
- Has a clear value proposition on their website
- Could benefit from outbound email campaigns to grow their pipeline
- Geographic focus: Belgium, Netherlands, Germany, Austria, Switzerland, France (primary); UK, Nordics, other EU (secondary)

Not a match if:
- B2C company (sells to consumers)
- eCommerce selling low-ticket consumer goods
- Under 20 employees or over 200 employees
- Recruitment/staffing agencies
- Companies selling only through distributors (no direct sales)
- Commodity/low-margin businesses
- Website is outdated or broken
- Already has a large in-house SDR/sales team (unlikely to outsource)
- Non-English/non-EU website with no European market presence

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
              B2B company (services, SaaS, OR industrial/manufacturing) with 20-200 employees, high-ticket offers ($20K+), active sales process, located in EU markets, clear website.
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="font-medium text-red-900">NOT A MATCH</p>
            <p className="text-red-800 text-sm mt-1">
              B2C company, low-ticket consumer eCommerce, too small (&lt;20) or too large (&gt;200), distributors-only, commodity business, broken website, or already has large in-house SDR team.
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

function SOPsTab() {
  return (
    <>
      <ContentSection title="Lead Generation SOP" icon={<BookOpen className="w-5 h-5" />}>
        <div className="space-y-6">
          <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded">
            <p className="font-semibold text-violet-900 mb-2">Complete 30-Step Workflow</p>
            <p className="text-violet-800 text-sm">
              From initial lead sourcing through email enrichment, verification, personalization, and campaign launch.
              Three-stage waterfall enrichment (Expandi → Prospeo → Apollo) + Clay personalization split testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard label="Total Steps" value="30" color="bg-violet-600 text-white" />
            <InfoCard label="Tools Used" value="8" color="bg-violet-600 text-white" />
            <InfoCard label="Final Campaigns" value="3" color="bg-violet-600 text-white" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Phase 1: Lead Sourcing & Initial Enrichment" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Search for Leads (Sales Navigator)</h4>
              <p className="text-sm text-slate-600 mt-1">Use filters from the Clay Filters tab to source raw lead list from LinkedIn Sales Navigator.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Enrich with Expandi</h4>
              <p className="text-sm text-slate-600 mt-1">Upload lead list to Expandi and run email enrichment.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3-4</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Verify Emails (Million Verifier)</h4>
              <p className="text-sm text-slate-600 mt-1">Run all Expandi emails through Million Verifier. Remove emails flagged as "bad".</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5-6</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Check Risky Emails (Bounce Ban)</h4>
              <p className="text-sm text-slate-600 mt-1">Run "risky" emails from Million Verifier through Bounce Ban. Remove emails flagged as "bad".</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">7-8</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Mark Verified & Split Lists</h4>
              <p className="text-sm text-slate-600 mt-1">Mark remaining Expandi emails as "verified". Create two lists: "Expandi Leads" (with emails) and "No Emails" (without).</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Phase 2: Secondary Enrichment (Prospeo)" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">9</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Run No-Email Leads on Prospeo</h4>
              <p className="text-sm text-slate-600 mt-1">Upload "No Emails" list to Prospeo for email enrichment.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">10-13</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Verify Prospeo Emails</h4>
              <p className="text-sm text-slate-600 mt-1">Run Prospeo emails through Million Verifier → remove bad → check risky via Bounce Ban → remove bad → mark verified.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">14-15</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Merge Prospeo Leads</h4>
              <p className="text-sm text-slate-600 mt-1">Add all verified Prospeo leads to the "Expandi Leads" master list.</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Phase 3: Tertiary Enrichment (Apollo)" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">16</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Run Remaining Leads on Apollo</h4>
              <p className="text-sm text-slate-600 mt-1">Use Apollo enrichment for remaining leads without email addresses.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">17-20</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Verify Apollo Emails</h4>
              <p className="text-sm text-slate-600 mt-1">Run Apollo emails through Million Verifier → remove bad → check risky via Bounce Ban → remove bad → mark verified.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">21-23</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Merge Apollo Leads & Archive</h4>
              <p className="text-sm text-slate-600 mt-1">Add verified Apollo leads to "Expandi Leads". Archive remaining no-email leads for future processing.</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Phase 4: Personalization Setup (Clay)" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">24-26</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Split & Import to Clay Templates</h4>
              <p className="text-sm text-slate-600 mt-1">Split verified leads 50-50. Copy Personalization Template V1 and V2 in Clay. Import 50% to V1, 50% to V2.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">27</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Run Apify Website Scrape</h4>
              <p className="text-sm text-slate-600 mt-1">In both V1 and V2, run "Run Apify Website Scrape" column. Wait for completion.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">28</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Run Personalization Sentence</h4>
              <p className="text-sm text-slate-600 mt-1">Once scraping completes, run "Personalization Sentence" column in both V1 and V2. AI generates personalized openers.</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Phase 5: Campaign Segmentation & Launch" icon={<CheckSquare className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">29</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Extract & Launch Personalized Leads</h4>
              <p className="text-sm text-slate-600 mt-1">
                Filter V1 and V2 for leads where Personalisation_Sentece is NOT empty and does NOT contain "NO_SIGNAL".
                Download as CSV. Create <strong>Campaign 1</strong> (V1 personalized) and <strong>Campaign 2</strong> (V2 personalized) in SmartLead.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">30</span>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Extract & Launch Non-Personalized Leads</h4>
              <p className="text-sm text-slate-600 mt-1">
                Filter V1 and V2 for leads where Personalisation_Sentece IS empty OR CONTAINS "NO_SIGNAL".
                Combine both lists into one. Create <strong>Campaign 3</strong> (non-personalized) in SmartLead.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
          <p className="font-semibold text-green-900 mb-2">Final Output</p>
          <ul className="text-green-800 text-sm space-y-1">
            <ListItem type="check">Campaign 1: Personalized leads from Template V1</ListItem>
            <ListItem type="check">Campaign 2: Personalized leads from Template V2</ListItem>
            <ListItem type="check">Campaign 3: Non-personalized leads (V1 + V2 combined)</ListItem>
            <ListItem type="check">All emails verified via Million Verifier + Bounce Ban</ListItem>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title="Tools Reference" icon={<Code className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { tool: 'Sales Navigator', purpose: 'Lead sourcing', steps: '1' },
            { tool: 'Expandi', purpose: 'Email enrichment (primary)', steps: '2' },
            { tool: 'Million Verifier', purpose: 'Email verification', steps: '3, 10, 17' },
            { tool: 'Bounce Ban', purpose: 'Secondary verification (risky emails)', steps: '5, 12, 19' },
            { tool: 'Prospeo', purpose: 'Email enrichment (secondary)', steps: '9' },
            { tool: 'Apollo', purpose: 'Email enrichment (tertiary)', steps: '16' },
            { tool: 'Clay', purpose: 'Personalization (Apify + AI)', steps: '25-28' },
            { tool: 'SmartLead', purpose: 'Campaign management & sending', steps: '29-30' },
          ].map((item) => (
            <div key={item.tool} className="bg-slate-50 border border-slate-200 p-3 rounded">
              <p className="font-semibold text-slate-900 text-sm">{item.tool}</p>
              <p className="text-xs text-slate-600 mt-1">{item.purpose}</p>
              <p className="text-xs text-violet-600 mt-1">Steps: {item.steps}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Quality Control Checklist" icon={<CheckSquare className="w-5 h-5" />}>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900 mb-3">Before launching campaigns, verify:</p>
          <ul className="space-y-2">
            <ListItem type="check">All emails verified through Million Verifier AND Bounce Ban</ListItem>
            <ListItem type="check">"Bad" emails removed at each verification stage</ListItem>
            <ListItem type="check">Personalized leads split correctly between V1 and V2</ListItem>
            <ListItem type="check">Non-personalized leads from V1 and V2 combined into one campaign</ListItem>
            <ListItem type="check">All Google Sheets updated with verification labels</ListItem>
            <ListItem type="check">"No Emails" list archived for future use</ListItem>
            <ListItem type="check">Campaign variables correctly mapped in SmartLead</ListItem>
          </ul>
        </div>
      </ContentSection>
    </>
  );
}
