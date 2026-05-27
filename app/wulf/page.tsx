'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';
import { ContentSection, InfoCard, ListItem } from '../components/ContentSection';
import TasksTab from '../components/TasksTab';
import PerformanceTab, { EMPTY_METRICS } from '../components/PerformanceTab';
import StatusBadge, { getClientStatus, setClientStatus, DEFAULT_STATUSES, type ClientStatus } from '../components/StatusBadge';
import { FileText, BarChart3, CheckSquare, Mail, AlertTriangle, Target, Users, MessageSquare } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'spam-check', label: 'Email Content | Spam Check', icon: Mail },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
];

export default function WulfPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<ClientStatus>('Onboarding');

  useEffect(() => {
    setStatus(getClientStatus('wulf', DEFAULT_STATUSES.wulf));
  }, []);

  const handleStatusChange = (newStatus: ClientStatus) => {
    setStatus(newStatus);
    setClientStatus('wulf', newStatus);
  };

  return (
    <ClientLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-600">W</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-slate-900">WULF Arts</h1>
                <StatusBadge status={status} onStatusChange={handleStatusChange} size="md" />
              </div>
              <p className="text-slate-600">Real-Time 3D Production Studio — White-Label 3D Asset Pipeline</p>
            </div>
          </div>
          <a
            href="https://wulfinc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange-600 hover:underline"
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
          {activeTab === 'spam-check' && <SpamCheckTab />}
          {activeTab === 'performance' && (
            <PerformanceTab clientId="wulf" defaultMetrics={EMPTY_METRICS} hasData={false} />
          )}
          {activeTab === 'tasks' && (
            <TasksTab clientId="wulf" defaultTasks={[]} />
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
            WULF Arts is a real-time 3D production studio founded by Prabuddha Paul, based in Kolkata, India.
            They operate as a white-label production unit handling 3D heavy lifting for studios and agencies
            shipping on AR, VR, Roblox, and real-time engines.
          </p>
          <p>
            They support teams on two tracks: high-volume real-time 3D asset creation (products, environments,
            characters) and end-to-end builds (modeling, texturing, rigging, animation) — all optimized and
            engine-ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Industry" value="Real-Time 3D Production" />
            <InfoCard label="Business Model" value="White-Label B2B Studio" />
            <InfoCard label="Location" value="Kolkata, West Bengal, India" />
            <InfoCard label="Founder" value="Prabuddha Paul" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Target Verticals" icon={<Target className="w-5 h-5" />}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'Game Studios',
            'Roblox & UEFN Developers',
            'Location-Based VR',
            'XR Agencies & Platforms',
            'VR/XR Training Companies',
            'Immersive Experience Studios',
          ].map((vertical) => (
            <div key={vertical} className="bg-orange-50 px-3 py-2 rounded text-sm border border-orange-200">
              {vertical}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Key Clients & Portfolio" icon={<Users className="w-5 h-5" />}>
        <ul className="space-y-2">
          <ListItem type="check">Coca-Cola, Paramount, Jagermeister — real-time 3D for global IPs</ListItem>
          <ListItem type="check">Jurassic World and Dungeons & Dragons — global launches shipped on their 3D</ListItem>
          <ListItem type="check">First Snap Partner in India (2018) — Verizon Media (Oscars, Yahoo)</ListItem>
          <ListItem type="check">D&D: Honor Among Thieves dragon — multi-GB film VFX to real-time mobile, under 3 MB</ListItem>
        </ul>
      </ContentSection>
    </>
  );
}

type ScoreLevel = 'Poor' | 'Okay' | 'Great';

interface SequenceResult {
  score: ScoreLevel;
  words: number;
  readTime: string;
  flags: string[];
  hasUrls: boolean;
}

interface VerticalResults {
  name: string;
  created: string;
  sequences: SequenceResult[];
}

const scoreStyles: Record<ScoreLevel, string> = {
  Poor: 'bg-red-100 text-red-700 border-red-200',
  Okay: 'bg-amber-100 text-amber-700 border-amber-200',
  Great: 'bg-green-100 text-green-700 border-green-200',
};

const flagStyles: Record<string, string> = {
  'Urgency': 'bg-red-50 text-red-600 border-red-200',
  'Shady': 'bg-rose-50 text-rose-600 border-rose-200',
  'Overpromise': 'bg-amber-50 text-amber-600 border-amber-200',
  'Unnatural': 'bg-purple-50 text-purple-600 border-purple-200',
  'Money': 'bg-yellow-50 text-yellow-600 border-yellow-200',
};

const spamData: VerticalResults[] = [
  {
    name: 'Email Sequence V01',
    created: 'Mar 11',
    sequences: [
      { score: 'Poor', words: 101, readTime: '1 min', flags: ['Urgency (1)', 'Shady (2)'], hasUrls: true },
      { score: 'Okay', words: 107, readTime: '1 min', flags: ['Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 104, readTime: '1 min', flags: ['Shady (1)', 'Money (1)', 'Unnatural (1)'], hasUrls: true },
      { score: 'Poor', words: 129, readTime: '1 min', flags: ['Unnatural (1)', 'Urgency (1)', 'Shady (1)'], hasUrls: true },
    ],
  },
  {
    name: 'Roblox & UEFN',
    created: 'Mar 11',
    sequences: [
      { score: 'Poor', words: 119, readTime: '1 min', flags: ['Urgency (1)', 'Shady (2)'], hasUrls: true },
      { score: 'Okay', words: 139, readTime: '1 min', flags: ['Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 150, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Money (1)'], hasUrls: true },
      { score: 'Poor', words: 177, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Urgency (1)'], hasUrls: true },
    ],
  },
  {
    name: 'Game Studios',
    created: 'Mar 11',
    sequences: [
      { score: 'Poor', words: 115, readTime: '1 min', flags: ['Urgency (1)', 'Shady (2)'], hasUrls: true },
      { score: 'Okay', words: 135, readTime: '1 min', flags: ['Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 144, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Money (1)'], hasUrls: true },
      { score: 'Poor', words: 178, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Urgency (1)'], hasUrls: true },
    ],
  },
  {
    name: 'Location Based VR',
    created: 'Mar 11',
    sequences: [
      { score: 'Poor', words: 114, readTime: '1 min', flags: ['Urgency (1)', 'Shady (3)'], hasUrls: true },
      { score: 'Poor', words: 134, readTime: '1 min', flags: ['Shady (2)', 'Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 153, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (4)', 'Money (1)', 'Urgency (1)'], hasUrls: true },
      { score: 'Poor', words: 169, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (3)', 'Urgency (1)'], hasUrls: true },
    ],
  },
  {
    name: 'XR Agencies & Service Companies',
    created: 'Mar 11',
    sequences: [
      { score: 'Poor', words: 192, readTime: '1 min', flags: ['Shady (1)', 'Unnatural (1)'], hasUrls: true },
      { score: 'Great', words: 132, readTime: '1 min', flags: [], hasUrls: true },
      { score: 'Poor', words: 143, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Money (1)'], hasUrls: true },
      { score: 'Poor', words: 162, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Urgency (1)'], hasUrls: true },
    ],
  },
  {
    name: 'XR Agencies — A/B Version',
    created: 'Mar 30',
    sequences: [
      { score: 'Poor', words: 192, readTime: '1 min', flags: ['Shady (1)', 'Unnatural (1)'], hasUrls: true },
      { score: 'Great', words: 133, readTime: '1 min', flags: [], hasUrls: true },
      { score: 'Poor', words: 144, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Money (1)'], hasUrls: true },
      { score: 'Poor', words: 163, readTime: '1 min', flags: ['Unnatural (2)', 'Shady (2)', 'Urgency (1)'], hasUrls: true },
    ],
  },
  {
    name: 'VR/XR Training',
    created: 'May 7',
    sequences: [
      { score: 'Poor', words: 119, readTime: '1 min', flags: ['Shady (5)'], hasUrls: true },
      { score: 'Poor', words: 138, readTime: '1 min', flags: ['Shady (2)', 'Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 126, readTime: '1 min', flags: ['Shady (2)', 'Money (1)', 'Unnatural (1)', 'Urgency (1)'], hasUrls: true },
      { score: 'Poor', words: 152, readTime: '1 min', flags: ['Unnatural (1)', 'Urgency (1)', 'Shady (2)'], hasUrls: true },
    ],
  },
  {
    name: 'VR/XR Training — Cleaned',
    created: 'May 11',
    sequences: [
      { score: 'Poor', words: 114, readTime: '1 min', flags: ['Shady (5)'], hasUrls: true },
      { score: 'Poor', words: 138, readTime: '1 min', flags: ['Shady (2)', 'Overpromise (1)'], hasUrls: true },
      { score: 'Poor', words: 127, readTime: '1 min', flags: ['Shady (2)', 'Money (1)', 'Unnatural (1)', 'Urgency (1)'], hasUrls: true },
      { score: 'Poor', words: 152, readTime: '1 min', flags: ['Unnatural (1)', 'Urgency (1)', 'Shady (2)'], hasUrls: true },
    ],
  },
];

function ScoreBadge({ score }: { score: ScoreLevel }) {
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${scoreStyles[score]}`}>
      {score}
    </span>
  );
}

function FlagBadge({ flag }: { flag: string }) {
  const baseFlag = flag.split(' (')[0];
  const style = flagStyles[baseFlag] || 'bg-slate-50 text-slate-600 border-slate-200';
  return (
    <span className={`px-2 py-0.5 text-xs rounded border ${style}`}>
      {flag}
    </span>
  );
}

function SpamCheckTab() {
  const [expandedVertical, setExpandedVertical] = useState<string | null>(spamData[0].name);

  const totalSequences = spamData.reduce((acc, v) => acc + v.sequences.length, 0);
  const poorCount = spamData.reduce((acc, v) => acc + v.sequences.filter(s => s.score === 'Poor').length, 0);
  const okayCount = spamData.reduce((acc, v) => acc + v.sequences.filter(s => s.score === 'Okay').length, 0);
  const greatCount = spamData.reduce((acc, v) => acc + v.sequences.filter(s => s.score === 'Great').length, 0);
  const urlCount = spamData.reduce((acc, v) => acc + v.sequences.filter(s => s.hasUrls).length, 0);

  return (
    <>
      {/* Creator Note */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Creator Note — Frosina</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Beyond replacing spammy words (highlighted in the report as Shady, Urgency, Overpromise, etc.),
              we also need to make sure we <strong>never include URLs in cold email copy</strong>. Links in cold
              outreach are one of the biggest spam triggers — especially from new or low-reputation domains. Email
              providers (Gmail, Outlook) heavily penalize unknown senders who include links. Remove all URLs from
              the email body and instead reference the showreel/portfolio in a way that invites the prospect to
              reply for it. This applies to YouTube links, website links, and tracking links alike.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <ContentSection title="Spam Check Summary" icon={<AlertTriangle className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
              <p className="text-2xl font-bold text-slate-900">{totalSequences}</p>
              <p className="text-xs text-slate-500 mt-1">Total Sequences</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
              <p className="text-2xl font-bold text-red-700">{poorCount}</p>
              <p className="text-xs text-red-600 mt-1">Poor Score</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-center">
              <p className="text-2xl font-bold text-amber-700">{okayCount}</p>
              <p className="text-xs text-amber-600 mt-1">Okay Score</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
              <p className="text-2xl font-bold text-green-700">{greatCount}</p>
              <p className="text-xs text-green-600 mt-1">Great Score</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-4 border border-rose-200 text-center">
              <p className="text-2xl font-bold text-rose-700">{urlCount}</p>
              <p className="text-xs text-rose-600 mt-1">Contain URLs</p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 mb-1">Key Finding</p>
            <p className="text-red-800 text-sm">
              {poorCount} out of {totalSequences} sequences scored "Poor". The most common flags are
              <strong> Shady</strong> (aggressive sales language) and <strong>Urgency</strong> (pressure tactics).
              Every single sequence contains URLs, which is a major spam trigger for cold email.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-semibold text-blue-900 mb-1">Top Priorities to Fix</p>
            <ul className="text-blue-800 text-sm space-y-1 mt-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Remove all URLs from email body (YouTube links, website links)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Replace "Shady" flagged words — "won't", "all", "call", "here", "get", "new"</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Tone down urgency language — avoid pressure-based CTAs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Remove money references ("$36M-funded") that trigger Money flags</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">5.</span>
                <span>Shorten sequences 3 & 4 which tend to score worst</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Per-Vertical Breakdown */}
      <ContentSection title="Results by Vertical" icon={<Mail className="w-5 h-5" />}>
        <div className="space-y-3">
          {spamData.map((vertical) => {
            const isExpanded = expandedVertical === vertical.name;
            const verticalPoor = vertical.sequences.filter(s => s.score === 'Poor').length;
            const verticalOkay = vertical.sequences.filter(s => s.score === 'Okay').length;
            const verticalGreat = vertical.sequences.filter(s => s.score === 'Great').length;
            const worstScore = verticalPoor > 0 ? 'Poor' : verticalOkay > 0 ? 'Okay' : 'Great';

            return (
              <div key={vertical.name} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedVertical(isExpanded ? null : vertical.name)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${worstScore === 'Poor' ? 'bg-red-500' : worstScore === 'Okay' ? 'bg-amber-500' : 'bg-green-500'}`} />
                    <div>
                      <p className="font-medium text-slate-900">{vertical.name}</p>
                      <p className="text-xs text-slate-500">Created {vertical.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {verticalPoor > 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">{verticalPoor} Poor</span>}
                      {verticalOkay > 0 && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{verticalOkay} Okay</span>}
                      {verticalGreat > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{verticalGreat} Great</span>}
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {vertical.sequences.map((seq, idx) => (
                        <div key={idx} className="bg-white rounded-lg border border-slate-200 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-slate-900">Sequence {idx + 1}</h4>
                            <ScoreBadge score={seq.score} />
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-xs">
                              <span className="text-slate-500">Words: </span>
                              <span className="font-medium text-slate-700">{seq.words}</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-slate-500">Read time: </span>
                              <span className="font-medium text-slate-700">{seq.readTime}</span>
                            </div>
                          </div>
                          {seq.flags.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {seq.flags.map((flag, fIdx) => (
                                <FlagBadge key={fIdx} flag={flag} />
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-green-600 font-medium">No flags detected</p>
                          )}
                          {seq.hasUrls && (
                            <div className="mt-2 flex items-center space-x-1 text-xs text-rose-600">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Contains URLs</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ContentSection>

      {/* Flag Legend */}
      <ContentSection title="Flag Reference" icon={<AlertTriangle className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
            <p className="font-semibold text-rose-700 text-sm mb-1">Shady</p>
            <p className="text-xs text-rose-600">Aggressive or manipulative sales language. Words like "won't", "all", "call", "here" in pushy contexts.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="font-semibold text-red-700 text-sm mb-1">Urgency</p>
            <p className="text-xs text-red-600">Pressure-based language creating false urgency. E.g., "before I go", "last one from me".</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="font-semibold text-amber-700 text-sm mb-1">Overpromise</p>
            <p className="text-xs text-amber-600">Claims that sound too good to be true. E.g., "scale fast without losing quality".</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="font-semibold text-purple-700 text-sm mb-1">Unnatural</p>
            <p className="text-xs text-purple-600">Language that sounds robotic, scripted, or not like a real person would write.</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="font-semibold text-yellow-700 text-sm mb-1">Money</p>
            <p className="text-xs text-yellow-600">References to specific dollar amounts. E.g., "$36M-funded game studio".</p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
