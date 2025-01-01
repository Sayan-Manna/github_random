import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import { useEffect, useState } from "react";

const PageHeader = () => {
  const { pathname } = useLocation(); // Get the current path from location
  const [breadcrumbTitle, setBreadcrumbTitle] = useState<string>("");
  const [breadcrumbLink, setBreadcrumbLink] = useState<string>("/");

  // Dynamically set the breadcrumb title based on the route
  useEffect(() => {
    if (pathname === "/ticket") {
      setBreadcrumbTitle("Ticket");
      setBreadcrumbLink("/ticket");
    } else if (pathname === "/service") {
      setBreadcrumbTitle("Service Desk");
      setBreadcrumbLink("/service");
    } else if (pathname === "/feedback") {
      setBreadcrumbTitle("Feedback");
      setBreadcrumbLink("/feedback");
    } else {
      setBreadcrumbTitle("Dashboard");
      setBreadcrumbLink("/");
    }
  }, [pathname]);

  return (
    <header className=" sticky border-b border-b-gray-900 top-0 z-20 backdrop-filter backdrop-blur  flex h-14 mb-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              {/* <BreadcrumbLink>{breadcrumbLink}</BreadcrumbLink> */}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbLink>{breadcrumbTitle}</BreadcrumbLink>{" "}
              {/* Dynamic title */}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default PageHeader;
