import { Button, Card, Form, Image, Input } from 'antd'
import React, { Fragment, useState } from 'react'
import CorrectionQustion from './correctionQustionSolved/CorrectionQustion'
import MyRow from '../../components/myRow/MyRow'
import MyCol from '../../components/myCol/MyCol'
import Title from 'antd/es/typography/Title'
import LinkingQustionComponent from './linkingQustionSolved/LinkingQustionComponent'
import FabricComponent from './fabricComponentSolved/FabricComponent'
import SortingQustion from './sortingQustionSolved/SortingQustion'
import SelectTrueMultiQustion from './selectTrueMultiQustionSolved/SelectTrueMultiQustion'
import FreeQustion from './freeQustionSolved/FreeQustion'
import VideoPlayer from './videoPlayerSolved/VideoPlayer'
import PuzzleQustion from './puzzleQustionSolved/PuzzleQustion'
import AudioPlayer from './audioPlayerSolved/AudioPlayer'
import SheetActions from '../../actions/SheetActions'
import Link from 'antd/es/typography/Link'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios';
import Swal from 'sweetalert2';
import TaggerQustion from './taggerQustionSolved/TaggerQustion'
import PrintSheet from './printSheetSolved/PrintSheet'



const QuestionType = (props) => {


    const { question, form, number, exportImage } = props


    const renderElementItem = (question) => {
        if (question.data.code) {
            return <><VideoPlayer form={form} code={question.data.code} /> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>
        } else if (question.data.url) {
            return <><Link number={number}  target={'_blank'} form={form} href={question.data.url} >{question.data.url}</Link> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>

        } else if (question.data.audio) {
            return <> <AudioPlayer number={number} form={form} url={question.data.audio} /> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
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
            if (question?.answer?.data) {
                return <div className='mt-2' dangerouslySetInnerHTML={{ __html: question?.answer?.data[0]?.text }} />
            }
        // <FreeQustion number={number} form={form}  {...question} idQ={question?.id} />

        case SheetActions.QuestionType.linkingQuestion:
            return <LinkingQustionComponent number={number} form={form} {...question} idQ={question?.id} />


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
                    <Title className='mt-2' level={5} >{question?.answer?.data?.text ? question?.answer?.data?.text : ""}</Title>
                </>
            }


        case SheetActions.QuestionType.elementQuestion:
            return renderElementItem(question)


        default:
            break;
    }
}





const SheetStudentReview = (props) => {


    const {
        data,
        sheet_id,
        csrf,
        role
    } = props


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
    return (
        <div className='sheetView' >
            <Form
                name="sheet"
                layout='vertical'
                form={form}
                autoComplete="off"
            >
                <Form.Item
                    name="sheetQustion"
                >
                    <MyRow gutter={[5, 15]} >

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
                                    >
                                        <MyRow justify={"space-between"} align={"middle"} >
                                            <MyCol sm={24} md={20} >
                                                <Fragment >
                                                    <div dangerouslySetInnerHTML={{ __html: question?.text }} />
                                                </Fragment>
                                            </MyCol>

                                            <MyCol sm={24} md={4} >
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
                                        <MyRow justify={"start"} align={"middle"} >
                                            <MyCol span={24} >
                                                <p>{question?.instructions}</p>
                                            </MyCol>

                                        </MyRow>

                                        {
                                            <QuestionType number={index} form={form} question={question} />
                                        }


                                        {/* {needTextArea(Qtype, question?.data) ?
                                            <MyRow className={"mt-1"} >
                                                <MyCol span={24} >
                                                    <Form.Item
                                                        label={"answer"}
                                                        name={["sheetQustion", index, "Qustion", "answer"]}
                                                    >
                                                        <TextArea rows={3} />
                                                    </Form.Item>
                                                </MyCol>
                                            </MyRow>
                                            :
                                            <Form.Item
                                                name={["sheetQustion", index, "Qustion", "answer"]}
                                                hidden={true}
                                            />

                                        } */}
                                    </Card>
                                </Form.Item>
                            </MyCol>

                        })}


                    </MyRow>
                </Form.Item>
                <MyRow justify={"space-between"} >
                    <MyCol />
                    {/* <MyCol>  <Button
                        onClick={() => { SaveThenSubmit() }}
                        type="primary" htmlType="button">
                        Submit
                    </Button>
                    </MyCol> */}


                    <PrintSheet data={data} />




                </MyRow>

            </Form>



        </div >
    )
}

export default SheetStudentReview