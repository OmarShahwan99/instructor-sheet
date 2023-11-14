import React, { useCallback } from "react";
import DraggableItems from "./DraggableItems";
import DropTarget from "./DropTarget";
import { Col, Row } from "antd";
import { useState } from "react";
import update from "immutability-helper";

const DraggableFields = ({ form }) => {
  const [draggableFormItems, setDraggableFormItems] = useState([]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setDraggableFormItems((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const closeHandler = (id) => {
    const indexToRemove = draggableFormItems.findIndex(
      (item) => item.id === id
    );
    const newItems = [...draggableFormItems];
    newItems.splice(indexToRemove, 1);
    setDraggableFormItems(newItems);
  };
  const duplicateHandler = (id) => {
    const duplicatedItem = draggableFormItems.find((item) => item.id === id);
    const newItems = [...draggableFormItems, duplicatedItem];
    const sortedItems = newItems.sort((a, b) => {
      if (newItems.indexOf(a) !== newItems.indexOf(b)) {
        return newItems.indexOf(a) - newItems.indexOf(b);
      }
      return a.id - b.id;
    });
    setDraggableFormItems(sortedItems);
  };
  return (
    <Row gutter={12}>
      <Col xs={24} md={16}>
        <DropTarget
          moveCard={moveCard}
          draggableFormItems={draggableFormItems}
          closeHandler={closeHandler}
          duplicateHandler={duplicateHandler}
        />
      </Col>
      <Col xs={24} md={8}>
        <DraggableItems
          form={form}
          setDraggableFormItems={setDraggableFormItems}
        />
      </Col>
    </Row>
  );
};

export default DraggableFields;
