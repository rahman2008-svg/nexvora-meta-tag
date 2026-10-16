import React from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Zap } from 'lucide-react';
import { SeoCheck } from '../types';

interface SeoAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  checks: SeoCheck[];
  score: number;
}

export const SeoAuditDrawer: React.FC<SeoAuditDrawerProps> = ({
  isOpen,
  onClose,
  checks,
  score,
}) => {
  if (!isOpen) return null;

  const passedCount = checks.filter(c => c.status === 'good').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  const errorCount = checks.filter(c => c.status === 'error').length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">SEO Health & Audit</h2>
              <p className="text-xs text-neutral-400">Meta tags validation & score</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Card */}
        <div className="p-5 bg-neutral-950/50 border-b border-neutral-800 flex items-center gap-5">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-black text-white">{score}</span>
                <span className="text-[10px] text-neutral-500 block -mt-1">/100</span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="text-sm font-bold text-white">
              {score >= 90 ? 'Outstanding Optimization' : score >= 70 ? 'Good, minor fixes suggested' : 'Needs attention'}
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> {passedCount} Passed
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" /> {warningCount} Notices
              </span>
              {errorCount > 0 && (
                <span className="flex items-center gap-1 text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> {errorCount} Errors
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Audit items list */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {checks.map((check) => {
            const isGood = check.status === 'good';
            const isWarn = check.status === 'warning';

            return (
              <div
                key={check.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isGood
                    ? 'bg-neutral-950/60 border-neutral-800'
                    : isWarn
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {isGood ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : isWarn ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 flex-1">
                    <div className="font-semibold text-neutral-200 flex items-center justify-between">
                      <span>{check.title}</span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        isGood ? 'bg-emerald-500/10 text-emerald-400' : isWarn ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{check.message}</p>
                    <div className="pt-1 text-[11px] text-cyan-300 font-medium">
                      💡 {check.recommendation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400">NexVora SEO Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
