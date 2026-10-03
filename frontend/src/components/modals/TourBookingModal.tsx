import React, { useState } from 'react';
import { DaycareCenter } from '../../types';

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: DaycareCenter[];
  defaultCenterId?: string;
  onSuccess: (bookingDetails: any) => void;
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({
  isOpen,
  onClose,
  centers,
  defaultCenterId,
  onSuccess,
}) => {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childAge, setChildAge] = useState('Toddler (1-2 yrs)');
  const [selectedCenterId, setSelectedCenterId] = useState(defaultCenterId || centers[0]?.id || '');
  const [tourDate, setTourDate] = useState('2026-10-12');
  const [tourTime, setTourTime] = useState('10:00 AM');
  const [tourFormat, setTourFormat] = useState<'in-person' | 'virtual'>('in-person');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !parentEmail.trim()) return;

    const center = centers.find((c) => c.id === selectedCenterId) || centers[0];
    onSuccess({
      parentName,
      parentEmail,
      phone,
      childAge,
      centerName: center.name,
      tourDate,
      tourTime,
      tourFormat,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Book a Campus Tour</h3>
              <p className="text-xs text-slate-500">Experience our classrooms, playgrounds & meet our educators</p>
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
            <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="sarah@example.com"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Campus</label>
              <select
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs"
              >
                {centers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Child's Age Group</label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs"
              >
                <option value="Infant (6-12 mos)">Infant (6-12 mos)</option>
                <option value="Toddler (1-2 yrs)">Toddler (1-2 yrs)</option>
                <option value="Preschool (3-4 yrs)">Preschool (3-4 yrs)</option>
                <option value="Kindergarten (4-6 yrs)">Kindergarten (4-6 yrs)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Date</label>
              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Time Slot</label>
              <select
                value={tourTime}
                onChange={(e) => setTourTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs"
              >
                <option value="09:00 AM">09:00 AM (Morning Circle)</option>
                <option value="10:30 AM">10:30 AM (Outdoor Play Observation)</option>
                <option value="02:00 PM">02:00 PM (Creative Studio Session)</option>
                <option value="04:30 PM">04:30 PM (Evening Parent Chat)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tour Experience Format</label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                  tourFormat === 'in-person'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  checked={tourFormat === 'in-person'}
                  onChange={() => setTourFormat('in-person')}
                  className="sr-only"
                />
                <i className="fa-solid fa-person-walking text-blue-600 text-sm"></i>
                <div>
                  <div className="font-bold">In-Person Campus Tour</div>
                  <div className="text-[10px] text-slate-500">Walk the halls with Principal</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                  tourFormat === 'virtual'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  checked={tourFormat === 'virtual'}
                  onChange={() => setTourFormat('virtual')}
                  className="sr-only"
                />
                <i className="fa-solid fa-video text-blue-600 text-sm"></i>
                <div>
                  <div className="font-bold">Live Virtual Tour</div>
                  <div className="text-[10px] text-slate-500">HD interactive video call</div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md flex items-center gap-2"
            >
              <i className="fa-solid fa-calendar-check"></i>
              Confirm Tour Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
