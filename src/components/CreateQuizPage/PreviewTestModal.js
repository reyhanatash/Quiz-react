import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
} from 'reactstrap';
import parse from 'html-react-parser';

function PreviewTestModal(props) {
  let classWrapper = '';
  let classQuestion = '';
  let classAnswerWrapper = '';
  let classAnswers = '';
  if (props.styleNum === 1) {
    classWrapper = ' flex-column ';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12';
    classAnswers = ' col-lg-2';
  } else if (props.styleNum === 2) {
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

  return (
    <div
      className="container border_pre_custom  position-relative"
      style={{ overflowY: 'auto' }}
    >
      <Card className="test_pre_custom_bg">
        {/* <div>
          <MathJax.Context input="ascii">
            <div>
              This is an inline formula written in AsciiMath:{' '}
              <MathJax.Node inline>{ascii} (x+a)^n=∑_(k=0)^n </MathJax.Node>
            </div>
          </MathJax.Context>
        </div> */}
        <Label className="row mt-3 px-5">
          {/* تست شماره {props.selectedTest.rowNumber} */}
        </Label>
        <CardBody
          className={`d-flex flex-wrap${classWrapper} pt-4 pb-5`}
          //   key={id !== -1 ? props.selectedTest : id}
        >
          <div className={` ${classQuestion} d-flex p-0 px-md-1`}>
            <CardTitle
              className={` col-11 card_test_pre_title d-flex flex-wrap`}
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
          ></Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default PreviewTestModal;
