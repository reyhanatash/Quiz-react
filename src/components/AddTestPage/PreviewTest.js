import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Card,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import alignLeft from 'assets/img/Icon/align-to-left.png';
import alignRight from 'assets/img/Icon/align-to-right.png';
import parse from 'html-react-parser';
import MathJax from 'react-mathjax2';
import { Tooltip } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FileUpload from './FileUpload';
const PreviewTest = props => {
  const [question, updateQuestion] = React.useState();
  const [questionText, updateQuestionText] = React.useState('');
  const [answer1, updateAnswer1] = React.useState();
  const [answer2, updateAnswer2] = React.useState();
  const [answer3, updateAnswer3] = React.useState();
  const [answer4, updateAnswer4] = React.useState();
  const [id, updateId] = React.useState(-1);
  React.useEffect(() => {
    if (id === 0) {
      updateQuestion(props.editorText);
      cardTest.current.children[0].children[id].innerHTML = question;
      props.updateTitle('سوال');
      updateQuestionText(cardTest.current.children[id].innerText);
    } else if (id === 1) {
      updateAnswer1(props.editorText);
      cardTest.current.children[1].children[id - 1].innerHTML = answer1;
      props.updateTitle('گزینه اول');
    } else if (id === 2) {
      updateAnswer2(props.editorText);
      cardTest.current.children[1].children[id - 1].innerHTML = answer2;
      props.updateTitle('گزینه دوم');
    } else if (id === 3) {
      updateAnswer3(props.editorText);
      cardTest.current.children[1].children[id - 1].innerHTML = answer3;
      props.updateTitle('گزینه سوم');
    } else if (id === 4) {
      updateAnswer4(props.editorText);
      cardTest.current.children[1].children[id - 1].innerHTML = answer4;
      props.updateTitle('گزینه چهارم');
    }
    props.updateTestTitle(questionText);
  });
  const TrueAnswer = React.createRef();
  const [trueAnswerVal, updateTrueAnswer] = React.useState(0);

  React.useEffect(() => {
    sendInfo();
  }, [
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    trueAnswerVal,
    questionText,
  ]);

  React.useEffect(() => {
    if (props.selectedTest) {
      updateTrueAnswer(props.selectedTest.trueAnswer);
    } else {
      updateTrueAnswer(0);
    }
  }, [props.selectedTest]);
  const sendInfo = () => {
    const data = {
      HTML: question,
      Name: questionText,
      Ans1: answer1,
      Ans2: answer2,
      Ans3: answer3,
      Ans4: answer4,
      TrueAns: trueAnswerVal,
    };
    props.getData(data);
  };

  // Compare for Edit Mode
  // React.useEffect(() => {
  //   if (prevId !== id) {
  //     updateEdit(true);
  //     console.log('id changed');
  //   }
  // });
  // Load Defaults
  React.useEffect(() => {
    if (props.selectedTest) {
      props.updateEditorText(props.selectedTest.questionName);
      updateQuestion(props.selectedTest.questionName);
      updateQuestionText(props.selectedTest.name);
      updateAnswer1(props.selectedTest.answer1);
      updateAnswer2(props.selectedTest.answer2);
      updateAnswer3(props.selectedTest.answer3);
      updateAnswer4(props.selectedTest.answer4);
      updateId(-1);
    } else {
      updateId(-1);
      props.updateInitValue('');
      props.updateEditorText('');
      updateQuestion('');
      updateQuestionText('');
      updateAnswer1('');
      updateAnswer2('');
      updateAnswer3('');
      updateAnswer4('');
    }
  }, [props.selectedTest, props.editMode]);

  const showTextAnswerEditor = (e, i) => {
    props.updateShowEditor(true);
    updateId(i);
    props.updateInitValue('');
    switch (i) {
      case 0:
        props.updateEditorText(question);
        props.updateInitValue(question);
        break;
      case 1:
        props.updateEditorText(answer1);
        props.updateInitValue(answer1);
        break;
      case 2:
        props.updateEditorText(answer2);
        props.updateInitValue(answer2);
        break;
      case 3:
        props.updateEditorText(answer3);
        props.updateInitValue(answer3);
        break;
      case 4:
        props.updateEditorText(answer4);
        props.updateInitValue(answer4);
        break;
      default:
        break;
    }
    if (
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .parentElement.nextSibling.classList.value === 'form-group'
    ) {
      const editor =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement
          .parentElement.nextSibling.children[0].children[2].children[2]
          .children[0];
      // console.log(e.currentTarget.innerHTML);
      editor.innerHTML = question;
      // editor.focus(function name() {
      //   alert('focused');
      // });
    }
  };
  const trueAnswer = [
    { id: 1, label: 'گزینه اول', value: 1 },
    { id: 2, label: 'گزینه دوم', value: 2 },
    { id: 3, label: 'گزینه سوم', value: 3 },
    { id: 4, label: 'گزینه چهارم', value: 4 },
  ];
  const cardTest = React.createRef();

  let classWrapper = '';
  let classQuestion = '';
  let classAnswerWrapper = '';
  let classAnswers = '';
  if (props.styleVal === 1) {
    classWrapper = ' flex-column ';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12';
    classAnswers = ' col-lg-2';
  } else if (props.styleVal === 2) {
    classWrapper = ' flex-column ';
    classQuestion = '   col-12';
    classAnswerWrapper = ' col-12 ';
    classAnswers = ' col-lg-5';
  } else {
    classWrapper = ' flex-column';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12  flex-column px-md-3';
    classAnswers = ' col-lg-11 card-subtitle-minHeight';
  }

  React.useEffect(() => {
    return () => {
      updateQuestion('');
      updateAnswer1('');
      updateAnswer2('');
      updateAnswer3('');
      updateAnswer4('');
    };
  }, [props.selectedTest]);

  return (
    <div className="container border_pre_custom px-0 px-md-1 position-relative">
      <Card className="test_pre_custom_bg">
        {/* <div>
          <MathJax.Context input="ascii">
            <div>
              This is an inline formula written in AsciiMath:{' '}
              <MathJax.Node inline>{ascii} (x+a)^n=∑_(k=0)^n </MathJax.Node>
            </div>
          </MathJax.Context>
        </div> */}
        {/* Test Num */}
        {props.editMode ? (
          <Label className="row mt-3 px-5">
            تست شماره {props.selectedTest.rowNumber}
          </Label>
        ) : props.testNewNum ? (
          <Label className="row mt-3 px-5">
            تست جدید شماره {props.testNewNum.rowNumber + 1}
          </Label>
        ) : (
          <Label className="row mt-3 px-5">تست جدید</Label>
        )}
        {props.editMode ? (
          <>
            <Tooltip
              title={
                props.disableNext ? (
                  <span>تست قبلی وجود ندارد</span>
                ) : (
                  <span>تست قبلی</span>
                )
              }
              arrow
            >
              <NavigateNextIcon
                onClick={props.disableNext ? '' : props.selectedTestNext}
                className="btn-preview btn-preview-next"
                style={
                  props.disableNext
                    ? { color: 'gray', cursor: 'default' }
                    : { color: 'black', cursor: 'pointer' }
                }
              />
            </Tooltip>
            <Tooltip
              title={
                props.disablePrev ? (
                  <span>تست بعدی وجود ندارد</span>
                ) : (
                  <span>تست بعدی</span>
                )
              }
              arrow
            >
              <NavigateBeforeIcon
                onClick={props.disablePrev ? '' : props.selectedTestPrev}
                className="btn-preview btn-preview-prev"
                style={
                  props.disablePrev
                    ? { color: 'gray', cursor: 'default' }
                    : { color: 'black', cursor: 'pointer' }
                }
              />
            </Tooltip>
          </>
        ) : null}
        <CardBody
          innerRef={cardTest}
          className={`d-flex flex-wrap${classWrapper} pt-4 pb-5`}
          key={id !== -1 ? props.selectedTest : id}
        >
          <div className={` ${classQuestion} d-flex p-0 px-md-1`}>
            <CardTitle
              className={` col-11 card_test_pre_title d-flex flex-wrap`}
              onClick={e => showTextAnswerEditor(e, 0)}
            >
              {props.selectedTest ? (
                props.selectedTest.questionName !== null &&
                props.selectedTest.questionName !== '' ? (
                  parse(props.selectedTest.questionName)
                ) : (
                  <p>سوال خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p> سوال خود را اینجا وارد نمائید</p>
              )}
            </CardTitle>
          </div>
          <div
            className={` d-flex flex-wrap align-items-start ${classAnswerWrapper} px-md-1`}
          >
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title d-flex flex-wrap`}
              onClick={e => showTextAnswerEditor(e, 1)}
            >
              {props.selectedTest ? (
                props.selectedTest.answer1 !== null &&
                props.selectedTest.answer1 !== '' ? (
                  parse(props.selectedTest.answer1)
                ) : (
                  <p>گزینه اول خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p>گزینه اول خود را اینجا وارد نمائید</p>
              )}
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title d-flex flex-wrap`}
              onClick={e => showTextAnswerEditor(e, 2)}
            >
              {props.selectedTest ? (
                props.selectedTest.answer2 !== null &&
                props.selectedTest.answer2 !== '' ? (
                  parse(props.selectedTest.answer2)
                ) : (
                  <p>گزینه دوم خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p>گزینه دوم خود را اینجا وارد نمائید</p>
              )}
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title d-flex flex-wrap`}
              onClick={e => showTextAnswerEditor(e, 3)}
            >
              {props.selectedTest ? (
                props.selectedTest.answer3 !== null &&
                props.selectedTest.answer3 !== '' ? (
                  parse(props.selectedTest.answer3)
                ) : (
                  <p>گزینه سوم خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p> گزینه سوم خود را اینجا وارد نمائید</p>
              )}
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title d-flex`}
              onClick={e => showTextAnswerEditor(e, 4)}
            >
              {props.selectedTest ? (
                props.selectedTest.answer4 !== null &&
                props.selectedTest.answer4 !== '' ? (
                  parse(props.selectedTest.answer4)
                ) : (
                  <p>گزینه چهارم خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p> گزینه چهارم خود را اینجا وارد نمائید</p>
              )}
            </CardSubtitle>
          </div>
          <Row
            className="col-12 my-2 px-1 mx-0"
            key={
              props.selectedTest
                ? props.selectedTest.trueAnswer
                : props.selectedTest
            }
          >
            <Select
              closeMenuOnSelect={true}
              required
              name="answer-select"
              id="answer-select"
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              className={
                'direction-right w-100 col-md-11 mt-2 text-right mx-auto'
              }
              placeholder="گزینه درست را انتخاب کنید..."
              options={trueAnswer}
              defaultValue={
                props.selectedTest
                  ? trueAnswer.find(
                      item => item.id === props.selectedTest.trueAnswer,
                    )
                  : ''
              }
              ref={TrueAnswer}
              onChange={e => updateTrueAnswer(e.value)}
            />
          </Row>
          {/*   Answere Files  */}
          <FileUpload
            editMode={props.editMode}
            selectedTest={props.selectedTest}
            TestMasterId={
              props.selectedTest ? props.selectedTest.pkTestMaster : null
            }
            updateFiles={props.updateFiles}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PreviewTest;
