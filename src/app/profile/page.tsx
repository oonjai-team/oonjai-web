// src/app/profile/page.tsx
"use client"
import { useState, useEffect } from "react"
import { Header } from "@/components/common/Header"
import { SeniorProfileSkeleton } from "@/components/common/Skeleton"
import { useAuth } from "@/lib/auth/AuthContext"
import { fetchSeniors, type SeniorProfile } from "@/lib/api/seniors"
import { getAgeFromDOB, formatDOB } from "@/lib/utils"

/* ── Icons ── */
function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-oonjai-green-500">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-oonjai-green-500">
      <path d="M12 21C12 21 4 14.36 4 8.5C4 5.42 6.42 3 9.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0 1 18.5 3C21.58 3 24 5.42 24 8.5c0 5.86-8 12.5-8 12.5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        transform="translate(-2, 0)"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#4D4D4D] flex-shrink-0">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WalkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#4D4D4D] flex-shrink-0">
      <circle cx="12" cy="4.5" r="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 21l3-7M17 21l-3-7M14 14l-2-4-3 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#4D4D4D] flex-shrink-0">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Helpers ── */
const RELATIONSHIP_LABELS: Record<string, string> = {
  child: "Child",
  grandchild: "Grand Child",
  sibling: "Sibling",
  others: "Others",
}

const GOAL_LABELS: Record<string, string> = {
  homecare: "Home Care Taking",
  activities: "Find & Book Activities",
  medical: "Medical Escort",
  outings: "Outings",
}

const CONCERN_LABELS: Record<string, string> = {
  fall: "Fall / Injury",
  lonely: "Loneliness",
  inactive: "Health Decline From Inactivity",
  health: "Current Health Complications",
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-4 border-b border-[#b1b1b1] mb-5">
      {icon}
      <h2 className="text-[#365C48] text-lg font-bold font-['Lexend']">{title}</h2>
    </div>
  )
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-[#EBF1ED] last:border-0">
      <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend'] sm:w-36 flex-shrink-0">{label}</span>
      <div className="text-[#0E211A] text-sm font-normal font-['Lexend'] flex-1">{children}</div>
    </div>
  )
}

/* ── Mobility badge colors ── */
function MobilityBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    "Independent": "bg-oonjai-green-50 text-oonjai-green-500",
    "Require a cane": "bg-amber-50 text-amber-700",
    "Wheelchair": "bg-orange-50 text-orange-600",
    "Bed Bound": "bg-red-50 text-red-600",
  }
  const color = colorMap[level] || "bg-gray-100 text-gray-600"
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-normal font-['Lexend'] ${color}`}>
      {level}
    </span>
  )
}

/* ── Page ── */
export default function ProfilePage() {
  const { user } = useAuth()
  const [seniors, setSeniors] = useState<SeniorProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeniors()
      .then(setSeniors)
      .finally(() => setLoading(false))
  }, [])

  const ac = user?.adultChild
  const initials = user
    ? `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()
    : "?"

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FFFAEF] px-4 sm:px-8 lg:px-64 py-8 lg:py-10">

        {/* Page title */}
        <h1 className="text-[#365C48] text-3xl lg:text-4xl font-bold font-['Lexend'] mb-8">
          Profile Settings
        </h1>

        <div className="flex flex-col gap-6">

          {/* ── Account Information ── */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
            <SectionHeader icon={<PersonIcon />} title="Account Information" />

            {/* Avatar + name banner */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-oonjai-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold font-['Lexend']">{initials}</span>
              </div>
              <div>
                <p className="text-[#0E211A] text-lg font-bold font-['Lexend']">
                  {user?.firstname} {user?.lastname}
                </p>
                <p className="text-[#4D4D4D] text-sm font-light font-['Lexend']">
                  {user?.role === "adult_child" ? "Adult Child" : user?.role}
                </p>
              </div>
            </div>

            <div className="border-t border-[#EBF1ED]">
              <DetailRow label="Email">{user?.email}</DetailRow>
              <DetailRow label="Phone">
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <span>{user?.phone || "—"}</span>
                </div>
              </DetailRow>
              <DetailRow label="Member Since">
                {user?.createdAt
                  ? new Date(user.createdAt.timeInMil).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })
                  : "—"}
              </DetailRow>
            </div>
          </div>

          {/* ── Care Profile ── */}
          {ac && (
            <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
              <SectionHeader icon={<HeartIcon />} title="Care Profile" />

              <DetailRow label="Relationship">
                {RELATIONSHIP_LABELS[ac.relationship] || ac.relationship}
              </DetailRow>

              <DetailRow label="Goal">
                <span className="px-3 py-1 bg-[#EBF1ED] rounded-full text-oonjai-green-500 text-sm font-normal font-['Lexend']">
                  {GOAL_LABELS[ac.goal] || ac.goal}
                </span>
              </DetailRow>

              <DetailRow label="Concerns">
                <div className="flex flex-wrap gap-2">
                  {ac.concerns.map(c => (
                    <span key={c}
                      className="px-3 py-1 bg-[#EBF1ED] rounded-full text-oonjai-green-500 text-sm font-normal font-['Lexend']">
                      {CONCERN_LABELS[c] || c}
                    </span>
                  ))}
                </div>
              </DetailRow>
            </div>
          )}

          {/* ── Senior Profiles ── */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
            <SectionHeader
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-oonjai-green-500">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              title="Senior Profiles"
            />

            {loading ? (
              <div className="flex flex-col gap-4">
                <SeniorProfileSkeleton />
                <SeniorProfileSkeleton />
              </div>
            ) : seniors.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#b1b1b1] text-sm font-light font-['Lexend']">
                  No senior profiles added yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {seniors.map((senior, idx) => (
                  <div key={senior.id}
                    className="rounded-xl border border-[#EBF1ED] overflow-hidden">

                    {/* Senior header */}
                    <div className="flex items-center gap-4 px-5 py-4 bg-[#EBF1ED]">
                      <div className="w-10 h-10 rounded-full bg-oonjai-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold font-['Lexend']">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="text-[#0E211A] text-base font-bold font-['Lexend']">
                          {senior.fullname}
                        </p>
                        <p className="text-[#4D4D4D] text-xs font-light font-['Lexend']">
                          Added {new Date(senior.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Senior details */}
                    <div className="px-5 py-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-[#EBF1ED]">
                        <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend'] sm:w-32 flex-shrink-0">Date of Birth</span>
                        <span className="text-[#0E211A] text-sm font-normal font-['Lexend']">
                          {formatDOB(senior.dateOfBirth)}
                          {getAgeFromDOB(senior.dateOfBirth) !== null && (
                            <span className="text-[#4D4D4D] ml-2">({getAgeFromDOB(senior.dateOfBirth)} yrs)</span>
                          )}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-[#EBF1ED]">
                        <div className="flex items-center gap-1.5 sm:w-32 flex-shrink-0">
                          <WalkIcon />
                          <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend']">Mobility</span>
                        </div>
                        <MobilityBadge level={senior.mobilityLevel} />
                      </div>

                      {senior.healthNote && (
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2">
                          <div className="flex items-center gap-1.5 sm:w-32 flex-shrink-0">
                            <NoteIcon />
                            <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend']">Health Notes</span>
                          </div>
                          <span className="text-[#0E211A] text-sm font-light font-['Lexend'] italic">
                            {senior.healthNote}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  )
}
