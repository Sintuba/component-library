"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// Types
// ============================================================

export type SectionBg = "white" | "gray" | "dark"
export type SectionSize = "sm" | "md" | "lg" | "xl"
export type SectionMaxWidth = "sm" | "md" | "lg" | "xl" | "full"

export interface SectionWrapperProps {
  children: React.ReactNode
  /** アンカーリンク用ID */
  id?: string
  /** 背景色 */
  bg?: SectionBg
  /** 縦padding サイズ */
  size?: SectionSize
  /** コンテンツ最大幅 */
  maxWidth?: SectionMaxWidth
  /** GSAPスクロールリビール */
  reveal?: boolean
  /** 追加クラス */
  className?: string
}

// ============================================================
// Constants
// ============================================================

const BG_CLASS: Record<SectionBg, string> = {
  white: "bg-white",
  gray:  "bg-gray-50",
  dark:  "bg-gray-950 text-white",
}

const SIZE_CLASS: Record<SectionSize, string> = {
  sm: "py-12",          // 48px  — コンパクト
  md: "py-20",          // 80px  — 標準（公的機関向け）
  lg: "py-24",          // 96px  — モダン標準
  xl: "py-32",          // 128px — Hero直下・大セクション
}

const MAX_WIDTH_CLASS: Record<SectionMaxWidth, string> = {
  sm:   "max-w-2xl",    // 672px  — テキスト中心
  md:   "max-w-4xl",    // 896px  — 記事・フォーム
  lg:   "max-w-6xl",    // 1152px — 標準（推奨）
  xl:   "max-w-7xl",    // 1280px — ワイドレイアウト
  full: "max-w-full",   // 制限なし
}

// ============================================================
// SectionWrapper Component
// ============================================================

export default function SectionWrapper({
  children,
  id,
  bg = "white",
  size = "lg",
  maxWidth = "lg",
  reveal = true,
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  // ── GSAP ScrollReveal
  useEffect(() => {
    if (!reveal || !innerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: innerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reveal])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={[
        BG_CLASS[bg],
        SIZE_CLASS[size],
        className,
      ].join(" ")}
      // アンカーリンクがヘッダーに隠れないようオフセット
      style={id ? { scrollMarginTop: "80px" } : undefined}
    >
      <div
        ref={innerRef}
        className={[
          MAX_WIDTH_CLASS[maxWidth],
          "mx-auto px-6",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  )
}

// ============================================================
// Usage Examples
// ============================================================
//
// // 基本（デフォルト: white / lg / max-w-6xl / reveal on）
// <SectionWrapper>
//   <FeatureGrid />
// </SectionWrapper>
//
// // アンカーリンク対応
// <SectionWrapper id="about" bg="gray">
//   <AboutSection />
// </SectionWrapper>
//
// // ダークセクション・大余白
// <SectionWrapper bg="dark" size="xl">
//   <CtaSection />
// </SectionWrapper>
//
// // テキスト中心（狭いmax-width）・アニメーションなし
// <SectionWrapper maxWidth="md" reveal={false}>
//   <PrivacyPolicy />
// </SectionWrapper>
//
// // 公的機関向け（控えめな余白）
// <SectionWrapper bg="gray" size="md" maxWidth="lg">
//   <NewsSection />
// </SectionWrapper>
