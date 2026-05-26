'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditMode } from './EditModeContext';
import { Plus, Save, BarChart3 } from 'lucide-react';

export interface WeekMetric {
  id: string;
  week: string;
  emailsSent: number;
  openRate: number;
  replyRate: number;
  positiveReplies: number;
  meetingsBooked: number;
}

interface PerformanceTabProps {
  clientId: string;
  defaultMetrics: WeekMetric[];
  hasData: boolean;
}

function getStoredMetrics(clientId: string, defaults: WeekMetric[]): WeekMetric[] {
  if (typeof window === 'undefined') return defaults;
  const stored = localStorage.getItem(`intelsol_metrics_${clientId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaults;
    }
  }
  return defaults;
}

function saveMetrics(clientId: string, metrics: WeekMetric[]): void {
  localStorage.setItem(`intelsol_metrics_${clientId}`, JSON.stringify(metrics));
}

export default function PerformanceTab({ clientId, defaultMetrics, hasData }: PerformanceTabProps) {
  const { editMode, isAdmin } = useEditMode();
  const canEdit = editMode && isAdmin;

  const [metrics, setMetrics] = useState<WeekMetric[]>(defaultMetrics);
  const [dirty, setDirty] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState<Omit<WeekMetric, 'id'>>({
    week: '',
    emailsSent: 0,
    openRate: 0,
    replyRate: 0,
    positiveReplies: 0,
    meetingsBooked: 0,
  });

  useEffect(() => {
    setMetrics(getStoredMetrics(clientId, defaultMetrics));
  }, [clientId, defaultMetrics]);

  const handleAddRow = useCallback(() => {
    if (!newRow.week.trim()) return;
    const row: WeekMetric = {
      id: `metric_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      ...newRow,
    };
    setMetrics((prev) => [...prev, row]);
    setNewRow({
      week: '',
      emailsSent: 0,
      openRate: 0,
      replyRate: 0,
      positiveReplies: 0,
      meetingsBooked: 0,
    });
    setShowAddForm(false);
    setDirty(true);
  }, [newRow]);

  const handleSave = useCallback(() => {
    saveMetrics(clientId, metrics);
    setDirty(false);
  }, [clientId, metrics]);

  // Calculate totals
  const totals = metrics.reduce(
    (acc, m) => ({
      emailsSent: acc.emailsSent + m.emailsSent,
      positiveReplies: acc.positiveReplies + m.positiveReplies,
      meetingsBooked: acc.meetingsBooked + m.meetingsBooked,
    }),
    { emailsSent: 0, positiveReplies: 0, meetingsBooked: 0 }
  );

  const avgOpenRate = metrics.length > 0
    ? (metrics.reduce((sum, m) => sum + m.openRate, 0) / metrics.length).toFixed(1)
    : '0';

  const avgReplyRate = metrics.length > 0
    ? (metrics.reduce((sum, m) => sum + m.replyRate, 0) / metrics.length).toFixed(1)
    : '0';

  const showEmptyState = !hasData && metrics.length === 0;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      {!showEmptyState && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">Total Emails</p>
            <p className="text-2xl font-bold text-slate-900">{totals.emailsSent.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">Avg Open Rate</p>
            <p className="text-2xl font-bold text-blue-600">{avgOpenRate}%</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">Avg Reply Rate</p>
            <p className="text-2xl font-bold text-purple-600">{avgReplyRate}%</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">Positive Replies</p>
            <p className="text-2xl font-bold text-green-600">{totals.positiveReplies}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">Meetings Booked</p>
            <p className="text-2xl font-bold text-amber-600">{totals.meetingsBooked}</p>
          </div>
        </div>
      )}

      {/* Metrics table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#1a2647]" />
            <h3 className="text-lg font-semibold text-slate-900">Campaign Metrics</h3>
          </div>
          <div className="flex items-center space-x-2">
            {canEdit && dirty && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            )}
            {canEdit && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-[#1a2647] text-white text-sm rounded-lg hover:bg-[#2a3757] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Week</span>
              </button>
            )}
          </div>
        </div>

        {/* Add row form */}
        {canEdit && showAddForm && (
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              <input
                type="text"
                placeholder="Week (e.g. Week 5)"
                value={newRow.week}
                onChange={(e) => setNewRow({ ...newRow, week: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Emails Sent"
                value={newRow.emailsSent || ''}
                onChange={(e) => setNewRow({ ...newRow, emailsSent: parseInt(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Open Rate %"
                value={newRow.openRate || ''}
                onChange={(e) => setNewRow({ ...newRow, openRate: parseFloat(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Reply Rate %"
                value={newRow.replyRate || ''}
                onChange={(e) => setNewRow({ ...newRow, replyRate: parseFloat(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Positive Replies"
                value={newRow.positiveReplies || ''}
                onChange={(e) => setNewRow({ ...newRow, positiveReplies: parseInt(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Meetings"
                value={newRow.meetingsBooked || ''}
                onChange={(e) => setNewRow({ ...newRow, meetingsBooked: parseInt(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
              />
              <button
                onClick={handleAddRow}
                disabled={!newRow.week.trim()}
                className="px-3 py-2 bg-[#1a2647] text-white text-sm rounded-lg hover:bg-[#2a3757] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {showEmptyState ? (
          <div className="p-12 text-center">
            <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-lg font-medium">No campaign data yet</p>
            <p className="text-slate-400 text-sm mt-1">
              Performance metrics will appear here once campaigns are launched.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Week
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Emails Sent
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Reply Rate
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Positive Replies
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Meetings Booked
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{row.week}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right">
                      {row.emailsSent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right">{row.openRate}%</td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right">{row.replyRate}%</td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right">{row.positiveReplies}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right">{row.meetingsBooked}</td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="bg-slate-50 border-t-2 border-slate-200 font-semibold">
                  <td className="px-4 py-3 text-sm text-slate-900">Total / Average</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right">
                    {totals.emailsSent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right">{avgOpenRate}%</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right">{avgReplyRate}%</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right">{totals.positiveReplies}</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right">{totals.meetingsBooked}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Default metrics for Intelsol (sample data for 4 weeks)
export const INTELSOL_DEFAULT_METRICS: WeekMetric[] = [
  {
    id: 'intelsol_w1',
    week: 'Week 1',
    emailsSent: 450,
    openRate: 62.3,
    replyRate: 8.4,
    positiveReplies: 12,
    meetingsBooked: 3,
  },
  {
    id: 'intelsol_w2',
    week: 'Week 2',
    emailsSent: 520,
    openRate: 58.7,
    replyRate: 9.1,
    positiveReplies: 15,
    meetingsBooked: 4,
  },
  {
    id: 'intelsol_w3',
    week: 'Week 3',
    emailsSent: 480,
    openRate: 64.1,
    replyRate: 10.2,
    positiveReplies: 18,
    meetingsBooked: 5,
  },
  {
    id: 'intelsol_w4',
    week: 'Week 4',
    emailsSent: 510,
    openRate: 61.5,
    replyRate: 11.0,
    positiveReplies: 20,
    meetingsBooked: 6,
  },
];

// Empty metrics for clients without data yet
export const EMPTY_METRICS: WeekMetric[] = [];
