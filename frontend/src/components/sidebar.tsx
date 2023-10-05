import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Library } from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 absolute w-full sm:w-fit h-full left-0 bg-background top-10 border-t border-r z-50 lg:relative lg:top-0 lg:border-r-0 lg:border-t-0", className)}>
      <div className="space-y-2 py-4">
        <Button variant="secondary" className="w-full justify-start">
          <p className="flex items-center gap-2 ">
            <Library />
            Potansiyel müşteriler
          </p>
        </Button>
        <Button variant="ghost" className="w-full justify-start whitespace-nowrap">
          Gerçek müşteriler
        </Button>
      </div>
    </div>
  )
}