import { Button, Card, Form, Image, Input, notification } from "antd";
import React, { Fragment, useState, useRef, useEffect } from "react";
import CorrectionQustion from "./correctionQustion/CorrectionQustion";
import MyRow from "../../components/myRow/MyRow";
import MyCol from "../../components/myCol/MyCol";
import Title from "antd/es/typography/Title";
import LinkingQustionComponent from "./linkingQustion/LinkingQustionComponent";
import FabricComponent from "./fabricComponent/FabricComponent";
import SortingQustion from "./sortingQustion/SortingQustion";
import SelectTrueMultiQustion from "./selectTrueMultiQustion/SelectTrueMultiQustion";
import FreeQustion from "./freeQustion/FreeQustion";
import VideoPlayer from "./videoPlayer/VideoPlayer";
import VoiceRecorder from "./voiceRecorder/VoiceRecorder";
import DragThingsToBoxesDemo from "./DragThingsToBoxes/DragThingsToBoxesDemo";
import PuzzleQustion from "./puzzleQustion/PuzzleQustion";
import AudioPlayer from "./audioPlayer/AudioPlayer";
import SheetActions from "../../actions/SheetActions";
import Link from "antd/es/typography/Link";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import TaggerQustion from "./taggerQustion/TaggerQustion";
import PrintSheet from "./printSheet/PrintSheet";
import SweetAlert2 from "react-sweetalert2";

const QuestionType = (props) => {
  const [isAlertVisible, setIsAlertVisible] = React.useState(true);
  const targetRef = useRef(null);
  const { question, form, number, exportImage } = props;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        startTimer();
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    const timeout = setTimeout(() => {
      setIsAlertVisible(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  };

  const renderElementItem = (question) => {
    if (question.data.code) {
      return <VideoPlayer form={form} code={question.data.code} />;
    } else if (question.data.url) {
      return (
        <Link
          number={number}
          form={form}
          target={"_blank"}
          href={question.data.url}
        >
          {question.data.url}
        </Link>
      );
    } else if (question.data.audio) {
      return (
        <AudioPlayer number={number} form={form} url={question.data.audio} />
      );
    } else if (question.data.image) {
      if (question?.data?.type === SheetActions.ImageType.Puzzle) {
        return (
          <>
            <div ref={targetRef}>
              {isAlertVisible && (
                <img className="previewPuzzleImage" src={question.data.image} />
              )}
            </div>
            <PuzzleQustion
              rows={3}
              number={number}
              columns={3}
              size={question.data.size}
              img={question.data.image}
              form={form}
            />
          </>
        );
      }
      if (question?.data?.type === SheetActions.ImageType.Annotate) {
        return (
          <TaggerQustion
            number={number}
            img={question.data.image}
            form={form}
          />
        );
      } else {
        return <Image form={form} width={"100%"} src={question.data.image} />;
      }
    }
  };

  switch (question?.type) {
    case SheetActions.QuestionType.freeQuestion:
      return (
        <FreeQustion
          number={number}
          form={form}
          {...question}
          idQ={question?.id}
        />
      );

    case SheetActions.QuestionType.linkingQuestion:
      return (
        <LinkingQustionComponent
          number={number}
          form={form}
          {...question}
          idQ={question?.id}
        />
      );

    case SheetActions.QuestionType.selectTrueMultiQuestion:
      return (
        <SelectTrueMultiQustion
          number={number}
          form={form}
          {...question}
          type={"multi"}
          idQ={question?.id}
        />
      );

    case SheetActions.QuestionType.sortingQuestion:
      return (
        <SortingQustion
          form={form}
          number={number}
          {...question}
          idQ={question?.id}
        />
      );

    case SheetActions.QuestionType.correctionQuestion:
      return (
        <CorrectionQustion
          number={number}
          form={form}
          {...question}
          idQ={question?.id}
        />
      );

    case SheetActions.QuestionType.drawingQuestion:
      if (question?.data?.teacher_draw != 1) {
        return (
          <FabricComponent
            exportImage={exportImage}
            number={number}
            form={form}
            {...question}
            idQ={question?.id}
          />
        );
      } else {
        return <Image width={"100%"} src={question.data.image} form={form} />;
      }

    case SheetActions.QuestionType.elementQuestion:
      return renderElementItem(question);

    default:
      break;
  }
};

const SheetView = (props) => {
  const { data, sheet_id, csrf, role } = props;

  const [swalProps, setSwalProps] = useState({});

  const onCloseAlert = (reload) => {
    setSwalProps({
      show: false,
      title: "",
      text: "",
      // onConfirm:()=>{onCloseAlert()}
      // onHide:()=>{window.location.reload();}
    });
    if (reload) {
      window.location.reload();
    }
  };
  const openNotificationSuccess = (description) => {
    notification.success({
      message: "Success",
      placement: "top",
      description: description,
    });
  };

  const openNotificationError = () => {
    notification.error({
      message: "error",
      placement: "top",
      description: "something error",
    });
  };

  const onFinish = async (values) => {
    let valusToSave = {};
    let correction_ids = [];
    let questions_ids = [];

    const formData = new FormData();

    for (let index = 0; index < values?.sheetQustion.length; index++) {
      const element = values?.sheetQustion[index].Qustion;
      switch (element?.QType) {
        case SheetActions.QuestionType.correctionQuestion:
          let correction = {};
          correction_ids.push(element.idQ);
          element?.answer?.forEach((elements) => {
            correction = {
              [`correction[${element.idQ}][option][${elements.id}]`]:
                elements.value === 1
                  ? "true"
                  : elements.value === 2
                  ? "false"
                  : "null",
              ...correction,
            };
          });
          valusToSave = { ...correction, ...valusToSave };
          break;

        case SheetActions.QuestionType.selectTrueMultiQuestion:
          let selects = {};
          questions_ids.push(element.idQ);
          element?.answer?.forEach((elements) => {
            selects = {
              [`mcq[${element.idQ}][option][${elements.id}]`]:
                elements.is_true === true ? "true" : "false",
              ...selects,
            };
          });
          valusToSave = { ...selects, ...valusToSave };
          break;
        case SheetActions.QuestionType.linkingQuestion:
          let linking = {};
          questions_ids.push(element.idQ);

          element?.answer?.forEach((elements) => {
            const startID = elements.start;
            const endID = elements.end;
            const startIDStr = parseInt(startID.split("_IDQ")[0]);
            const endIDStr = parseInt(endID.split("_IDQ")[0]);
            linking = {
              [`linking_option[${element.idQ}][option][${startIDStr}]`]:
                endIDStr,
              ...linking,
            };
          });
          valusToSave = { ...linking, ...valusToSave };
          break;

        case SheetActions.QuestionType.sortingQuestion:
          let sorts = {};
          questions_ids.push(element.idQ);

          element?.answer?.forEach((elements, index) => {
            sorts = {
              [`ordering[${element.idQ}][option][${elements.id}]`]: elements.id,
              [`ordering[${element.idQ}][index][${elements.id}]`]: index,
              ...sorts,
            };
          });
          valusToSave = { ...sorts, ...valusToSave };
          break;

        case SheetActions.QuestionType.videoQuestion:
          questions_ids.push(element.idQ);
          let video = {};
          video = {
            [`video[${element.idQ}][answer]`]: element?.answer,
            ...video,
          };

          valusToSave = { ...video, ...valusToSave };
          break;

        case SheetActions.QuestionType.imageQuestion:
          let image = {};
          image = {
            [`image[${element.idQ}][answer]`]: element?.answer,
            ...image,
          };
          questions_ids.push(element.idQ);
          valusToSave = { ...image, ...valusToSave };
          break;

        case SheetActions.QuestionType.freeQuestion:
          let freeAnswer = {};
          freeAnswer = {
            [`open_question[${element.idQ}][answer]`]: element?.answer,
            ...freeAnswer,
          };
          questions_ids.push(element.idQ);
          valusToSave = { ...freeAnswer, ...valusToSave };
          break;

        case SheetActions.QuestionType.audioQuestion:
          let audio = {};
          audio = {
            [`audio[${element.idQ}][answer]`]: element?.answer,
            ...audio,
          };
          questions_ids.push(element.idQ);
          valusToSave = { ...audio, ...valusToSave };
          break;

        case SheetActions.QuestionType.linkQuestion:
          let url = {};
          url = {
            [`url[${element.idQ}][answer]`]: element?.answer,
            ...url,
          };
          questions_ids.push(element.idQ);
          valusToSave = { ...url, ...valusToSave };
          break;

        case SheetActions.QuestionType.drawingQuestion:
          let draw = {};
          if (data[index]?.data?.teacher_draw == 1) {
            draw = {
              [`draw[${element.idQ}][answer]`]: element?.answer,
              ...draw,
            };
          } else {
            draw = {
              [`draw[${element.idQ}][canvas]`]: element?.answer,
              ...draw,
            };
          }
          questions_ids.push(element.idQ);
          valusToSave = { ...draw, ...valusToSave };
          break;
        default:
          break;
      }
    }

    for (let index = 0; index < Object.keys(valusToSave).length; index++) {
      const element = Object.keys(valusToSave)[index];
      formData.append(element, valusToSave[element]);
    }
    if (correction_ids && correction_ids.length > 0) {
      for (let index = 0; index < correction_ids.length; index++) {
        const element = correction_ids[index];
        formData.append("correction_question_ids[]", element);
      }
    }

    if (questions_ids && questions_ids.length > 0) {
      for (let index = 0; index < questions_ids.length; index++) {
        const element = questions_ids[index];
        formData.append(`questions[${element}][question_id]`, element);
      }
    }

    let url = `/sheets/solve/${sheet_id}`;

    formData.append("sheet_id", sheet_id);
    formData.append("_token", csrf);
    formData.append("csrf", csrf);
    console.log("valusToSave", valusToSave);
    console.log("formData", formData.entries());
    for (let entry of formData.entries()) {
      console.log(entry[0] + ": " + entry[1]);
    }

    axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // openNotificationSuccess(response.data.message)
        setSwalProps({
          show: true,
          title: "Success",
          text: response.data.message,
          onConfirm: () => {
            onCloseAlert(true);
          },
          // onHide:()=>{window.location.reload();}
        });
        // alert("Save")
      })
      .catch((error) => {
        // openNotificationError()
        setSwalProps({
          type: "error",
          show: true,
          title: "False",
          text: error,
          onConfirm: () => {
            onCloseAlert();
          },
        });
        // alert("Error")
      });
  };

  const defineQType = (question) => {
    if (question.data.code) {
      return SheetActions.QuestionType.videoQuestion;
    } else if (question.data.url) {
      return SheetActions.QuestionType.linkQuestion;
    } else if (question.data.audio) {
      return SheetActions.QuestionType.audioQuestion;
    } else if (question.data.image) {
      return SheetActions.QuestionType.imageQuestion;
    }
  };

  const needTextArea = (QType, data) => {
    switch (QType) {
      case SheetActions.QuestionType.imageQuestion:
        if (data?.type === SheetActions.ImageType.Normal) {
          return true;
        } else {
          return false;
        }
      case SheetActions.QuestionType.audioQuestion:
        return true;
      case SheetActions.QuestionType.videoQuestion:
        return true;
      case SheetActions.QuestionType.linkQuestion:
        return true;
      case SheetActions.QuestionType.drawingQuestion:
        if (data?.teacher_draw == 1) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };
  const [form] = useForm();
  const [exportImage, setExportImage] = useState(false);

  const SaveThenSubmit = async () => {
    await setExportImage(true);

    form.submit();
  };
  return (
    <div className="sheetView">
      <SweetAlert2 {...swalProps} />

      <Form
        name="sheet"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item name="sheetQustion">
          <MyRow gutter={[5, 15]}>
            {data &&
              data?.length > 0 &&
              data?.map((question, index) => {
                let Qtype =
                  question?.type !== 0 && question?.type
                    ? question?.type
                    : defineQType(question);
                return (
                  <MyCol key={index} className={"qustionCol"} span={24}>
                    <Form.Item name={["sheetQustion", index, "Qustion"]}>
                      <Form.Item
                        name={["sheetQustion", index, "Qustion", "idQ"]}
                        hidden={true}
                        initialValue={question?.id}
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
                        <MyRow justify={"space-between"} align={"middle"}>
                          <MyCol sm={24} md={20}>
                            <Fragment>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: question?.text,
                                }}
                              />
                            </Fragment>
                          </MyCol>

                          <MyCol sm={24} md={4}>
                            <Title level={4}>Points : {question?.points}</Title>
                          </MyCol>
                        </MyRow>
                        <MyRow justify={"start"} align={"middle"}>
                          <MyCol span={24}>
                            <p>{question?.instructions}</p>
                          </MyCol>
                        </MyRow>

                        {
                          <QuestionType
                            exportImage={exportImage}
                            number={index}
                            form={form}
                            question={question}
                          />
                        }
                        {needTextArea(Qtype, question?.data) ? (
                          <MyRow className={"mt-1"}>
                            <MyCol span={24}>
                              <Form.Item
                                label={"answer"}
                                name={[
                                  "sheetQustion",
                                  index,
                                  "Qustion",
                                  "answer",
                                ]}
                              >
                                <TextArea rows={3} />
                              </Form.Item>
                            </MyCol>
                          </MyRow>
                        ) : (
                          <Form.Item
                            name={["sheetQustion", index, "Qustion", "answer"]}
                            hidden={true}
                          />
                        )}
                      </Card>
                    </Form.Item>
                  </MyCol>
                );
              })}
          </MyRow>
        </Form.Item>
        <MyRow justify={"space-between"}>
          <MyCol>
            {role !== SheetActions.RoleType.teacher &&
              role !== SheetActions.RoleType.admin && (
                <Button
                  onClick={() => {
                    SaveThenSubmit();
                  }}
                  type="primary"
                  htmlType="button"
                >
                  Submit
                </Button>
              )}
          </MyCol>

          <MyCol>
            <PrintSheet data={data} />
          </MyCol>
        </MyRow>
      </Form>
    </div>
  );
};

export default SheetView;
