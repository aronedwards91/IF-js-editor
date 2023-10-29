import { useState } from "react";

interface AddBtn {
  type: string;
  text: string;
}

export default function AddButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="m-2 border border-blue-900 p-1 bg-blue-200">
      <button className="add-btn" onClick={() => setIsExpanded((s) => !s)}>
        <div className="px-6">Add</div>
        <span></span>
      </button>

      <div className="flex flex-col">
        {isExpanded && (
          <div className="flex flex-col">
            <button>Add Room</button>
            <button>Add Item</button>
          </div>
        )}
      </div>
    </div>
  );
}
