

const fs = {

};

const loc = {
    pageType:{
        solve:"1",
        studentReview:"2",
        studentReviewWithoutPoint:"3",
        teacherReview:"4",
    },
   
    QuestionType: {
        freeQuestion: 1,
        selectTrueMultiQuestion: 2,
        linkingQuestion: 3,
        sortingQuestion: 4,
        correctionQuestion: 5,
        drawingQuestion: 6,
        elementQuestion: 0,
        imageQuestion: 7,
        audioQuestion: 8,
        videoQuestion: 9,
        linkQuestion: 10

    },
    ImageType: {
        Normal: "1",
        Puzzle: "2",
        Annotate: "3"
    },
    RoleType: {
        teacher: "Teacher",
        admin: "Admin",
        student: "Student",
    }


};

const SheetActions = Object.assign(fs, loc);

export default SheetActions;