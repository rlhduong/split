import ExpenseForm from './(form)/ExpenseForm';
import { DataTable } from './data-table';
import { columns } from './column';

const ExpenseList = ({
  tripId,
  participants,
  expenses,
}: {
  tripId: string;
  participants: Participant[];
  expenses: ExpenseData[];
}) => {
  return (
    <div className="flex flex-col">
      <ExpenseForm tripId={tripId} participants={participants} />
      <DataTable columns={columns} data={expenses} />
    </div>
  );
};

export default ExpenseList;
