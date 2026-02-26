"use client"

import Link from "next/link"
import Image from "next/image"

// ============================================================
// Types
// ============================================================

export interface FooterNavColumn {
  heading: string
  links: { label: string; href: string }[]
}

export interface FooterSocial {
  platform: "twitter" | "instagram" | "facebook" | "youtube" | "linkedin" | "github"
  href: string
}

export interface FooterProps {
  variant?: "modern" | "public"
  logo: { src: string; alt: string; orgName?: string }
  catchcopy?: string
  /** ナビゲーションカラム (最大3カラム推奨) */
  columns: FooterNavColumn[]
  cta?: { label: string; href: string }
  socials?: FooterSocial[]
  /** © {year} {clientName}. All rights reserved. */
  clientName: string
  /** プライバシーポリシー等の法的ページリンク */
  legalLinks?: { label: string; href: string }[]
}

// ============================================================
// Footer Component
// ============================================================

export default function Footer({
  variant = "modern",
  logo,
  catchcopy,
  columns,
  cta,
  socials,
  clientName,
  legalLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const isModern = variant === "modern"

  return (
    <footer
      className={[
        "w-full",
        isModern ? "bg-gray-950 text-white" : "bg-white text-gray-800 border-t-2 border-gray-200",
      ].join(" ")}
      role="contentinfo"
    >
      {/* ── CTA Banner (modern only) */}
      {isModern && cta && (
        <div className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {catchcopy ?? "まずはお気軽にご相談ください。"}
            </p>
            <Link
              href={cta.href}
              className="flex-shrink-0 px-8 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:-translate-y-0.5 hover:bg-gray-100 transition-all duration-200"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      )}

      {/* ── CTA Banner (public only) */}
      {!isModern && cta && (
        <div className="bg-blue-700">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-bold text-white">
              {catchcopy ?? "ご不明な点はお気軽にお問い合わせください。"}
            </p>
            <Link
              href={cta.href}
              className="flex-shrink-0 px-6 py-3 bg-white text-blue-700 text-sm font-bold rounded border-2 border-white hover:bg-blue-50 transition-colors duration-200"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      )}

      {/* ── Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ── Col 1: ロゴ + キャッチコピー + SNS */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                className="object-contain"
                style={{ height: isModern ? "32px" : "40px", width: "auto" }}
              />
              {!isModern && logo.orgName && (
                <span className="text-gray-900 font-bold text-sm leading-tight">
                  {logo.orgName}
                </span>
              )}
            </Link>

            {/* Catchcopy (modern) */}
            {isModern && catchcopy && !cta && (
              <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
                {catchcopy}
              </p>
            )}
            {isModern && !catchcopy && (
              <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
                モダンで洗練されたウェブサイトを、あなたのビジネスへ。
              </p>
            )}

            {/* SNS Icons */}
            {socials && socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.platform}へのリンク`}
                    className={[
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200",
                      isModern
                        ? "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-700",
                    ].join(" ")}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Col 2〜4: ナビゲーションカラム */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3
                className={[
                  "text-xs font-semibold uppercase tracking-widest",
                  isModern ? "text-gray-500" : "text-gray-400",
                ].join(" ")}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "text-sm transition-colors duration-200",
                        isModern
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-blue-700 underline-offset-2",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar */}
      <div
        className={[
          "border-t",
          isModern ? "border-white/10" : "border-gray-200",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p
            className={[
              "text-xs",
              isModern ? "text-gray-500" : "text-gray-400",
            ].join(" ")}
          >
            © {currentYear} {clientName}. All rights reserved.
          </p>

          {/* Legal Links */}
          {legalLinks && legalLinks.length > 0 && (
            <nav aria-label="法的情報ナビゲーション">
              <ul className="flex items-center gap-4 flex-wrap">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "text-xs transition-colors duration-200",
                        isModern
                          ? "text-gray-500 hover:text-white"
                          : "text-gray-400 hover:text-blue-700 underline",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// Social Icons
// ============================================================

function SocialIcon({ platform }: { platform: FooterSocial["platform"] }) {
  const props = { width: 16, height: 16, fill: "currentColor", "aria-hidden": true as const }

  switch (platform) {
    case "twitter":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "instagram":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    case "facebook":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case "youtube":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "github":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
  }
}

// ============================================================
// Usage Example
// ============================================================
//
// // modern variant
// <Footer
//   variant="modern"
//   logo={{ src: "/logo.svg", alt: "Company Logo" }}
//   catchcopy="モダンで洗練されたウェブサイトを、あなたのビジネスへ。"
//   columns={[
//     { heading: "Product", links: [{ label: "Features", href: "/features" }, { label: "Pricing", href: "/pricing" }] },
//     { heading: "Company", links: [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }] },
//     { heading: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
//   ]}
//   cta={{ label: "お問い合わせ", href: "/contact" }}
//   socials={[
//     { platform: "twitter", href: "https://twitter.com/..." },
//     { platform: "instagram", href: "https://instagram.com/..." },
//   ]}
//   clientName="Your Company"
//   legalLinks={[
//     { label: "プライバシーポリシー", href: "/privacy" },
//     { label: "利用規約", href: "/terms" },
//   ]}
// />
//
// // public variant
// <Footer
//   variant="public"
//   logo={{ src: "/emblem.png", alt: "市章", orgName: "○○市役所" }}
//   columns={[
//     { heading: "市政情報", links: [{ label: "市長あいさつ", href: "/mayor" }, { label: "組織・機構", href: "/org" }] },
//     { heading: "くらし・手続き", links: [{ label: "住民票", href: "/juminhyo" }, { label: "転入・転出", href: "/transfer" }] },
//     { heading: "観光・産業", links: [{ label: "観光スポット", href: "/tourism" }, { label: "産業振興", href: "/industry" }] },
//   ]}
//   cta={{ label: "お問い合わせ", href: "/contact" }}
//   clientName="○○市"
//   legalLinks={[
//     { label: "プライバシーポリシー", href: "/privacy" },
//     { label: "サイトポリシー", href: "/policy" },
//     { label: "アクセシビリティ", href: "/accessibility" },
//   ]}
// />
