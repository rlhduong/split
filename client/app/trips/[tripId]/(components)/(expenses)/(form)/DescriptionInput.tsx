import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { UseFormReturn } from 'react-hook-form';
import { CreateExpenseFormData } from '@/lib/schema';
import { Input } from '@/components/ui/input';

const DescriptionInput = ({
  form,
}: {
  form: UseFormReturn<CreateExpenseFormData>;
}) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="mb-5">
          <FormLabel className="text-gray-400">Description</FormLabel>
          <FormControl>
            <Input {...field} className="form__input" />
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default DescriptionInput;
