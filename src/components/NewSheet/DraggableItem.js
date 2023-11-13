import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({
  name,
  icon,
  type,
  setDraggableFormItems,
  formItem,
  id,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { type, name, formItem, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        setDraggableFormItems((prevState) => [
          ...prevState,
          { formItem: item.formItem, id: item.id },
        ]);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    <li
      ref={drag}
      style={{
        padding: "16px",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "8px",
        fontSize: "18px",
        cursor: "move",
        color: "#777",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
      onClick={() =>
        setDraggableFormItems((prevState) => [
          ...prevState,
          { formItem: formItem, id: id },
        ])
      }
    >
      <img style={{ width: "40px" }} src={icon} />
      <span>{name}</span>
    </li>
  );
};

export default DraggableItem;
