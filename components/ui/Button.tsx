"use client"

import { forwardRef } from "react"

// ============================================================
// Types
// ============================================================

export type ButtonVariant = "default" | "primary" | "secondary" | "ghost" | "danger"
export type ButtonSize    = "sm" | "md" | "lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** ローディング中 */
  loading?: boolean
  /** 横幅100% */
  full?: boolean
  /** 左側アイコン */
  iconLeft?: React.ReactNode
  /** 右側アイコン */
  iconRight?: React.ReactNode
  /** asChildパターン用（LinkをButtonとして使う場合） */
  asChild?: boolean
}

// ============================================================
// Constants
// ============================================================

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default:
    "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
  primary:
    "bg-gray-900 text-white border border-gray-900 hover:bg-gray-700 hover:border-gray-700 active:bg-gray-800",
  secondary:
    "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
  ghost:
    "bg-transparent text-gray-700 border border-transparent hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
  danger:
    "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 active:bg-red-800",
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "h-8  px-3.5 text-xs  gap-1.5 rounded-md",
  md: "h-10 px-5   text-sm  gap-2   rounded-lg",
  lg: "h-12 px-7   text-base gap-2.5 rounded-lg",
}

const ICON_SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4   h-4",
  lg: "w-5   h-5",
}

const BASE_CLASS = [
  "inline-flex items-center justify-center",
  "font-medium leading-none",
  "transition-all duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-40",
  "select-none whitespace-nowrap",
  // ホバー時に微浮き（ghost以外）
  "hover:-translate-y-px",
].join(" ")

// ============================================================
// Button Component
// ============================================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = "primary",
      size     = "md",
      loading  = false,
      full     = false,
      iconLeft,
      iconRight,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          BASE_CLASS,
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          full ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className={["animate-spin shrink-0", ICON_SIZE_CLASS[size]].join(" ")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!loading && iconLeft && (
          <span
            className={["shrink-0", ICON_SIZE_CLASS[size]].join(" ")}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}

        {/* Label */}
        {children && (
          <span>{children}</span>
        )}

        {/* Right icon */}
        {!loading && iconRight && (
          <span
            className={["shrink-0", ICON_SIZE_CLASS[size]].join(" ")}
            aria-hidden="true"
          >
            {iconRight}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button

// ============================================================
// LinkButton: Next.js Link を Button として使う場合
// ============================================================
//
// import Link from "next/link"
//
// interface LinkButtonProps extends Omit<ButtonProps, "onClick"> {
//   href: string
// }
//
// export function LinkButton({ href, variant, size, full, iconLeft, iconRight, className, children }: LinkButtonProps) {
//   return (
//     <Link
//       href={href}
//       className={[
//         BASE_CLASS,
//         VARIANT_CLASS[variant ?? "primary"],
//         SIZE_CLASS[size ?? "md"],
//         full ? "w-full" : "",
//         className ?? "",
//       ].filter(Boolean).join(" ")}
//     >
//       {iconLeft && <span className={ICON_SIZE_CLASS[size ?? "md"]}>{iconLeft}</span>}
//       {children && <span>{children}</span>}
//       {iconRight && <span className={ICON_SIZE_CLASS[size ?? "md"]}>{iconRight}</span>}
//     </Link>
//   )
// }

// ============================================================
// Usage Examples
// ============================================================
//
// // 基本
// <Button>送信する</Button>
//
// // バリエーション
// <Button variant="secondary">キャンセル</Button>
// <Button variant="ghost">もっと見る</Button>
// <Button variant="danger">削除する</Button>
//
// // サイズ
// <Button size="sm">小さいボタン</Button>
// <Button size="lg">大きいボタン</Button>
//
// // アイコン付き
// <Button iconLeft={<ArrowRightIcon />}>次へ進む</Button>
// <Button iconRight={<ExternalLinkIcon />} variant="ghost">詳細を見る</Button>
//
// // ローディング
// <Button loading>送信中...</Button>
//
// // Full width
// <Button full>お問い合わせはこちら</Button>
//
// // disabled
// <Button disabled>送信不可</Button>
