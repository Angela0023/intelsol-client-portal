'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, CodeBlock, InfoCard, ListItem } from '../components/ContentSection';
import TasksTab, { TSLAB_DEFAULT_TASKS } from '../components/TasksTab';
import PerformanceTab, { EMPTY_METRICS } from '../components/PerformanceTab';
import StatusBadge, { getClientStatus, setClientStatus, DEFAULT_STATUSES, type ClientStatus } from '../components/StatusBadge';
import { Target, Users, Filter, Code, TrendingUp, FileText, CheckSquare, BarChart3 } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'icp', label: 'ICP Profile', icon: Target },
  { id: 'filters', label: 'Clay Filters', icon: Filter },
  { id: 'prompts', label: 'AI Prompts', icon: Code },
  { id: 'personas', label: 'Buyer Personas', icon: Users },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
];

export default function TSLabPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<ClientStatus>('Active');

  useEffect(() => {
    setStatus(getClientStatus('tslab', DEFAULT_STATUSES.tslab));
  }, []);

  const handleStatusChange = (newStatus: ClientStatus) => {
    setStatus(newStatus);
    setClientStatus('tslab', newStatus);
  };

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">TS</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-slate-900">TS Lab</h1>
                <StatusBadge status={status} onStatusChange={handleStatusChange} size="md" />
              </div>
              <p className="text-slate-600">Food Supplement Capsule Manufacturing (Slovenia)</p>
            </div>
          </div>
          <a
            href="https://tslab.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:underline"
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
            <PerformanceTab clientId="tslab" defaultMetrics={EMPTY_METRICS} hasData={false} />
          )}
          {activeTab === 'tasks' && (
            <TasksTab clientId="tslab" defaultTasks={TSLAB_DEFAULT_TASKS} />
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
            TS Lab is a Slovenia-based food supplement capsule manufacturer. They produce capsules for other
            companies through B2B white-label manufacturing services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Industry" value="Food Supplement Manufacturing" />
            <InfoCard label="Business Model" value="B2B White-Label Manufacturing" />
            <InfoCard label="Location" value="Slovenia" />
            <InfoCard label="Service Type" value="Capsule/Tablet Production" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="What TS Lab Offers" icon={<TrendingUp className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="check">White-label capsule and tablet manufacturing</ListItem>
          <ListItem type="check">Custom supplement formulation</ListItem>
          <ListItem type="check">Production capacity for companies needing additional manufacturing</ListItem>
          <ListItem type="check">B2B partnerships with supplement brands</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Target Market Summary" icon={<Target className="w-5 h-5" />}>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="font-semibold text-green-900 mb-2">Who TS Lab Serves:</p>
          <p className="text-green-800">
            Companies that sell food supplements in capsule/tablet form with 20+ employees,
            operating in EU/UK markets, and needing manufacturing capacity or partnerships.
          </p>
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
          <h4 className="font-semibold text-slate-900 mb-3">MUST HAVE:</h4>
          <ul className="space-y-2">
            <ListItem type="check">Sells food supplements</ListItem>
            <ListItem type="check">Products are in capsule/tablet form (NOT only powders or bars)</ListItem>
            <ListItem type="check">20+ employees</ListItem>
            <ListItem type="check">Has online store or retail shop</ListItem>
            <ListItem type="check">Multiple supplement brands</ListItem>
            <ListItem type="check">Located in EU or UK</ListItem>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
            <p className="font-semibold text-blue-900 mb-2">Important Note:</p>
            <p className="text-blue-800 text-sm">
              Companies with their own manufacturing facility are NOT disqualified - they may need additional capacity.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Disqualifiers" icon={<Target className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="cross">Only sells protein powders or bars (no capsules)</ListItem>
          <ListItem type="cross">Private label (PL) manufacturing facilities</ListItem>
          <ListItem type="cross">White label (WL) manufacturing facilities</ListItem>
          <ListItem type="cross">Only pharmacy selling prescription drugs</ListItem>
          <ListItem type="cross">MLM companies</ListItem>
          <ListItem type="cross">Website is old or broken</ListItem>
          <ListItem type="cross">Under 20 employees</ListItem>
          <ListItem type="cross">Outside EU/UK</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Target Countries" icon={<Filter className="w-5 h-5" />}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'United Kingdom',
            'Germany',
            'Netherlands',
            'Poland',
            'Austria',
            'Italy',
            'Belgium',
            'Ireland',
            'Sweden',
            'Norway',
          ].map((country) => (
            <div key={country} className="bg-green-100 px-3 py-2 rounded text-sm">
              {country}
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mt-4">
          <p className="font-semibold text-amber-900 mb-1">Note:</p>
          <p className="text-amber-800 text-sm">
            France is excluded due to language concerns (no French speakers at TS Lab).
          </p>
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
          <h4 className="font-semibold text-slate-900 mb-3">Location:</h4>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="font-semibold text-amber-900 mb-1">Important:</p>
            <p className="text-amber-800 text-sm">
              Select <strong>ONE country at a time</strong> from the 10 target countries.
            </p>
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Company Size:</h4>
          <ul className="space-y-2">
            <ListItem>21-50 employees</ListItem>
            <ListItem>51-200 employees</ListItem>
            <ListItem>201-500 employees</ListItem>
            <ListItem>501-1000 employees</ListItem>
            <ListItem>1001-5000 employees</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Industry Filters:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Wellness and Fitness Services',
              'Retail Health and Personal Care Products',
              'Food and Beverage Services',
              'Retail Vitamins and Supplements',
              'Health and Wellness Products',
              'Alternative Medicine',
              'Nutrition',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Keywords:</h4>
          <CodeBlock code={`supplements OR vitamins OR "food supplements" OR "dietary supplements"`} />
        </div>
      </ContentSection>
    </>
  );
}

function PromptsTab() {
  const icpPrompt = `You are analyzing a company's website to determine if they match our Ideal Customer Profile (ICP) for supplement capsule manufacturing.

TARGET PROFILE:
- Company sells food supplements (vitamins, minerals, herbal supplements, etc.)
- Products include capsules or tablets (NOT just powders or bars)
- Has online store or retail presence
- Multiple supplement brands/products
- 20+ employees
- Located in EU or UK
- NOT a manufacturing facility (PL/WL)
- NOT MLM company
- NOT just a pharmacy selling prescriptions
- Website is modern and functional

ANALYZE THE WEBSITE FOR:
1. Product Type: Do they sell food supplements in capsule/tablet form?
2. Business Model: Are they a brand/retailer (not a manufacturer)?
3. Product Range: Do they have multiple supplement products?
4. Sales Channels: Online store or retail presence visible?
5. Company Type: Legitimate supplement company (not MLM, not pharmacy-only)?
6. Website Quality: Is the website modern and functional?

OUTPUT:
- Answer: Yes / No / Unsure
- Reasoning: 2-3 sentence explanation explaining what products they sell and why they match or don't match
- Confidence: High / Medium / Low

Only answer "Yes" if you are confident this company:
- Sells food supplements in capsule/tablet form
- Is NOT a manufacturing facility
- Has a proper online presence
- Appears to be a legitimate supplement brand/retailer`;

  return (
    <>
      <ContentSection title="ICP Matching Prompt (Anthropic)" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This prompt is used in Clay to analyze company websites and determine if they match TS Lab's ICP.
          </p>
          <CodeBlock code={icpPrompt} language="text" />
        </div>
      </ContentSection>

      <ContentSection title="Key Matching Criteria" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="font-medium text-green-900">✓ GOOD MATCH</p>
            <p className="text-green-800 text-sm mt-1">
              Company selling vitamins, minerals, or herbal supplements in capsule form with online store and multiple products.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="font-medium text-red-900">✗ NOT A MATCH</p>
            <p className="text-red-800 text-sm mt-1">
              Only sells protein powders, only operates as pharmacy, is itself a manufacturer, or is an MLM company.
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
      <ContentSection title="Buyer Personas by Company Size" icon={<Users className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">S</span>
              Small to Mid-Size Companies (20-100 employees)
            </h4>
            <ul className="ml-10 space-y-2">
              <ListItem>Owner</ListItem>
              <ListItem>Founder</ListItem>
              <ListItem>Managing Director</ListItem>
              <ListItem>General Manager</ListItem>
              <ListItem>Operations Director</ListItem>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">L</span>
              Larger Companies (100+ employees)
            </h4>
            <ul className="ml-10 space-y-2">
              <ListItem>Procurement Manager</ListItem>
              <ListItem>Purchasing Manager</ListItem>
              <ListItem>Supply Chain Manager</ListItem>
              <ListItem>Procurement Director</ListItem>
              <ListItem>Category Manager (Supplements)</ListItem>
              <ListItem>Operations Manager</ListItem>
              <ListItem>COO</ListItem>
              <ListItem>Product Manager</ListItem>
              <ListItem>Business Development Manager</ListItem>
            </ul>
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
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
            <p className="font-semibold text-green-900 mb-1">Enrichment Strategy:</p>
            <p className="text-green-800 text-sm">
              Use Apollo enrichment first (1 credit per contact). Only use Clay waterfall if Apollo doesn't provide enough emails (more expensive at 5-6 credits).
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
