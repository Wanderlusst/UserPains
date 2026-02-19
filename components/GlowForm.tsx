'use client'

import { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { QUESTIONS, PAIN_LABELS, FEATURES, type Option } from '@/lib/data'

// Load canvas face client-side only (uses browser APIs)
const MoodCanvas = dynamic(() => import('./MoodCanvas'), { ssr: false })

interface Answers {
  q1?: string; q2?: string; q3?: string; pain?: number; q5?: string
  rant?: string; name?: string; email?: string; clinic?: string
}

interface GlowFormProps {
  onQuestionChange: (q: number) => void
}

export default function GlowForm({ onQuestionChange }: GlowFormProps) {
  const [current, setCurrent] = useState(1)
  const [answers, setAnswers] = useState<Answers>({ pain: 5 })
  const [selected, setSelected] = useState<Record<number, string>>({})
  const [painLevel, setPainLevel] = useState(5)
  const [rant, setRant] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [clinic, setClinic] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notified, setNotified] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const total = 7

  const shake = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 350)
  }

  const goTo = useCallback((q: number) => {
    setCurrent(q)
    onQuestionChange(q)
  }, [onQuestionChange])

  const next = (q: number) => {
    if ([1, 2, 3, 5].includes(q)) {
      if (!selected[q]) { shake(); return }
      setAnswers(prev => ({ ...prev, [`q${q}`]: selected[q] }))
    }
    if (q === 6) {
      setAnswers(prev => ({ ...prev, rant }))
      setTimeout(() => setShowSummary(true), 200)
    }
    if (q === 7) return
    goTo(q + 1)
  }

  const back = () => {
    if (current > 1) {
      setShowSummary(false)
      goTo(current - 1)
    }
  }

  const submit = async () => {
    if (!email || !email.includes('@')) { setEmailError(true); return }
    setEmailError(false)
    
    const finalAnswers = { ...answers, name, email, clinic }
    
    // Get Google Apps Script URL from environment variable
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
    
    if (scriptUrl && scriptUrl !== 'YOUR_WEB_APP_URL_HERE') {
      setSubmitting(true)
      try {
        console.log('Submitting to:', scriptUrl)
        console.log('Data being sent:', finalAnswers)
        
        const response = await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalAnswers),
        })
        
        console.log('✅ Data submitted to Google Sheets')
      } catch (err) {
        console.error('Error submitting form:', err)
        // Continue anyway - show success UI even if submission fails
      } finally {
        setSubmitting(false)
      }
    } else {
      console.warn('Google Apps Script URL not configured. Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL to .env.local')
      console.log('Submitted (local only):', finalAnswers)
    }
    
    burst()
    setSubmitted(true)
    setNotifyEmail(email)
    onQuestionChange(0) // trigger hero thank-you
  }

  const notifyMe = () => {
    if (!notifyEmail || !notifyEmail.includes('@')) return
    console.log('Notify:', notifyEmail)
    setNotified(true)
  }

  // Confetti burst
  const burst = () => {
    const emojis = ['🌸', '✨', '💐', '🌺', '🎀', '💅', '✦', '🌷', '💗', '⭐']
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      el.style.cssText = `
        position:fixed;font-size:1.4rem;pointer-events:none;z-index:999;
        left:${30 + Math.random() * 40}vw;top:${20 + Math.random() * 40}vh;
        animation:confettiFall ${1.2 + Math.random()}s ease forwards;
        animation-delay:${Math.random() * 0.4}s;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 2500)
    }
  }

  const selectOption = (qId: number, val: string) =>
    setSelected(prev => ({ ...prev, [qId]: val }))

  // ── Shared styles ──────────────────────────────────────────────
  const cardBase = `
    bg-white/80 backdrop-blur-2xl rounded-[28px] px-8 py-9
    border border-border animate-slide-up
    shadow-[0_4px_32px_rgba(44,10,9,0.07),0_1px_6px_rgba(44,10,9,0.04)]
  `
  const qNum = 'text-[10px] tracking-[3px] text-accent uppercase mb-3'
  const qText = 'font-playfair text-[1.4rem] leading-[1.4] text-deep mb-7'
  const btnNext = `
    flex-1 py-4 rounded-2xl font-mono text-[12px] tracking-[2px] uppercase
    text-white cursor-pointer transition-all duration-200
    shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5
  `
  const btnBack = `
    px-5 py-4 rounded-2xl font-mono text-[12px] text-muted cursor-pointer
    transition-all duration-200 border-[1.5px] border-border bg-white/50
    hover:border-accent hover:text-accent hover:bg-selected
  `

  if (submitted) {
    return (
      <div className="animate-slide-up text-center px-8 py-14">
        <p className="text-[12px] text-muted leading-[1.9] max-w-[400px] mx-auto mb-8">
          We've captured your pain points. Our team is already plotting the perfect SaaS solution for aesthetic clinics like yours. Stay tuned.
        </p>

        <div
          className="rounded-3xl p-7 text-left max-w-[480px] mx-auto border border-border"
          style={{ background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(20px)', boxShadow: '0 4px 32px rgba(44,10,9,0.08)' }}
        >
          <h3 className="font-playfair text-[1.15rem] text-deep mb-1.5">Coming Soon</h3>
          <p className="text-[11px] text-muted leading-[1.8] mb-5">
            The all-in-one operating system built exclusively for aesthetic clinics. We're turning your pain points into features.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {FEATURES.map(f => (
              <span
                key={f}
                className="px-3.5 py-1.5 rounded-full text-[10px] tracking-wide text-accent border border-border bg-surface cursor-default transition-all hover:bg-accent hover:text-white hover:border-accent"
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-muted mb-3.5">Get early access &amp; founding member pricing:</p>
          {notified ? (
            <p className="text-[11px] text-accent text-center tracking-wide">✓ YOU'RE ON THE LIST — WE'LL BE IN TOUCH!</p>
          ) : (
            <div className="flex gap-2.5">
              <input
                type="email"
                value={notifyEmail}
                onChange={e => setNotifyEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl font-mono text-[12px] text-ink bg-white/85 border-[1.5px] border-border outline-none placeholder:text-subtle focus:border-accent focus:shadow-[0_0_0_3px_rgba(181,48,42,0.09)] transition-all"
              />
              <button
                onClick={notifyMe}
                className="px-5 py-3 rounded-xl font-mono text-[11px] tracking-wide text-white whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#D94F48,#B5302A)', boxShadow: '0 4px 14px rgba(181,48,42,0.25)' }}
              >
                Notify Me ✦
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-[600px] mx-auto px-5 mt-10 pb-20">

      {/* Q1: Role */}
      {current === 1 && (
        <div className={`${cardBase} ${shaking ? 'animate-[shakeX_0.3s_ease]' : ''}`}>
          <div className={qNum}>{QUESTIONS[0].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[0].emoji}</span>
          <div className={qText}>{QUESTIONS[0].text}</div>
          <OptionList qId={1} options={QUESTIONS[0].options!} selected={selected[1]} onSelect={v => selectOption(1, v)} />
          <NavRow onNext={() => next(1)} showBack={false} />
        </div>
      )}

      {/* Q2: Size */}
      {current === 2 && (
        <div className={`${cardBase} ${shaking ? 'animate-[shakeX_0.3s_ease]' : ''}`}>
          <div className={qNum}>{QUESTIONS[1].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[1].emoji}</span>
          <div className={qText}>{QUESTIONS[1].text}</div>
          <OptionList qId={2} options={QUESTIONS[1].options!} selected={selected[2]} onSelect={v => selectOption(2, v)} />
          <NavRow onNext={() => next(2)} onBack={back} />
        </div>
      )}

      {/* Q3: Pain type */}
      {current === 3 && (
        <div className={`${cardBase} ${shaking ? 'animate-[shakeX_0.3s_ease]' : ''}`}>
          <div className={qNum}>{QUESTIONS[2].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[2].emoji}</span>
          <div className={qText}>{QUESTIONS[2].text}</div>
          <OptionList qId={3} options={QUESTIONS[2].options!} selected={selected[3]} onSelect={v => selectOption(3, v)} />
          <NavRow onNext={() => next(3)} onBack={back} />
        </div>
      )}

      {/* Q4: Slider */}
      {current === 4 && (
        <div className={cardBase}>
          <div className={qNum}>{QUESTIONS[3].number}</div>
          <MoodCanvas level={painLevel} />
          <div className={qText}>{QUESTIONS[3].text}</div>
          <div className="mt-2">
            <div className="font-playfair text-[3rem] text-accent text-center my-2">{painLevel}</div>
            <div className="text-[11px] text-muted text-center tracking-wide mb-1">{PAIN_LABELS[painLevel]}</div>
            <input
              type="range" min={1} max={10} value={painLevel}
              onChange={e => { const v = +e.target.value; setPainLevel(v); setAnswers(p => ({ ...p, pain: v })) }}
              className="pain-slider"
            />
            <div className="flex justify-between text-[10px] text-muted tracking-wide">
              <span>😌 MILDLY</span><span>😤 DAILY GRIND</span><span>🤯 SEND HELP</span>
            </div>
          </div>
          <NavRow onNext={() => next(4)} onBack={back} />
        </div>
      )}

      {/* Q5: Tools */}
      {current === 5 && (
        <div className={`${cardBase} ${shaking ? 'animate-[shakeX_0.3s_ease]' : ''}`}>
          <div className={qNum}>{QUESTIONS[4].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[4].emoji}</span>
          <div className={qText}>{QUESTIONS[4].text}</div>
          <OptionList qId={5} options={QUESTIONS[4].options!} selected={selected[5]} onSelect={v => selectOption(5, v)} />
          <NavRow onNext={() => next(5)} onBack={back} />
        </div>
      )}

      {/* Q6: Rant */}
      {current === 6 && (
        <div className={cardBase}>
          <div className={qNum}>{QUESTIONS[5].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[5].emoji}</span>
          <div className={qText}>{QUESTIONS[5].text}</div>
          <textarea
            value={rant} onChange={e => setRant(e.target.value)}
            placeholder="e.g. I wish I had a magic button that automatically sends consent forms, confirms bookings, updates patient records, and makes me a coffee..."
            className="w-full border-[1.5px] border-border rounded-2xl p-4 font-mono text-[12px] text-ink resize-y min-h-[120px] outline-none leading-[1.8] bg-white/70 placeholder:text-subtle transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(181,48,42,0.09)]"
          />
          {showSummary && (
            <div className="mt-5 rounded-[18px] p-6 border-[1.5px] border-border animate-slide-up" style={{ background: 'linear-gradient(135deg,#FDEEED,#FAEAE9)' }}>
              <div className="text-[10px] tracking-[3px] text-accent uppercase mb-4">✦ Your Pain Profile</div>
              <div className="text-[12px] text-ink leading-loose">
                Role: <span className="text-accent font-medium">{answers.q1 || '—'}</span><br />
                Clinic size: <span className="text-accent font-medium">{answers.q2 || '—'}</span><br />
                Biggest pain: <span className="text-accent font-medium">{answers.q3 || '—'}</span><br />
                Pain level: <span className="text-accent font-medium">{answers.pain}/10</span><br />
                Current tools: <span className="text-accent font-medium">{answers.q5 || '—'}</span>
              </div>
            </div>
          )}
          <NavRow onNext={() => next(6)} onBack={back} />
        </div>
      )}

      {/* Q7: Contact */}
      {current === 7 && (
        <div className={cardBase}>
          <div className={qNum}>{QUESTIONS[6].number}</div>
          <span className="text-[2.8rem] block mb-3 leading-none">{QUESTIONS[6].emoji}</span>
          <div className={qText}>{QUESTIONS[6].text}</div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or your alter ego)"
            className="w-full border-[1.5px] border-border rounded-2xl px-5 py-3.5 font-mono text-[13px] text-ink outline-none bg-white/70 placeholder:text-subtle transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(181,48,42,0.09)] mb-2.5" />
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(false) }} placeholder="your@email.com"
            className={`w-full border-[1.5px] rounded-2xl px-5 py-3.5 font-mono text-[13px] text-ink outline-none bg-white/70 placeholder:text-subtle transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(181,48,42,0.09)] mb-2.5 ${emailError ? 'border-accent2' : 'border-border'}`} />
          <input type="text" value={clinic} onChange={e => setClinic(e.target.value)} placeholder="Clinic name (optional)"
            className="w-full border-[1.5px] border-border rounded-2xl px-5 py-3.5 font-mono text-[13px] text-ink outline-none bg-white/70 placeholder:text-subtle transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(181,48,42,0.09)] mb-2.5" />
          <div className="flex gap-3 mt-7">
            <button onClick={back} className={btnBack}>← Back</button>
            <button
              onClick={submit}
              disabled={submitting}
              className={`${btnNext} ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ background: 'linear-gradient(135deg,#D94F48,#B5302A)' }}
            >
              {submitting ? 'Submitting...' : 'Submit ✦'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function OptionList({ qId, options, selected, onSelect }: {
  qId: number; options: Option[]; selected?: string; onSelect: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`flex items-center gap-3.5 px-[18px] py-3.5 rounded-2xl text-left font-mono text-[12px] leading-[1.5] border-[1.5px] cursor-pointer transition-all duration-200
            ${selected === opt.value
              ? 'border-accent text-accent shadow-opt bg-gradient-to-br from-selected to-surface'
              : 'border-border text-ink bg-white/60 hover:border-accent2 hover:bg-selected hover:translate-x-1 hover:shadow-opt'
            }`}
        >
          <span className="text-[1.3rem] flex-shrink-0">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function NavRow({ onNext, onBack, showBack = true }: {
  onNext: () => void; onBack?: () => void; showBack?: boolean
}) {
  return (
    <div className="flex gap-3 mt-7">
      {showBack && onBack && (
        <button onClick={onBack} className="px-5 py-4 rounded-2xl font-mono text-[12px] text-muted cursor-pointer transition-all duration-200 border-[1.5px] border-border bg-white/50 hover:border-accent hover:text-accent hover:bg-selected">
          ← Back
        </button>
      )}
      <button
        onClick={onNext}
        className="flex-1 py-4 rounded-2xl font-mono text-[12px] tracking-[2px] uppercase text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg,#B5302A,#8A1F1A)', boxShadow: '0 4px 16px rgba(181,48,42,0.25)' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 24px rgba(181,48,42,0.32)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(181,48,42,0.25)')}
      >
        Next →
      </button>
    </div>
  )
}
