import React, { useState } from 'react';
import { ProgramItem } from '../../types';

interface NewProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProgram: (prog: ProgramItem) => void;
}

export const NewProgramModal: React.FC<NewProgramModalProps> = ({
  isOpen,
  onClose,
  onAddProgram,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('🎨');
  const [ageBracket, setAgeBracket] = useState('2.5 – 4 Years');
  const [category, setCategory] = useState<ProgramItem['category']>('Preschool & Pre-K');
  const [capacity, setCapacity] = useState(60);
  const [ratio, setRatio] = useState('1:6');
  const [tuition, setTuition] = useState(480);
  const [statusType, setStatusType] = useState<ProgramItem['statusType']>('active');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProg: ProgramItem = {
      id: `prog-${Date.now()}`,
      name,
      code: code || `PRG-${name.slice(0, 3).toUpperCase()}`,
      emoji,
      ageBracket,
      category,
      capacity: Number(capacity) || 50,
      enrolled: 0,
      ratio,
      ratioType: 'Teacher-to-Child',
      campusesCount: 8,
      totalCampuses: 8,
      tuition: Number(tuition) || 450,
      tuitionType: 'per month',
      curriculumStatus: 'Standard Certified',
      statusType,
      description:
        description ||
        'Specialized pedagogical framework promoting curiosity, social-emotional learning, and cognitive readiness.',
    };

    onAddProgram(newProg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-shapes"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Create New Curriculum Program</h3>
              <p className="text-xs text-slate-500">Define age tier, capacity limits, and network-wide tuition rates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <label className="block font-semibold text-slate-700 mb-1">Icon</label>
              <select
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full px-2 py-2 text-center text-base rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="🎨">🎨 Art</option>
                <option value="🧸">🧸 Play</option>
                <option value="🧪">🧪 STEM</option>
                <option value="📚">📚 Literacy</option>
                <option value="🌱">🌱 Nature</option>
                <option value="🎵">🎵 Music</option>
                <option value="🧩">🧩 Logic</option>
                <option value="🌍">🌍 Language</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">Program Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bilingual Language Immersion"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Curriculum Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Early Years">Early Years (6m - 2y)</option>
                <option value="Preschool & Pre-K">Preschool & Pre-K (2.5 - 4y)</option>
                <option value="Kindergarten">Kindergarten (4 - 6y)</option>
                <option value="Enrichment & After-School">Enrichment & After-School</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Age Bracket</label>
              <input
                type="text"
                placeholder="e.g. 3 – 5 Years"
                value={ageBracket}
                onChange={(e) => setAgeBracket(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Cap / Campus</label>
              <input
                type="number"
                min="10"
                max="200"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Staff-Child Ratio</label>
              <input
                type="text"
                placeholder="1:6"
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monthly Tuition ($)</label>
              <input
                type="number"
                min="100"
                max="2500"
                step="25"
                value={tuition}
                onChange={(e) => setTuition(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pedagogical Description</label>
            <textarea
              rows={3}
              placeholder="Outline educational goals, experiential learning milestones, and sensory motor objectives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              Publish Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
