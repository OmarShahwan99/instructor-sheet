import React, { useState } from "react";
import Annotation from "react-image-annotation";
import {
    PointSelector,
    RectangleSelector,
    OvalSelector
} from "react-image-annotation/lib/selectors";
import MyButtonFreeClass from "../../../components/myButtonFreeClass/MyButtonFreeClass";
import MyRow from "../../../components/myRow/MyRow";
import { useEffect } from "react";

const TaggerQustion = (props) => {

    const { img,
        form,
        number
    } = props
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});
    const [tool, setTool] = useState(PointSelector);

    const onSubmit = (annotation) => {
        const { geometry, data } = annotation;
        setAnnotation({});
        setAnnotations([
            ...annotations,
            {
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            }
        ]);
    };
    useEffect(() => {
        let saveAnnotations = JSON.stringify(annotations)
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"], saveAnnotations)

    }, [annotations])

    const getToolbarItem = (selector) => {
        return (
            <MyButtonFreeClass
                className={tool === selector ? "selected-tool" : ""}
                onClick={() => setTool(selector)}
            >
                {selector.TYPE}
            </MyButtonFreeClass>
        );
    };

    return (
        <>
            <MyRow gutter={[15, 15]} className="toolbar">
                {getToolbarItem(RectangleSelector)}
                {getToolbarItem(PointSelector)}
                {getToolbarItem(OvalSelector)}

                <MyButtonFreeClass
                onClick={() => setAnnotations([])}
            >
                Remove All
            </MyButtonFreeClass>
            </MyRow>
            <hr />
            <Annotation
                src={img}
                alt="Two pebbles anthropomorphized holding hands"
                annotations={annotations}
                type={tool.TYPE}
                value={annotation}
                activeAnnotations={annotations}
                onChange={(value) => setAnnotation(value)}
                onSubmit={onSubmit}

                allowTouch
            />
        </>
    );
}

export default TaggerQustion;