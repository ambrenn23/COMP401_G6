import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({ selected, onSelect }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (date) => {
    if (onSelect) onSelect(date);
    if (date) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        style={{
          background: "linear-gradient(to right, #00f0ff, #8e2de2)",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => setIsOpen(true)}
      >
        {selected ? "Change Date" : "Select Date"}
      </button>

      {isOpen && (
        <div
          style={{
            background: "#0f0f0f",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            showOutsideDays
            styles={{
              day_selected: { backgroundColor: "#00f0ff", color: "#000" },
              day_today: { fontWeight: "bold", color: "#00f0ff" },
            }}
          />
        </div>
      )}
    </div>
  );
}
