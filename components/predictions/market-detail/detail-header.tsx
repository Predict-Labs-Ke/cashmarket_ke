

import Link from "next/link";
import {ArrowLeft, Share2} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DetailHeaderProps {
  title: string;
  image: string;
  onShare?: () => void;
}

export function DetailHeader({ title, image, onShare }: DetailHeaderProps) {
 ;
  return (
  
      <div className="flex flex-row items-center  gap-2.5 w-full px-1">
     <Link href="/markets">
        <Button
          className="text-foreground! active:scale-95 transition-transform p-1! bg-transparent!"
           
            
          
          size="icon"
        >
         <ArrowLeft 
         className="text-foreground w-auto h-auto"
         />
        </Button>
     </Link>
        <div className="flex items-center gap-3 w-full ">


         


       <div className="relative w-12 h-12">
         <Image
          src={image || "/placeholder.svg"}
          alt={title}
       fill
          className="rounded-lg object-cover flex-shrink-0"
        />
       </div>
        <p className="text-base font-semibold text-foreground line-clamp-2">
          {title}
        </p>
      </div>
     <div>
         <Button
          onClick={onShare}
          className="text-foreground! active:scale-95 transition-transform p-1! bg-transparent!"
          size="icon"
        >
         <Share2
         className="text-foreground w-6 h-6"
         />
        </Button>
     </div>
      </div>

      
  
  );
}
