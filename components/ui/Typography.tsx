// ============================================================
// Typography Components
// 使い方: Heading / Body / Lead / Caption / Label
// modern系・公的機関系どちらにも対応（sizeで調整）
// ============================================================

import { createElement } from "react"
import { cn } from "@/lib/utils"

// ============================================================
// Types
// ============================================================

type HeadingLevel = 1 | 2 | 3 | 4
type HeadingSize  = "2xl" | "xl" | "lg" | "md" | "sm"
type BodySize     = "lg" | "md" | "sm"
type TextColor    = "default" | "muted" | "subtle" | "inverse" | "inherit"
type TextAlign    = "left" | "center" | "right"

interface BaseTextProps {
  color?:     TextColor
  align?:     TextAlign
  className?: string
  children:   React.ReactNode
}

export interface TypographyProps extends BaseTextProps {
  /** HTMLタグ (h1〜h4) */
  level?:    HeadingLevel
  /** 表示サイズ（levelと独立して制御可能） */
  size?:     HeadingSize
  /** モダン系: tracking-tight を適用 */
  tight?:    boolean
}

export interface HeadingProps extends BaseTextProps {
  /** HTMLタグ (h1〜h4) */
  level?:    HeadingLevel
  /** 表示サイズ（levelと独立して制御可能） */
  size?:     HeadingSize
  /** モダン系: tracking-tight を適用 */
  tight?:    boolean
}

export interface BodyProps extends BaseTextProps {
  size?:     BodySize
  /** line-height: loose（公的機関向け） */
  loose?:    boolean
}

export interface LeadProps extends BaseTextProps {}

export interface CaptionProps extends BaseTextProps {}

export interface LabelProps extends BaseTextProps {
  /** 必須マーク */
  required?: boolean
  htmlFor?:  string
}

// ============================================================
// Constants
// ============================================================

// Heading: level別デフォルトsize
const HEADING_LEVEL_DEFAULT: Record<HeadingLevel, HeadingSize> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
}

// Heading: sizeクラス
const HEADING_SIZE: Record<HeadingSize, string> = {
  "2xl": "text-5xl sm:text-6xl font-bold",    // H1 モダン: 48〜60px
  "xl":  "text-3xl sm:text-4xl font-bold",    // H1 公的 / H2 モダン: 32〜40px
  "lg":  "text-2xl sm:text-3xl font-semibold",// H2 公的 / H3 モダン: 24〜32px
  "md":  "text-xl font-semibold",             // H3 公的 / H4 モダン: 20px
  "sm":  "text-lg font-semibold",             // H4 公的: 18px
}

// Heading: tight（モダン系）
const HEADING_TIGHT = "tracking-tight leading-tight"
const HEADING_NORMAL = "leading-snug"

// Body
const BODY_SIZE: Record<BodySize, string> = {
  lg: "text-lg",   // 18px
  md: "text-base", // 16px
  sm: "text-sm",   // 14px
}

// Color
const TEXT_COLOR: Record<TextColor, string> = {
  default: "text-gray-900",
  muted:   "text-gray-500",
  subtle:  "text-gray-400",
  inverse: "text-white",
  inherit: "",
}

// Align
const TEXT_ALIGN: Record<TextAlign, string> = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
}

// ============================================================
// Shorthand Components
// ============================================================

export function H1({ color = "default", align = "left", className = "", children }: Omit<HeadingProps, 'level' | 'size' | 'tight'>) {
  return <Heading level={1} tight color={color} align={align} className={className}>{children}</Heading>
}

export function H2({ color = "default", align = "left", className = "", children }: Omit<HeadingProps, 'level' | 'size' | 'tight'>) {
  return <Heading level={2} tight color={color} align={align} className={className}>{children}</Heading>
}

export function H3({ color = "default", align = "left", className = "", children }: Omit<HeadingProps, 'level' | 'size' | 'tight'>) {
  return <Heading level={3} color={color} align={align} className={className}>{children}</Heading>
}

export function H4({ color = "default", align = "left", className = "", children }: Omit<HeadingProps, 'level' | 'size' | 'tight'>) {
  return <Heading level={4} color={color} align={align} className={className}>{children}</Heading>
}

export function Small({ color = "subtle", align = "left", className = "", children }: CaptionProps) {
  return <Caption color={color} align={align} className={className}>{children}</Caption>
}

// ============================================================
// Heading
// ============================================================

function Heading({
  level     = 2,
  size,
  tight     = false,
  color     = "default",
  align     = "left",
  className = "",
  children,
}: HeadingProps) {
  const resolvedSize = size ?? HEADING_LEVEL_DEFAULT[level]

  return createElement(
    `h${level}`,
    {
      className: cn(
        HEADING_SIZE[resolvedSize],
        tight ? HEADING_TIGHT : HEADING_NORMAL,
        TEXT_COLOR[color],
        TEXT_ALIGN[align],
        className
      ),
    },
    children
  )
}

// ============================================================
// Body
// ============================================================

export function Body({
  size      = "md",
  loose     = false,
  color     = "default",
  align     = "left",
  className = "",
  children,
}: BodyProps) {
  return (
    <p
      className={[
        BODY_SIZE[size],
        loose ? "leading-loose" : "leading-relaxed", // loose: 1.9 / relaxed: 1.75
        TEXT_COLOR[color],
        TEXT_ALIGN[align],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  )
}

// ============================================================
// Lead（リード文・Hero直下の大きめ本文）
// ============================================================

export function Lead({
  color     = "muted",
  align     = "left",
  className = "",
  children,
}: LeadProps) {
  return (
    <p
      className={[
        "text-lg sm:text-xl leading-relaxed font-normal",
        TEXT_COLOR[color],
        TEXT_ALIGN[align],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  )
}

// ============================================================
// Caption（補足・キャプション・小文字）
// ============================================================

export function Caption({
  color     = "subtle",
  align     = "left",
  className = "",
  children,
}: CaptionProps) {
  return (
    <span
      className={[
        "text-xs leading-normal",
        TEXT_COLOR[color],
        TEXT_ALIGN[align],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  )
}

// ============================================================
// Label（フォームラベル・セクションラベル）
// ============================================================

export function Label({
  required  = false,
  htmlFor,
  color     = "default",
  align     = "left",
  className = "",
  children,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        "text-sm font-medium leading-none",
        TEXT_COLOR[color],
        TEXT_ALIGN[align],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-red-500"
          aria-label="必須"
        >
          *
        </span>
      )}
    </label>
  )
}

// ============================================================
// Usage Examples
// ============================================================
//
// ── モダン系
// <Heading level={1} tight>
//   モダンなウェブサイトを、<br />あなたのビジネスへ。
// </Heading>
// <Lead>
//   Next.jsとTypeScriptで構築する、パフォーマンス重視のウェブ制作。
// </Lead>
//
// ── 公的機関系（sizeをワンランク下げる）
// <Heading level={1} size="xl">
//   ○○市へようこそ
// </Heading>
// <Body loose>
//   市民の皆さまへ、最新のお知らせをお届けします。
// </Body>
//
// ── セクションタイトルパターン
// <div className="flex flex-col gap-4">
//   <Caption color="muted">SERVICES</Caption>
//   <Heading level={2} tight>提供サービス</Heading>
//   <Lead>私たちが提供するサービスをご紹介します。</Lead>
// </div>
//
// ── フォームラベル
// <div className="flex flex-col gap-1.5">
//   <Label htmlFor="name" required>お名前</Label>
//   <input id="name" type="text" />
//   <Caption color="subtle">フルネームでご入力ください</Caption>
// </div>
//
// ── カラー・アラインメント
// <Heading level={3} color="muted" align="center">サブタイトル</Heading>
// <Body color="muted" align="center">説明テキスト</Body>
//
// ── levelとsizeを独立させる（h2タグだがh3サイズで表示）
// <Heading level={2} size="lg">小さく表示したいh2</Heading>
