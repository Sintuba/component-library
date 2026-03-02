"use client"

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}

export interface SeparatorProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Separator({
  className,
  orientation = "horizontal"
}: SeparatorProps) {
  return (
    <div
      className={cn(
        "bg-gray-200",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  )
}
