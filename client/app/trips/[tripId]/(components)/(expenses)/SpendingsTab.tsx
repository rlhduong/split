import { useExpenseBarChartData } from '@/hook/useExpenseBarChartData';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const SpendingsTab = ({ expenses }: { expenses: ExpenseData[] }) => {
  const { barChartData } = useExpenseBarChartData(expenses);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={barChartData}
        barSize={40}
        margin={{ top: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="category"
          stroke="rgb(156 163 175)"
          tick={<CustomTick />}
          interval={0}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: 'white',
          }}
          labelStyle={{ color: 'white' }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
        />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SpendingsTab;

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomTick = ({ x = 0, y = 0, payload }: CustomTickProps) => {
  const categoryShortForms: Record<string, string> = {
    Accommodation: 'Accom.',
    Transportation: 'Transport',
    'Food & Drinks': 'F&B',
    Shopping: 'Shop',
    Health: 'Health',
    Utilities: 'Utils',
    Miscellaneous: 'Misc.',
  };

  const [windowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const textValue = payload
    ? windowWidth < 1024
      ? categoryShortForms[payload.value] || payload.value
      : payload.value
    : '';

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="rgb(156 163 175)"
        fontSize={windowWidth < 640 ? 10 : 12}
      >
        {textValue}
      </text>
    </g>
  );
};
