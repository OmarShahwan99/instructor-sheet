import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import EditorToolbar, {  formats } from "./EditorToolbar";

const FreeQustion = (props) => {
    const {form ,number} = props
    const [value, setValue] = useState('<p></p>');
    const handleChange = e => {
        setValue(e);
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],e)
      };
  return (
    <div>
           <div className="text-editor">
      {/* <EditorToolbar /> */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
      />
    </div>
    </div>
  )
}

export default FreeQustion