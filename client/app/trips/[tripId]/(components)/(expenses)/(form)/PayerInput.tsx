'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { CreateExpenseFormData } from '@/lib/schema';

const PayerInput = ({
  form,
  participants,
}: {
  form: UseFormReturn<CreateExpenseFormData>;
  participants: Participant[];
}) => {
  return (
    <FormField
      control={form.control}
      name="payer"
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <FormLabel
              className={cn(
                'text-gray-400',
                fieldState.error && '!text-red-400'
              )}
            >
              Payer
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-[150px] form-button justify-between group'
                    )}
                  >
                    <p className="opacity-60 group-hover:opacity-100 transition-opacity">
                      {field.value
                        ? participants.find(
                            (participant) => participant.name === field.value
                          )?.name
                        : 'Select payer'}
                    </p>

                    <ChevronsUpDown className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search payer" className="h-9" />
                  <CommandList>
                    <CommandEmpty>No traveller found.</CommandEmpty>
                    <CommandGroup>
                      {participants.map((participant) => (
                        <CommandItem
                          value={participant.name}
                          key={participant.name}
                          onSelect={() => {
                            form.setValue('payer', participant.name);
                          }}
                        >
                          {participant.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              participant.name === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  );
};

export default PayerInput;
