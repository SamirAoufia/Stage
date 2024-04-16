'use client '

// DateRangePicker2.tsx
import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DateInput from './date-input-time'; // Assuming the DateInput component is in the same directory
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';

interface DateRangePicker2Props {
  onUpdate?: (values: { date: Date; startHour: number; startMinute: number; endHour: number; endMinute: number }) => void;
  initialDate?: Date | string;
  initialStartHour?: number;
  initialStartMinute?: number;
  initialEndHour?: number;
  initialEndMinute?: number;
  align?: 'start' | 'center' | 'end';
  locale?: string;
}

const DateRangePicker2: FC<DateRangePicker2Props> = ({
  initialDate = new Date(new Date().setHours(0, 0, 0, 0)),
  initialStartHour = 0,
  initialStartMinute = 0,
  initialEndHour = 0,
  initialEndMinute = 0,
  onUpdate,
  align = 'end',
  locale = 'be-EU',
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    typeof initialDate === 'string' ? new Date(initialDate) : initialDate
  );
  const [startHour, setStartHour] = useState<number>(initialStartHour);
  const [startMinute, setStartMinute] = useState<number>(initialStartMinute);
  const [endHour, setEndHour] = useState<number>(initialEndHour);
  const [endMinute, setEndMinute] = useState<number>(initialEndMinute);

  const handleUpdate = (): void => {
    if (onUpdate && selectedDate) {
      onUpdate({
        date: selectedDate,
        startHour,
        startMinute,
        endHour,
        endMinute,
      });
    }
    setIsOpen(false);
  };

  const handleDateChange = (date: Date | undefined): void => {
    setSelectedDate(date);
    // Réinitialiser les heures de début et de fin lorsque la date change
    setStartHour(initialStartHour);
    setStartMinute(initialStartMinute);
    setEndHour(initialEndHour);
    setEndMinute(initialEndMinute);
  };

  return (
    <Popover modal={true} open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button size={'lg'} variant="outline">
          <div className="text-right">
            <div className="py-1">
              <div>{` Le ${selectedDate?.toLocaleDateString(locale)} de ${startHour}h${startMinute} à ${endHour}h${endMinute}`}</div>
            </div>
          </div>
          <div className="pl-1 opacity-60 -mr-2 scale-125">
            {isOpen ? <ChevronUpIcon width={24} /> : <ChevronDownIcon width={24} />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex  justify-center gap-2">
                <DateInput value={selectedDate} onChange={handleDateChange} onSelectHour={function (hour: number): void {
                  throw new Error('Function not implemented.');
                } } onSelectMinute={function (minute: number): void {
                  throw new Error('Function not implemented.');
                } } label={''} />
              </div>
              <div className="flex flex-col mt-5 gap-2">
  <div className="border p-2 rounded-lg">
    <p>Début : </p>
    <div className="flex gap-2 ">
      <Input
        type="number"
        value={startHour}
        onChange={(e) => setStartHour(parseInt(e.target.value))}
        min={0}
        max={23}
      />
      <span>:</span>
      <Input
        type="number"
        value={startMinute}
        onChange={(e) => setStartMinute(parseInt(e.target.value))}
        min={0}
        max={59}
      />
    </div>
  </div>
  <div className="border p-2 rounded-lg">
    <p>Fin : </p>
    <div className="flex gap-2">
      <Input
        type="number"
        value={endHour}
        onChange={(e) => setEndHour(parseInt(e.target.value))}
        min={0}
        max={23}
      />
      <span>:</span>
      <Input
        type="number"
        value={endMinute}
        onChange={(e) => setEndMinute(parseInt(e.target.value))}
        min={0}
        max={59}
      />
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker2;
