import React, { useEffect } from 'react';
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
import FileBase64 from 'react-file-base64';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

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
    const isFinishConvert =
      IsFinishValue === false ? 0 : IsFinishValue === true ? 1 : IsFinishValue;
    const TestBookId =
      props.testBookSetting && props.testBookSetting.fldPkTestBook
        ? props.testBookSetting.fldPkTestBook
        : -1;
    const TopicId = FkTopic.current.state.value.id;
    const Duration = quizTime;
    const IsFinish = isFinishConvert;
    const Coverbase64 = coverFile !== '' ? coverFile.base64 : '';
    const format = coverFile !== '' ? coverFile.type.split('/')[1] : '';
    // Send Data
    const getSettingModal = {
      TestBookId,
      TopicId,
      Duration,
      IsFinish,
      Coverbase64,
      format,
    };
    props.getSettingModal(getSettingModal);
    setTimeout(() => {
      form.current.reset();
      props.dispatch(apiActions.getDashboard());
      props.toggle();
    }, 10);
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
      updateCoverFile('');
    }
  }, [props.testBookSetting]);

  // Upload Cover
  const fileUpload = React.createRef();
  const [coverFile, updateCoverFile] = React.useState('');
  const getFiles = file => {
    if (!file.type.includes('image')) {
      alertify.error('فایل باید عکس باشد');
      return;
    }
    if (file.file.size > 999999) {
      alertify.error('فایل حداکثر باید 1 مگابایت باشد');
      return;
    }
    updateCoverFile(file);
  };
  useEffect(() => {
    if (fileUpload.current) {
      fileUpload.current._reactInternalFiber.child.stateNode.setAttribute(
        'id',
        'fileUpload',
      );
      fileUpload.current._reactInternalFiber.child.stateNode.setAttribute(
        'style',
        'display : none',
      );
    }
  });
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
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

          <FormGroup className="d-flex mt-4">
            <FileBase64
              multiple={false}
              onDone={getFiles}
              id="fileUpload"
              ref={fileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="fileUpload" className="d-flex align-items-center">
              <span
                className="btn btn-small btn-outline-primary btn-upload cursor-pointer mb-2"
                style={{ fontSize: '0.84rem' }}
              >
                آپلود جلد کتاب
              </span>
              <Tooltip
                className="text-primary p-1 mb-auto"
                style={{ marginRight: '10px' }}
                title={
                  <p className="tooltip-table">
                    <span>1) حجم عکس باید از 1 مگابایت کمتر باشد</span>
                    <br></br>
                    <span>
                      2) پیشنهاد میشود سایز عکس 1200 در 1200 پیکسل باشد
                    </span>
                  </p>
                }
              >
                <IconButton
                  aria-label="info"
                  // onClick={() => handleClickOpen(row)}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <span className="mx-2">
                {coverFile && coverFile !== '' ? (
                  coverFile.name
                ) : props.testBookSetting && props.testBookSetting.cover ? (
                  <span>عکس قبلا آپلود شده است</span>
                ) : (
                  ''
                )}
              </span>
            </label>
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
                    props.testBookSetting.isFinish === 1
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
              <Button
                color="primary"
                className="ml-2 rounded"
                onClick={submit}
                disabled={
                  props.testBookSetting && props.testBookSetting.isFinish === 1
                    ? true
                    : false
                }
              >
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
