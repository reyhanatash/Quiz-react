import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { apiActions } from '../../_actions';
import alertify from 'alertifyjs';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import ShuffleIcon from '@material-ui/icons/Shuffle';

function DashboardPageModal(props) {
  // Options Quiz
  const [showQuiz, setShowQuiz] = React.useState(null);
  React.useEffect(() => {
    return () => {
      setShowQuiz(null);
    };
  }, [props.isOpen]);
  // Load Test Book Chapter
  let loadTestBookChapter = [];
  if (props.loadTestBookChapter) {
    props.loadTestBookChapter.forEach(data => {
      loadTestBookChapter.push({
        id: data.pkChapterTestBook,
        label: data.chapterTestBookName,
        value: data.chapterTestBookName,
      });
    });
  }
  // Load Quiz
  let loadQuizOptions = [];
  if (props.loadQuiz) {
    props.loadQuiz.forEach(data => {
      loadQuizOptions.push({
        id: data.fldPkQuizMaster,
        label: data.quizName,
        value: data.quizName,
        duration: data.duration,
      });
    });
  }

  const Fkbook = React.createRef();
  const FkTest = React.createRef();
  const form = React.createRef();
  const [duration, setDuration] = React.useState('');
  // Study
  const submitStudy = e => {
    if (props.modalRole === 1) {
      // Validation
      if (!Fkbook.current.state.value) {
        alertify.error('انتخاب فصل کتاب تست اجباری میباشد');
        return;
      }
      // Send Data
      const getBookModal = {
        MasterId: 0,
        ChapterId: Fkbook.current.state.value.id,
        Action: 6,
        name: Fkbook.current.state.value.label,
      };
      props.goToStudyPage(getBookModal);
      setTimeout(() => {
        props.toggle();
      }, 10);
    }
  };
  // Quiz
  const submitQuiz = e => {
    if (props.modalRole === 2) {
      // Validation
      if (showQuiz === null) {
        alertify.error('انتخاب نوع آزمون اجباری میباشد');
        return;
      }
      if (showQuiz === true && !FkTest.current.state.value) {
        alertify.error('انتخاب آزمون اجباری میباشد');
        return;
      }
      // Send Data
      const getBookModal = {
        MasterId: 0,
        QuizId: showQuiz === true ? FkTest.current.state.value.id : 0,
        Action: 1,
        name:
          showQuiz === true ? FkTest.current.state.value.label : 'آزمون تصادفی',
        duration: showQuiz === true ? duration : '01:00',
        isRandom: showQuiz === true ? null : 1,
        TestBookId: showQuiz === true ? null : props.TestBookId,
      };
      props.goToStartTest(getBookModal);
      setTimeout(() => {
        props.toggle();
      }, 10);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      //  toggle={props.toggle}
      style={{ maxWidth: '700px' }}
    >
      <ModalHeader>
        {props.modalRole === 2 ? 'انتخاب نوع آزمون' : 'انتخاب فصل مطالعه'}
      </ModalHeader>
      <ModalBody>
        {/* Forms */}
        <Form innerRef={form}>
          <FormGroup className="mt-4 d-flex flex-wrap">
            {props.modalRole === 2 ? (
              <>
                <FormGroup
                  check
                  className="col-sm-12 col-md-6 mb-2 col-lg-6 selectBox-wrapper pr-0 d-flex justify-content-center flex-wrap"
                >
                  <Label
                    className="mb-0 col-12"
                    check
                    onClick={() => setShowQuiz(true)}
                  >
                    <div
                      className={`selectBox-quiz border w-100 bg-light d-flex flex-wrap flex-column align-items-center justify-content-center${
                        showQuiz === true ? ' selectBox-quiz-selected' : null
                      }`}
                    >
                      <FilterNoneIcon
                        className={'text-info'}
                        style={{ fontSize: '55px' }}
                      />
                      <span className="mt-2 text-info"> ساخته شده</span>
                    </div>
                    {/* <Input type="radio" name="radio1" /> */}
                  </Label>
                </FormGroup>
                <FormGroup
                  check
                  className="col-sm-12 col-md-6 col-lg-6 selectBox-wrapper pr-0 d-flex justify-content-center flex-wrap"
                >
                  <Label
                    className="mb-0 col-12"
                    check
                    onClick={() => setShowQuiz(false)}
                  >
                    <div
                      className={`selectBox-quiz border w-100 bg-light d-flex flex-wrap flex-column align-items-center justify-content-center${
                        showQuiz === false ? ' selectBox-quiz-selected' : null
                      }`}
                    >
                      <ShuffleIcon
                        className={'text-info'}
                        style={{ fontSize: '55px' }}
                      />
                      <span className="mt-2 text-info"> تصادفی</span>
                    </div>
                    {/* <Input type="radio" name="radio1" /> */}
                  </Label>
                </FormGroup>

                <FormGroup
                  className="my-3 pb-4 col-12"
                  style={
                    showQuiz
                      ? {
                          visibility: 'visible',
                          opacity: '1',
                          transition: '0.4s',
                        }
                      : {
                          visibility: 'hidden',
                          opacity: '0',
                          transition: '0.4s',
                        }
                  }
                >
                  <div
                    className="custom-select-react-label mb-2"
                    htmlFor="section-select"
                  >
                    <span className="validation-red">* &nbsp;</span>
                    آزمون
                  </div>
                  <Select
                    key={loadQuizOptions}
                    closeMenuOnSelect={true}
                    required
                    name="section-select"
                    id="section-select"
                    ref={FkTest}
                    className={'direction-right'}
                    noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                    placeholder="انتخاب کنید..."
                    options={loadQuizOptions}
                    onChange={val => setDuration(val.duration)}
                  />
                </FormGroup>
              </>
            ) : (
              <FormGroup className="my-3 pb-4 col-12">
                <div
                  className="custom-select-react-label mb-2"
                  htmlFor="section-select"
                >
                  <span className="validation-red">* &nbsp;</span>
                  مطالعه از فصل کتاب تست
                </div>
                <Select
                  key={loadTestBookChapter}
                  closeMenuOnSelect={true}
                  required
                  name="section-select"
                  id="section-select"
                  ref={Fkbook}
                  className={'direction-right'}
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  placeholder="انتخاب کنید..."
                  options={loadTestBookChapter}
                />
              </FormGroup>
            )}
            {/* Buttons */}
            {props.modalRole === 2 ? (
              <FormGroup className="mt-4 col-12">
                <ButtonGroup className="d-flex">
                  <Button
                    color="primary"
                    className="ml-2 rounded"
                    onClick={submitQuiz}
                  >
                    شروع آزمون
                  </Button>
                  <Button
                    color="secondary"
                    className="rounded"
                    onClick={props.toggle}
                  >
                    بازگشت
                  </Button>
                </ButtonGroup>
              </FormGroup>
            ) : (
              <FormGroup className="mt-4 col-12">
                <ButtonGroup className="d-flex">
                  <Button
                    color="primary"
                    className="ml-2 rounded"
                    onClick={submitStudy}
                  >
                    شروع مطالعه
                  </Button>
                  <Button
                    color="secondary"
                    className="rounded"
                    onClick={props.toggle}
                  >
                    بازگشت
                  </Button>
                </ButtonGroup>
              </FormGroup>
            )}

            {/* <ButtonGroup className="d-flex">
              <Button color="info" className="ml-2 rounded" onClick={submit}>
                <AddIcon className={''} />
              </Button>
              <Button
                color="secondary"
                className="rounded"
                onClick={props.toggle}
              >
                <FilterListIcon className={''} />
              </Button>
            </ButtonGroup> */}
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    editData: state.api.selectedItem,
    getDashboard: state.api.dashboard,
  };
}

export default connect(mapStateToProps)(DashboardPageModal);
