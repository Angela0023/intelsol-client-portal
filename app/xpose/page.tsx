'use client';

import { useState } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, CodeBlock, InfoCard, ListItem } from '../components/ContentSection';
import { Target, Users, Filter, Code, TrendingUp, FileText } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'value-prop', label: 'Value Proposition', icon: TrendingUp },
  { id: 'icp', label: 'ICP Profile', icon: Target },
  { id: 'filters', label: 'Clay Filters', icon: Filter },
  { id: 'prompts', label: 'AI Prompts', icon: Code },
  { id: 'personas', label: 'Buyer Personas', icon: Users },
];

export default function XposePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">X</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Xpose Solutions</h1>
              <p className="text-slate-600">Healthcare Technology - Patient Coordination Systems</p>
            </div>
          </div>
          <a
            href="https://www.xposesolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
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
          {activeTab === 'value-prop' && <ValuePropTab />}
          {activeTab === 'icp' && <ICPTab />}
          {activeTab === 'filters' && <FiltersTab />}
          {activeTab === 'prompts' && <PromptsTab />}
          {activeTab === 'personas' && <PersonasTab />}
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
            Xpose Solutions specializes in <strong>patient coordination infrastructure</strong> for specialty healthcare clinics.
            They operate as a systems partner that builds and manages the operational systems between patient inquiry and booked consultation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Industry" value="Healthcare Technology" />
            <InfoCard label="Business Model" value="B2B SaaS" />
            <InfoCard label="Target Market" value="Specialty Healthcare Clinics" />
            <InfoCard label="Geographic Focus" value="United States" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Core Offering" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Patient Coordination Engine</h4>
          <p>
            A comprehensive system that manages the critical gap between when a patient first shows interest
            and when they book their first appointment.
          </p>

          <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-medium text-slate-900 mb-2">The Problem They Solve:</p>
            <p className="text-slate-700">
              Specialty clinics are generating patient inquiries but losing them due to slow follow-up,
              unclear ownership of coordination tasks, disconnected tools, booking leakage, and front desk overwhelm.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Key Services" icon={<Users className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="check">Multi-channel inquiry capture (website, calls, referrals, messages)</ListItem>
          <ListItem type="check">Automated patient management and follow-up workflows</ListItem>
          <ListItem type="check">Operational intelligence and conversion tracking</ListItem>
          <ListItem type="check">Integration with existing CRM platforms (no vendor replacement needed)</ListItem>
          <ListItem type="check">AI integration where it reduces friction</ListItem>
        </ul>
      </ContentSection>
    </>
  );
}

function ValuePropTab() {
  return (
    <>
      <ContentSection title="Value Propositions" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
              End-to-End Ownership Model
            </h4>
            <ul className="ml-10 space-y-1">
              <ListItem>Takes full responsibility for coordination process</ListItem>
              <ListItem>Outcome ownership, not just task delivery</ListItem>
              <ListItem>Clinic staff focus on patient care, not coordination</ListItem>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
              Integration-First Approach
            </h4>
            <ul className="ml-10 space-y-1">
              <ListItem>No need to replace existing vendors</ListItem>
              <ListItem>Works with current systems and tools</ListItem>
              <ListItem>Minimal disruption to operations</ListItem>
              <ListItem>Complements existing marketing agencies</ListItem>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
              Practical & Accessible
            </h4>
            <ul className="ml-10 space-y-1">
              <ListItem>Built for standard clinic operations teams</ListItem>
              <ListItem>No technical expertise required</ListItem>
              <ListItem>Easy implementation with low training burden</ListItem>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">4</span>
              Stabilization Before Growth
            </h4>
            <ul className="ml-10 space-y-1">
              <ListItem>Improves existing systems first</ListItem>
              <ListItem>Reduces chaos before adding complexity</ListItem>
              <ListItem>Cleaner handoffs and reduced manual burden</ListItem>
              <ListItem>Operational stability over growth-at-all-costs</ListItem>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Messaging Hooks" icon={<Target className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="font-medium text-blue-900 mb-1">Inquiry Leakage Hook</p>
            <p className="text-blue-800 text-sm italic">"Already generating inquiries but losing them to slow follow-up?"</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="font-medium text-green-900 mb-1">Front Desk Overwhelm Hook</p>
            <p className="text-green-800 text-sm italic">"Your front desk drowning in coordination tasks?"</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
            <p className="font-medium text-amber-900 mb-1">Conversion Gap Hook</p>
            <p className="text-amber-800 text-sm italic">"Spending on ads but losing momentum between inquiry and booking?"</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
            <p className="font-medium text-purple-900 mb-1">ROI Hook</p>
            <p className="text-purple-800 text-sm italic">"Improve your marketing ROI without spending more on ads"</p>
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
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-green-900 mb-2">Primary Target</p>
            <p className="text-green-800">Founder-led specialty healthcare clinics</p>
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Must-Have Characteristics:</h4>
          <ul className="space-y-2">
            <ListItem type="check">Already generating strong inquiry volume</ListItem>
            <ListItem type="check">Struggling with follow-through and conversion</ListItem>
            <ListItem type="check">Experiencing booking leakage</ListItem>
            <ListItem type="check">Using disconnected tools</ListItem>
            <ListItem type="check">Front desk overwhelmed with coordination tasks</ListItem>
            <ListItem type="check"><strong>Currently running paid ads</strong> (Google, Facebook, TikTok)</ListItem>
          </ul>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Target Specialties:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'Oncology',
              'Cosmetic Dermatology',
              'Plastic Surgery',
              'Rehabilitation Centers',
              'Gastroenterology',
              'Ophthalmology',
              'Orthopedics',
              'Wellness/Spa Services',
              'Beauty Clinics',
            ].map((specialty) => (
              <div key={specialty} className="bg-slate-100 px-3 py-2 rounded text-sm">
                {specialty}
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Red Flags (Disqualifiers)" icon={<Target className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="cross">Clinics without existing inquiry volume (not spending on ads/marketing)</ListItem>
          <ListItem type="cross">Practices looking for marketing/lead generation services</ListItem>
          <ListItem type="cross">General practitioners (not specialty clinics)</ListItem>
          <ListItem type="cross">Organizations wanting to replace all existing systems</ListItem>
        </ul>
      </ContentSection>

      <ContentSection title="Special Qualification Requirement" icon={<Filter className="w-5 h-5" />}>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="font-semibold text-amber-900 mb-2">Ad Platform Detection</p>
          <p className="text-amber-800">
            <strong>Critical Signal:</strong> The best match are clinics currently running ads on Google, Facebook, or TikTok.
            This indicates they are already generating inquiries and need help converting them.
          </p>
          <p className="text-amber-700 text-sm mt-2">
            Lead enrichment must detect if the clinic is using these advertising platforms.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Location" value="United States" color="bg-blue-600 text-white" />
            <InfoCard label="Business Type" value="B2B Specialty Clinics" color="bg-blue-600 text-white" />
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Industry Filters:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Healthcare',
              'Medical Practices',
              'Wellness and Fitness Services',
              'Hospitals and Health Care',
            ].map((industry) => (
              <div key={industry} className="bg-slate-100 px-3 py-2 rounded text-sm border border-slate-200">
                {industry}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Keywords:</h4>
          <CodeBlock code={`specialty clinic OR dermatology OR plastic surgery OR cosmetic OR oncology OR rehabilitation OR gastroenterology OR ophthalmology OR orthopedics OR beauty clinic`} />

          <h4 className="font-semibold text-slate-900 mt-6 mb-3">Company Size:</h4>
          <ul className="space-y-2">
            <ListItem>10-50 employees (small clinics)</ListItem>
            <ListItem>51-200 employees (medium clinics)</ListItem>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
            <p className="font-semibold text-blue-900 mb-2">Additional Enrichment Required:</p>
            <p className="text-blue-800">
              After initial filtering, enrich leads to detect if they are running Google Ads, Facebook Ads, or TikTok Ads.
              This is a critical qualification signal.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

function PromptsTab() {
  const icpPrompt = `You are analyzing a healthcare clinic's website to determine if they match our Ideal Customer Profile (ICP).

TARGET PROFILE:
- Specialty healthcare clinics (NOT general practitioners)
- Located in the United States
- Offers services in: oncology, cosmetic dermatology, plastic surgery, rehabilitation, gastroenterology, ophthalmology, orthopedics, wellness/spa, or beauty treatments
- Currently running patient acquisition campaigns (evidence: online booking, inquiry forms, visible marketing)
- Likely experiencing inquiry-to-booking conversion issues

ANALYZE THE WEBSITE FOR:
1. Specialty Focus: Is this a specialty clinic (not general practice)?
2. Location: Are they US-based?
3. Service Type: Do they offer specialty treatments listed above?
4. Patient Acquisition: Do they have online booking, inquiry forms, or other patient acquisition systems?
5. Clinic Type: Founder-led or independent (not large hospital system)?

OUTPUT:
- Answer: Yes / No / Unsure
- Reasoning: 2-3 sentence explanation
- Confidence: High / Medium / Low

Only answer "Yes" if you are confident this clinic matches our ICP.`;

  const adDetectionPrompt = `Check if this clinic is running paid advertising campaigns.

DETECTION SIGNALS:
- Google Ads: Check for ad spend indicators, PPC campaigns
- Facebook/Instagram Ads: Social media advertising presence
- TikTok Ads: TikTok advertising campaigns

OUTPUT:
- Running Ads: Yes / No / Unsure
- Platforms: List detected platforms
- Confidence: High / Medium / Low`;

  return (
    <>
      <ContentSection title="ICP Matching Prompt (Anthropic)" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This prompt is used in Clay to analyze clinic websites and determine if they match Xpose's ICP.
          </p>
          <CodeBlock code={icpPrompt} language="text" />
        </div>
      </ContentSection>

      <ContentSection title="Ad Platform Detection Prompt" icon={<Code className="w-5 h-5" />}>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This prompt/enrichment detects if a clinic is running paid ads (critical qualification signal).
          </p>
          <CodeBlock code={adDetectionPrompt} language="text" />
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="font-semibold text-amber-900 mb-1">Note:</p>
            <p className="text-amber-800 text-sm">
              Matej mentioned finding a specialized tool/API for ad platform detection.
              This will be integrated in Clay via Apify or custom API.
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
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">S</span>
              Small Clinics (10-50 employees)
            </h4>
            <p className="text-slate-600 text-sm mb-3">
              Target key decision makers and clinic leaders
            </p>
            <ul className="ml-10 space-y-2">
              <ListItem>Owner</ListItem>
              <ListItem>Founder</ListItem>
              <ListItem>Medical Director</ListItem>
              <ListItem>Managing Director</ListItem>
              <ListItem>Practice Manager</ListItem>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">M</span>
              Medium to Large Clinics (50+ employees)
            </h4>
            <p className="text-slate-600 text-sm mb-3">
              Target operations and marketing roles
            </p>
            <ul className="ml-10 space-y-2">
              <ListItem>Operations Manager</ListItem>
              <ListItem>Patient Coordinator</ListItem>
              <ListItem>Marketing Manager</ListItem>
              <ListItem>Practice Administrator</ListItem>
              <ListItem>Director of Operations</ListItem>
              <ListItem>Chief Operating Officer (COO)</ListItem>
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

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
            <p className="font-semibold text-blue-900 mb-1">Note:</p>
            <p className="text-blue-800 text-sm">
              Use Apollo enrichment first (1 credit per contact). Only use Clay waterfall if Apollo doesn't provide enough emails (more expensive at 5-6 credits).
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
