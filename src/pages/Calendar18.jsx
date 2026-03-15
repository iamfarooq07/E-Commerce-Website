import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export function Calendar18() {
  const [date, setDate] = React.useState(new Date(2025, 5, 12));

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border bg-black w-[25%] m-40 text-6xl"
      />
    </div>
  );
}
