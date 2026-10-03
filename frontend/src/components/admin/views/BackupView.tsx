import React, { useState } from 'react';

interface BackupRecord {
  id: string;
  date: string;
  time: string;
  type: 'Nightly Full' | 'Manual' | 'Pre-Deploy';
  size: string;
  status: 'Completed' | 'In Progress' | 'Failed';
  rows: string;
}

const INITIAL_BACKUPS: BackupRecord[] = [
  {
    id: 'bkp-0821',
    date: 'Aug 21, 2026',
    time: '02:00 AM',
    type: 'Nightly Full',
    size: '248 MB',
    status: 'Completed',
    rows: '1,842 students • 248 users',
  },
  {
    id: 'bkp-0820',
    date: 'Aug 20, 2026',
    time: '02:00 AM',
    type: 'Nightly Full',
    size: '246 MB',
    status: 'Completed',
    rows: '1,838 students • 246 users',
  },
  {
    id: 'bkp-0819b',
    date: 'Aug 19, 2026',
    time: '04:12 PM',
    type: 'Pre-Deploy',
    size: '245 MB',
    status: 'Completed',
    rows: 'pre-v2.4.1 snapshot',
  },
  {
    id: 'bkp-0819',
    date: 'Aug 19, 2026',
    time: '02:00 AM',
    type: 'Nightly Full',
    size: '245 MB',
    status: 'Completed',
    rows: '1,830 students • 244 users',
  },
  {
    id: 'bkp-0818',
    date: 'Aug 18, 2026',
    time: '02:00 AM',
    type: 'Nightly Full',
    size: '—',
    status: 'Failed',
    rows: 'storage timeout after 90s',
  },
  {
    id: 'bkp-0817',
    date: 'Aug 17, 2026',
    time: '11:05 AM',
    type: 'Manual',
    size: '241 MB',
    status: 'Completed',
    rows: 'requested by Mohamed Hassan',
  },
];

const typeChip = (type: BackupRecord['type']) => {
  switch (type) {
    case 'Nightly Full':
      return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'Manual':
      return 'bg-blue-50 text-blue-600 border-blue-100';
    default:
      return 'bg-amber-50 text-amber-600 border-amber-100';
  }
};

export const BackupView: React.FC = () => {
  const [backups, setBackups] = useState<BackupRecord[]>(INITIAL_BACKUPS);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runBackup = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          const newBackup: BackupRecord = {
            id: `bkp-manual-${Date.now()}`,
            date: 'Aug 21, 2026',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'Manual',
            size: '249 MB',
            status: 'Completed',
            rows: 'requested by Mohamed Hassan',
          };
          setBackups((prev) => [newBackup, ...prev]);
          setRunning(false);
          return 100;
        }
        return p + 10;
      });
    }, 180);
  };

  const storageUsed = '1.46 GB';
  const storageQuota = '5 GB';
  const completedCount = backups.filter((b) => b.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-database text-[11px]"></i>
            <span>Data Protection</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Backup &amp; Restore
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated nightly snapshots with 30-day retention. Restore any point-in-time backup.
          </p>
        </div>
        <button
          onClick={runBackup}
          disabled={running}
          className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5 self-start ${
            running
              ? 'bg-slate-200 text-slate-500 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <i className={`fa-solid ${running ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'}`}></i>
          <span>{running ? `Backing up... ${progress}%` : 'Run Backup Now'}</span>
        </button>
      </section>

      {/* Progress Bar */}
      {running && (
        <section className="bg-white rounded-2xl p-4 border border-blue-200 shadow-card">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2">
            <span>
              <i className="fa-solid fa-arrows-rotate fa-spin text-blue-500 mr-1.5"></i>
              Dumping tables, compressing and uploading to secure storage...
            </span>
            <span className="text-blue-600">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>
      )}

      {/* Status Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-circle-check text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Last Successful Backup</span>
          </div>
          <div className="text-lg font-black text-slate-800 font-display">Today, 02:00 AM</div>
          <div className="text-[11px] text-slate-400 mt-0.5">248 MB • 0 errors</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-clock text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Next Scheduled</span>
          </div>
          <div className="text-lg font-black text-slate-800 font-display">Tomorrow, 02:00 AM</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Nightly Full • auto-retained 30d</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-hard-drive text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Storage Used</span>
          </div>
          <div className="text-lg font-black text-slate-800 font-display">
            {storageUsed}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">/ {storageQuota}</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-indigo-500" style={{ width: '29%' }}></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-box-archive text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Restore Points</span>
          </div>
          <div className="text-lg font-black text-slate-800 font-display">{completedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Available for point-in-time restore</div>
        </div>
      </section>

      {/* Backup History */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-clock-rotate-left text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Backup History</h3>
          </div>
          <span className="text-[11px] text-slate-400">Retention: 30 days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/60">
                <th className="py-3 px-4 font-semibold">Snapshot</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Contents</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 whitespace-nowrap">{b.date}</div>
                    <div className="text-[11px] text-slate-400">{b.time}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap ${typeChip(
                        b.type
                      )}`}
                    >
                      {b.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600 whitespace-nowrap">
                    {b.size}
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-[220px] truncate">{b.rows}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        b.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : b.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}
                    >
                      <i
                        className={`fa-solid ${
                          b.status === 'Completed'
                            ? 'fa-check'
                            : b.status === 'In Progress'
                              ? 'fa-spinner fa-spin'
                              : 'fa-xmark'
                        } text-[9px]`}
                      ></i>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        disabled={b.status !== 'Completed'}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <i className="fa-solid fa-download"></i>
                        <span>Download</span>
                      </button>
                      <button
                        disabled={b.status !== 'Completed'}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>Restore</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Restore Safety Note */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-triangle-exclamation text-sm"></i>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">Restore Safety</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-3xl">
            Restoring a snapshot <b className="text-slate-700">overwrites current data</b> and
            kicks all active sessions. A pre-restore safety snapshot is created automatically. For
            partial restores (single table), contact the platform DBA.
          </p>
        </div>
      </section>
    </div>
  );
};
