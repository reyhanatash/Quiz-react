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
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const format = 'HH:mm';

function DashboardPageModal(props) {
  let loadTopicSetting = [];
  if (props.loadTopicSetting) {
    props.loadTopicSetting.forEach(data => {
      loadTopicSetting.push({
        id: data.pkTopic,
        label: data.topicName,
        value: data.topicName,
      });
    });
  }

  const form = React.createRef();
  const FkTopic = React.createRef();
  const quizTimeRef = React.createRef();

  const submit = e => {
    console.log(props.testBookId);
    console.log(quizTime);
    console.log(FkTopic.current.state.value.id);
    console.log(IsFinishValue);
    const pkSetting =
      props.testBookSetting && props.testBookSetting.pkSetting
        ? props.testBookSetting.pkSetting
        : -1;
    const TopicId = FkTopic.current.state.value.id;
    const Duration = quizTime;
    const IsFinish = IsFinishValue;
    // Send Data
    const getSettingModal = {
      pkSetting,
      TopicId,
      Duration,
      IsFinish,
    };
    props.getSettingModal(getSettingModal);
    setTimeout(() => {
      form.current.reset();
      props.dispatch(apiActions.getDashboard());
      props.toggle();
    }, 10);

    // Get Multi Select Value
    // let FkMajorVals = [];
    // if (FkMajor.current.state.value.length !== 0) {
    //   FkMajor.current.state.value.forEach(item => {
    //     FkMajorVals.push(item.id);
    //   });
    // }
  };

  const [quizTime, setQuizTime] = React.useState('');
  const [IsFinishValue, setIsFinish] = React.useState(false);
  const handleChange = name => event => {
    setIsFinish(event.target.checked);
  };
  React.useEffect(() => {
    if (props.testBookSetting) {
      if (props.testBookSetting.randomeQuizDuration !== null) {
        setQuizTime(props.testBookSetting.randomeQuizDuration);
      } else {
        setQuizTime('');
      }
      if (props.testBookSetting.isFinish !== null) {
        setIsFinish(props.testBookSetting.isFinish);
      } else {
        setIsFinish(false);
      }
    }
  }, [props.testBookSetting]);

  return (
    <Modal
      isOpen={props.isOpen}
      //  toggle={props.toggle}
    >
      <ModalHeader>تنظیمات کتاب</ModalHeader>
      <ModalBody>
        {/* Forms */}
        <Form innerRef={form}>
          <FormGroup className="d-flex flex-column">
            <Label htmlFor="booksname">زمان آزمون تصادفی </Label>
            <TimePicker
              placeholder="دقیقه : ساعت"
              defaultValue={
                props.testBookSetting &&
                props.testBookSetting.randomeQuizDuration !== null
                  ? moment(props.testBookSetting.randomeQuizDuration, format)
                  : null
              }
              format={format}
              onChange={(time, timeString) => setQuizTime(timeString)}
              defaultOpenValue={moment('03:30', format)}
              // key={reload}
              ref={quizTimeRef}
              className="py-1"
            />
          </FormGroup>

          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              انتخاب مبحث رایگان
            </div>
            <Select
              key={loadTopicSetting}
              defaultValue={
                props.testBookSetting && props.testBookSetting.fkTopic !== null
                  ? loadTopicSetting.find(
                      opt => opt.id === props.testBookSetting.fkTopic,
                    )
                  : ''
              }
              required
              name="section-select"
              id="section-select"
              ref={FkTopic}
              className={'direction-right'}
              //   closeMenuOnSelect={false}
              //   isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={loadTopicSetting}
            />
          </FormGroup>
          <FormGroup className="d-flex flex-row align-items-center my-1">
            <Label htmlFor="checkedComplete" className="cursor-pointer">
              نهایی کردن کتاب
            </Label>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    props.testBookSetting &&
                    props.testBookSetting.isFinish === true
                      ? true
                      : false
                  }
                  onChange={handleChange('checkedComplete')}
                  value="checkedComplete"
                  id="checkedComplete"
                  color="primary"
                />
              }
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <ButtonGroup className="d-flex">
              <Button color="primary" className="ml-2 rounded" onClick={submit}>
                {props.isEditing ? 'ذخیره' : 'ذخیره'}
              </Button>{' '}
              <Button
                color="secondary"
                className="rounded"
                onClick={props.toggle}
              >
                لغو
              </Button>
            </ButtonGroup>
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
