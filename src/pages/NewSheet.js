import React from "react";
import Image from "../img/bg.jpg";
import { Form } from "antd";
import NewSheetForm from "../components/NewSheet/NewSheetForm";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

const NewSheet = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");

  return (
    <div
      style={{
        maxWidth: "70rem",
        margin: "2rem auto",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <img
          src={Image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "18px",
            padding: "16px",
            fontSize: "22px",
            color: "#5e5873",
            fontWeight: "500",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {title}
        </div>
      </div>
      <NewSheetForm setTitle={setTitle} form={form} />
    </div>
  );
};

export default NewSheet;
