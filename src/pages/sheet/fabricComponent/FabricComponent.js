import React, { useState, useEffect, useRef } from 'react';
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import MyRow from '../../../components/myRow/MyRow';
import { BiCircle, BiPencil, BiRectangle, BiRedo, BiUndo } from 'react-icons/bi';
import { AiFillDelete, AiOutlineClear, AiOutlineLine, AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { FaTextHeight } from 'react-icons/fa';
import { BsCursor, BsPaintBucket } from 'react-icons/bs';
import { FcAddImage } from 'react-icons/fc';
import MyCol from '../../../components/myCol/MyCol';
import { ColorPicker, Select, Upload } from 'antd';
import MyButtonFreeClass from '../../../components/myButtonFreeClass/MyButtonFreeClass';
import CryptoJS from 'crypto-js';



const FabricComponent = (props) => {

  const {
    form,
    number,
    exportImage
  } = props

  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    if (exportImage) {
      const dataURL = editor.canvas.toDataURL({
        format: 'image/png',
        quality: 1.0
      });



      // const base64String = dataURL;
      // const binaryData = atob(base64String.split(",")[1]);
      // const blob = new Blob([binaryData], { type: "image/png" });
      // const file = new File([blob], "image.png", { type: "image/png" });

      //       function dataURItoBlob(dataURI) {
      //         var byteString = atob(dataURI.split(',')[1]);
      //         var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      //         var ab = new ArrayBuffer(byteString.length);
      //         var ia = new Uint8Array(ab);
      //         for (var i = 0; i < byteString.length; i++) {
      //             ia[i] = byteString.charCodeAt(i);
      //         }
      //         return new Blob([ab], {type: mimeString});
      //         }


      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

      const base64String = dataURL.split(',')[1];
      const binaryData = atob(base64String);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const file = new Blob([arrayBuffer], { type: mimeString });


      // const file = new File([arrayBuffer], "image.png", { type: "image/png" })



      // download image local
      // fetch(URL.createObjectURL(file))
      //   .then(response => response.blob())
      //   .then(blob => {
      //     const downloadLink = document.createElement("a");
      //     downloadLink.href = URL.createObjectURL(blob);
      //     downloadLink.download = file.name;
      //     downloadLink.click();
      //   });

      form.setFieldValue(["sheetQustion", number, "Qustion", "answer"], file)
    }

  }, [exportImage])


  const handleExport = () => {
    const dataURL = editor.canvas.toDataURL({
      format: 'png',
      quality: 1.0
    });
    // const link = document.createElement('a');
    // link.download = 'canvas.png';
    // link.href = dataURL;
    // console.log("dataURL",dataURL);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };



  const ref = useRef(null)

  const history = [];
  const [color, setColor] = useState("#35363a");
  const [drowMode, setDrowMode] = useState(false);


  const drowModeOn = () => {
    if(editor){
      editor.canvas.isDrawingMode = true
      setDrowMode(true)
    }

  }



  const drowModeOff = () => {
    if(editor){
    editor.canvas.isDrawingMode = false
    setDrowMode(false)
    }
  }






  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }



    // if (!editor.canvas.__eventListeners["mouse:wheel"]) {
    //   editor.canvas.on("mouse:wheel", function (opt) {

    //     var delta = opt.e.deltaY;
    //     var zoom = editor.canvas.getZoom();
    //     zoom *= 0.999 ** delta;
    //     if (zoom > 20) zoom = 20;
    //     if (zoom < 0.01) zoom = 0.01;
    //     editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //     opt.e.preventDefault();
    //     opt.e.stopPropagation();
    //   });
    // }

    if (!editor?.canvas.__eventListeners["mouse:down"] && editor) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"] && editor) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

if(editor){
  editor.canvas.renderAll();
}

    
  }, [editor]);






  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL(
      "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
      (image) => {
        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas)
        );
      }
    );
  };

  const fromSvg = () => {
    fabric.loadSVGFromString(
      ``,
      (objects, options) => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length);
        editor.canvas.backgroundImage = objects[0];
        const newObj = objects.filter((_, index) => index !== 0);
        newObj.forEach((object) => {
          editor.canvas.add(object);
        });

        editor.canvas.renderAll();
      }
    );
  };



  const ZoomIn = () => {

  }


  const ZoomOut = () => {

  }

  const addImage = () => {
    fabric.Image.fromURL("https://i.imgur.com/8zvUjul.jpg", function (oImg) {
      editor?.canvas.add(oImg);
    });
  }

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target.result;

      // Use Fabric.Image.fromURL to load the image onto the canvas
      fabric.Image.fromURL(dataURL, function (oImg) {
        // Add the image to the canvas
        editor?.canvas.add(oImg);
      });
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }else{
      editor.canvas.setHeight(500);
      editor.canvas.setWidth(ref.current.offsetWidth);
      // addBackground();
      editor.canvas.renderAll();
    }
  }, [editor?.canvas.backgroundImage, ref.current]);


  const toggleSize = () => {
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12);
  };

  const ChangeSize = (e) => {
    if(editor){
      editor.canvas.freeDrawingBrush.width = e
    }

  };



  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }else{
      editor.canvas.freeDrawingBrush.color = color;
      editor.setStrokeColor(color);
    }

  }, [color]);

  // const toggleDraw = () => {
  //   editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  // };
  const undo = () => {
    if (editor && editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
      editor.canvas.renderAll();
    }
    
  };
  const redo = () => {
    if (history.length > 0 && editor) {
      editor.canvas.add(history.pop());
    }
  };

  const clear = () => {
    if(editor){
      editor.canvas._objects.splice(0, editor.canvas._objects.length);
      history.splice(0, history.length);
      editor.canvas.renderAll();
    }
   
  };

  const removeSelectedObject = () => {
    if (editor && editor?.canvas && editor.canvas.getActiveObject()) {
      editor.canvas.remove(editor.canvas.getActiveObject());
    }
  };


  const Escape = () => {
    if (editor && editor?.canvas?.discardActiveObject()) {
      editor.canvas.discardActiveObject().renderAll();
      editor.canvas.renderAll();
    }
  };

  const changeSelectedColor = () => {
    if (editor && editor.canvas.getActiveObject()) {
      editor.canvas.getActiveObject().set({ fill: color });
      editor.canvas.renderAll();
    }

  };

  const onAddCircle = () => {
    if(editor){
      editor.addCircle();

    }
  };

  const onAddLine = () => {
    if(editor){
    editor.addLine();
    }
  };
  const onAddRectangle = () => {
    if(editor){
    editor.addRectangle();
    }
  };
  const addText = () => {
    if(editor){
    editor.addText("inset text");
    }
  };

  const exportSVG = () => {
    const svg = editor.canvas.toSVG();
    console.info(svg);
  };


  useEffect(() => {
    window.addEventListener('keydown', e => {

      if (e.key === 'Escape') {
        // editor.canvas.discardActiveObject().renderAll();
        Escape()
      }
      if (e.key === 'Delete') {
        removeSelectedObject()
        // editor.canvas.remove(editor.canvas.getActiveObject());
      }
    })
  })

  useEffect(() => {
    drowModeOn()
  }, [])
  return (
    <div className="App">
      <MyRow className={"my-1"} gutter={[5, 5]}>


        <MyButtonFreeClass

          className={drowMode && "btn-primary"}
          shape={"circle"} onClick={drowModeOn} >
          <BiPencil />
        </MyButtonFreeClass>

        <MyButtonFreeClass
          className={!drowMode && "btn-primary"}
          shape={"circle"} onClick={drowModeOff} >
          <BsCursor />
        </MyButtonFreeClass>

        <MyCol span={1} />

        <MyButtonFreeClass
          shape={"circle"}
          onClick={onAddCircle}
        >
          <BiCircle />
        </MyButtonFreeClass>


        <MyButtonFreeClass shape={"circle"} onClick={onAddLine}><AiOutlineLine />
        </MyButtonFreeClass>

        <MyButtonFreeClass shape={"circle"} onClick={onAddRectangle} >
          <BiRectangle />
        </MyButtonFreeClass>

        <MyButtonFreeClass shape={"circle"} onClick={addText} >
          <FaTextHeight />
        </MyButtonFreeClass>

{/* 
        <MyButtonFreeClass shape={"circle"} onClick={addImage} >
          <FcAddImage />
        </MyButtonFreeClass> */}

        <Upload
          accept="image/*"
          showUploadList={false}
          listType={false}
          beforeUpload={(file) => {
            handleFileUpload(file);

            return false; // Prevent default upload behavior
          }}
        >
          <MyButtonFreeClass shape={"circle"}  >
            <FcAddImage />
          </MyButtonFreeClass>
        </Upload>

        <MyCol span={1} />


        <MyButtonFreeClass shape={"circle"} onClick={clear} >
          <AiOutlineClear />
        </MyButtonFreeClass>
        <MyButtonFreeClass shape={"circle"} onClick={undo} >
          <BiUndo />
        </MyButtonFreeClass>
        <MyButtonFreeClass shape={"circle"} onClick={redo} >
          <BiRedo />
        </MyButtonFreeClass>
        {/* <MyButtonFreeClass shape={"circle"} onClick={toggleSize} >
          ToggleSize
        </MyButtonFreeClass> */}
        <MyButtonFreeClass shape={"circle"} onClick={removeSelectedObject} >
          <AiFillDelete />
        </MyButtonFreeClass>

        <MyButtonFreeClass shape={"circle"} onClick={changeSelectedColor} >
          <BsPaintBucket />
        </MyButtonFreeClass>
        {/* <MyButtonFreeClass shape={"circle"} onClick={handleExport} >
          export
        </MyButtonFreeClass> */}

        <MyCol>
          <ColorPicker
            defaultValue={color}
            // presets={[
            //   {
            //     label: 'Recommended',
            //     colors: colors
            //   },
            // ]}
            onChange={(e, ee) => { setColor(ee); }}
          />
        </MyCol>
        <MyCol>
          <Select
            defaultValue="5"
            onChange={(e) => {
              ChangeSize(e)
            }}
            options={[
              {
                value: '1',
                label: '1px',
              },
              {
                value: '3',
                label: '3px',
              },
              {
                value: '5',
                label: '5px',
              }, {
                value: '8',
                label: '8px',
              },
              {
                value: '10',
                label: '10px',
              },
              {
                value: '11',
                label: '11px',
              },
              {
                value: '12',
                label: '12px',
              },
              {
                value: '14',
                label: '14px',
              },
              {
                value: '16',
                label: '16px',
              },
              {
                value: '18',
                label: '18px',
              },
              {
                value: '22',
                label: '22px',
              },
              {
                value: '26',
                label: '26px',
              },

            ]}
          />
        </MyCol>
        {/* <MyButtonFreeClass shape={"circle"} onClick={ZoomIn} >
          <AiOutlinePlusSquare />
        </MyButtonFreeClass>

        <MyButtonFreeClass shape={"circle"} onClick={ZoomOut} >
          <AiOutlineMinusSquare />
        </MyButtonFreeClass>
         */}

        {/* <button onClick={exportSVG} >
          {" "}
          ToSVG
        </button>
        <button onClick={fromSvg} >
          fromsvg
        </button> */}
      </MyRow>
      <div
        style={{
          border: `3px ${"solid"} gray`,
          width: "100%",
          height: "500px"
        }}
        ref={ref}
      >
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>

  )
}

export default FabricComponent