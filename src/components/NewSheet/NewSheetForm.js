import { Col, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import DraggableFields from "./DraggableFields";

const { Option } = Select;

const NewSheetForm = ({ form, setTitle }) => {
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  return (
    <Form form={form} layout="vertical" style={{ padding: "32px 20px" }}>
      <Form.Item name="title" label="Title">
        <Input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          style={{ padding: "8px" }}
          placeholder="Tile"
        />
      </Form.Item>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="class" label="Class">
            <Select
              optionFilterProp="children"
              filterOption={filterOption}
              defaultValue={"1"}
              showSearch
            >
              <Option value="1">All Classes</Option>
              <Option value="2">Test 1</Option>
              <Option value="3">Test 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="language" label="Language">
            <Select
              optionFilterProp="children"
              filterOption={filterOption}
              showSearch
            >
              <Option value="1">All Languages</Option>
              <Option value="2">Arabic</Option>
              <Option value="3">English</Option>
              <Option value="3">French</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="subject" label="Subject">
            <Select
              optionFilterProp="children"
              filterOption={filterOption}
              showSearch
            >
              <Option value="1">All Subjects</Option>
              <Option value="2">Subject Test</Option>
              <Option value="4">Technology</Option>
              <Option value="5">Languages - Spanish</Option>
              <Option value="6">Social Studies</Option>
              <Option value="7">Science</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="teacher" label="Teacher">
            <Select
              optionFilterProp="children"
              filterOption={filterOption}
              showSearch
            >
              <Option value="1">All Teacher</Option>
              <Option value="2">Test 1</Option>
              <Option value="3">Test 2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <DraggableFields form={form} />
    </Form>
  );
};

export default NewSheetForm;
