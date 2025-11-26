"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

function CustomNavbar({
  nextMonth,
  previousMonth,
  goToMonth,
}: any) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={() => goToMonth(previousMonth)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="text-sm font-semibold">
        {previousMonth.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <button
        onClick={() => goToMonth(nextMonth)}
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
        ...classNames,
      }}
      components={{
        Navbar: CustomNavbar,
      }}
      {...props}
    />
  );
}
