"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

function CustomCaption(props: any) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={props.goToPreviousMonth}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="text-sm font-medium">
        {props.displayMonth.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <button
        onClick={props.goToNextMonth}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        caption: "flex justify-center",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  );
}
