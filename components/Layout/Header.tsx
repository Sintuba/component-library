"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"

// ============================================================
// Types
// ============================================================

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

export interface HeaderLogo {
  src: string
  alt: string
  /** 公的機関系: ロゴ横に表示する機関名テキスト */
  orgName?: string
}

export type HeaderVariant = "modern" | "public"

export interface HeaderProps {
  variant?: HeaderVariant
  logo: HeaderLogo
  navigation: NavItem[]
  /** CTAボタン (modern向け) */
  cta?: { label: string; href: string }
}

// ============================================================
// Header Component
// ============================================================

export default function Header({
  variant = "modern",
  logo,
  navigation,
  cta,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const headerRef = useRef<HTMLElement>(null)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLUListElement>(null)
  const slideMenuRef = useRef<HTMLDivElement>(null)

  const isModern = variant === "modern"
  const isPublic = variant === "public"

  // ── Scroll detection (modern only)
  useEffect(() => {
    if (isPublic) return
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isPublic])

  // ── Escape key to close menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // ── Body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  // ── Modern: フルスクリーンオーバーレイアニメーション
  const animateModernOpen = useCallback(() => {
    const overlay = menuOverlayRef.current
    const items = menuItemsRef.current?.querySelectorAll("li")
    if (!overlay || !items) return

    gsap.set(overlay, { display: "flex" })
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.1 }
    )
  }, [])

  const animateModernClose = useCallback((onComplete: () => void) => {
    const overlay = menuOverlayRef.current
    if (!overlay) { onComplete(); return }
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(overlay, { display: "none" })
        onComplete()
      },
    })
  }, [])

  // ── Public: スライドインアニメーション
  const animatePublicOpen = useCallback(() => {
    const menu = slideMenuRef.current
    if (!menu) return
    gsap.set(menu, { display: "flex" })
    gsap.fromTo(menu, { x: "100%" }, { x: "0%", duration: 0.3, ease: "power2.out" })
  }, [])

  const animatePublicClose = useCallback((onComplete: () => void) => {
    const menu = slideMenuRef.current
    if (!menu) { onComplete(); return }
    gsap.to(menu, {
      x: "100%",
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(menu, { display: "none" })
        onComplete()
      },
    })
  }, [])

  const openMenu = () => {
    setIsMenuOpen(true)
    if (isModern) animateModernOpen()
    if (isPublic) animatePublicOpen()
  }

  const closeMenu = () => {
    const done = () => setIsMenuOpen(false)
    if (isModern) animateModernClose(done)
    if (isPublic) animatePublicClose(done)
  }

  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu())

  // ============================================================
  // Header classes
  // ============================================================

  const headerClass = [
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isModern
      ? isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4"
        : "bg-transparent py-5"
      : "bg-white border-b border-gray-200 py-5",
  ].join(" ")

  // ============================================================
  // Render
  // ============================================================

  return (
    <>
      <header ref={headerRef} className={headerClass} role="banner">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={isPublic ? 48 : 40}
              height={isPublic ? 48 : 40}
              className="object-contain"
              style={{ height: isPublic ? "48px" : "36px", width: "auto" }}
            />
            {/* 公的機関: 機関名テキスト併記 */}
            {isPublic && logo.orgName && (
              <span className="text-gray-900 font-bold text-base leading-tight hidden sm:block">
                {logo.orgName}
              </span>
            )}
          </Link>

          {/* ── PC Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="メインナビゲーション"
          >
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={navLinkClass(isModern)}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.href}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.href ? null : item.href)
                      }
                    >
                      {item.label}
                      <svg
                        className="w-3.5 h-3.5 ml-1 opacity-50 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div
                      className={[
                        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48",
                        "bg-white border border-gray-100 rounded-xl shadow-lg shadow-black/5",
                        "opacity-0 invisible translate-y-2",
                        "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                        "transition-all duration-200 ease-out",
                      ].join(" ")}
                      role="menu"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={navLinkClass(isModern)}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA (modern only) */}
            {isModern && cta && (
              <Link
                href={cta.href}
                className="ml-4 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:-translate-y-0.5 hover:bg-gray-700 transition-all duration-200"
              >
                {cta.label}
              </Link>
            )}

            {/* 公的機関: お問い合わせボタン */}
            {isPublic && (
              <Link
                href="/contact"
                className="ml-4 px-5 py-2.5 rounded border-2 border-blue-700 text-blue-700 text-sm font-bold hover:bg-blue-700 hover:text-white transition-colors duration-200"
              >
                お問い合わせ
              </Link>
            )}
          </nav>

          {/* ── Hamburger Button */}
          <button
            className={[
              "md:hidden flex items-center gap-2 p-2 rounded-lg transition-colors",
              isModern ? "hover:bg-black/5" : "hover:bg-gray-100",
            ].join(" ")}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-controls="mobile-menu"
          >
            {/* 公的機関: ラベルテキスト併記 */}
            {isPublic && (
              <span className="text-sm font-medium text-gray-700">
                {isMenuOpen ? "閉じる" : "メニュー"}
              </span>
            )}
            <HamburgerIcon isOpen={isMenuOpen} isModern={isModern} />
          </button>
        </div>
      </header>

      {/* ============================================================
          Modern: フルスクリーンオーバーレイメニュー
      ============================================================ */}
      {isModern && (
        <div
          ref={menuOverlayRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-white hidden flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
        >
          <ul
            ref={menuItemsRef}
            className="flex flex-col items-center gap-2 w-full px-8"
          >
            {navigation.map((item) => (
              <li key={item.href} className="w-full text-center">
                <Link
                  href={item.href}
                  className="block text-3xl font-semibold text-gray-900 py-3 hover:text-gray-500 transition-colors tracking-tight"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {/* サブメニュー */}
                {item.children && (
                  <div className="flex flex-col items-center gap-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-base text-gray-400 hover:text-gray-700 transition-colors py-1"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {cta && (
              <li className="mt-6 w-full">
                <Link
                  href={cta.href}
                  className="block w-full py-4 bg-gray-900 text-white text-lg font-medium rounded-xl text-center hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  {cta.label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ============================================================
          Public: 右からスライドインメニュー
      ============================================================ */}
      {isPublic && (
        <>
          {/* オーバーレイ背景 */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}
          <div
            ref={slideMenuRef}
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl hidden flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="モバイルメニュー"
          >
            {/* スライドメニューヘッダー */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <span className="font-bold text-gray-900">メニュー</span>
              <button
                onClick={closeMenu}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                aria-label="メニューを閉じる"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ナビリンク */}
            <nav className="flex-1 overflow-y-auto py-4" aria-label="モバイルナビゲーション">
              <ul>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center px-6 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                    {/* サブメニュー */}
                    {item.children && (
                      <ul className="bg-gray-50">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex items-center pl-10 pr-6 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                              onClick={closeMenu}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 flex-shrink-0" />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* フッター: お問い合わせ */}
            <div className="p-6 border-t border-gray-200">
              <Link
                href="/contact"
                className="block w-full py-3 bg-blue-700 text-white text-sm font-bold rounded text-center hover:bg-blue-800 transition-colors"
                onClick={closeMenu}
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// ============================================================
// Sub Components
// ============================================================

function HamburgerIcon({ isOpen, isModern }: { isOpen: boolean; isModern: boolean }) {
  const size = isModern ? 24 : 32
  const stroke = isModern ? 1.5 : 2

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

// ============================================================
// Helpers
// ============================================================

function navLinkClass(isModern: boolean) {
  return [
    "flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200",
    isModern
      ? "text-gray-600 hover:text-gray-900 hover:bg-black/5 font-medium"
      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium underline-offset-2",
  ].join(" ")
}

// ============================================================
// Usage Example
// ============================================================
//
// // modern variant
// <Header
//   variant="modern"
//   logo={{ src: "/logo.svg", alt: "Company Logo" }}
//   navigation={[
//     { label: "Features", href: "/features" },
//     { label: "Pricing", href: "/pricing" },
//     {
//       label: "Resources",
//       href: "/resources",
//       children: [
//         { label: "Blog", href: "/blog" },
//         { label: "Docs", href: "/docs" },
//       ],
//     },
//   ]}
//   cta={{ label: "Get Started", href: "/signup" }}
// />
//
// // public variant
// <Header
//   variant="public"
//   logo={{ src: "/emblem.png", alt: "市章", orgName: "○○市役所" }}
//   navigation={[
//     { label: "市政情報", href: "/city" },
//     { label: "くらし・手続き", href: "/life",
//       children: [
//         { label: "住民票", href: "/life/juminhyo" },
//         { label: "転入・転出", href: "/life/transfer" },
//       ]
//     },
//     { label: "観光・産業", href: "/tourism" },
//   ]}
// />
