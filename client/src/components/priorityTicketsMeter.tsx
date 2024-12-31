import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TicketPriority {
  priority: "Low" | "Medium" | "High";
  total: number;
  solved: number;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
}

const CustomProgress = ({
  value,
  className,
  color,
}: {
  value: number;
  className?: string;
  color: string;
}) => (
  <div
    className={`h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}
  >
    <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

export default function PriorityTicketMeter() {
  const [ticketData, setTicketData] = useState<TicketPriority[]>([
    {
      priority: "Low",
      total: 50,
      solved: 30,
      color: "bg-emerald-500 dark:bg-emerald-400",
    },
    {
      priority: "Medium",
      total: 30,
      solved: 15,
      color: "bg-amber-500 dark:bg-amber-400",
    },
    {
      priority: "High",
      total: 20,
      solved: 5,
      color: "bg-rose-500 dark:bg-rose-400",
    },
  ]);

  const totalTickets = ticketData.reduce(
    (sum, priority) => sum + priority.total,
    0
  );
  const solvedTickets = ticketData.reduce(
    (sum, priority) => sum + priority.solved,
    0
  );
  const solvedPercentage = (solvedTickets / totalTickets) * 100;

  const chartData: ChartData[] = [
    { name: "Solved", value: solvedTickets },
    { name: "Unsolved", value: totalTickets - solvedTickets },
  ];

  // New distinct colors for the pie chart
  const pieChartColors = ["#3b82f6", "#94a3b8"];

  return (
    <Card className="w-full h-[300px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ticket Priority Meter
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total: {totalTickets}
          </div>
        </div>
        <div className="flex h-[200px]">
          <div className="w-1/2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {solvedPercentage.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Solved</p>
            </div>
          </div>
          <div className="w-1/2 pl-4 flex flex-col justify-center space-y-4">
            {ticketData.map((priority) => (
              <div key={priority.priority} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {priority.priority}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {priority.solved}/{priority.total}
                  </span>
                </div>
                <CustomProgress
                  value={(priority.solved / priority.total) * 100}
                  color={priority.color}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {solvedTickets} of {totalTickets} tickets solved
        </div>
      </CardContent>
    </Card>
  );
}
