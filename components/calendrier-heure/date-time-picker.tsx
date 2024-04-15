"use client";

import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { useForwardedRef } from "@/lib/useForwardedRef";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";

// Utilisez les deux champs de temps dans votre composant DateTimeplateau
const DateTimeplateau = React.forwardRef<
  HTMLDivElement,
  DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);
  useInteractOutside({
    ref: contentRef,
    onInteractOutside: (e) => {
      setOpen(false);
    },
  });
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const handleStartDateTimeChange = (dateTime) => {
    setStartDateTime(dateTime);
  };

  const handleEndDateTimeChange = (dateTime) => {
    setEndDateTime(dateTime);
  };

  const selectedStartDate = state.value ? state.value.toDate() : null;
  const selectedStartTime = state.timeValue ? state.timeValue.toDate() : null;
  const selectedEndDate = state.value ? state.value.toDate() : null;
  const selectedEndTime = state.timeValue ? state.timeValue.toDate() : null;

  return (
    <main>
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        )}
      >
        <DateField {...fieldProps} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none"
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent ref={contentRef} className="w-full">
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
              {!!state.hasTime && (
                <>
                  <TimeField
                    value={state.timeValue}
                    onChange={state.setTimeValue}
                  />
                  <TimeField
                    value={state.timeValue}
                    onChange={state.setTimeValue}
                  />
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <p>Date de début sélectionnée : {selectedStartDate ? selectedStartDate.toLocaleDateString() : "Aucune"}</p>
        <p>Heure de début sélectionnée : {selectedStartTime ? selectedStartTime.toLocaleTimeString() : "Aucune"}</p>
        <p>Date de fin sélectionnée : {selectedEndDate ? selectedEndDate.toLocaleDateString() : "Aucune"}</p>
        <p>Heure de fin sélectionnée : {selectedEndTime ? selectedEndTime.toLocaleTimeString() : "Aucune"}</p>
      </div>
    </main>
  );
});

DateTimeplateau.displayName = "DateTimePicker";

export { DateTimeplateau };
