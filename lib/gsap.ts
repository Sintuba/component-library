// ============================================================
// lib/animations/gsap.ts
// GSAP アニメーションユーティリティ
// 用途: ScrollTrigger / Hero入場 / stagger / hover
// ============================================================

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// Types
// ============================================================

export interface RevealOptions {
  /** 遅延 (秒) */
  delay?:     number
  /** duration (秒) */
  duration?:  number
  /** Y軸の移動量 (px) */
  distance?:  number
  /** ScrollTrigger 発火タイミング */
  start?:     string
}

export interface StaggerOptions extends RevealOptions {
  /** 要素間の遅延 (秒) */
  stagger?: number
}

export interface HeroEntranceOptions {
  /** タイトル要素のセレクタ or Element */
  title:    string | Element | null
  /** サブテキスト要素 */
  sub?:     string | Element | null
  /** CTAボタン要素 */
  cta?:     string | Element | null
  /** 画像・ビジュアル要素 */
  visual?:  string | Element | null
}

// ============================================================
// Defaults
// ============================================================

const DEFAULTS = {
  duration:  0.6,
  distance:  24,
  ease:      "power2.out",
  start:     "top 85%",
  stagger:   0.08,
} as const

// ============================================================
// scrollReveal
// 単一要素のフェードイン（ScrollTrigger付き）
// ============================================================

export const scrollReveal = (
  target: string | Element | null,
  options: RevealOptions = {}
) => {
  if (!target) return

  const {
    delay    = 0,
    duration = DEFAULTS.duration,
    distance = DEFAULTS.distance,
    start    = DEFAULTS.start,
  } = options

  gsap.fromTo(
    target,
    { opacity: 0, y: distance },
    {
      opacity:  1,
      y:        0,
      duration,
      delay,
      ease:     DEFAULTS.ease,
      scrollTrigger: {
        trigger:       target as Element,
        start,
        toggleActions: "play none none none",
      },
    }
  )
}

// ============================================================
// scrollRevealStagger
// 複数要素を順番にフェードイン
// ============================================================

export const scrollRevealStagger = (
  targets: string | NodeList | Element[],
  options: StaggerOptions = {}
) => {
  if (!targets) return

  const {
    delay    = 0,
    duration = DEFAULTS.duration,
    distance = DEFAULTS.distance,
    start    = DEFAULTS.start,
    stagger  = DEFAULTS.stagger,
  } = options

  // triggerは最初の要素
  const trigger =
    typeof targets === "string"
      ? (document.querySelector(targets) as Element)
      : targets instanceof NodeList
      ? (targets[0] as Element)
      : targets[0]

  if (!trigger) return

  gsap.fromTo(
    targets,
    { opacity: 0, y: distance },
    {
      opacity:  1,
      y:        0,
      duration,
      delay,
      stagger,
      ease:     DEFAULTS.ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  )
}

// ============================================================
// heroEntrance
// Hero専用入場シーケンス（title → sub → cta → visual）
// ============================================================

export const heroEntrance = (elements: HeroEntranceOptions) => {
  const { title, sub, cta, visual } = elements
  const tl = gsap.timeline()

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    )
  }

  if (sub) {
    tl.fromTo(
      sub,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.45" // titleと0.45秒オーバーラップ
    )
  }

  if (cta) {
    tl.fromTo(
      cta,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.35"
    )
  }

  if (visual) {
    tl.fromTo(
      visual,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
  }

  return tl
}

// ============================================================
// fadeIn
// シンプルなフェードイン（ScrollTriggerなし・即時）
// ============================================================

export const fadeIn = (
  target: string | Element | null,
  options: RevealOptions = {}
) => {
  if (!target) return

  const {
    delay    = 0,
    duration = DEFAULTS.duration,
    distance = DEFAULTS.distance,
  } = options

  gsap.fromTo(
    target,
    { opacity: 0, y: distance },
    { opacity: 1, y: 0, duration, delay, ease: DEFAULTS.ease }
  )
}

// ============================================================
// hoverLift
// カード・ボタン等のhover浮き上がり（GSAP管理が必要な場合）
// 通常はTailwindのhover:-translate-yで十分
// ============================================================

export const hoverLift = (
  target: Element,
  distance = 4
) => {
  const onEnter = () =>
    gsap.to(target, { y: -distance, duration: 0.2, ease: "power2.out" })
  const onLeave = () =>
    gsap.to(target, { y: 0, duration: 0.2, ease: "power2.out" })

  target.addEventListener("mouseenter", onEnter)
  target.addEventListener("mouseleave", onLeave)

  // クリーンアップ関数を返す
  return () => {
    target.removeEventListener("mouseenter", onEnter)
    target.removeEventListener("mouseleave", onLeave)
  }
}

// ============================================================
// Usage Examples
// ============================================================
//
// ── scrollReveal（単一要素）
// useEffect(() => {
//   const ctx = gsap.context(() => {
//     scrollReveal(".feature-title", { delay: 0.1 })
//   })
//   return () => ctx.revert()
// }, [])
//
// ── scrollRevealStagger（カードグリッド等）
// useEffect(() => {
//   const ctx = gsap.context(() => {
//     scrollRevealStagger(".card-item", { stagger: 0.1 })
//   }, containerRef)
//   return () => ctx.revert()
// }, [])
//
// ── heroEntrance
// useEffect(() => {
//   heroEntrance({
//     title:  heroTitleRef.current,
//     sub:    heroSubRef.current,
//     cta:    heroCtaRef.current,
//     visual: heroImageRef.current,
//   })
// }, [])
