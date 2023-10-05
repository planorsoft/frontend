import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Page({ children } : PageProps) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <>
      <div className="">
        <Menu toggleSidebar={toggleSidebar} />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid grid-cols-12">
              <div className="hidden lg:block col-span-2">
                <Sidebar className={sidebarOpen ? 'block' : 'hidden'} />
              </div>
              <div className="lg:hidden block">
                <Sidebar className={sidebarOpen ? 'block' : 'hidden'} />
              </div>
              <div className={`col-span-12 h-screen ${sidebarOpen ? 'lg:col-span-10' : ''}`}>
                  {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
