'use client'

import { useEffect, useRef, useState } from 'react'
import { HERO_CONTENT } from '@/lib/data'

interface HeroProps {
  currentQuestion: number
}

export default function Hero({ currentQuestion }: HeroProps) {
  const [displayed, setDisplayed] = useState(currentQuestion)
  const [visible, setVisible] = useState(true)
  const animatingRef = useRef(false)
  const isFirst = useRef(true)

  useEffect(() => {
    // On first mount, set instantly
    if (isFirst.current) {
      isFirst.current = false
      setDisplayed(currentQuestion)
      return
    }

    if (animatingRef.current) return
    animatingRef.current = true

    // Fade out
    setVisible(false)

    setTimeout(() => {
      setDisplayed(currentQuestion)
      setVisible(true)
      setTimeout(() => { animatingRef.current = false }, 280)
    }, 270)
  }, [currentQuestion])

  const content = HERO_CONTENT[displayed] || HERO_CONTENT[1]

  return (
    <div className="relative z-10 text-center px-6 pt-14 pb-10">
      <h1
        className="font-playfair text-deep leading-tight"
        style={{
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {content.titleBefore}
        <em className="text-accent not-italic italic">{content.titleEm}</em>
        {content.titleAfter}
      </h1>
      <p
        className="mt-4 text-[13px] text-muted tracking-wide max-w-[480px] mx-auto leading-[1.8]"
        style={{
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {content.sub}
      </p>
    </div>
  )
}
