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
  return (
    <Row gutter={12}>
      <Col xs={24} md={16}>
        <DropTarget
          moveCard={moveCard}
          draggableFormItems={draggableFormItems}
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
