import React, { useState } from "react";
import Annotation from "react-image-annotation";
import MyButtonFreeClass from "../../../components/myButtonFreeClass/MyButtonFreeClass";
import MyRow from "../../../components/myRow/MyRow";
import { useEffect } from "react";

const TaggerQustion = (props) => {

    const { img,
        form,
        number,
        answer
    } = props
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});

    useEffect(() => {
        if(answer && answer.data && answer.data.text){
            let annotationsNew = JSON.parse(answer.data.text)
            setAnnotations([...annotationsNew])
        }
    }, [answer])



    return (
        <>
            <MyRow gutter={[15, 15]} className="toolbar">
            </MyRow>
            <hr />
            <Annotation
                src={img}
                alt="Two pebbles anthropomorphized holding hands"
                annotations={annotations}
                value={annotation}
                activeAnnotations={annotations}
            />
        </>
    );
}

export default TaggerQustion;