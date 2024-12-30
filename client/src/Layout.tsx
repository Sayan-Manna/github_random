import { Outlet } from "react-router-dom";
import { useSidebar } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { cn } from "./lib/utils";

function Layout() {
  const { state } = useSidebar();

  return (
    <main className={cn("relative min-h-screen flex w-full")}>
      <AppSidebar />
      <div
        className={`min-h-screen p-7 flex relative w-full ${
          state === "collapsed" ? " ml-8" : "ml-3"
        }`}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
