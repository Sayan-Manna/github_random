"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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

interface POSMachine {
  machineId: string;
  storeId: string;
  operational: boolean;
  lastTransaction: string;
}

const COLORS = ["#6366f1", "#f43f5e"];

export default function CompactOperationalPOSMachines() {
  const [posMachines, setPosMachines] = useState<POSMachine[]>([
    {
      machineId: "POS001",
      storeId: "store1",
      operational: true,
      lastTransaction: "2023-06-15 10:30:00",
    },
    {
      machineId: "POS002",
      storeId: "store1",
      operational: false,
      lastTransaction: "2023-06-14 15:45:00",
    },
    {
      machineId: "POS003",
      storeId: "store2",
      operational: false,
      lastTransaction: "2023-06-13 09:20:00",
    },
    {
      machineId: "POS004",
      storeId: "store2",
      operational: true,
      lastTransaction: "2023-06-15 11:10:00",
    },
    {
      machineId: "POS005",
      storeId: "store3",
      operational: true,
      lastTransaction: "2023-06-15 12:05:00",
    },
  ]);

  const [storeInput, setStoreInput] = useState("");
  const [storeStatus, setStoreStatus] = useState<string | null>(null);
  const [nonOperationalMachines, setNonOperationalMachines] = useState<
    POSMachine[]
  >([]);

  const operationalMachines = posMachines.filter(
    (machine) => machine.operational
  ).length;
  const totalMachines = posMachines.length;
  const operationalPercentage = (operationalMachines / totalMachines) * 100;

  const data = [
    { name: "Operational", value: operationalMachines },
    { name: "Non-operational", value: totalMachines - operationalMachines },
  ];

  const checkStoreStatus = () => {
    const storeMachines = posMachines.filter(
      (m) => m.storeId.toLowerCase() === storeInput.toLowerCase()
    );
    if (storeMachines.length > 0) {
      const operational = storeMachines.filter((m) => m.operational).length;
      setStoreStatus(
        operational === storeMachines.length
          ? "All Operational"
          : `${operational}/${storeMachines.length} Operational`
      );
      setNonOperationalMachines(storeMachines.filter((m) => !m.operational));
    } else {
      setStoreStatus("Store not found");
      setNonOperationalMachines([]);
    }
  };

  return (
    <Card className="w-full h-[300px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            POS Machines
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total: {totalMachines}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 h-[190px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {operationalPercentage.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Operational
              </p>
            </div>
          </div>
          <div className="w-1/2 pl-4 flex flex-col justify-center">
            <div className="space-y-2">
              <Input
                value={storeInput}
                onChange={(e) => setStoreInput(e.target.value)}
                placeholder="Enter Store ID"
                className="text-sm"
              />
              <Button
                onClick={checkStoreStatus}
                className="w-full text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Check Status
              </Button>
            </div>
            {storeStatus && (
              <div className="mt-2 text-sm">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Status:{" "}
                  <span
                    className={
                      storeStatus.includes("All")
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {storeStatus}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        {nonOperationalMachines.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full bg-rose-600 hover:bg-rose-700 text-white"
              >
                View Non-Operational ({nonOperationalMachines.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Non-Operational POS Machines</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <ul className="space-y-2">
                  {nonOperationalMachines.map((machine) => (
                    <li key={machine.machineId} className="text-sm">
                      <span className="font-semibold">{machine.machineId}</span>{" "}
                      - Last Transaction: {machine.lastTransaction}
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
