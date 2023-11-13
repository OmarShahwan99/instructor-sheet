import React, { useRef, useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import MyRow from "../../../components/myRow/MyRow";
import MyCol from "../../../components/myCol/MyCol";

const connectPointStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "black",
    zIndex: 9
};
const connectPointOffset = {
    left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
    right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
    top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
    bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" }
};

const ConnectPointsWrapper = ({ boxId, handler, ref0, ...props }) => {
    const ref1 = useRef();
    const [position, setPosition] = useState({});
    const [beingDragged, setBeingDragged] = useState(false);



    return (
        <>

            <React.Fragment  >
                <div
                    className="connectPoint"
                    style={{
                        ...connectPointStyle,
                        ...connectPointOffset[handler],
                        ...position,
                    }}
                    draggable={false}
                    onDragStart={e => {
                        setBeingDragged(true);
                        e.dataTransfer.setData("arrow", boxId);
                    }}
                    onDrag={e => {
                        if (!props.disabledDraged) {
                            setPosition({
                                position: "fixed",
                                left: e.clientX,
                                top: e.clientY,
                                transform: "none",
                                opacity: 0
                            });
                        } else {
                            props.removeArrow && props.removeArrow(boxId)
                        }
                    }}
                    ref={ref1}
                    onDragEnd={e => {
                        setPosition({});
                        // e.dataTransfer.setData("arrow", null);
                        setBeingDragged(false);
                    }}
                />
                {beingDragged ? <Xarrow start={ref0} end={ref1} /> : null}
            </React.Fragment>
        </>
    );
};

const boxStyle = {
    position: "relative",
    padding: "20px 10px",

};

const Box = ({ text, handler, addArrow, boxId, ...props }) => {
    const ref0 = useRef();



    const checkIDStartAndEnd = (startId, endId) => {
        let start = startId
        let end = endId
        let startIndex = start.indexOf("IDQ");
        let endIndex = end.indexOf("IDQ");
        let IDQStart = start.substring(startIndex + 3, start.lenght)
        let IDQEnd = end.substring(endIndex + 3, end.lenght)

        if (IDQStart === IDQEnd) {
            return true
        } else {
            return false
        }



    }

    return (
        <div
            id={boxId}
            style={boxStyle}
            ref={ref0}
            className="BoxDiv"
            onDragOver={e => { e.preventDefault(); }}
            onDrop={e => {
                if (checkIDStartAndEnd(e.dataTransfer.getData("arrow"), boxId)) {
                    if (!props.disabledDraged) {
                        if (e.dataTransfer.getData("arrow") === boxId) {
                        } else {
                            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
                            addArrow(refs);
                        }
                    }
                }
            }}

        >
            <p className="noselect" > {text}</p>

            <ConnectPointsWrapper
                disabledDraged={true}
                removeArrow={props.removeArrow}
                {...{ boxId, handler, ref0 }} />
        </div>
    );
};

const LinkingQustionComponent = (props) => {

    const { data, answer, form, number, idQ, printed } = props
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (data && data?.length > 0) {


            // ///////////////////////////////////////
            let array = [...data]
            // Create new arrays for items with parent_id: null and parent_id: value
            const nullParentArray = array.filter(obj => obj.parent_id === null);
            const valueParentArray = array.filter(obj => obj.parent_id !== null);
            // Shuffle the new arrays randomly
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            shuffle(nullParentArray);
            shuffle(valueParentArray);
            // Concatenate the arrays with the desired order
            let newArray = []
            for (let index = 0; index < nullParentArray.length; index++) {
                const element = nullParentArray[index];
                newArray.push(nullParentArray[index])
                newArray.push(valueParentArray[index])
            }
            // /////////////////////////////////////////






            let NewListData = []
            for (let index = 0; index < newArray.length; index++) {
                const element = newArray[index];
                let newElement = {
                    boxId: printed ? (element?.id + "_IDQ" + props.idQ + "_Print").toString() : (element?.id + "_IDQ" + props.idQ).toString(),
                    ...element
                }
                NewListData.push(newElement)

            }
            setOptions([...NewListData])
        }

    }, [data, printed])


    const [arrows, setArrows] = useState([]);

    useEffect(() => {
        if (answer && answer?.data?.length > 0) {
            let NewArrow = []
            for (let index = 0; index < answer?.data.length; index++) {
                const element = answer?.data[index];
                let obj
                if (printed) {
                    obj = {
                        start: (element.current_option_id + "_IDQ" + idQ + "_Print").toString(),
                        end: (element.related_option_id + "_IDQ" + idQ + "_Print").toString()
                    }
                } else {
                    obj = {
                        start: (element.current_option_id + "_IDQ" + idQ).toString(),
                        end: (element.related_option_id + "_IDQ" + idQ).toString()
                    }
                }

                NewArrow.push(obj)
            }
            setArrows([...NewArrow])
        }
    }, [answer, printed])




    const addArrow = ({ start, end }) => {
        // setArrows([...arrows, { start, end }]);
    };

    const removeArrow = (value) => {
        // let NewArrow = arrows
        // let index = NewArrow?.findIndex(e => e.start === value || e.end === value)
        // if (index !== -1) {
        //     NewArrow.splice(index, 1)
        // }
        // setArrows([...NewArrow]);
    };

    const checkLinked = (value) => {
        // let NewArrow = arrows
        // let index = NewArrow?.findIndex(e => e.start === value || e.end === value)
        // if (index === -1) {
        //     return false
        // } else {
        //     return true
        // }
    };


    return (
        <div
            className="WrraperDiv"
        >

            {options && options?.length > 0 ?
                <MyRow className={"mt-2"} gutter={[15, 15]} justify={"space-evenly"} >
                    {options.map((option, index) => {
                        return <MyCol key={index} span={9}  >
                            <Box
                                className={"BOXLinking"}
                                removeArrow={removeArrow}
                                text={option?.text}
                                disabledDraged={checkLinked(option?.boxId)}
                                {...{ addArrow, handler: option?.parent_id ? "left" : "right", boxId: option?.boxId }}
                            />
                        </MyCol>



                    })}
                </MyRow>

                // listData?.map((linkingRow , index)=>{
                //     return <MyRow key={index} className={"mt-2"} justify={"space-evenly"} >
                //     <Box
                //         removeArrow={removeArrow}
                //         text={linkingRow?.lText}
                //         disabledDraged={checkLinked(`${linkingRow?.lID}${props.idQ}`)}
                //         {...{ addArrow, handler: "right", boxId: `${linkingRow?.lID}${props.idQ}` }}
                //     />
                //     <Box
                //         removeArrow={removeArrow}
                //         text={linkingRow?.rText}
                //         disabledDraged={checkLinked(`${linkingRow?.rID}${props.idQ}`)}

                //         {...{ addArrow, handler: "left", boxId: `${linkingRow?.rID}${props.idQ}` }}
                //     />
                // </MyRow>
                // })

                :
                <>
                    <MyRow className={"mt-2"} justify={"space-evenly"} >
                        <Box
                            removeArrow={removeArrow}
                            text="drag my handler to second element"
                            disabledDraged={checkLinked(`box1_1_IDQ${props.idQ}`)}
                            {...{ addArrow, handler: "right", boxId: `box1_1_IDQ${props.idQ}` }}
                        />
                        <Box
                            removeArrow={removeArrow}
                            text="second element"
                            disabledDraged={checkLinked(`box2_1_IDQ${props.idQ}`)}

                            {...{ addArrow, handler: "left", boxId: `box2_1_IDQ${props.idQ}` }}
                        />
                    </MyRow>
                    <MyRow className={"mt-2"} justify={"space-evenly"} >
                        <Box
                            removeArrow={removeArrow}
                            text="drag my handler to second element"
                            disabledDraged={checkLinked(`box1_2_IDQ${props.idQ}`)}

                            {...{ addArrow, handler: "right", boxId: `box1_2_IDQ${props.idQ}` }}
                        />
                        <Box
                            removeArrow={removeArrow}
                            text="second element"
                            disabledDraged={checkLinked(`box2_2_IDQ${props.idQ}`)}

                            {...{ addArrow, handler: "left", boxId: `box2_2_IDQ${props.idQ}` }}
                        />
                    </MyRow>
                    <MyRow className={"mt-2"} justify={"space-evenly"} >
                        <Box
                            removeArrow={removeArrow}
                            text="drag my handler to second element"
                            disabledDraged={checkLinked(`box1_3_IDQ${props.idQ}`)}

                            {...{ addArrow, handler: "right", boxId: `box1_3_IDQ${props.idQ}` }}
                        />
                        <Box
                            removeArrow={removeArrow}
                            text="second element"
                            disabledDraged={checkLinked(`box2_3_IDQ${props.idQ}`)}

                            {...{ addArrow, handler: "left", boxId: `box2_3_IDQ${props.idQ}` }}
                        />
                    </MyRow>
                </>


            }

            {arrows.map(ar => (
                <Xarrow
                    start={ar.start}
                    end={ar.end}
                    key={ar.start + "-." + ar.start}
                    // color={"red"}
                    // dashness={true}
                    headSize={4}

                />
            ))}
        </div>
    )
}
export default LinkingQustionComponent