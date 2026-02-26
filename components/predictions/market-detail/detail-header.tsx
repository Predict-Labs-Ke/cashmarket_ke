"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailHeaderProps {
  title: string;
  image: string;
  onShare?: () => void;
}

export function DetailHeader({ title, image, onShare }: DetailHeaderProps) {
  const router = useRouter();
  
  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={image || "/placeholder.svg"}
          alt=""
          className="w-12 h-12 rounded-xl object-cover border border-border"
        />
        <h1 className="text-lg font-semibold text-foreground line-clamp-2">
          {title}
        </h1>
      </div>
    </div>
  );
}
