import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useEffect } from 'react';


const FreeQustion = (props) => {

    const {form ,number} = props


    const [value, setValue] = useState('');
    const handleChange = e => {
        setValue(e);
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],e)

      };

      // useEffect(() => {
      //   if(value){
      //     console.log(value);
      //     // let answer = JSON.stringify(value)
      //     form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],value)
      //   }
      
      // }, [value])



  return (
    <div>
           <div className="text-editor">
      {/* <EditorToolbar /> */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        // modules={modules}
        // formats={formats}
      />
    </div>
         {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
    </div>
  )
}

export default FreeQustion