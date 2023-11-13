import { Button, Card, Form, Image, Input } from 'antd'
import React, { Fragment, useState } from 'react'
import CorrectionQustion from '../correctionQustion/CorrectionQustion'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import Title from 'antd/es/typography/Title'
import LinkingQustionComponent from '../linkingQustion/LinkingQustionComponent'
import FabricComponent from '../fabricComponent/FabricComponent'
import SortingQustion from '../sortingQustion/SortingQustion'
import SelectTrueMultiQustion from '../selectTrueMultiQustion/SelectTrueMultiQustion'
import FreeQustion from '../freeQustion/FreeQustion'
import VideoPlayer from '../videoPlayer/VideoPlayer'
import VoiceRecorder from '../voiceRecorder/VoiceRecorder'
import DragThingsToBoxesDemo from '../DragThingsToBoxes/DragThingsToBoxesDemo'
import PuzzleQustion from '../puzzleQustion/PuzzleQustion'
import AudioPlayer from '../audioPlayer/AudioPlayer'
import SheetActions from '../../../actions/SheetActions'
import Link from 'antd/es/typography/Link'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import TaggerQustion from '../taggerQustion/TaggerQustion'
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react'
import { useCallback } from 'react'
import logo from '../../../img/logo.svg'



const QuestionType = (props) => {


    const { question, form, number, exportImage } = props


    const renderElementItem = (question) => {
        if (question.data.code) {
            return <VideoPlayer form={form} code={question.data.code} />
        } else if (question.data.url) {
            return <Link number={number} form={form} href={question.data.url} >{question.data.url}</Link>

        } else if (question.data.audio) {
            return <AudioPlayer number={number} form={form} url={question.data.audio} />

        }
        else if (question.data.image) {
            if (question?.data?.type === SheetActions.ImageType.Puzzle) {
                return <PuzzleQustion
                    rows={4}
                    number={number}
                    columns={4}
                    img={question.data.image} form={form} />
            } if (question?.data?.type === SheetActions.ImageType.Annotate) {

                return <TaggerQustion
                    number={number}
                    img={question.data.image} form={form}
                />
            } else {
                return <Image
                    form={form}
                    width={"100%"}
                    src={question.data.image}
                />
            }

        }

    }

    switch (question?.type) {
        case SheetActions.QuestionType.freeQuestion:
            return <FreeQustion number={number} form={form}  {...question} idQ={question?.id} />

        case SheetActions.QuestionType.linkingQuestion:
            return <LinkingQustionComponent print={true} number={number} form={form} {...question} idQ={question?.id} />


        case SheetActions.QuestionType.selectTrueMultiQuestion:
            return <SelectTrueMultiQustion print={true} number={number} form={form}  {...question} type={"multi"} idQ={question?.id} />


        case SheetActions.QuestionType.sortingQuestion:
            return <SortingQustion form={form} number={number} {...question} idQ={question?.id} />


        case SheetActions.QuestionType.correctionQuestion:
            return <CorrectionQustion number={number} form={form} {...question} idQ={question?.id} />

        case SheetActions.QuestionType.drawingQuestion:
            if (question?.data?.teacher_draw != 1) {
                return <FabricComponent exportImage={exportImage} number={number} form={form} {...question} idQ={question?.id} />
            } else {
                return <Image
                    width={"100%"}
                    src={question.data.image}
                    form={form}
                />
            }


        case SheetActions.QuestionType.elementQuestion:
            return renderElementItem(question)


        default:
            break;
    }
}


const PrintSheet = (props) => {

    const {
        data,
    } = props


    const pageStyle = `
    @page { 
      margin: 5mm 5mm 5mm 5mm; }
      @media print { body { -webkit-print-color-adjust: exact; }

    body {
      marginBottom:10px
    }
    `;
    const componentRef = useRef();


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
        copyStyles: true,
        pageStyle: pageStyle,
    });


    const defineQType = (question) => {
        if (question.data.code) {
            return SheetActions.QuestionType.videoQuestion
        } else if (question.data.url) {
            return SheetActions.QuestionType.linkQuestion

        } else if (question.data.audio) {
            return SheetActions.QuestionType.audioQuestion

        } else if (question.data.image) {
            return SheetActions.QuestionType.imageQuestion
        }
    }

    const needTextArea = (QType, data) => {
        switch (QType) {
            case SheetActions.QuestionType.imageQuestion:
                if (data?.type === SheetActions.ImageType.Normal) {
                    return true
                } else {
                    return false
                }
            case SheetActions.QuestionType.audioQuestion:
                return true
            case SheetActions.QuestionType.videoQuestion:
                return true
            case SheetActions.QuestionType.linkQuestion:
                return true
            case SheetActions.QuestionType.drawingQuestion:
                if (data?.teacher_draw == 1) { return true } else { return false }
            default:
                return false
        }

    }
    const [form] = useForm()
    const [exportImage, setExportImage] = useState(false)
    const [print, setPrint] = useState(false)
    const [loading, setLoading] = useState(false)


    const onBeforePrint = useCallback(async () => {

        await setPrint(true);
        setLoading(true);
        setTimeout(async() => {
            handlePrint();
            await setPrint(false);
            setLoading(false);
          }, 500);





    }, []);
    return (
        <>
            <Button
                onClick={() => {
                    onBeforePrint();
                }}
            >
                Print Sheet
            </Button>


            <div className='sheetView' ref={componentRef} >

                {print &&

                    <Form
                        name="print"
                        layout='vertical'
                        form={form}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="sheetQustion"
                        >
                            <MyRow gutter={[5, 15]} >
                                <MyCol span={24} >
                                    <MyRow>
                                        <Image
                                            width={"150px"}
                                            src={logo}
                                        />
                                    </MyRow>

                                </MyCol>


                                {data && data?.length > 0 && data?.map((question, index) => {
                                    let Qtype = question?.type !== 0 && question?.type ? question?.type : defineQType(question);
                                    return <MyCol key={index} className={"qustionCol"} span={24} >
                                        <Form.Item
                                            name={["sheetQustion", index, "Qustion"]}
                                        >

                                            <Card
                                                hoverable
                                                style={{
                                                    width: "100%",
                                                }}
                                                className='CardQustion'

                                            >
                                                <MyRow justify={"space-between"} align={"middle"} >
                                                    <MyCol sm={24} md={20} >
                                                        <Fragment >
                                                            <div dangerouslySetInnerHTML={{ __html: question?.text }} />
                                                        </Fragment>
                                                    </MyCol>

                                                    <MyCol sm={24} md={4} >
                                                        <Title level={4} >Points : {question?.points}</Title>
                                                    </MyCol>
                                                </MyRow>

                                                {
                                                    <QuestionType exportImage={exportImage} number={index} form={form} question={question} />
                                                }
                                                <MyRow className={"mt-1"} >
                                                    <MyCol span={24} >
                                                        <Form.Item
                                                            label={"answer"}
                                                            name={"answer"}
                                                        >
                                                            <TextArea rows={3} />
                                                        </Form.Item>
                                                    </MyCol>
                                                </MyRow>
                                        
                                            </Card>
                                        </Form.Item>
                                    </MyCol>

                                })}


                            </MyRow>
                        </Form.Item>
                    </Form>
                }
            </div >
        </>
    )
}

export default PrintSheet