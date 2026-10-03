import React, { useState } from 'react';

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4 py-3">
    <div className="min-w-0">
      <div className="text-xs font-bold text-slate-700">{label}</div>
      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className={`relative rounded-full transition-colors cursor-pointer shrink-0 ${
        checked ? 'bg-blue-600' : 'bg-slate-300'
      }`}
      style={{ width: 40, height: 22 }}
    >
      <span
        className="absolute bg-white rounded-full shadow transition-all"
        style={{ width: 18, height: 18, top: 2, left: checked ? 20 : 2 }}
      ></span>
    </button>
  </div>
);

export const SettingsView: React.FC = () => {
  const [orgName, setOrgName] = useState('ABC Daycare & Kindergarten');
  const [supportEmail, setSupportEmail] = useState('info@abcdaycare.so');
  const [supportPhone, setSupportPhone] = useState('+252 61 234 5678');
  const [timezone, setTimezone] = useState('Africa/Mogadishu (EAT, UTC+3)');
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [capacityAlerts, setCapacityAlerts] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    'w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400 transition-all';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-gear text-[11px]"></i>
            <span>Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Network Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organization profile, notifications, security and backup policies for the whole
            network.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5 self-start ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <i className={`fa-solid ${saved ? 'fa-circle-check' : 'fa-floppy-disk'}`}></i>
          <span>{saved ? 'Settings Saved' : 'Save Changes'}</span>
        </button>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
        {/* General Settings */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-building text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">General</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
                Organization Name
              </label>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className={inputClass}
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Support Email
                </label>
                <input
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className={inputClass}
                  type="email"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Support Phone
                </label>
                <input
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className={inputClass}
                  type="text"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1.5">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                <option>Africa/Mogadishu (EAT, UTC+3)</option>
                <option>Africa/Nairobi (EAT, UTC+3)</option>
                <option>UTC</option>
                <option>Europe/London (GMT/BST)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <i className="fa-solid fa-bell text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Notifications</h3>
          </div>
          <div className="p-5 divide-y divide-slate-100">
            <ToggleRow
              label="Email Notifications"
              description="Daily digest of enrollment, billing and system events."
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <ToggleRow
              label="SMS Alerts"
              description="Critical alerts (safety, downtime) sent via SMS to admins."
              checked={smsNotifs}
              onChange={setSmsNotifs}
            />
            <ToggleRow
              label="Capacity Alerts"
              description="Notify when a center reaches 90% enrollment capacity."
              checked={capacityAlerts}
              onChange={setCapacityAlerts}
            />
            <ToggleRow
              label="Billing & Subscription Alerts"
              description="Warn on upcoming renewals, failed payments and grace periods."
              checked={billingAlerts}
              onChange={setBillingAlerts}
            />
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Security</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-4 py-1">
              <div>
                <div className="text-xs font-bold text-slate-700">Two-Factor Authentication</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Require 2FA for all Super Admin accounts.
                </p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                role="switch"
                aria-checked={twoFactor}
                className={`relative rounded-full transition-colors cursor-pointer shrink-0 ${
                  twoFactor ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                style={{ width: 40, height: 22 }}
              >
                <span
                  className="absolute bg-white rounded-full shadow transition-all"
                  style={{ width: 18, height: 18, top: 2, left: twoFactor ? 20 : 2 }}
                ></span>
              </button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
                Session Timeout
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5">
              <i className="fa-solid fa-circle-check text-emerald-500 text-xs mt-0.5"></i>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                All admin sessions are encrypted. Last security review:
                <b> Aug 15, 2026</b> — no issues found.
              </p>
            </div>
          </div>
        </section>

        {/* Data & Backup */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-database text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Data &amp; Backup</h3>
          </div>
          <div className="p-5 divide-y divide-slate-100">
            <ToggleRow
              label="Automatic Nightly Backups"
              description="Full database snapshot every day at 02:00 EAT, retained for 30 days."
              checked={autoBackup}
              onChange={setAutoBackup}
            />
            <div className="py-3">
              <div className="text-xs font-bold text-slate-700 mb-1.5">Data Retention</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Audit logs are retained for <b className="text-slate-600">24 months</b>. Student
                records are deleted <b className="text-slate-600">12 months</b> after
                disenrollment per policy.
              </p>
            </div>
            <div className="py-3 flex items-center gap-2.5">
              <button className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-1.5">
                <i className="fa-solid fa-file-export text-blue-500"></i>
                <span>Export All Data (GDPR)</span>
              </button>
              <button className="px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer transition-all flex items-center gap-1.5">
                <i className="fa-solid fa-trash-can"></i>
                <span>Purge Soft-Deleted</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
