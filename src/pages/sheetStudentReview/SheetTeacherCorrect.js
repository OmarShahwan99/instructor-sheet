import { Button, Card, Form, Image, Input, InputNumber, notification } from 'antd'
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
import SweetAlert2 from 'react-sweetalert2'



const QuestionType = (props) => {


    const { question, form, number, exportImage } = props


    const renderElementItem = (question) => {
        if (question.data.code) {
            return <><VideoPlayer form={form} code={question.data.code} /> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
            </>
        } else if (question.data.url) {
            return <><Link number={number} target={'_blank'} form={form} href={question.data.url} >{question.data.url}</Link> <Title className='mt-2' level={5} >{question?.answer?.data?.text}</Title>
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
                />  <Title className='mt-2' level={5} >{question?.answer?.data?.text  ? question?.answer?.data?.text : ""}</Title>  </>
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
                />  <Title className='mt-2' level={5} >{question?.answer?.data?.text ? question?.answer?.data?.text :""}</Title>
                </>
            }

        }

    }

    switch (question?.type) {
        case SheetActions.QuestionType.freeQuestion:
            if (question?.answer?.data) {
                return question?.answer?.data[0]?.text ? <div className='mt-2' dangerouslySetInnerHTML={{ __html: question?.answer?.data[0]?.text }} /> :<></>
            }        // <FreeQustion number={number} form={form}  {...question} idQ={question?.id} />

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





const SheetTeacherCorrect = (props) => {


    const {
        data,
        sheet_id,
        csrf,
        role,
        student_id
    } = props

    const [swalProps, setSwalProps] = useState({});


    const openNotificationSuccess = (description) => {
        notification.success({
            message: 'Success',
            placement: 'top',
            description: description,
        });
    };

    const openNotificationError = () => {
        notification.error({
            message: 'error',
            placement: 'top',
            description:
                'something error',
        });
    };

    const onCloseAlert = () => {
        setSwalProps({
            show: false,
            title: '',
            text: "",
        });
    }


    const onFinish = async (values) => {
        console.log("values", values);


        const formData = new FormData();

        for (let index = 0; index < values.sheetQustion.length; index++) {
            const element = values.sheetQustion[index];
            formData.append(`questions[${element?.Qustion?.idQ}][question_id]`, element?.Qustion?.idQ);
            formData.append(`questions[${element?.Qustion?.idQ}][answer_id]`, element?.Qustion?.answerId);
            formData.append(`questions[${element?.Qustion?.idQ}][notes]`, element?.Qustion?.notes);
            formData.append(`questions[${element?.Qustion?.idQ}][mark]`, element?.Qustion?.newPoint);
        }

        let url = `/sheets/${sheet_id}/marks/evaluate/${student_id}/resolve`;
        // let url = `/resolve`;

        formData.append('sheet_id', sheet_id)
        formData.append('student_id', student_id)

        formData.append('_token', csrf)
        formData.append('csrf', csrf)
        for (let entry of formData.entries()) {
            console.log(entry[0] + ': ' + entry[1]);
        }
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setSwalProps({
                    show: true,
                    title: 'Success',
                    text: response.data.message,
                    // onHide: () => { window.location.reload(); }
                    onConfirm: () => { onCloseAlert() }

                });
            })
            .catch(error => {
                // openNotificationError()
                setSwalProps({
                    show: true,
                    title: 'False',
                    text: error,
                    onConfirm: () => { onCloseAlert() }

                });
            });

    }

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
            <SweetAlert2 {...swalProps} />

            <Form
                name="sheetCorrection"
                layout='vertical'
                onFinish={onFinish}
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

                                    <Form.Item
                                        name={["sheetQustion", index, "Qustion", "idQ"]}
                                        hidden={true}
                                        initialValue={question?.id}
                                    />
                                    <Form.Item
                                        name={["sheetQustion", index, "Qustion", "answerId"]}
                                        hidden={true}
                                        initialValue={question?.answer?.id}
                                    />
                                    <Form.Item
                                        name={["sheetQustion", index, "Qustion", "QType"]}
                                        hidden={true}
                                        initialValue={Qtype}
                                    />
                                    <Card
                                        hoverable
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <MyRow justify={"space-between"} align={"middle"} >
                                            <MyCol sm={24} md={16} >
                                                <Fragment >
                                                    <div dangerouslySetInnerHTML={{ __html: question?.text }} />
                                                </Fragment>
                                            </MyCol>

                                            <MyCol sm={24} md={8} >
                                                <MyRow gutter={5} >
                                                    <MyCol> <Title level={4} >Points : </Title></MyCol>
                                                    <MyCol>
                                                        <Form.Item
                                                            required={true}
                                                            name={["sheetQustion", index, "Qustion", "newPoint"]}
                                                        >
                                                            <InputNumber
                                                                max={question?.points}
                                                                min={0}
                                                            />
                                                        </Form.Item>

                                                    </MyCol>

                                                    <MyCol>        
                                                         <Title level={4} > /  {question?.points}</Title>
                                                    </MyCol>

                                                </MyRow>

                                            </MyCol>
                                        </MyRow>
                                        <MyRow justify={"start"} align={"middle"} >
                                            <MyCol span={24} >
                                                <p>{question?.instructions}</p>
                                            </MyCol>

                                        </MyRow>
                                        <MyRow className={"my-1"} justify={"start"} >
                                            <MyCol span={24} >
                                                <Form.Item
                                                    label={"Note"}
                                                    name={["sheetQustion", index, "Qustion", "notes"]}
                                                >
                                                    <Input
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            </MyCol>
                                        </MyRow>

                                        {
                                            <QuestionType number={index} form={form} question={question} />
                                        }

                                    </Card>
                                </Form.Item>
                            </MyCol>

                        })}


                    </MyRow>
                </Form.Item>
                <MyRow justify={"space-between"} >
                    <MyCol>  <Button
                        form={"sheetCorrection"}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </MyCol>

                    {role !== SheetActions.RoleType.student &&
                        <MyCol>
                            <PrintSheet data={data} />
                        </MyCol>}



                </MyRow>

            </Form>



        </div >
    )
}

export default SheetTeacherCorrect