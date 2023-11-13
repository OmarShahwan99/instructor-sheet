import "./App.css";
import { useEffect, useState } from "react";
// import Route from './route';
// import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import BlankLayout from "./layout/blankLayout/BlankLayout";
import SheetView from "./pages/sheet/SheetView";
import SheetActions from "./actions/SheetActions";
import SheetStudentReview from "./pages/sheetStudentReview/SheetStudentReview";
import { notification } from "antd";
import SheetTeacherCorrect from "./pages/sheetStudentReview/SheetTeacherCorrect";
import SweetAlert2 from "react-sweetalert2";
import { BrowserRouter } from "react-router-dom";
import Route from "./route";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

let NewData = {
  sheet_id: 8,
  student_id: 1,
  message: "",
  role: "Student",
  pageType: 1,
  csrf: "PAi5ukuRrP9HHO4L6VlahRrymZjUFgQpb5W3v6od",
  question_list: [
    {
      id: 17,
      text: "<p>test</p>",
      instructions: "test",
      points: 5,
      type: 1,
      data: [],
    },
    {
      id: 18,
      text: "<p>test</p>",
      instructions: "test",
      points: 5,
      type: 5,
      data: [
        {
          id: 14,
          text: "1",
          is_true: 0,
        },
        {
          id: 15,
          text: "2",
          is_true: 0,
        },
        {
          id: 16,
          text: "3",
          is_true: 0,
        },
      ],
    },
    {
      id: 19,
      text: "<p>test</p>",
      instructions: "test",
      points: 2,
      type: 2,
      data: [
        {
          id: 17,
          text: "1",
          is_true: 0,
        },
        {
          id: 18,
          text: "2",
          is_true: 0,
        },
      ],
    },
    {
      id: 20,
      text: "<p>test</p>",
      instructions: "test",
      points: 5,
      type: 0,
      data: {
        image: "http://127.0.0.1:8000/storage/8/cover.png",
        type: "2",
        size: "4",
      },
    },
  ],
};
function App(props) {
  const { data } = props;
  //const data = NewData
  const openNotificationSuccess = (title, body) => {
    notification.info({
      message: title,
      placement: "top",
      description: body,
    });
  };

  const [message, setMessage] = useState();
  const [sheetData, setSheetData] = useState([]);
  const [csrf, setCsrf] = useState();
  const [sheet_id, setSheet_id] = useState();
  const [role, setRole] = useState();
  const [pageType, setPageType] = useState(1);

  const [student_id, setStudent_id] = useState();

  const [swalProps, setSwalProps] = useState({});

  useEffect(() => {
    if (message && message.title) {
      setSwalProps({
        show: true,
        title: message.title,
        text: message.body,
      });
    }
  }, [message]);

  useEffect(() => {
    console.log("data From larvel", data);
    console.log("data csrf", data?.csrf);
    console.log("data role", data?.role);
    console.log("data pageType", data?.pageType);
    console.log("data message", data?.message);
    console.log("data sheet_id", data?.sheet_id);
    console.log("data student_id", data?.student_id);
    console.log("data question_list", data?.question_list);

    if (data) {
      setCsrf(data?.csrf);
      setSheet_id(data?.sheet_id);
      setRole(data?.role);
      setPageType(data?.pageType);
      setMessage(data?.message);
      setStudent_id(data?.student_id);
      //   setSheetData([...data?.question_list]);
    }

    // let objectData = {...data}
    // delete objectData.csrf;
    // delete objectData.sheet_id;
    // delete objectData.role;
    // delete objectData.pageType;
    // delete objectData.message;

    //     let dataArra = []
    //     for (let index = 0; index < Object.keys(objectData).length; index++) {
    //         const element = Object.keys(objectData)[index];
    //         dataArra.push(objectData[element])
    //     }
    //     setSheetData([...dataArra])
  }, [data]);

  return (
    <div className="App">
      {/* <SweetAlert2 {...swalProps} />

      {pageType == SheetActions.pageType.solve ? (
        <BlankLayout>
          <SheetView
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      ) : pageType == SheetActions.pageType.studentReview ? (
        <BlankLayout>
          <SheetStudentReview
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      ) : pageType == SheetActions.pageType.studentReviewWithoutPoint &&
        role === SheetActions.RoleType.student ? (
        <BlankLayout>
          <SheetStudentReview
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      ) : pageType == SheetActions.pageType.studentReviewWithoutPoint &&
        role === SheetActions.RoleType.teacher ? (
        <BlankLayout>
          <SheetTeacherCorrect
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      ) : pageType == SheetActions.pageType.teacherReview ? (
        <BlankLayout>
          <SheetStudentReview
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      ) : (
        <BlankLayout>
          <SheetView
            student_id={student_id}
            role={role}
            sheet_id={sheet_id}
            data={sheetData}
            csrf={csrf}
          />
        </BlankLayout>
      )} */}

      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Route />
        </DndProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
