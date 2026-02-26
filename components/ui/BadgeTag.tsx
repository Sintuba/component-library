"use client"

// ============================================================
// Types
// ============================================================

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info"
export type BadgeSize    = "sm" | "md"

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  /** ステータスドット表示 */
  dot?: boolean
  /** 左アイコン */
  iconLeft?: React.ReactNode
  /** 右アイコン */
  iconRight?: React.ReactNode
  /** 削除ボタン表示 */
  onRemove?: () => void
  /** 削除ボタンのaria-label */
  removeLabel?: string
  className?: string
  children: React.ReactNode
}

export interface TagProps {
  size?: BadgeSize
  /** クリック可能なTag */
  onClick?: () => void
  /** 削除ボタン表示 */
  onRemove?: () => void
  removeLabel?: string
  /** 選択状態 */
  selected?: boolean
  className?: string
  children: React.ReactNode
}

// ============================================================
// Constants — Badge
// ============================================================

const BADGE_VARIANT: Record<BadgeVariant, { wrapper: string; dot: string }> = {
  default: {
    wrapper: "bg-gray-100 text-gray-700 border border-gray-200",
    dot:     "bg-gray-500",
  },
  success: {
    wrapper: "bg-green-50 text-green-700 border border-green-200",
    dot:     "bg-green-500",
  },
  warning: {
    wrapper: "bg-amber-50 text-amber-700 border border-amber-200",
    dot:     "bg-amber-500",
  },
  error: {
    wrapper: "bg-red-50 text-red-700 border border-red-200",
    dot:     "bg-red-500",
  },
  info: {
    wrapper: "bg-blue-50 text-blue-700 border border-blue-200",
    dot:     "bg-blue-500",
  },
}

const BADGE_SIZE: Record<BadgeSize, string> = {
  sm: "h-5 px-2   text-xs gap-1   rounded",
  md: "h-6 px-2.5 text-xs gap-1.5 rounded-md",
}

const BADGE_ICON_SIZE: Record<BadgeSize, string> = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
}

const BADGE_DOT_SIZE: Record<BadgeSize, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2   h-2",
}

// ============================================================
// Badge Component
// ============================================================

export function Badge({
  variant    = "default",
  size       = "md",
  dot        = false,
  iconLeft,
  iconRight,
  onRemove,
  removeLabel = "削除",
  className   = "",
  children,
}: BadgeProps) {
  const { wrapper, dot: dotColor } = BADGE_VARIANT[variant]

  return (
    <span
      className={[
        "inline-flex items-center font-medium leading-none",
        wrapper,
        BADGE_SIZE[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Dot */}
      {dot && !iconLeft && (
        <span
          className={[
            "rounded-full shrink-0",
            dotColor,
            BADGE_DOT_SIZE[size],
          ].join(" ")}
          aria-hidden="true"
        />
      )}

      {/* Left icon */}
      {iconLeft && !dot && (
        <span
          className={["shrink-0", BADGE_ICON_SIZE[size]].join(" ")}
          aria-hidden="true"
        >
          {iconLeft}
        </span>
      )}

      {/* Label */}
      <span>{children}</span>

      {/* Right icon */}
      {iconRight && !onRemove && (
        <span
          className={["shrink-0", BADGE_ICON_SIZE[size]].join(" ")}
          aria-hidden="true"
        >
          {iconRight}
        </span>
      )}

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          aria-label={`${removeLabel}: ${typeof children === "string" ? children : ""}`}
          className={[
            "shrink-0 rounded-sm opacity-60 hover:opacity-100 transition-opacity",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
            BADGE_ICON_SIZE[size],
          ].join(" ")}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  )
}

// ============================================================
// Tag Component
// ============================================================

export function Tag({
  size       = "md",
  onClick,
  onRemove,
  removeLabel = "削除",
  selected    = false,
  className   = "",
  children,
}: TagProps) {
  const baseClass = [
    "inline-flex items-center font-medium leading-none",
    "border transition-colors duration-150",
    size === "sm" ? "h-5 px-2 text-xs gap-1 rounded" : "h-6 px-2.5 text-xs gap-1.5 rounded-md",
    selected
      ? "bg-gray-900 text-white border-gray-900"
      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900",
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const content = (
    <>
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          aria-label={`タグを削除: ${typeof children === "string" ? children : ""}`}
          className={[
            "shrink-0 opacity-50 hover:opacity-100 transition-opacity rounded-sm",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
            size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5",
          ].join(" ")}
        >
          <CloseIcon />
        </button>
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClass}
        aria-pressed={selected}
      >
        {content}
      </button>
    )
  }

  return (
    <span className={baseClass}>
      {content}
    </span>
  )
}

// ============================================================
// Close Icon
// ============================================================

function CloseIcon() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 2l8 8M10 2l-8 8" />
    </svg>
  )
}

// ============================================================
// Usage Examples
// ============================================================
//
// ── Badge (ステータス系)
//
// <Badge variant="success" dot>公開中</Badge>
// <Badge variant="warning" dot>レビュー中</Badge>
// <Badge variant="error">エラー</Badge>
// <Badge variant="info" size="sm">NEW</Badge>
//
// // アイコン付き
// <Badge variant="success" iconLeft={<CheckIcon />}>承認済み</Badge>
//
// // 削除可能
// <Badge variant="default" onRemove={() => handleRemove()}>フィルター</Badge>
//
// ── Tag (カテゴリ系)
//
// // 静的
// <Tag>Next.js</Tag>
// <Tag>TypeScript</Tag>
//
// // クリック可能（フィルター等）
// <Tag onClick={() => toggle("react")} selected={selected}>React</Tag>
//
// // 削除可能（入力タグ等）
// <Tag onRemove={() => removeTag("design")}>デザイン</Tag>
//
// // 並べて使う
// <div className="flex flex-wrap gap-2">
//   {tags.map((tag) => (
//     <Tag key={tag} onRemove={() => removeTag(tag)}>{tag}</Tag>
//   ))}
// </div>
