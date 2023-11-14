import React, { useMemo, useRef, useState } from "react";

import WriteImg from "../../img/write.png";
import MtImg from "../../img/MT.png";
import TodoImg from "../../img/todo.png";
import PlateImg from "../../img/plate.png";
import PinImg from "../../img/pin.png";
import TubeImg from "../../img/youtube.png";
import MicImg from "../../img/mic.png";
import DraggableItem from "./DraggableItem";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { Col, Input, Row } from "antd";
import JoditEditor from "jodit-react";

const DraggableItems = ({ setDraggableFormItems, form, placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || "Start typings...",
  };

  const items = [
    {
      id: 1,
      icon: WriteImg,
      title: "Open Question",
      key: "OP_QS",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h4>Open Question</h4>
          <FormItem>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 2,
      icon: MtImg,
      title: "Multiple Choice",
      key: "MT_CH",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Multiple Choice</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 3,
      icon: TodoImg,
      title: "correction",
      key: "CRCN",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Correction</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 4,
      icon: PlateImg,
      title: "Draw",
      key: "DRAW",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Draw</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 5,
      icon: PinImg,
      title: "Matching",
      key: "MTG",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Matching</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 6,
      icon: PinImg,
      title: "Sorting",
      key: "SRT",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Sorting</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 7,
      icon: TubeImg,
      title: "Video",
      key: "VD",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Video</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 8,
      icon: "",
      title: "Link",
      key: "LNK",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Link</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 9,
      icon: "",
      title: "Image",
      key: "IMG",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Image</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      id: 10,
      icon: MicImg,
      title: "Record Audio",
      key: "RCR",
      formItem: (
        <div style={{ padding: "20px" }}>
          <h2>Record Audio</h2>
          <FormItem>
            <TextArea></TextArea>
          </FormItem>
          <Row gutter={18}>
            <Col md={16}>
              <FormItem label="Instructions">
                <Input type="text" placeholder="instructions" />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="Points">
                <Input type="number" placeholder="points" />
              </FormItem>
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  return (
    <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
      {items.map((item) => (
        <DraggableItem
          key={item.key}
          type={item.key}
          name={item.title}
          icon={item.icon}
          setDraggableFormItems={setDraggableFormItems}
          formItem={item.formItem}
          id={item.id}
        />
      ))}
    </ul>
  );
};

export default DraggableItems;
