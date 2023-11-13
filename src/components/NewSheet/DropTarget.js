import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import DraggableFormItem from "./DraggableFormItem";

const DropTarget = ({ draggableFormItems, moveCard }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "#f5f5f5";
  }

  return (
    <div ref={drop} style={{ height: "100%", border: "2px dashed #777" }}>
      {draggableFormItems.length === 0 && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            minHeight: "600px",
            backgroundColor,
          }}
        >
          {isActive
            ? "Release to drop"
            : "Drag a field from the right to this area"}
        </div>
      )}
      {draggableFormItems.map((item, index) => (
        <DraggableFormItem
          formItem={item.formItem}
          index={index}
          moveCard={moveCard}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default DropTarget;
