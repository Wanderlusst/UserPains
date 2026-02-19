'use client'

import { useEffect, useRef } from 'react'

interface MoodCanvasProps {
  level: number // 1–10
}

export default function MoodCanvas({ level }: MoodCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Spring state stored in refs so animation loop can access without re-render
  const stateRef = useRef({
    faceR: 255, faceG: 210, faceB: 50,
    shadowR: 200, shadowG: 160, shadowB: 20,
    blushOp: 0.8,
    browTilt: 0, browY: 0,
    mouthCurve: 22, mouthWidth: 55, mouthOpen: 0,
    eyeSquint: 0, eyeHappy: 0,
    tearOp: 0, tearY: 0,
    sweatOp: 0,
    shakeX: 0, shakeY: 0,
    scale: 1,
  })
  const velRef = useRef<Record<string, number>>({})
  const targetRef = useRef({ ...stateRef.current })
  const shakeTimeRef = useRef(0)
  const shakeAmpRef = useRef(0)
  const shakeTargetAmpRef = useRef(0)
  const rafRef = useRef<number>(0)
  const levelRef = useRef(level)

  // Init velocities
  useEffect(() => {
    const vel: Record<string, number> = {}
    for (const k in stateRef.current) vel[k] = 0
    velRef.current = vel
  }, [])

  // Update target when level changes
  useEffect(() => {
    levelRef.current = level
    computeTarget(level)
  }, [level])

  function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
  function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

  function computeTarget(v: number) {
    const t = targetRef.current
    if (v <= 4) {
      const u = (v - 1) / 3
      t.faceR = lerp(255, 255, u); t.faceG = lerp(218, 175, u); t.faceB = lerp(50, 40, u)
    } else if (v <= 7) {
      const u = (v - 4) / 3
      t.faceR = lerp(255, 230, u); t.faceG = lerp(175, 80, u); t.faceB = lerp(40, 50, u)
    } else {
      const u = (v - 7) / 3
      t.faceR = lerp(230, 195, u); t.faceG = lerp(80, 45, u); t.faceB = lerp(50, 50, u)
    }
    t.shadowR = t.faceR * 0.72; t.shadowG = t.faceG * 0.65; t.shadowB = t.faceB * 0.55
    t.blushOp = v <= 3 ? lerp(0.8, 0.3, (v - 1) / 2) : v >= 8 ? lerp(0, 0.6, (v - 8) / 2) : 0
    t.browTilt = v <= 5 ? 0 : lerp(0, 1, (v - 5) / 5)
    t.browY = v <= 3 ? lerp(-4, 0, (v - 1) / 2) : lerp(0, 5, (v - 3) / 7)
    t.eyeHappy = v <= 3 ? lerp(0.6, 1.0, (4 - v) / 3) : 0
    t.eyeSquint = v <= 5 ? 0 : v <= 8 ? lerp(0, 0.85, (v - 5) / 3) : 1
    if (v <= 3) {
      t.mouthCurve = lerp(12, 24, (4 - v) / 3); t.mouthWidth = lerp(44, 56, (4 - v) / 3); t.mouthOpen = 0
    } else if (v <= 5) {
      t.mouthCurve = lerp(12, 0, (v - 3) / 2); t.mouthWidth = 44; t.mouthOpen = 0
    } else if (v <= 8) {
      t.mouthCurve = lerp(0, -20, (v - 5) / 3); t.mouthWidth = lerp(44, 36, (v - 5) / 3)
      t.mouthOpen = v >= 7 ? lerp(0, 0.35, v - 7) : 0
    } else {
      t.mouthCurve = -20; t.mouthWidth = 36; t.mouthOpen = lerp(0.35, 1, (v - 8) / 2)
    }
    t.tearOp = v >= 8 ? lerp(0, 1, (v - 8) / 2) : 0
    t.tearY = v >= 9 ? lerp(0, 10, v - 9) : 0
    t.sweatOp = v >= 5 && v <= 7 ? lerp(0, 1, (v - 4) / 3) : 0
    shakeTargetAmpRef.current = v >= 8 ? lerp(0, 7, (v - 8) / 2) : 0
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const S = 220

    const SPRING = 0.14, DAMP = 0.72

    function springTo(key: string, dest: number) {
      const s = stateRef.current as Record<string, number>
      const v = velRef.current
      const dx = dest - s[key]
      v[key] = v[key] * DAMP + dx * SPRING
      s[key] += v[key]
    }

    function drawFace() {
      ctx.clearRect(0, 0, S, S)
      ctx.save()
      const st = stateRef.current
      ctx.translate(S / 2 + st.shakeX, S / 2 + st.shakeY)
      ctx.scale(st.scale, st.scale)
      const R = 88
      ctx.shadowColor = `rgba(${Math.round(st.shadowR)},${Math.round(st.shadowG)},${Math.round(st.shadowB)},0.35)`
      ctx.shadowBlur = 18; ctx.shadowOffsetY = 6

      const fr = Math.round(st.faceR), fg = Math.round(st.faceG), fb = Math.round(st.faceB)
      const br = Math.min(255, fr + 28), bg_ = Math.min(255, fg + 22), bb = Math.min(255, fb + 18)
      const grad = ctx.createRadialGradient(-20, -28, 10, 0, 0, R)
      grad.addColorStop(0, `rgb(${br},${bg_},${bb})`)
      grad.addColorStop(0.6, `rgb(${fr},${fg},${fb})`)
      grad.addColorStop(1, `rgb(${Math.max(0, fr - 30)},${Math.max(0, fg - 30)},${Math.max(0, fb - 20)})`)
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill()

      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
      const shine = ctx.createRadialGradient(-24, -32, 2, -18, -28, 52)
      shine.addColorStop(0, 'rgba(255,255,255,0.38)')
      shine.addColorStop(0.5, 'rgba(255,255,255,0.08)')
      shine.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = shine; ctx.fill()

      if (st.blushOp > 0.01) {
        ctx.globalAlpha = st.blushOp
        const blushGrad = (cx: number) => {
          const g = ctx.createRadialGradient(cx, 30, 0, cx, 30, 22)
          g.addColorStop(0, 'rgba(255,160,130,0.8)'); g.addColorStop(0.6, 'rgba(255,140,120,0.4)'); g.addColorStop(1, 'rgba(255,140,120,0)')
          return g
        }
        ctx.beginPath(); ctx.ellipse(-52, 28, 20, 13, 0, 0, Math.PI * 2); ctx.fillStyle = blushGrad(-52); ctx.fill()
        ctx.beginPath(); ctx.ellipse(52, 28, 20, 13, 0, 0, Math.PI * 2); ctx.fillStyle = blushGrad(52); ctx.fill()
        ctx.globalAlpha = 1
      }

      const browColor = `rgb(${Math.round(fr * 0.25)},${Math.round(fg * 0.12)},${Math.round(fb * 0.08)})`
      ctx.strokeStyle = browColor; ctx.lineCap = 'round'; ctx.lineWidth = 7.5
      const bY = -18 + st.browY, tilt = st.browTilt
      ctx.beginPath(); ctx.moveTo(-46, bY + lerp(-3, 8, tilt)); ctx.quadraticCurveTo(-30, bY + lerp(-10, -2, tilt), -16, bY + lerp(-3, -6, tilt)); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(16, bY + lerp(-3, -6, tilt)); ctx.quadraticCurveTo(30, bY + lerp(-10, -2, tilt), 46, bY + lerp(-3, 8, tilt)); ctx.stroke()

      const eyeY = 4, eyeXL = -28, eyeXR = 28, eyeRx = 11, eyeRy = 13
      const drawEye = (cx: number) => {
        const sq = clamp(st.eyeSquint, 0, 1), hp = clamp(st.eyeHappy, 0, 1)
        ctx.save(); ctx.translate(cx, eyeY)
        if (sq > 0.95) {
          ctx.strokeStyle = browColor; ctx.lineWidth = 7; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(-eyeRx, 0); ctx.quadraticCurveTo(0, -4, eyeRx, 0); ctx.stroke()
        } else if (hp > 0.5) {
          const hT = (hp - 0.5) * 2
          ctx.strokeStyle = browColor; ctx.lineWidth = 7; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(-eyeRx, lerp(0, 4, hT)); ctx.quadraticCurveTo(0, lerp(-13, -10, hT), eyeRx, lerp(0, 4, hT)); ctx.stroke()
        } else {
          const openY = lerp(eyeRy, 4, sq)
          ctx.save()
          ctx.beginPath(); ctx.rect(-eyeRx - 4, -eyeRy - 4, (eyeRx + 4) * 2, eyeRy + 4 + openY); ctx.clip()
          ctx.beginPath(); ctx.ellipse(0, 0, eyeRx, eyeRy, 0, 0, Math.PI * 2); ctx.fillStyle = 'white'; ctx.fill()
          const irisSz = lerp(8, 7, sq)
          const irisGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, irisSz)
          irisGrad.addColorStop(0, 'rgba(80,50,35,1)'); irisGrad.addColorStop(0.4, 'rgba(40,22,14,1)'); irisGrad.addColorStop(1, 'rgba(15,8,5,1)')
          ctx.beginPath(); ctx.arc(0, 0, irisSz, 0, Math.PI * 2); ctx.fillStyle = irisGrad; ctx.fill()
          ctx.beginPath(); ctx.arc(0, 0, irisSz * 0.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.9)'; ctx.fill()
          ctx.beginPath(); ctx.arc(-3.5, -3.5, 3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill()
          ctx.beginPath(); ctx.arc(3, 3, 1.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill()
          ctx.restore()
        }
        ctx.restore()
      }
      drawEye(eyeXL); drawEye(eyeXR)

      if (st.tearOp > 0.01) {
        ctx.globalAlpha = st.tearOp
        const drawTear = (cx: number) => {
          const ty = eyeY + 14 + st.tearY
          ctx.beginPath(); ctx.moveTo(cx, ty - 14)
          ctx.bezierCurveTo(cx + 9, ty - 4, cx + 9, ty + 8, cx, ty + 16)
          ctx.bezierCurveTo(cx - 9, ty + 8, cx - 9, ty - 4, cx, ty - 14)
          const tg = ctx.createRadialGradient(cx, ty, 0, cx, ty, 12)
          tg.addColorStop(0, 'rgba(120,200,255,0.95)'); tg.addColorStop(1, 'rgba(80,160,255,0)')
          ctx.fillStyle = tg; ctx.fill()
        }
        drawTear(eyeXL - 2); drawTear(eyeXR + 2)
        ctx.globalAlpha = 1
      }

      if (st.sweatOp > 0.01) {
        ctx.globalAlpha = st.sweatOp
        const sx = 64, sy = -55
        ctx.beginPath(); ctx.moveTo(sx, sy - 14)
        ctx.bezierCurveTo(sx + 8, sy - 4, sx + 8, sy + 6, sx, sy + 12)
        ctx.bezierCurveTo(sx - 8, sy + 6, sx - 8, sy - 4, sx, sy - 14)
        const swG = ctx.createRadialGradient(sx - 2, sy, 1, sx, sy, 13)
        swG.addColorStop(0, 'rgba(160,220,255,0.95)'); swG.addColorStop(1, 'rgba(80,170,240,0)')
        ctx.fillStyle = swG; ctx.fill()
        ctx.globalAlpha = 1
      }

      const mY = 38, mW = st.mouthWidth, mC = st.mouthCurve, mOp = clamp(st.mouthOpen, 0, 1)
      if (mOp > 0.05) {
        const ow = lerp(mW * 0.55, mW * 0.85, mOp), oh = lerp(8, 26, mOp)
        const mp = new Path2D(); mp.ellipse(0, mY, ow, oh, 0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(fr * 0.18)},${Math.round(fg * 0.06)},${Math.round(fb * 0.05)},1)`
        ctx.fill(mp)
        if (mOp > 0.4) {
          ctx.save(); ctx.clip(mp)
          ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fillRect(-ow, mY - oh - 2, ow * 2, oh * 0.55)
          ctx.strokeStyle = 'rgba(200,200,200,0.5)'; ctx.lineWidth = 1.5
          for (let tx = -ow * 0.5; tx < ow; tx += ow * 0.4) {
            ctx.beginPath(); ctx.moveTo(tx, mY - oh); ctx.lineTo(tx, mY - oh * 0.3); ctx.stroke()
          }
          ctx.restore()
        }
        ctx.beginPath(); ctx.ellipse(0, mY, ow, oh, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${Math.round(fr * 0.3)},${Math.round(fg * 0.1)},${Math.round(fb * 0.1)},0.7)`
        ctx.lineWidth = 3; ctx.stroke()
      } else {
        ctx.beginPath(); ctx.moveTo(-mW, mY); ctx.quadraticCurveTo(0, mY + mC, mW, mY)
        ctx.strokeStyle = `rgb(${Math.round(fr * 0.28)},${Math.round(fg * 0.1)},${Math.round(fb * 0.08)})`
        ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke()
        if (mC > 12) {
          ctx.lineWidth = 4
          ctx.beginPath(); ctx.arc(-mW + 4, mY - 2, 4, 0.3, 1.2); ctx.stroke()
          ctx.beginPath(); ctx.arc(mW - 4, mY - 2, 4, Math.PI - 1.2, Math.PI - 0.3); ctx.stroke()
        }
      }
      ctx.restore()
    }

    function animate() {
      const t = targetRef.current as Record<string, number>
      const s = stateRef.current as Record<string, number>
      for (const k in s) {
        if (k === 'shakeX' || k === 'shakeY' || k === 'scale') continue
        springTo(k, t[k])
      }
      shakeAmpRef.current += (shakeTargetAmpRef.current - shakeAmpRef.current) * 0.12
      shakeTimeRef.current += 0.38
      s.shakeX = shakeAmpRef.current * Math.sin(shakeTimeRef.current * 2.1)
      s.shakeY = shakeAmpRef.current * 0.4 * Math.sin(shakeTimeRef.current * 3.3)
      t.scale = t.scale + (1 - t.scale) * 0.18
      s.scale += (t.scale - s.scale) * 0.22
      drawFace()
      rafRef.current = requestAnimationFrame(animate)
    }

    // Init state = target instantly
    computeTarget(levelRef.current)
    const t = targetRef.current as Record<string, number>
    const s = stateRef.current as Record<string, number>
    for (const k in s) s[k] = t[k]

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, []) // eslint-disable-line

  // Scale pop on level change
  useEffect(() => {
    targetRef.current.scale = 1.08
    setTimeout(() => { targetRef.current.scale = 1 }, 80)
  }, [level])

  return (
    <div className="flex justify-center mb-1">
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        className="canvas-face"
        style={{ width: 110, height: 110 }}
      />
    </div>
  )
}
