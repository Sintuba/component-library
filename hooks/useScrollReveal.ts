"use client"

// ============================================================
// hooks/useScrollReveal.ts
// GSAP ScrollTrigger を React に統合するカスタムフック
// ============================================================

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollReveal, scrollRevealStagger, type RevealOptions, type StaggerOptions } from "@/lib/animations/gsap"

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// useScrollReveal
// 単一要素にScrollRevealを適用するフック
// ============================================================

export function useScrollReveal<T extends Element = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      scrollReveal(ref.current, options)
    })
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// ============================================================
// useScrollRevealStagger
// 複数の子要素にstagger付きScrollRevealを適用するフック
// ============================================================

export function useScrollRevealStagger<T extends Element = HTMLDivElement>(
  /** 対象となる子要素のCSSセレクタ */
  childSelector: string,
  options: StaggerOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const targets = ref.current.querySelectorAll(childSelector)
    if (!targets.length) return

    const ctx = gsap.context(() => {
      scrollRevealStagger(targets, options)
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// ============================================================
// useReducedMotion
// prefers-reduced-motion を検知するフック
// アニメーションの有無を切り替えるために使う
// ============================================================

export function useReducedMotion(): boolean {
  const ref = useRef<boolean>(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    ref.current = mq.matches

    const onChange = (e: MediaQueryListEvent) => {
      ref.current = e.matches
    }

    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return ref.current
}

// ============================================================
// Usage Examples
// ============================================================
//
// ── useScrollReveal（単一要素）
// function FeatureSection() {
//   const ref = useScrollReveal<HTMLDivElement>({ delay: 0.1 })
//   return <div ref={ref}>コンテンツ</div>
// }
//
// ── useScrollRevealStagger（カードグリッド）
// function CardGrid() {
//   const ref = useScrollRevealStagger<HTMLDivElement>(".card-item", { stagger: 0.1 })
//   return (
//     <div ref={ref} className="grid grid-cols-3 gap-6">
//       {items.map((item) => (
//         <div key={item.id} className="card-item">
//           <Card>...</Card>
//         </div>
//       ))}
//     </div>
//   )
// }
//
// ── useReducedMotion
// function AnimatedComponent() {
//   const reduced = useReducedMotion()
//   useEffect(() => {
//     if (reduced) return // アニメーションスキップ
//     heroEntrance({ title: titleRef.current, ... })
//   }, [reduced])
// }
