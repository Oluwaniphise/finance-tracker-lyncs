"use client";

import { DonutProps } from "@/types";
import { PieChart, Pie, Cell } from "recharts";

export function Donut({ data, total, size = 140, strokeWidth = 18 }: DonutProps) {
  const outerRadius = size / 2;
  const innerRadius = outerRadius - strokeWidth;
  const hasData = total > 0 && data.length > 0;

  return (
    <PieChart width={size} height={size} aria-hidden="true">
      <Pie
        data={[{ value: 1 }]}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        stroke="none"
        fill="#1e1e2e"
        isAnimationActive={false}
      />
      {hasData && (
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          stroke="none"
          isAnimationActive
        >
          {data.map((slice) => (
            <Cell key={slice.id} fill={slice.color} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
