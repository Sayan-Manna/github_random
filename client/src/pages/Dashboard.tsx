import PageHeader from "@/components/PageHeader";
import CompactOperationalPOSMachines from "@/components/pos-operational-chart";
import POSDataReflectionChecker from "@/components/pos-promotion-reflection-chart";
import PriorityTicketMeter from "@/components/priorityTicketsMeter";
import Demo from "./Demo";

export default function Dashboard() {
  return (
    <div className="page-container">
      <PageHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <CompactOperationalPOSMachines />

          {/* <div className="aspect-video rounded-xl bg-muted/50">
           </div> */}
          <POSDataReflectionChecker />
          {/* <div className="aspect-video rounded-xl bg-muted/50">
            
          </div> */}
          <PriorityTicketMeter />
          {/* <div className="aspect-video rounded-xl bg-muted/50">
            
          </div> */}
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <Demo />
        </div>
      </div>
    </div>
  );
}
