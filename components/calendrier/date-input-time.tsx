'use client'
// DateInput.tsx
import React, { useState, useEffect } from 'react';

interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  label: string;
  onSelectHour: (hour: number) => void;
  onSelectMinute: (minute: number) => void;
}

interface DateParts {
  day: number;
  month: number;
  year: number;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, label, onSelectHour, onSelectMinute }) => {
  const [date, setDate] = useState<DateParts>(() => {
    const d = value ? new Date(value) : new Date();
    return {
      day: d.getDate(),
      month: d.getMonth() + 1, // JavaScript months are 0-indexed
      year: d.getFullYear(),
    };
  });

  useEffect(() => {
    const d = value ? new Date(value) : new Date();
    setDate({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }, [value]);

  const handleInputChange = (field: keyof DateParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? Number(e.target.value) : '';
    const isValid = typeof newValue === 'number'; // You should add validation here

    const newDate = { ...date, [field]: newValue };
    setDate(newDate);

    if (isValid) {
      const selectedDate = new Date(newDate.year, newDate.month - 1, newDate.day);
      onChange(selectedDate);
    }
  };

  return (
    <div className="flex  justify-center gap-2">
      <div>{label}</div><input
        type="text"
        value={date.day.toString()}
        onChange={handleInputChange('day')}
        maxLength={2}
        className="p-0 outline-none w-7 border-none text-center"
        placeholder="DD"
      />     
       <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        value={date.month.toString()}
        onChange={handleInputChange('month')}
        maxLength={2}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="MM"
      />

      
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        value={date.year.toString()}
        onChange={handleInputChange('year')}
        maxLength={4}
        className="p-0 outline-none w-12 border-none text-center"
        placeholder="YYYY"
      />
    </div>
  );
};

export default DateInput;
