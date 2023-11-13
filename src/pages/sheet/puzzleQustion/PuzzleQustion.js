import React, { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import puzzel from "../../../img/puzzelImag/file.png";
import MyRow from "../../../components/myRow/MyRow";
import MyCol from "../../../components/myCol/MyCol";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const PuzzleQustion = (props) => {

  const {
    rows,
    columns,
    img,
    number,form,size
  } = props
  const [solve, setSolve] = useState(false);

  const set = () => {
    setSolve(true)
    form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],".")
    
  };

  return (
    <>
      <div style={{
        position:"relative",
        width: "38%",
        margin: "auto"
      }} >
        <>
          <JigsawPuzzle
            imageSrc={img ? img : puzzel}
            rows={Number(size)}
            columns={Number(size)}
            onSolved={set}
            className="jigsaw-puzzle"
          />
        </>
        {solve && <img 
        style={{
          width:"100%",
    height:"100%",
    position:"absolute",
    top: 0,
    right: 0,
    zindex: 10,
        }}
        className="completeImg" src="https://upwizar.com/images/Comp-10_1rama.gif"></img>}
      </div>
 {solve && 
      <MyRow className={"mt-1"} >
        <MyCol span={24} >
          <Form.Item
            label={"answer"}
            
            name={["sheetQustion", number, "Qustion", "answer"]}
            initialValue={" "}
          >
            <TextArea disabled={false} rows={3} />
          </Form.Item>
        </MyCol>
      </MyRow>}
    </>
  );
};

export default PuzzleQustion;
