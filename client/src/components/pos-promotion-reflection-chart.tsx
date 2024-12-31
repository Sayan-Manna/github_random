import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface POSMachine {
  machineId: string;
  location: string;
  priceDataUpdated: boolean;
  promoDataUpdated: boolean;
  lastUpdateTimestamp: string;
}

const COLORS = ["#6366f1", "#f43f5e"];

export default function POSDataReflectionChecker() {
  const [posMachines, setPosMachines] = useState<POSMachine[]>([
    {
      machineId: "POS001",
      location: "Store A",
      priceDataUpdated: true,
      promoDataUpdated: true,
      lastUpdateTimestamp: "2023-06-15 10:30:00",
    },
    {
      machineId: "POS002",
      location: "Store B",
      priceDataUpdated: false,
      promoDataUpdated: true,
      lastUpdateTimestamp: "2023-06-14 15:45:00",
    },
    {
      machineId: "POS003",
      location: "Store C",
      priceDataUpdated: true,
      promoDataUpdated: false,
      lastUpdateTimestamp: "2023-06-13 09:20:00",
    },
    {
      machineId: "POS004",
      location: "Store D",
      priceDataUpdated: false,
      promoDataUpdated: false,
      lastUpdateTimestamp: "2023-06-12 14:10:00",
    },
    {
      machineId: "POS005",
      location: "Store E",
      priceDataUpdated: true,
      promoDataUpdated: true,
      lastUpdateTimestamp: "2023-06-15 11:05:00",
    },
  ]);

  const [machineInput, setMachineInput] = useState("");
  const [selectedMachine, setSelectedMachine] = useState<POSMachine | null>(
    null
  );

  const checkMachineStatus = () => {
    const machine = posMachines.find(
      (m) => m.machineId.toLowerCase() === machineInput.toLowerCase()
    );
    setSelectedMachine(machine || null);
  };

  const getStatusColor = (status: boolean) => {
    return status ? "bg-green-500" : "bg-red-500";
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle2 className="w-4 h-4" />
    ) : (
      <XCircle className="w-4 h-4" />
    );
  };

  const totalMachines = posMachines.length;
  const updatedMachines = posMachines.filter(
    (m) => m.priceDataUpdated && m.promoDataUpdated
  ).length;
  const updatePercentage = (updatedMachines / totalMachines) * 100;

  const chartData = [
    { name: "Updated", value: updatedMachines },
    { name: "Not Updated", value: totalMachines - updatedMachines },
  ];

  return (
    <Card className="w-full h-[300px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            POS Data Reflection
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total: {totalMachines}
          </div>
        </div>
        <div className="flex h-[150px]">
          <div className="w-1/2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {updatePercentage.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Updated
              </p>
            </div>
          </div>
          <div className="w-1/2 pl-2 flex flex-col justify-center">
            <div className="space-y-2">
              <Input
                value={machineInput}
                onChange={(e) => setMachineInput(e.target.value)}
                placeholder="Enter POS ID"
                className="text-sm"
              />
              <Button
                onClick={checkMachineStatus}
                className="w-full text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Check Status
              </Button>
            </div>
          </div>
        </div>
        {selectedMachine && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold mb-1">
              Machine: {selectedMachine.machineId}
            </h3>
            <div className="flex justify-between text-xs">
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${getStatusColor(
                  selectedMachine.priceDataUpdated
                )}`}
              >
                {getStatusIcon(selectedMachine.priceDataUpdated)} Price Data
              </Badge>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${getStatusColor(
                  selectedMachine.promoDataUpdated
                )}`}
              >
                {getStatusIcon(selectedMachine.promoDataUpdated)} Promo Data
              </Badge>
            </div>
          </div>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              View All Machines
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>POS Machines Status</DialogTitle>
            </DialogHeader>
            <div className="mt-2 max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                {posMachines.map((machine) => (
                  <li key={machine.machineId} className="text-sm border-b pb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{machine.machineId}</span>
                      <span className="text-xs text-gray-500">
                        {machine.location}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${getStatusColor(
                          machine.priceDataUpdated
                        )}`}
                      >
                        {getStatusIcon(machine.priceDataUpdated)} Price
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${getStatusColor(
                          machine.promoDataUpdated
                        )}`}
                      >
                        {getStatusIcon(machine.promoDataUpdated)} Promo
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {machine.lastUpdateTimestamp}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
