import React, { useState, useEffect } from "react";

const StickyNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("stickyNotes");
    return savedNotes ? savedNotes : "";
  });

  useEffect(() => {
    localStorage.setItem("stickyNotes", notes);
  }, [notes]);

  const handleNotesChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNotes(event.target.value);
  };

  return (
    <div className="rounded-xl border bg-yellow-300 text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <textarea
          value={notes}
          onChange={handleNotesChange}
          className=" min-h-18 w-full h-full tracking-tight bg-yellow-300 hover:bg-yellow-300 focus:bg-yellow-300 text-gray-800 min-h-[120px] min-w-full"
          placeholder="Buraya notlarınızı yazın..."
        ></textarea>
      </div>
    </div>
  );
};

export default StickyNotes;
