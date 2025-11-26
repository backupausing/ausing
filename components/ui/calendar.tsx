"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const [month, setMonth] = React.useState(props.month ?? new Date());

  return (
    <div className="space-y-2">
      {/* NAVBAR PERSONALIZZATA */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() - 1, 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="font-semibold text-sm">
          {month.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <button
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() + 1, 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* CALENDARIO */}
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}
