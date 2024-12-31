import PageHeader from "@/components/PageHeader";
import CompactOperationalPOSMachines from "@/components/pos-operational-chart";
import POSDataReflectionChecker from "@/components/pos-promotion-reflection-chart";
import PriorityTicketMeter from "@/components/priorityTicketsMeter";

export default function Dashboard() {
  return (
    <div className="page-container">
      <PageHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <CompactOperationalPOSMachines />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <POSDataReflectionChecker />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <PriorityTicketMeter />
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  );
}
