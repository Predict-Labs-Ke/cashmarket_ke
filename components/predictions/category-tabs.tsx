"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

const categories = [
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
  { id: "sports", label: "Sports" },
  { id: "crypto", label: "Crypto" },
  { id: "politics", label: "Politics" },
  { id: "resolved", label: "Resolved" },
]

interface CategoryTabsProps {
  activeCategory: string;
}

export function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  return (
    <div className="flex gap-4 px-4  pb-4 overflow-x-auto scrollbar-none h-auto">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/predictions?category=${cat.id}`}
        >
          <Button className={`transition-colors p-2 rounded-2xl bg-transparent! hover:bg-transparent! truncate ${
            activeCategory === cat.id ? "text-accent    bg-foreground!  hover:bg-foreground! text-background! " : "text-muted-foreground"
          }`}
          variant="ghost"
          size="sm"

          >
            {cat.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
