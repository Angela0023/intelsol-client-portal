'use client';

import { useState } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, CodeBlock, InfoCard, ListItem } from '../components/ContentSection';
import { Target, Users, Filter, Code, TrendingUp, FileText, Layers } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'tier1', label: 'Tier 1 - Strategic', icon: TrendingUp },
  { id: 'tier2', label: 'Tier 2 - Growth', icon: Layers },
  { id: 'filters', label: 'Clay Filters', icon: Filter },
  { id: 'prompts', label: 'AI Prompts', icon: Code },
];

export default function BeeItPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-600">B</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">BeeIt</h1>
              <p className="text-slate-600">eCommerce Development Agency Partner Program</p>
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
          {activeTab === 'tier1' && <Tier1Tab />}
          {activeTab === 'tier2' && <Tier2Tab />}
          {activeTab === 'filters' && <FiltersTab />}
          {activeTab === 'prompts' && <PromptsTab />}
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
            BeeIt Track B targets <strong>digital agencies</strong> and <strong>system integrators</strong> that
            need white-label eCommerce development capacity for their clients.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="font-semibold text-amber-900 mb-2">Target Audience:</p>
            <p className="text-amber-800">
              Agencies that build eCommerce solutions on Magento, Salesforce Commerce Cloud (SFCC), and Adobe Commerce
              but need additional development capacity or specialized expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InfoCard label="Platforms" value="Magento, SFCC, Adobe Commerce" />
            <InfoCard label="Markets" value="Benelux, DACH, UK, USA" />
            <InfoCard label="Partner Type" value="White-Label Development" />
            <InfoCard label="Service Model" value="Sub-contracting / Capacity" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Two-Tier Strategy" icon={<Layers className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">Tier 1: Strategic Agency Partners</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <ListItem>Large full-service agencies (50-300 staff)</ListItem>
              <ListItem>€10M+ annual revenue</ListItem>
              <ListItem>Deal Size: €80k - €350k+</ListItem>
              <ListItem>Long sales cycle (4-8 months)</ListItem>
              <ListItem>High-volume sub-contracted work</ListItem>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <h4 className="font-semibold text-green-900 mb-2">Tier 2: Growth Agency Partners</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <ListItem>Mid-size digital agencies (15-80 staff)</ListItem>
              <ListItem>€2M - €10M annual revenue</ListItem>
              <ListItem>Deal Size: €20k - €80k+</ListItem>
              <ListItem>Medium sales cycle (4-8 weeks)</ListItem>
              <ListItem>Steady ongoing project work</ListItem>
            </ul>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function Tier1Tab() {
  return (
    <>
      <ContentSection title="Tier 1: Strategic Agency Partners" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Deal Size" value="€80,000 - €350,000+" color="bg-blue-600 text-white" />
            <InfoCard label="Sales Cycle" value="4 - 8 months" color="bg-blue-600 text-white" />
            <InfoCard label="Agency Revenue" value="€10M+" color="bg-blue-600 text-white" />
            <InfoCard label="Agency Size" value="50 - 300 staff" color="bg-blue-600 text-white" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Target Buyer Personas (Tier 1)" icon={<Users className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem>SVP/VP of Delivery / Director of Delivery</ListItem>
          <ListItem>CEO / Managing Director</ListItem>
          <ListItem>Chief Technology Officer (CTO)</ListItem>
          <ListItem>VP of Engineering</ListItem>
          <ListItem>Head of Client Services</ListItem>
          <ListItem>Engagement Director</ListItem>
          <ListItem>Practice Lead (Commerce / Salesforce)</ListItem>
          <ListItem>Solutions Architect</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Prospecting Signals (Tier 1)" icon={<Target className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="check">Salesforce or Adobe partner needing SFCC/Magento dev capacity</ListItem>
          <ListItem type="check">Has enterprise retainer but lacking certified technical depth</ListItem>
          <ListItem type="check">Expanding geographic footprint (USA to Europe or vice versa)</ListItem>
          <ListItem type="check">Recently lost senior developer or had team reduction</ListItem>
          <ListItem type="check">Listed and active on Salesforce AppExchange</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Persona Example: VP of Delivery (USA)" icon={<Users className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded">
            <p className="font-semibold text-slate-900 mb-2">Goals:</p>
            <ul className="text-slate-700 text-sm space-y-1">
              <ListItem>Deliver client projects on time and on budget without burning internal team</ListItem>
              <ListItem>Access certified SFCC and Magento talent fast</ListItem>
              <ListItem>White-label development where client is managed by the agency</ListItem>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 mb-2">Pain Points:</p>
            <ul className="text-red-800 text-sm space-y-1">
              <ListItem>Cannot find reliable nearshore/offshore partners matching quality bar</ListItem>
              <ListItem>Previous partners missed deadlines and damaged client relationships</ListItem>
              <ListItem>Timezone gaps cause review and approval delays</ListItem>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-green-900 mb-2">Buying Triggers:</p>
            <ul className="text-green-800 text-sm space-y-1">
              <ListItem>Winning new enterprise client requiring SFCC development</ListItem>
              <ListItem>Internal dev team overloaded with concurrent projects</ListItem>
              <ListItem>Existing nearshore/offshore partner failed on key delivery</ListItem>
            </ul>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function Tier2Tab() {
  return (
    <>
      <ContentSection title="Tier 2: Growth Agency Partners" icon={<Layers className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Deal Size" value="€20,000 - €80,000+" color="bg-green-600 text-white" />
            <InfoCard label="Sales Cycle" value="4 - 8 weeks" color="bg-green-600 text-white" />
            <InfoCard label="Agency Revenue" value="€2M - €10M" color="bg-green-600 text-white" />
            <InfoCard label="Agency Size" value="15 - 80 staff" color="bg-green-600 text-white" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Target Buyer Personas (Tier 2)" icon={<Users className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem>CEO / Founder (boutique agency)</ListItem>
          <ListItem>Head of Delivery</ListItem>
          <ListItem>Project Director</ListItem>
          <ListItem>Technical Lead / Lead Developer</ListItem>
          <ListItem>Head of eCommerce Practice</ListItem>
          <ListItem>Account Director</ListItem>
          <ListItem>Head of Partnerships</ListItem>
          <ListItem>Operations Director</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Prospecting Signals (Tier 2)" icon={<Target className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="check">Active on Clutch with eCommerce clients in portfolio</ListItem>
          <ListItem type="check">Posts about Magento or SFCC on LinkedIn regularly</ListItem>
          <ListItem type="check">Currently hiring for senior developer roles (capacity issues)</ListItem>
          <ListItem type="check">Client base overlaps with Fashion, Retail, or FMCG sectors</ListItem>
          <ListItem type="check">Strong design/strategy capability but limited development bench</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Persona Example: CEO/Founder (Netherlands)" icon={<Users className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded">
            <p className="font-semibold text-slate-900 mb-2">Goals:</p>
            <ul className="text-slate-700 text-sm space-y-1">
              <ListItem>Scale project delivery without growing full-time headcount</ListItem>
              <ListItem>Take on Magento Enterprise clients currently out of reach</ListItem>
              <ListItem>Improve delivery margins on existing project portfolio</ListItem>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 mb-2">Pain Points:</p>
            <ul className="text-red-800 text-sm space-y-1">
              <ListItem>Small team overwhelmed when multiple large projects run concurrently</ListItem>
              <ListItem>Cannot find reliable Magento developers locally at competitive rates</ListItem>
              <ListItem>Clients pushing for faster delivery windows than team can support</ListItem>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-green-900 mb-2">What Makes Them Say Yes:</p>
            <ul className="text-green-800 text-sm space-y-1">
              <ListItem>Demonstrated portfolio overlap (similar projects/clients)</ListItem>
              <ListItem>Flexible engagement model: T&M or fixed price</ListItem>
              <ListItem>Low-stakes pilot project to prove quality within two weeks</ListItem>
            </ul>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function FiltersTab() {
  return (
    <>
      <ContentSection title="Geographic Targeting" icon={<Filter className="w-5 h-5" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'Netherlands',
            'Belgium',
            'Luxembourg',
            'Germany',
            'Austria',
            'Switzerland',
            'United Kingdom',
            'United States',
          ].map((country) => (
            <div key={country} className="bg-amber-100 px-3 py-2 rounded text-sm">
              {country}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Tier 1: Strategic Agencies - Clay Filters" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 mb-2">Company Size:</h4>
          <ul className="space-y-1">
            <ListItem>51-200 employees</ListItem>
            <ListItem>201-500 employees</ListItem>
            <ListItem>501-1000 employees</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-4 mb-2">Company Revenue:</h4>
          <ul className="space-y-1">
            <ListItem>$10M-$50M</ListItem>
            <ListItem>$50M-$100M</ListItem>
            <ListItem>$100M-$500M</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-4 mb-2">Industry:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'IT Services and IT Consulting',
              'Software Development',
              'Technology, Information and Internet',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-4 mb-2">Keywords:</h4>
          <CodeBlock code={`(Salesforce OR SFCC OR "commerce cloud" OR Magento OR "magento enterprise") AND (agency OR "system integrator" OR consultancy)`} />
        </div>
      </ContentSection>

      <ContentSection title="Tier 2: Growth Agencies - Clay Filters" icon={<Filter className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 mb-2">Company Size:</h4>
          <ul className="space-y-1">
            <ListItem>11-50 employees</ListItem>
            <ListItem>51-200 employees</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-4 mb-2">Industry:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'IT Services and IT Consulting',
              'Software Development',
              'Technology, Information and Internet',
              'Advertising Services',
              'Design Services',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-4 mb-2">Keywords:</h4>
          <CodeBlock code={`(agency OR consultancy OR digital) AND (ecommerce OR magento OR salesforce OR SFCC OR "commerce cloud")`} />
        </div>
      </ContentSection>
    </>
  );
}

function PromptsTab() {
  const icpPrompt = `Determine whether this company matches the ICP for BeeIt Track B (Agency Partners).

A match should be:
- digital agency or consultancy
- does eCommerce development
- mentions Magento, Salesforce Commerce Cloud (SFCC), or Adobe Commerce
- shows case studies or client work
- website looks professional

Not a match if:
- pure design agency (no development)
- pure marketing agency (no tech builds)
- only does basic websites (WordPress, Wix, Squarespace)
- freelancer or very small team
- website is old or broken
- pure Shopify agency (basic Shopify only)

Only use information visible on the domain.

OUTPUT:
- Answer: Yes / No / Unsure
- Reasoning: 2-3 sentence explanation
- Confidence: High / Medium / Low`;

  return (
    <>
      <ContentSection title="ICP Matching Prompt (Anthropic)" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This prompt is used in Clay to analyze agency websites and determine if they match BeeIt's ICP for Track B.
          </p>
          <CodeBlock code={icpPrompt} language="text" />
        </div>
      </ContentSection>

      <ContentSection title="Matching Criteria Summary" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="font-medium text-green-900">✓ GOOD MATCH</p>
            <p className="text-green-800 text-sm mt-1">
              Digital agency building eCommerce solutions on Magento or SFCC with professional portfolio and case studies.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="font-medium text-red-900">✗ NOT A MATCH</p>
            <p className="text-red-800 text-sm mt-1">
              Pure design/marketing agency, basic website builders (WordPress only), freelancers, or agencies with broken/old websites.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
