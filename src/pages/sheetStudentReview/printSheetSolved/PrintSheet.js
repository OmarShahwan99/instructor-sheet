import { Button, Card, Form, Image, Input } from 'antd'
import React, { Fragment, useState } from 'react'
import CorrectionQustion from '../correctionQustionSolved/CorrectionQustion'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import Title from 'antd/es/typography/Title'
import LinkingQustionComponent from '../linkingQustionSolved/LinkingQustionComponent'
import SortingQustion from '../sortingQustionSolved/SortingQustion'
import SelectTrueMultiQustion from '../selectTrueMultiQustionSolved/SelectTrueMultiQustion'
import VideoPlayer from '../videoPlayerSolved/VideoPlayer'
import AudioPlayer from '../audioPlayerSolved/AudioPlayer'
import SheetActions from '../../../actions/SheetActions'
import Link from 'antd/es/typography/Link'
import { useForm } from 'antd/es/form/Form'
import TaggerQustion from '../taggerQustionSolved/TaggerQustion'
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react'
import { useCallback } from 'react'
import logo from '../../../img/logo.svg'



const QuestionType = (props) => {


    const { question, form, number, exportImage } = props



    const renderElementItem = (question) => {
        if (question.data.code) {
            return <><div>https://youtu.be/${question.data.code}</div> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>
        } else if (question.data.url) {
            return <><Link number={number} form={form} href={question.data.url} >{question.data.url}</Link> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>

        } else if (question.data.audio) {
            return <>  <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>

        }
        else if (question.data.image) {
            if (question?.data?.type === SheetActions.ImageType.Puzzle) {
                return <><Image
                    form={form}
                    width={"100%"}
                    src={question.data.image}
                />  <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>  </>
            } if (question?.data?.type === SheetActions.ImageType.Annotate) {

                return <TaggerQustion
                    number={number}
                    {...question}
                    img={question.data.image} form={form}
                />
            } else {
                return <> <Image
                    form={form}
                    width={"100%"}
                    src={question.data.image}
                />  <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
                </>
            }

        }

    }


    switch (question?.type) {
        case SheetActions.QuestionType.freeQuestion:
            return <div className='mt-2' dangerouslySetInnerHTML={{ __html: question?.answer?.data?.text }} />
        // <FreeQustion number={number} form={form}  {...question} idQ={question?.id} />

        case SheetActions.QuestionType.linkingQuestion:
            return <LinkingQustionComponent printed={true} number={number} form={form} {...question} idQ={question?.id} />


        case SheetActions.QuestionType.selectTrueMultiQuestion:
            return <SelectTrueMultiQustion number={number} form={form}  {...question} type={"multi"} idQ={question?.id} />


        case SheetActions.QuestionType.sortingQuestion:
            return <SortingQustion form={form} number={number} {...question} idQ={question?.id} />


        case SheetActions.QuestionType.correctionQuestion:
            return <CorrectionQustion number={number} form={form} {...question} idQ={question?.id} />

        case SheetActions.QuestionType.drawingQuestion:
            if (question?.data?.teacher_draw != 1) {
                return <Image
                    width={"100%"}
                    src={question?.answer?.data?.image}
                    form={form}
                />
            } else {
                return <><Image
                    width={"100%"}
                    src={question.data.image}
                    form={form}
                />
                    <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
                </>
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
            <MyCol>

            <Button
                onClick={() => {
                    onBeforePrint();
                }}
            >
                Print Sheet
            </Button>
            </MyCol>

            <div 
            // hidden={!print}
                className='PrintPage' >
                <div className='sheetView ' ref={componentRef} >


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
                                                    <MyCol sm={24} md={16} >
                                                        <Fragment >
                                                            <div dangerouslySetInnerHTML={{ __html: question?.text }} />
                                                        </Fragment>
                                                    </MyCol>

                                                    <MyCol sm={24} md={8} >
                                                        <Title level={4} >Points :{question?.answer?.points ? question?.answer?.points : 0} / {question?.points}</Title>
                                                    </MyCol>
                                                </MyRow>

                                                <MyRow justify={"start"} align={"middle"} >
                                                    <MyCol span={24} >
                                                    <Title level={4} >Teacher Note</Title>
                                                    </MyCol>
                                                    <MyCol span={24} >
                                                    <Title level={5} >{question?.answer?.notes}</Title>
                                                    </MyCol>

                                                </MyRow>

                                                {
                                                    <QuestionType exportImage={exportImage} number={index} form={form} question={question} />
                                                }
                                            </Card>
                                        </Form.Item>
                                    </MyCol>

                                })}


                            </MyRow>
                        </Form.Item>
                    </Form>

                </div >
            </div>
        </>
    )
}

export default PrintSheet