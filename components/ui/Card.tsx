"use client"

import Image from "next/image"

// ============================================================
// Types
// ============================================================

export type CardVariant     = "default" | "elevated" | "ghost"
export type CardAspectRatio = "16/9" | "4/3" | "1/1" | "3/4"

export interface CardProps {
  variant?: CardVariant
  /** クリック可能カード（hover浮き + cursor-pointer） */
  onClick?: () => void
  /** カード全体をリンクにする場合のhref（onClickより優先） */
  href?: string
  className?: string
  children: React.ReactNode
}

export interface CardImageProps {
  src: string
  alt: string
  /** アスペクト比制御 */
  aspectRatio?: CardAspectRatio
  className?: string
}

export interface CardBodyProps {
  className?: string
  children: React.ReactNode
}

export interface CardFooterProps {
  /** border-tで区切る */
  divider?: boolean
  className?: string
  children: React.ReactNode
}

// ============================================================
// Constants
// ============================================================

const VARIANT_CLASS: Record<CardVariant, string> = {
  default:  "bg-white border border-gray-200",
  elevated: "bg-white shadow-md shadow-black/5",
  ghost:    "bg-gray-50",
}

const ASPECT_RATIO_CLASS: Record<CardAspectRatio, string> = {
  "16/9": "aspect-video",   // 16:9
  "4/3":  "aspect-4/3",     // 4:3  ← Tailwind v3.3+
  "1/1":  "aspect-square",  // 1:1
  "3/4":  "aspect-3/4",     // 3:4（人物・縦長）
}

const BASE_CLASS = "rounded-xl overflow-hidden flex flex-col"

const HOVER_CLASS = [
  "transition-transform duration-250 ease-out",
  "hover:-translate-y-1",
  "cursor-pointer",
].join(" ")

// ============================================================
// Card
// ============================================================

export function Card({
  variant   = "default",
  onClick,
  href,
  className = "",
  children,
}: CardProps) {
  const isClickable = !!(onClick || href)

  const classes = [
    BASE_CLASS,
    VARIANT_CLASS[variant],
    isClickable ? HOVER_CLASS : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  // href指定時はaタグ、onClick時はdiv
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        className={classes}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

// ============================================================
// CardImage
// ============================================================

export function CardImage({
  src,
  alt,
  aspectRatio = "16/9",
  className   = "",
}: CardImageProps) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden",
        ASPECT_RATIO_CLASS[aspectRatio],
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

// ============================================================
// CardBody
// ============================================================

export function CardBody({
  className = "",
  children,
}: CardBodyProps) {
  return (
    <div
      className={[
        "flex flex-col gap-3 p-5 flex-1",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

// ============================================================
// CardFooter
// ============================================================

export function CardFooter({
  divider   = false,
  className = "",
  children,
}: CardFooterProps) {
  return (
    <div
      className={[
        "px-5 pb-5",
        divider ? "pt-4 border-t border-gray-100" : "pt-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

// ============================================================
// Usage Examples
// ============================================================
//
// ── 基本（テキストのみ）
// <Card variant="default">
//   <CardBody>
//     <h3 className="text-base font-semibold text-gray-900">タイトル</h3>
//     <p className="text-sm text-gray-500">説明テキスト</p>
//   </CardBody>
// </Card>
//
// ── 画像付き + Badge + Footer
// <Card variant="elevated" href="/blog/post-1" className="group">
//   <CardImage src="/thumbnail.jpg" alt="記事サムネイル" aspectRatio="16/9" />
//   <CardBody>
//     <div className="flex gap-2">
//       <Badge variant="info" size="sm">デザイン</Badge>
//       <Tag size="sm">Next.js</Tag>
//     </div>
//     <h3 className="text-base font-semibold text-gray-900 leading-snug">
//       記事タイトルがここに入ります
//     </h3>
//     <p className="text-sm text-gray-500 line-clamp-2">
//       記事の概要テキストが入ります。2行で切り捨て。
//     </p>
//   </CardBody>
//   <CardFooter divider>
//     <span className="text-xs text-gray-400">2025年1月1日</span>
//   </CardFooter>
// </Card>
//
// ── クリック可能（hover浮き）
// <Card variant="ghost" onClick={() => handleClick()}>
//   <CardBody>
//     <h3>クリックできるカード</h3>
//   </CardBody>
// </Card>
//
// ── 人物カード（縦長画像）
// <Card variant="default">
//   <CardImage src="/staff.jpg" alt="スタッフ名" aspectRatio="3/4" />
//   <CardBody>
//     <h3 className="font-semibold">山田 太郎</h3>
//     <p className="text-sm text-gray-500">デザイナー</p>
//   </CardBody>
// </Card>
//
// ── グリッド配置
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   {posts.map((post) => (
//     <Card key={post.id} variant="elevated" href={`/blog/${post.slug}`} className="group">
//       <CardImage src={post.thumbnail} alt={post.title} />
//       <CardBody>
//         <h3>{post.title}</h3>
//       </CardBody>
//     </Card>
//   ))}
// </div>
