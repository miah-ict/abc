import React, { useState } from 'react';

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  onSuccess: (candidate: any) => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({
  isOpen,
  onClose,
  jobTitle = 'Early Childhood Educator',
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('3-5 Years');
  const [qualification, setQualification] = useState("Bachelor's in Early Childhood Education");
  const [coverNote, setCoverNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onSuccess({
      jobTitle,
      name,
      email,
      phone,
      experience,
      qualification,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Career Application</h3>
              <p className="text-xs text-slate-500">Position: {jobTitle}</p>
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
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Asma Nuur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="asma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-8765"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Years of Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="1-2 Years">1-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-8 Years">5-8 Years</option>
                <option value="8+ Years">8+ Years (Senior Lead)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Highest Qualification</label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="Bachelor's in Early Childhood Education">Bachelor's in Early Childhood Education</option>
                <option value="Master's in Educational Leadership">Master's in Educational Leadership</option>
                <option value="Montessori Accreditation Diploma">Montessori Accreditation Diploma</option>
                <option value="State Certified Childcare Aide">State Certified Childcare Aide</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Cover Note / Experience Summary</label>
            <textarea
              rows={3}
              placeholder="Tell us about your pedagogical philosophy and classroom experience..."
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
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
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
