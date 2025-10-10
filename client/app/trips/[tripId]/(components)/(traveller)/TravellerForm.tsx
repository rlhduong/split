'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { travellerSchema, TravellerFormData } from '@/lib/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '@/service/tripService';

const TravellerForm = ({ tripId }: { tripId: string }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TravellerFormData>({
    resolver: zodResolver(travellerSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: TravellerFormData) => {
      return tripService.addParticipant(tripId, data.name);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error adding traveller:', error);
    },
  });

  const handleSubmit = (data: TravellerFormData) => {
    mutate(data);

    if (!isError) form.reset();
  };

  const handleOpenChagne = (open: boolean) => {
    setIsOpen(open);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChagne}>
      <div className="flex flex-row justify-between items-center p-2 bg-customgreys-secondarybg rounded-t-md">
        <h1 className="text-gray-400">Travellers</h1>
        <DialogTrigger asChild>
          <button className="flex flex-row gap-1 items-center general-button__text">
            <Plus className="" size={17} />
            <p className="text-sm">Add Traveller</p>
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px] bg-customgreys-darkGrey outline-none border-none">
        <DialogTitle className="text-lg text-white-50">
          New Traveller
        </DialogTitle>
        <DialogDescription className="text-gray-400 mb-4">
          Add a new traveller to your trip
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormControl>
                    <Input
                      {...field}
                      className="form__input"
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end gap-3">
              <DialogClose asChild>
                <button
                  type="button"
                  className="general-button__text text-gray-400"
                  disabled={isPending}
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="general-button__text disabled:opacity-50"
                disabled={isPending}
              >
                Add
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TravellerForm;
