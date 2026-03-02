"use client"

import { ComponentProps } from "react"

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}

export interface ScrollAreaProps extends ComponentProps<"div"> {
  className?: string
  children: React.ReactNode
}

export function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div className={cn("relative overflow-auto", className)} {...props}>
      {children}
    </div>
  )
}
