'use client';

import NavBar from '@/components/NavBar';
import { useSession } from '@/hook/useSession';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Loader2Icon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTripFormData, createTripSchema } from '@/lib/schema';
import { tripService } from '@/service/tripService';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const form = useForm<CreateTripFormData>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      name: '',
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateTripFormData) =>
      tripService.createTrip({
        name: data.name,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      router.push('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
  const onSubmit = (data: CreateTripFormData) => {
    mutate(data);
  };

  return (
    <div className="flex flex-row justify-center w-full min-h-screen bg-customgreys-primarybg">
      <main className="flex flex-col h-full w-[90%] md:w-3/4 lg:w-2/3 gap-18">
        <NavBar session={session} isLoading={isLoading} />
        <div className="w-full flex flex-row justify-center">
          <div className="w-[90%] md:w-2/3 xl:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 gap-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormControl>
                        <Input
                          {...field}
                          className="form__input"
                          placeholder="Trip Name"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row justify-between w-full gap-16 mb-5">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel
                          className={cn(
                            'text-gray-400',
                            fieldState.error && '!text-red-400'
                          )}
                        >
                          Start
                        </FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn('form-button w-full group')}
                              >
                                {field.value ? (
                                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                                    {format(field.value, 'PPP')}
                                  </span>
                                ) : (
                                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                                    Pick a date
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                              disabled={(date) =>
                                (form.getValues('endDate') &&
                                  date > form.getValues('endDate')) ||
                                date < new Date('1900-01-01')
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel
                          className={cn(
                            'text-gray-400',
                            fieldState.error && '!text-red-400'
                          )}
                        >
                          End
                        </FormLabel>
                        <Popover open={open2} onOpenChange={setOpen2}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn('form-button w-full group')}
                              >
                                {field.value ? (
                                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                                    {format(field.value, 'PPP')}
                                  </span>
                                ) : (
                                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                                    Pick a date
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen2(false);
                              }}
                              disabled={(date) =>
                                (form.getValues('startDate') &&
                                  date < form.getValues('startDate')) ||
                                date < new Date('1900-01-01')
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row justify-center w-full">
                  <Button
                    type="submit"
                    className="bg-primary-600 w-1/3 hover:!bg-primary-700 text-customgreys-darkGrey cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : null}
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
