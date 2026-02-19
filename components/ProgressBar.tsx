'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current - 1) / total) * 100

  return (
    <div className="max-w-[560px] mx-auto px-6 animate-fadeDown" style={{ animationDelay: '0.3s' }}>
      <div className="flex justify-between text-[10px] tracking-[2px] text-muted mb-2 uppercase">
        <span>Your Journey</span>
        <span>{current - 1} / {total}</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #B5302A, #F07470)',
          }}
        />
      </div>
    </div>
  )
}
