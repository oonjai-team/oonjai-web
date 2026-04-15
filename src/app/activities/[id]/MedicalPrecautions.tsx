"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { fetchActivityPrecautions, type SeniorPrecaution, type PrecautionRisk } from '@/lib/api/activities';

const RISK_ORDER: PrecautionRisk[] = ['high', 'medium', 'none'];

const RISK_LABEL: Record<PrecautionRisk, string> = {
  high: 'High Risk',
  medium: 'Medium Risk',
  none: 'No Precaution',
};

const RISK_STYLES: Record<PrecautionRisk, { container: string; chip: string; chipActive: string; badge: string; heading: string; text: string; panel: string }> = {
  high: {
    container: 'bg-[#FDE8E8] border-[#FDB8B8]',
    chip: 'bg-white text-[#C53030] border-[#FDB8B8] hover:bg-[#FDE8E8]',
    chipActive: 'bg-[#C53030] text-white border-[#C53030]',
    badge: 'bg-[#C53030] text-white',
    heading: 'text-[#C53030]',
    text: 'text-[#9B2C2C]',
    panel: 'bg-white border-[#FDB8B8]',
  },
  medium: {
    container: 'bg-[#FFF4E0] border-[#FDE68A]',
    chip: 'bg-white text-[#B7791F] border-[#FDE68A] hover:bg-[#FFF4E0]',
    chipActive: 'bg-[#B7791F] text-white border-[#B7791F]',
    badge: 'bg-[#B7791F] text-white',
    heading: 'text-[#B7791F]',
    text: 'text-[#78350F]',
    panel: 'bg-white border-[#FDE68A]',
  },
  none: {
    container: 'bg-[#EEF5F0] border-[#385C4B33]',
    chip: 'bg-white text-[#385C4B] border-[#385C4B33] hover:bg-[#EEF5F0]',
    chipActive: 'bg-[#385C4B] text-white border-[#385C4B]',
    badge: 'bg-[#385C4B] text-white',
    heading: 'text-[#385C4B]',
    text: 'text-[#385C4B]',
    panel: 'bg-white border-[#385C4B33]',
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchActivityPrecautions(activityId)
      .then(res => {
        if (cancelled) return;
        setPrecautions(res);
        // Auto-expand when there is only one senior so the caregiver sees the precaution immediately.
        if (res.length === 1) setExpandedId(res[0].seniorId);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Unable to load personalised precautions.');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [activityId]);

  const grouped = useMemo(() => {
    if (!precautions) return [];
    return RISK_ORDER
      .map(risk => ({ risk, items: precautions.filter(p => p.risk === risk) }))
      .filter(g => g.items.length > 0);
  }, [precautions]);

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

  const toggle = (seniorId: string) => {
    setExpandedId(prev => (prev === seniorId ? null : seniorId));
  };

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
                <span className={`text-[10px] font-bold ${styles.heading}`}>
                  {items.length} {items.length === 1 ? 'senior' : 'seniors'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(p => {
                  const isExpanded = expandedId === p.seniorId;
                  return (
                    <button
                      key={p.seniorId}
                      onClick={() => toggle(p.seniorId)}
                      aria-expanded={isExpanded}
                      className={`inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border text-xs font-semibold transition ${isExpanded ? styles.chipActive : styles.chip}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isExpanded ? 'bg-white/20 text-white' : styles.badge}`}>
                        {initials(p.fullname)}
                      </span>
                      <span className="truncate max-w-[140px]">{p.fullname}</span>
                      <svg
                        className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {items.map(p => {
                if (expandedId !== p.seniorId) return null;
                return (
                  <div key={`${p.seniorId}-panel`} className={`mt-3 rounded-lg border p-4 ${styles.panel}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className={`font-bold text-sm flex items-center gap-1.5 ${styles.heading}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Medical Precaution for {p.fullname}
                        </h5>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {p.precaution}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-3">
                      AI-generated guidance. Not a substitute for professional medical advice.
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
