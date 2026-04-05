import Link from "next/link"
import {StarIcon, Share2} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PredictionsHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Link href="#">
        <Button variant="ghost" size="icon" className="active:scale-95 p-1! bg-transparent! text-foreground! transition-transform">
          <StarIcon className="text-foreground w-6 h-6" />
        </Button>
      </Link>
      <h1 className="text-base font-semibold text-foreground">Predictions</h1>
      <Link href="#">
        <Button variant="ghost" size="icon" className="active:scale-95 p-1! bg-transparent! text-foreground! transition-transform">
          <Share2 className="text-foreground w-6 h-6" />
        </Button>
      </Link>
    </div>
  )
}
