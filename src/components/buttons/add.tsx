import { useState } from "react";
import { useJointsCanvas } from "../../store/jointsCanvas";
import { dia } from "jointjs";

interface AddBtn {
  type: string;
  text: string;
}

function getPos(paper: dia.Paper | null) {
  const viewportCoords = paper?.clientOffset() || { x: 0, y: 0 };

  const screenPlusX = window.screen.width / 4;
  const screenPlusY = window.screen.height / 3;
  const posX = viewportCoords.x * -1 + screenPlusX;
  const posY = viewportCoords.y * -1 + screenPlusY;

  return { posX, posY };
}

export default function AddButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const paper = useJointsCanvas((state) => state.paper);
  const { addRoom, addGamestate, addItem, addTrigger, iterator } = useJointsCanvas();

  const handleAddRoom = () => {
    const { posX, posY } = getPos(paper);

    addRoom({
      label: "Room " + iterator,
      key: "fromRoom" + iterator,
      posX,
      posY,
    });
  };
  const handleAddGamestate = () => {
    const { posX, posY } = getPos(paper);

    addGamestate({
      label: "State " + iterator,
      key: "gamestate" + iterator,
      posX,
      posY,
    });
  };
  const handleAddItem = () => {
    const { posX, posY } = getPos(paper);

    addItem({
      label: "Item " + iterator,
      key: "item" + iterator,
      posX,
      posY,
    });
  };
  const handleAddTrigger= () => {
    const { posX, posY } = getPos(paper);

    addTrigger({
      label: "Trigger " + iterator,
      key: "Trigger" + iterator,
      posX,
      posY,
    });
  };

  return (
    <div className="m-2 border border-blue-900 p-1 bg-blue-200">
      <button className="add-btn" onClick={() => setIsExpanded((s) => !s)}>
        <div className="px-6">Add</div>
        <span></span>
      </button>

      <div className="flex flex-col">
        {isExpanded && (
          <div className="flex flex-col">
            <button onClick={handleAddRoom}>Add Room</button>
            <button onClick={handleAddGamestate}>Add Gamestate</button>
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleAddTrigger}>Add Trigger</button>
          </div>
        )}
      </div>
    </div>
  );
}
