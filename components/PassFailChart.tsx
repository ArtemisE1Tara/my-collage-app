import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface PassFailChartProps {
  passCount: number;
  failCount: number;
}

export function PassFailChart({ passCount, failCount }: PassFailChartProps) {
  const data = [
    { name: "Passed", value: passCount },
    { name: "Failed", value: failCount },
  ];

  const COLORS = ["#4ade80", "#ef4444"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pass/Fail Rate</CardTitle>
        <CardDescription>Overview of test case results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

