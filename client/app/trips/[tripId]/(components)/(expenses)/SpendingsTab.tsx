import { useExpenseBarChartData } from '@/hook/useExpenseBarChartData';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingsTab = ({ expenses }: { expenses: ExpenseData[] }) => {
  const { barChartData } = useExpenseBarChartData(expenses);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={barChartData}
        barSize={40}
        margin={{ top: 20, bottom: 5 }}
      >
        <XAxis dataKey="category" stroke="rgb(156 163 175)" />
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
