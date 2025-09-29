import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { UseFormReturn } from 'react-hook-form';
import { CreateExpenseFormData } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const AmountInput = ({
  form,
}: {
  form: UseFormReturn<CreateExpenseFormData>;
}) => {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field, fieldState }) => (
        <FormItem className="mb-5">
          <div className="flex flex-row justify-between items-center">
            <FormLabel
              className={cn(
                'text-gray-400',
                fieldState.error && '!text-red-400'
              )}
            >
              Amount
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="form__input !w-[150px]"
                placeholder="Amount"
                value={field.value || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? 0 : parseFloat(value));
                }}
              />
            </FormControl>
          </div>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default AmountInput;
