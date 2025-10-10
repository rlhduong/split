import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { UseFormReturn } from 'react-hook-form';
import { CreateExpenseFormData } from '@/lib/schema';
import { cn } from '@/lib/utils';

const ParticipantsInput = ({
  form,
  participants,
}: {
  form: UseFormReturn<CreateExpenseFormData>;
  participants: Participant[];
}) => {
  return (
    <FormField
      control={form.control}
      name="participants"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel
            className={cn('text-gray-400', fieldState.error && '!text-red-400')}
          >
            Participants
          </FormLabel>
          <MultiSelect onValuesChange={field.onChange} values={field.value}>
            <FormControl className="form-button group">
              <MultiSelectTrigger className="w-full [&>*]:!opacity-60 [&>*]:group-hover:!opacity-100 [&>*]:transition-opacity">
                <MultiSelectValue placeholder="Select participants..." />
              </MultiSelectTrigger>
            </FormControl>
            <MultiSelectContent>
              <MultiSelectGroup>
                {participants.map((participant) => (
                  <MultiSelectItem
                    key={`participant-${participant.name}`}
                    value={participant.name}
                    badgeLabel={participant.name}
                  >
                    {participant.name}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
        </FormItem>
      )}
    />
  );
};

export default ParticipantsInput;
