'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import ProgressBar from '@/components/ProgressBar'
import GlowForm from '@/components/GlowForm'
import ZynvaLogo from '@/components/ZynvaLogo'

const TOTAL = 7

// Hero content for thank-you state (q=0)
const THANK_YOU_HERO = {
  titleBefore: "You're Our Kind ",
  titleEm: 'of Person',
  titleAfter: '.',
  sub: 'Your pain points are now our mission. Something great is being built.',
}

export default function Home() {
  const [currentQ, setCurrentQ] = useState(1)

  // currentQ = 0 means submitted / thank-you state
  const heroQ = currentQ === 0 ? 0 : currentQ

  return (
    <main className="relative min-h-screen overflow-x-hidden font-mono">
      {/* ── Logo in header/title area ── */}
      <div className="fixed top-6 left-6 z-20 flex items-center gap-2">
        <ZynvaLogo size={32} />
        <span className="font-playfair text-deep text-lg font-semibold">Zynva</span>
      </div>

      {/* ── Animated blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-35 animate-float"
          style={{ background: '#F5C0BE', top: '-100px', right: '-100px' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-[0.12] animate-float-slow"
          style={{ background: '#F07470', bottom: '10%', left: '-80px' }} />
        <div className="absolute w-[280px] h-[280px] rounded-full blur-[80px] opacity-[0.10] animate-float-gold"
          style={{ background: '#D4943A', top: '40%', right: '10%' }} />
      </div>

      {/* ── Hero ── */}
      {currentQ === 0 ? (
        <div className="relative z-10 text-center px-6 pt-14 pb-10">
          <h1
            className="font-playfair text-deep leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
          >
            {THANK_YOU_HERO.titleBefore}
            <em className="text-accent not-italic italic">{THANK_YOU_HERO.titleEm}</em>
            {THANK_YOU_HERO.titleAfter}
          </h1>
          <p className="mt-4 text-[13px] text-muted tracking-wide max-w-[480px] mx-auto leading-[1.8]">
            {THANK_YOU_HERO.sub}
          </p>
        </div>
      ) : (
        <Hero currentQuestion={currentQ} />
      )}

      {/* ── Progress bar (hide after submit) ── */}
      {currentQ > 0 && (
        <ProgressBar current={currentQ} total={TOTAL} />
      )}

      {/* ── Form ── */}
      <GlowForm onQuestionChange={setCurrentQ} />

      {/* ── Float tag ── */}
      <div className="fixed bottom-7 right-7 z-10 text-[10px] tracking-[2px] px-4 py-2 rounded-full opacity-85"
        style={{ background: '#2C0A09', color: '#FCDAD9', boxShadow: '0 4px 14px rgba(44,10,9,0.20)' }}>
        ZYNVA • BETA
      </div>
    </main>
  )
}
