'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditMode } from './EditModeContext';
import { CheckSquare, Square, Trash2, Plus, Save, User, Calendar } from 'lucide-react';

export interface Task {
  id: string;
  description: string;
  assignedTo: 'Matej' | 'Frosina';
  status: 'pending' | 'done';
  dueDate: string;
}

interface TasksTabProps {
  clientId: string;
  defaultTasks: Task[];
}

function getStoredTasks(clientId: string, defaults: Task[]): Task[] {
  if (typeof window === 'undefined') return defaults;
  const stored = localStorage.getItem(`intelsol_tasks_${clientId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaults;
    }
  }
  return defaults;
}

function saveTasks(clientId: string, tasks: Task[]): void {
  localStorage.setItem(`intelsol_tasks_${clientId}`, JSON.stringify(tasks));
}

export default function TasksTab({ clientId, defaultTasks }: TasksTabProps) {
  const { editMode, isAdmin } = useEditMode();
  const canEdit = editMode && isAdmin;

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [dirty, setDirty] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    description: '',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    setTasks(getStoredTasks(clientId, defaultTasks));
  }, [clientId, defaultTasks]);

  const handleToggleTask = useCallback((taskId: string) => {
    if (!canEdit) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
      )
    );
    setDirty(true);
  }, [canEdit]);

  const handleDeleteTask = useCallback((taskId: string) => {
    if (!canEdit) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setDirty(true);
  }, [canEdit]);

  const handleAddTask = useCallback(() => {
    if (!newTask.description.trim() || !newTask.dueDate) return;
    const task: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      ...newTask,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ description: '', assignedTo: 'Matej', status: 'pending', dueDate: '' });
    setShowAddForm(false);
    setDirty(true);
  }, [newTask]);

  const handleSave = useCallback(() => {
    saveTasks(clientId, tasks);
    setDirty(false);
  }, [clientId, tasks]);

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-600 mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-600 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{doneCount}</p>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Tasks</h3>
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
                <span>Add Task</span>
              </button>
            )}
          </div>
        </div>

        {/* Add task form */}
        {canEdit && showAddForm && (
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Task description..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value as 'Matej' | 'Frosina' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
                >
                  <option value="Matej">Matej</option>
                  <option value="Frosina">Frosina</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none"
                />
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.description.trim() || !newTask.dueDate}
                  className="px-3 py-2 bg-[#1a2647] text-white text-sm rounded-lg hover:bg-[#2a3757] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks */}
        <div className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No tasks yet. {canEdit && 'Click "Add Task" to create one.'}
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors ${
                  task.status === 'done' ? 'opacity-60' : ''
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => handleToggleTask(task.id)}
                  disabled={!canEdit}
                  className={`flex-shrink-0 ${canEdit ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {task.status === 'done' ? (
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Description */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {task.description}
                  </p>
                </div>

                {/* Assignee badge */}
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      task.assignedTo === 'Matej'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {task.assignedTo}
                  </span>
                </div>

                {/* Due date */}
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">{task.dueDate}</span>
                </div>

                {/* Delete */}
                {canEdit && (
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex-shrink-0 p-1 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Export helper to get all tasks across clients for admin overview
export function getAllTasks(): { clientId: string; clientName: string; task: Task }[] {
  if (typeof window === 'undefined') return [];

  const clientDefaults: Record<string, { name: string; tasks: Task[] }> = {
    xpose: { name: 'Xpose Solutions', tasks: XPOSE_DEFAULT_TASKS },
    tslab: { name: 'TS Lab', tasks: TSLAB_DEFAULT_TASKS },
    beeit: { name: 'BeeIt', tasks: BEEIT_DEFAULT_TASKS },
    intelsol: { name: 'Intelsol', tasks: INTELSOL_DEFAULT_TASKS },
  };

  const allTasks: { clientId: string; clientName: string; task: Task }[] = [];

  for (const [clientId, info] of Object.entries(clientDefaults)) {
    const tasks = getStoredTasks(clientId, info.tasks);
    for (const task of tasks) {
      allTasks.push({ clientId, clientName: info.name, task });
    }
  }

  // Sort by due date (soonest first), pending first
  allTasks.sort((a, b) => {
    if (a.task.status !== b.task.status) return a.task.status === 'pending' ? -1 : 1;
    return a.task.dueDate.localeCompare(b.task.dueDate);
  });

  return allTasks;
}

// Default tasks per client
export const XPOSE_DEFAULT_TASKS: Task[] = [
  {
    id: 'xpose_1',
    description: 'Launch Tier 2 campaign targeting mid-size dermatology clinics',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-02',
  },
  {
    id: 'xpose_2',
    description: 'Review ad detection enrichment accuracy in Clay',
    assignedTo: 'Frosina',
    status: 'pending',
    dueDate: '2026-06-06',
  },
  {
    id: 'xpose_3',
    description: 'Export verified leads to SmartLead for sequencing',
    assignedTo: 'Matej',
    status: 'done',
    dueDate: '2026-05-23',
  },
];

export const TSLAB_DEFAULT_TASKS: Task[] = [
  {
    id: 'tslab_1',
    description: 'Run ICP matching once Anthropic credits are added',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-04',
  },
  {
    id: 'tslab_2',
    description: 'Build lead list for remaining EU countries (Sweden, Norway, Ireland)',
    assignedTo: 'Frosina',
    status: 'pending',
    dueDate: '2026-06-10',
  },
  {
    id: 'tslab_3',
    description: 'Verify Apollo enrichment quality for UK leads batch',
    assignedTo: 'Frosina',
    status: 'done',
    dueDate: '2026-05-20',
  },
];

export const BEEIT_DEFAULT_TASKS: Task[] = [
  {
    id: 'beeit_1',
    description: 'Review Track B ICP documentation with client',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-03',
  },
  {
    id: 'beeit_2',
    description: 'Start Tier 2 agency scraping for Benelux region',
    assignedTo: 'Frosina',
    status: 'pending',
    dueDate: '2026-06-09',
  },
  {
    id: 'beeit_3',
    description: 'Set up Clay table for DACH market Tier 1 agencies',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-12',
  },
];

export const INTELSOL_DEFAULT_TASKS: Task[] = [
  {
    id: 'intelsol_1',
    description: 'Set up SmartLead API integration for campaign tracking',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-01',
  },
  {
    id: 'intelsol_2',
    description: 'Review campaign performance for week 1 and adjust messaging',
    assignedTo: 'Matej',
    status: 'pending',
    dueDate: '2026-06-05',
  },
  {
    id: 'intelsol_3',
    description: 'Prepare lead export report for monthly review',
    assignedTo: 'Frosina',
    status: 'pending',
    dueDate: '2026-06-08',
  },
];
