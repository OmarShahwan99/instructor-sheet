import React, { useState } from 'react'
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import puzzel from '../../../img/puzzelImag/file.png'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'



const PuzzleQustion = (props) => {

  const {
    rows,
    columns,
    img,
    number
  } = props
  const [solve, setSolve] = useState(false);

  const set = () => {
    setSolve(true)
  };

  return (
    <>
      <div>
        <>
          <JigsawPuzzle
            imageSrc={img ? img : puzzel}
            rows={rows}
            columns={columns}
            onSolved={set}
            className="jigsaw-puzzle"
          />
        </>
      </div>
 {solve && 
      <MyRow className={"mt-1"} >
        <MyCol span={24} >
          <Form.Item
            label={"answer"}
            name={["sheetQustion", number, "Qustion", "answer"]}
            initialValue={" "}
          >
            <TextArea rows={3} />
          </Form.Item>
        </MyCol>
      </MyRow>}
    </>
  )
}

export default PuzzleQustion