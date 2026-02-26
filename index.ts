// ============================================================
// components/index.ts
// ライブラリ統合export
// 案件への持ち込み時はこのファイルごとコピーしてimportパスを調整する
// ============================================================

// ── Layout
export { default as Header }         from "./layout/Header"
export { default as Footer }         from "./layout/Footer"
export { default as SectionWrapper } from "./layout/SectionWrapper"

// ── UI
export { default as Button }         from "./ui/Button"
export { Badge, Tag }                from "./ui/BadgeTag"
export { Card, CardImage, CardBody, CardFooter } from "./ui/Card"
export { Heading, Body, Lead, Caption, Label }   from "./ui/Typography"

// ── Types (必要に応じてimport)
export type { HeaderProps, HeaderVariant, NavItem }          from "./layout/Header"
export type { FooterProps, FooterNavColumn, FooterSocial }   from "./layout/Footer"
export type { SectionWrapperProps, SectionBg, SectionSize }  from "./layout/SectionWrapper"
export type { ButtonProps, ButtonVariant, ButtonSize }       from "./ui/Button"
export type { BadgeProps, BadgeVariant, TagProps }           from "./ui/BadgeTag"
export type { CardProps, CardVariant, CardImageProps }       from "./ui/Card"
export type { HeadingProps, BodyProps, LeadProps }           from "./ui/Typography"

// ============================================================
// lib/animations/index.ts
// ============================================================

export {
  scrollReveal,
  scrollRevealStagger,
  heroEntrance,
  fadeIn,
  hoverLift,
} from "./lib/animations/gsap"

export type {
  RevealOptions,
  StaggerOptions,
  HeroEntranceOptions,
} from "./lib/animations/gsap"

// ============================================================
// hooks/index.ts
// ============================================================

export {
  useScrollReveal,
  useScrollRevealStagger,
  useReducedMotion,
} from "./hooks/useScrollReveal"
