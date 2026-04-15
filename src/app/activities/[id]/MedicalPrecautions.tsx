"use client"
import React, { useEffect, useState } from 'react';
import { fetchActivityPrecautions, type SeniorPrecaution, type PrecautionRisk } from '@/lib/api/activities';

const RISK_ORDER: PrecautionRisk[] = ['high', 'medium', 'none'];

const RISK_LABEL: Record<PrecautionRisk, string> = {
  high: 'High Risk',
  medium: 'Medium Risk',
  none: 'No Precaution',
};

const RISK_STYLES: Record<PrecautionRisk, { container: string; chip: string; badge: string; heading: string; text: string }> = {
  high: {
    container: 'bg-[#FDE8E8] border-[#FDB8B8]',
    chip: 'bg-white text-[#C53030] border-[#FDB8B8] hover:bg-[#FDE8E8]',
    badge: 'bg-[#C53030] text-white',
    heading: 'text-[#C53030]',
    text: 'text-[#9B2C2C]',
  },
  medium: {
    container: 'bg-[#FFF4E0] border-[#FDE68A]',
    chip: 'bg-white text-[#B7791F] border-[#FDE68A] hover:bg-[#FFF4E0]',
    badge: 'bg-[#B7791F] text-white',
    heading: 'text-[#B7791F]',
    text: 'text-[#78350F]',
  },
  none: {
    container: 'bg-[#EEF5F0] border-[#385C4B33]',
    chip: 'bg-white text-[#385C4B] border-[#385C4B33] hover:bg-[#EEF5F0]',
    badge: 'bg-[#385C4B] text-white',
    heading: 'text-[#385C4B]',
    text: 'text-[#385C4B]',
  },
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('') || '?';
}

export function MedicalPrecautions({ activityId }: { activityId: string }) {
  const [precautions, setPrecautions] = useState<SeniorPrecaution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SeniorPrecaution | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchActivityPrecautions(activityId)
      .then(res => {
        if (cancelled) return;
        setPrecautions(res);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Unable to load personalised precautions.');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [activityId]);

  const header = (
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-xs font-bold text-gray-500 uppercase">Personalised Health Alerts</h4>
      <span className="text-[10px] font-bold text-[#C53030] bg-white px-2 py-0.5 rounded border border-[#FDB8B8]">AI Supportive</span>
    </div>
  );

  if (loading) {
    return (
      <div>
        {header}
        <div className="bg-[#FDE8E8] rounded-xl p-4 border border-[#FDB8B8]">
          <div className="flex items-center gap-2 text-xs text-[#9B2C2C]">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v4" />
            </svg>
            Analysing your seniors&apos; profiles for this activity…
          </div>
        </div>
      </div>
    );
  }

  if (error || !precautions || precautions.length === 0) {
    return (
      <div>
        {header}
        <div className="bg-[#FDE8E8] rounded-xl p-4 border border-[#FDB8B8]">
          <p className="text-xs text-[#9B2C2C] leading-relaxed">
            {error ?? 'Add a senior profile to see personalised medical precautions for this activity.'}
          </p>
        </div>
      </div>
    );
  }

  const grouped = RISK_ORDER
    .map(risk => ({ risk, items: precautions.filter(p => p.risk === risk) }))
    .filter(g => g.items.length > 0);

  return (
    <div>
      {header}
      <div className="space-y-3">
        {grouped.map(({ risk, items }) => {
          const styles = RISK_STYLES[risk];
          return (
            <div key={risk} className={`rounded-xl p-4 border ${styles.container}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles.badge}`}>{RISK_LABEL[risk]}</span>
                <span className={`text-[10px] font-bold ${styles.heading}`}>{items.length} {items.length === 1 ? 'senior' : 'seniors'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(p => (
                  <button
                    key={p.seniorId}
                    onClick={() => setSelected(p)}
                    className={`inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border text-xs font-semibold transition ${styles.chip}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${styles.badge}`}>
                      {initials(p.fullname)}
                    </span>
                    <span className="truncate max-w-[140px]">{p.fullname}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className={`p-5 border-b ${RISK_STYLES[selected.risk].container}`}>
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${RISK_STYLES[selected.risk].badge}`}>
                  {initials(selected.fullname)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{selected.fullname}</h3>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${RISK_STYLES[selected.risk].badge}`}>
                    {RISK_LABEL[selected.risk]}
                  </span>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <h4 className={`font-bold text-sm mb-2 flex items-center gap-1.5 ${RISK_STYLES[selected.risk].heading}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Medical Precaution
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selected.precaution}
              </p>
              <p className="text-[10px] text-gray-400 mt-4">
                AI-generated guidance. Not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
