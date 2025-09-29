'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { CreateExpenseFormData } from '@/lib/schema';

const categories = [
  {
    label: 'Accommodation',
    values: ['Hotels', 'Airbnb', 'Camping', 'Resorts'],
  },
  {
    label: 'Transportation',
    values: [
      'Public Transit',
      'Taxi',
      'Car Rental',
      'Fuel',
      'Flights',
      'Parking',
    ],
  },
  {
    label: 'Food & Drinks',
    values: ['Groceries', 'Restaurants', 'Cafes', 'Bars'],
  },
  {
    label: 'Shopping',
    values: ['Souvenirs', 'Clothing', 'Electronics', 'Gifts'],
  },
  {
    label: 'Health',
    values: ['Pharmacy', 'Doctor Visits'],
  },
  {
    label: 'Utilities',
    values: [
      'Internet/WiFi',
      'Phone/Data',
      'Laundry',
      'ATM Fees',
      'Currency Exchange',
    ],
  },
  { label: 'Miscellaneous', values: ['Other Expenses'] },
];

const CategoryInput = ({
  form,
}: {
  form: UseFormReturn<CreateExpenseFormData>;
}) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormField
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex flex-row justify-between items-center">
                <FormLabel
                  className={cn(
                    'text-gray-400',
                    fieldState.error && '!text-red-400'
                  )}
                >
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[150px] border-none form-button group">
                    <SelectTrigger className="[&>*]:!opacity-60 [&>*]:group-hover:!opacity-100 [&>*]:transition-opacity">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectGroup key={category.label}>
                        <SelectLabel>{category.label}</SelectLabel>
                        {category.values.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
      )}
    />
  );
};

export default CategoryInput;
