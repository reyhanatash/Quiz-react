import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroupItem,
} from 'reactstrap';
import AddTestFormRangeSlider from 'components/AddTestPage/AddTestFormRangeSlider';
import AddNewTestEditor from '../../components/AddTestPage/AddNewTestEditor';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import BookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import PreviewTest from '../../components/AddTestPage/PreviewTest';
import alertify from 'alertifyjs';
import Select from 'react-select';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AnimateGroup } from 'react-animation';
import { animations } from 'react-animation';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InlineConfirmButton from 'react-inline-confirm';

function AddTestForm(props) {
  const [editing, updateEditing] = React.useState(true);
  const [sliderVal, updateSliderVal] = React.useState(5);
  const [editorText, updateEditorText] = React.useState('');
  const [html, updateHtml] = React.useState('');
  const [titleEditor, updateTitle] = React.useState('');
  const [initValue, updateInitValue] = React.useState('');
  const [showEditor, updateShowEditor] = React.useState(false);
  const [testTitle, updateTestTitle] = React.useState('');
  const [disableTestTitle, UpdateDisableTestTitle] = React.useState(true);

  //////////////////////////////////////////// Books Options //////////////////////////////////////////////
  let bookChapterOption = [];
  if (props.bookChapterData) {
    props.bookChapterData.forEach(data => {
      bookChapterOption.push({
        id: data.fldPkBookChapter,
        label: data.fldBookChapterName,
        value: data.fldBookChapterName,
      });
    });
  }
  ///////////////////////////////////////// Tests Options ///////////////////////////////////////////////
  let testBookChapterOption = [];
  if (props.testBookChapterData) {
    props.testBookChapterData.forEach(data => {
      testBookChapterOption.push({
        id: data.pkChapterTestBook,
        label: data.chapterTestBookName,
        value: data.chapterTestBookName,
      });
    });
  }
  ///////////////////////////////////////// SubBook Options  /////////////////////////////////////////////
  let subBookOptions = [];
  if (props.loadSubBookOptions) {
    props.loadSubBookOptions.forEach(data => {
      subBookOptions.push({
        id: data.fldPkSubBookChapter,
        label: data.fldName,
        value: data.fldName,
      });
    });
  }
  ///////////////////////////////////////// Topic Options  ///////////////////////////////////////////////
  let TopicOptions = [];
  if (props.loadTopicOptions) {
    props.loadTopicOptions.forEach(data => {
      TopicOptions.push({
        id: data.fldPkTopic,
        label: data.fldName,
        value: data.fldName,
      });
    });
  }

  ///////////////////////////////////////// Hashtags Trend //////////////////////////////////////////////
  const [loadHashtagTrend, updateloadHashtagTrend] = React.useState([]);
  const [defaultHashtagTrend, updatedefaultHashtagTrend] = React.useState([]);
  React.useEffect(() => {
    if (props.loadHashtagTrend) {
      let trends = [];
      props.loadHashtagTrend.forEach(hashtag => {
        trends.push({
          hashtagName: hashtag.hashtagName,
          pkHashtag: hashtag.pkHashtag,
          tedad: hashtag.tedad,
        });
      });
      updateloadHashtagTrend(trends);
      updatedefaultHashtagTrend(trends);
    }
  }, [props.loadHashtagTrend, props.editMode, props.selectedTest]);

  ///////////////////////////////////////// Add Hashtag Trend to Hashtags ///////////////////////////////
  const hashtagTrend = React.createRef();
  const addHashtagTrend = (e, name) => {
    e.preventDefault();
    const newhashtags = [...hashtags];
    newhashtags.push(name);
    hashtagsUpdate(newhashtags);
    ///////////////////////////////////////// Remove from Trend /////////////////////////////////////////
    const newhashtagsTrend = [...loadHashtagTrend];
    const find = newhashtagsTrend.findIndex(item => item.hashtagName === name);
    newhashtagsTrend.splice(find, 1);
    updateloadHashtagTrend(newhashtagsTrend);
  };

  const bookTestId = testBookChapterOption.map(item => {
    testBookChapterOption.find(opt => opt.id === Number(item.id));
    return item.id;
  });

  ///////////////////////////////////////// Get Slider Value ////////////////////////////////////////////
  const getValueSlider = val => {
    updateSliderVal(val);
  };
  ///////////////////////////////////////// Adding Hashtag //////////////////////////////////////////////
  const hashtagWrapper = React.createRef();
  const hashtagVal = React.createRef();
  const [hashtags, hashtagsUpdate] = useState([]);
  const addHashtag = e => {
    e.preventDefault();
    if (hashtagVal.current.value !== '') {
      const newhashtags = [...hashtags];
      newhashtags.push(hashtagVal.current.value);
      hashtagsUpdate(newhashtags);
    }
    hashtagVal.current.value = '';
  };
  React.useEffect(() => {
    if (
      props.selectedTest &&
      props.editMode &&
      props.selectedTest.hashtag !== ''
    ) {
      hashtagsUpdate(props.selectedTest.hashtag.split(','));
    }
    if (
      props.selectedTest &&
      props.editMode &&
      props.selectedTest.hashtag === ''
    ) {
      hashtagsUpdate('');
    }
    if (props.editMode === false) {
      hashtagsUpdate('');
    }
    /////////////////////////////////////// Remove Duplicated when edit //////////////////////////////////
    if (props.selectedTest && props.editMode) {
      let filtered = [];
      filtered = props.loadHashtagTrend.filter(
        val => !props.selectedTest.hashtag.split(',').includes(val.hashtagName),
      );
      updateloadHashtagTrend(filtered);
    }
  }, [props.editMode, props.selectedTest]);
  ///////////////////////////////////// Deleting Hashtag ////////////////////////////////////////////////
  const deleteHashtag = (e, name) => {
    e.preventDefault();
    const newhashtags = [...hashtags];
    const find = newhashtags.findIndex(item => item === name);
    const findTrend = defaultHashtagTrend.find(
      item => item.hashtagName === name,
    );

    if (props.editMode) {
      const findDuplicate = loadHashtagTrend.findIndex(
        item => item.hashtagName === name,
      );
      if (findTrend !== undefined && findDuplicate === -1) {
        let trends = [...loadHashtagTrend];
        trends.unshift(findTrend);
        updateloadHashtagTrend(trends);
      }
    } else {
      if (findTrend !== undefined) {
        let trends = [...loadHashtagTrend];
        trends.unshift(findTrend);
        updateloadHashtagTrend(trends);
      }
    }
    newhashtags.splice(find, 1);
    hashtagsUpdate(newhashtags);
  };
  ////////////////////////////////////////// Style Select ///////////////////////////////////////////////////
  const [styleVal, updateStyleVal] = React.useState(2);
  const getStyle = num => {
    updateStyleVal(num);
  };
  React.useEffect(() => {
    if (props.selectedTest && props.selectedTest.fldTemplate === 1) {
      updateStyleVal(1);
    } else if (props.selectedTest && props.selectedTest.fldTemplate === 2) {
      updateStyleVal(2);
    } else if (props.selectedTest && props.selectedTest.fldTemplate === 3) {
      updateStyleVal(3);
    }
  }, [props.selectedTest]);
  /////////////////////////////////////// Form Data /////////////////////////////////////////////////////////
  const bookChapterVal = React.createRef();
  const testChapterVal = React.createRef();
  const subBookVal = React.createRef();
  const TopicVal = React.createRef();
  const form = React.createRef();
  const testName = React.createRef();
  const [dataPreview, updatePreview] = useState({});
  const [files, updateFiles] = useState([]);
  React.useEffect(() => {
    if (sliderVal !== undefined && props.selectedTest === null) {
      updateSliderVal(sliderVal);
    } else {
      if (props.selectedTest) {
        updateSliderVal(props.selectedTest.fldLevel);
      } else {
        updateSliderVal(5);
      }
    }
  }, [props.selectedTest, props.editMode]);
  const formData = e => {
    e.preventDefault();
    // bookChapterVal.current.state.value.value = '';
    // if (props.selectedTest === null) {
    //   props.selectedTest.name = 'این تست فاقد سوال می باشد';
    // }
    const { HTML, Ans1, Ans2, Ans3, Ans4, TrueAns, Name } = dataPreview;
    const data = {
      id: props.selectedTest ? props.selectedTest.pkTestMaster : -1,
      FkTestBook: props.selectedItem.fldPkTestBook,
      FkTestBookChapter: testChapterVal.current.state.value.id,
      FkBookChapter:
        bookChapterVal.current.state.value === null
          ? undefined
          : bookChapterVal.current.state.value.id,
      Level: sliderVal,
      Template: styleVal,
      Name: testName.current.value,
      HTML: HTML === '<p><br data-cke-filler="true"></p>' ? '' : HTML,
      Ans1: Ans1 === '<p><br data-cke-filler="true"></p>' ? '' : Ans1,
      Ans2: Ans2 === '<p><br data-cke-filler="true"></p>' ? '' : Ans2,
      Ans3: Ans3 === '<p><br data-cke-filler="true"></p>' ? '' : Ans3,
      Ans4: Ans4 === '<p><br data-cke-filler="true"></p>' ? '' : Ans4,
      TrueAns: TrueAns,
      Hashtag: hashtags.toLocaleString(),
      FkSubBookChapter:
        subBookVal.current.state.value === null
          ? undefined
          : subBookVal.current.state.value.id,
      FkTopic:
        TopicVal.current.state.value === null
          ? undefined
          : TopicVal.current.state.value.id,
      files: files,
    };
    if (data.FkBookChapter === undefined) {
      alertify.error('فیلد فصل کتاب درسی اجباری است');
    }
    if (data.FkTestBookChapter === undefined) {
      alertify.error('فیلد فصل کتاب تست اجباری است');
    }
    if (data.Level === undefined) {
      alertify.error('سطح سوال تست اجباری است');
    }
    if (
      data.FkBookChapter !== undefined &&
      data.FkTestBookChapter !== undefined &&
      data.Level !== undefined &&
      props.keepEditing === false
    ) {
      console.log(data);
      props.addTestMaster(data);
      form.current.reset();
      hashtagsUpdate('');
      updateStyleVal(2);
      updateShowEditor(false);
      updateTestTitle('');
      props.resetTest();
      UpdateToggleSubBook(false);
      updateEditSubBook(false);
      updateSelectedSubBook(null);
      UpdateToggleTopic(false);
      updateEditTopic(false);
      updateSelectedTopic(null);
    }
    if (
      data.FkBookChapter !== undefined &&
      data.FkTestBookChapter !== undefined &&
      data.Level !== undefined &&
      props.keepEditing === true
    ) {
      console.log(data);
      props.addTestMaster(data);
    }
  };

  /////////////////////////////////////// Test Title ////////////////////////////////////////////////////////
  React.useEffect(() => {
    UpdateDisableTestTitle(true);
    if (props.editMode === true) {
      if (props.selectedTest.name !== null || props.selectedTest.name !== '') {
        updateTestTitle(props.selectedTest.name);
      } else {
        updateTestTitle('تست فاقد عنوان نمایش تست میباشد');
      }
    }
    updateShowEditor(false);
  }, [props.selectedTest, props.editMode]);
  // const [SelectKey, updateSelectKey] = React.useState('');
  // React.useEffect(() => {
  //   updateSelectKey(Math.floor(Math.random() * 20));
  // }, [props.dropdownOpen]);

  /////////////////////////////////// SubBook /////////////////////////////////////////////////////////////
  const subBookTitle = React.createRef();
  const [bookChapterId, updateBookChapterId] = React.useState(0);
  const [selectedSubBook, updateSelectedSubBook] = React.useState(null);
  const [editSubBook, updateEditSubBook] = React.useState(false);
  const [toggleSubBook, UpdateToggleSubBook] = React.useState(false);
  const [subBookAdded, UpdateSubBookAdded] = React.useState(false);
  const addSubBook = e => {
    if (bookChapterVal.current.state.value === null) {
      alertify.error('ابتدا فصل کتاب درسی را انتخاب کنید');
      return;
    }
    e.preventDefault();
    const data = {
      id: editSubBook ? selectedSubBook.id : -1,
      BookChapterId: bookChapterId,
      Name: subBookTitle.current.value,
    };
    props.addSubBook(data);
    UpdateToggleSubBook(false);
    updateEditSubBook(true);
    updateSelectedSubBook(null);
    UpdateSubBookAdded(true);
  };

  useEffect(() => {
    if (props.loadSubBookOptions && subBookAdded === true) {
      updateEditSubBook(true);
      updateSelectedSubBook(subBookOptions[subBookOptions.length - 1]);
      updateSubBookId(subBookOptions[subBookOptions.length - 1].id);
    }
  }, [props.loadSubBookOptions]);
  /////////////////////////////////////// Topic /////////////////////////////////////////////////////////////
  const TopicTitle = React.createRef();
  const [subBookId, updateSubBookId] = React.useState(0);
  const [selectedTopic, updateSelectedTopic] = React.useState(null);
  const [editTopic, updateEditTopic] = React.useState(false);
  const [toggleTopic, UpdateToggleTopic] = React.useState(false);
  const [topicAdded, UpdateTopicAdded] = React.useState(false);
  const addTopic = e => {
    if (
      subBookVal.current.state.value === null ||
      subBookVal.current.state.value === ''
    ) {
      alertify.error('ابتدا زیر فصل کتاب درسی را انتخاب کنید');
      return;
    }
    e.preventDefault();
    const data = {
      id: editTopic ? selectedTopic.id : -1,
      SubBookId: subBookId,
      Name: TopicTitle.current.value,
    };
    props.addTopic(data);
    UpdateToggleTopic(false);
    updateEditTopic(false);
    updateSelectedTopic(null);
    UpdateToggleSubBook(false);
    UpdateTopicAdded(true);
  };
  useEffect(() => {
    if (props.loadTopicOptions && topicAdded === true) {
      updateEditTopic(true);
      updateSelectedTopic(TopicOptions[TopicOptions.length - 1]);
    }
  }, [props.loadTopicOptions]);
  /////////////////////////////////// Load SubBook And Topic When Edit //////////////////////////////////////
  React.useEffect(() => {
    UpdateToggleSubBook(false);
    UpdateToggleTopic(false);
    updateEditTopic(false);
    updateSelectedTopic(null);
    updateEditSubBook(false);
    updateSelectedSubBook(null);
    UpdateTopicAdded(false);
    UpdateSubBookAdded(false);
  }, [props.editMode, props.selectedTest]);
  React.useEffect(() => {
    if (props.selectedTest && props.editMode === true) {
      const findSubBook = subBookOptions.find(
        opt => opt.id === props.selectedTest.fldFkSubBookChapter,
      );
      if (findSubBook !== undefined && editSubBook === false) {
        updateSelectedSubBook(findSubBook);
        updateEditSubBook(true);
        updateBookChapterId(props.selectedTest.fldPkBookChapter);
        updateSubBookId(props.selectedTest.fldPkSubBookChapter);
      }
      const findTopic = TopicOptions.find(
        opt => opt.id === props.selectedTest.fldFkTopic,
      );
      if (findTopic !== undefined && editTopic === false) {
        updateSelectedTopic(findTopic);
        updateEditTopic(true);
        updateSubBookId(props.selectedTest.fldPkSubBookChapter);
      }
    }
  }, [props.selectedTest, props.loadSubBookOptions, props.loadTopicOptions]);

  ///////////////////////////// SubBook And Topic Delete Option //////////////////////////////////////////
  const textValues = ['', ' حذف شود ؟', ''];

  // Next And Prev Effect
  React.useEffect(() => {
    updateShowEditor(false);
  }, [props.selectedTestNext, props.selectedTestPrev]);

  ////////////////////////////////////// Expand Topic //////////////////////////////////////////////
  const [expandSubBook, updateExpandSubBook] = React.useState(false);
  const expandSubBookHandler = e => {
    e.stopPropagation();
    updateExpandSubBook(!expandSubBook);
  };
  useEffect(() => {
    if (props.selectedTest && props.selectedTest.fldFkSubBookChapter !== 0) {
      updateExpandSubBook(true);
    } else {
      updateExpandSubBook(false);
    }
  }, [props.selectedTest]);
  return (
    <Form
      className="add-test-from p-3 position-relative mt-md-4 mt-5"
      innerRef={form}
    >
      <div className="ui segment label-test">
        <span className="ui bg-secondary text-white right ribbon label">
          <BookIcon />
          {` کتاب ${props.selectedItem ? props.selectedItem.testBookName : ''}`}
        </span>
      </div>
      <ListGroupItem
        tag="button"
        action
        className="border-light order-12 direction-right mt-1 mb-4"
        onClick={e => {
          e.preventDefault();
          form.current.reset();
          hashtagsUpdate('');
          updateStyleVal(2);
          updateShowEditor(false);
          props.resetTest();
          updateEditing(false);
          props.checkKeepEditing(false);
          UpdateToggleSubBook(false);
          UpdateToggleTopic(false);
          updateEditTopic(false);
          updateSelectedTopic(null);
          updateEditSubBook(false);
          updateSelectedSubBook(null);
          UpdateSubBookAdded(false);
          UpdateTopicAdded(false);
        }}
      >
        <MdAdd className="add-test-btn" /> تست جدید
      </ListGroupItem>
      {/* Books Name */}
      <FormGroup className="position-relative">
        {/* <Label for="test-book">کتاب تست</Label>
        <Input
          type="test-book"
          name="test-book"
          id="test-book"
          placeholder="نام کتاب تست"
          value={props.selectedItem ? props.selectedItem.testBookName : ''}
          readOnly
        /> */}
      </FormGroup>
      {/* Test Options */}
      <FormGroup className="d-flex flex-column align-items-start">
        <Label for="test-session" className="ml-auto">
          <span className="validation-red">* &nbsp;</span>
          فصل کتاب تست
        </Label>
        <FormGroup
          className="d-flex flex-wrap flex-md-wrap col-12 p-0 w-100 test-book-wrapper"
          key={
            props.selectedTest
              ? props.selectedTest.pkTestMaster
              : props.selectedTest
          }
        >
          <Select
            closeMenuOnSelect={true}
            required
            noOptionsMessage={() => 'گزینه ای وجود ندارد'}
            key={testBookChapterOption.map(item => item.label)}
            name="answer-select"
            id="answer-select"
            className={
              'direction-right w-90 col-sm-12 col-md-9 col-lg-10 mt-2 text-right '
            }
            placeholder="انتخاب کنید..."
            options={testBookChapterOption}
            defaultValue={
              props.editMode
                ? testBookChapterOption.find(
                    opt => opt.id === props.selectedTest.fldPkTestBookChapter,
                  )
                : props.editBookChapterModal
                ? testBookChapterOption.find(
                    opt =>
                      opt.id ===
                      props.editBookChapterModal[0].pkTestBookChapter,
                  )
                : ''
            }
            onChange={val => {
              if (val !== null) {
                props.loadChapter({ target: { value: val.id } });
              } else {
                props.loadChapter({ target: { value: '' } });
              }
            }}
            ref={testChapterVal}
          />
          <Button
            outline
            color="white"
            className="add-book-btn rounded mt-3 mt-md-2 mr-0 mr-md-2 bg-white col-sm-5 col-md-2 col-lg-1"
            onClick={() => {
              props.toggle();
              props.loadChapterModal(false);
            }}
          >
            <PlusIcon className="" />
          </Button>
          <Button
            outline
            color="white"
            className="add-book-btn edit-book-btn rounded mt-3 mt-md-2 mr-2 bg-white col-sm-5 col-md-2 col-lg-1"
            onClick={val => {
              props.toggle();
              props.loadChapterModal(true);
            }}
            disabled={
              props.editBookChapterModal
                ? false
                : props.selectedTest
                ? false
                : true
            }
          >
            <EditIcon className="" />
          </Button>
        </FormGroup>
      </FormGroup>
      {/* Books Options */}
      <FormGroup
        className="d-flex flex-column align-items-end"
        key={
          props.selectedTest
            ? props.selectedTest.pkTestMaster
            : props.selectedTest
        }
      >
        <Label for="test-session" className="ml-auto">
          <span className="validation-red">* &nbsp;</span>
          فصل کتاب درسی
        </Label>
        <FormGroup className="d-flex w-100" key={bookChapterOption}>
          <Select
            closeMenuOnSelect={true}
            required
            key={bookChapterOption.map(item => item.label)}
            name="answer-select"
            id="answer-select"
            noOptionsMessage={() => 'گزینه ای وجود ندارد'}
            className={'direction-right w-100 col-md-12 mt-2 text-right'}
            placeholder="انتخاب کنید..."
            options={bookChapterOption}
            defaultValue={
              props.editMode
                ? bookChapterOption.find(
                    opt => opt.id === props.selectedTest.fldPkBookChapter,
                  )
                  ? bookChapterOption.find(
                      opt => opt.id === props.selectedTest.fldPkBookChapter,
                    )
                  : bookChapterOption[bookChapterOption.length - 1]
                : bookChapterOption[bookChapterOption.length - 1]
            }
            onChange={val => {
              if (val !== null) {
                props.loadSubBook({ target: { value: val.id } });
                updateBookChapterId(val.id);
                if (props.editMode === true) {
                  UpdateToggleSubBook(false);
                  UpdateToggleTopic(false);
                  updateEditTopic(false);
                  updateSelectedTopic(null);
                  updateEditSubBook(false);
                  updateSelectedSubBook(null);
                  UpdateTopicAdded(false);
                  UpdateSubBookAdded(false);
                }
              } else {
                props.loadSubBook({ target: { value: '' } });
                updateBookChapterId(0);
              }
            }}
            ref={bookChapterVal}
          />
        </FormGroup>
      </FormGroup>
      {/* SubBook Options */}
      <ExpansionPanel
        expanded={expandSubBook}
        className="my-4 accordion-subBook rounded"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={expandSubBookHandler}
        >
          <Label style={{ fontSize: '14px', cursor: 'pointer' }}>
            زیر فصل کتاب درسی
          </Label>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="col-12 d-flex flex-column">
          <FormGroup className="d-flex flex-column align-items-start ">
            <FormGroup
              className="d-flex flex-wrap flex-md-wrap col-12 p-0 w-100 test-book-wrapper my-2 subBook-formGroup"
              key={
                props.selectedTest
                  ? props.selectedTest.fldPkSubBookChapter
                  : props.selectedTest
              }
            >
              <Select
                closeMenuOnSelect={true}
                isClearable
                noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                key={subBookOptions.map(item => item.label)}
                name="subBook-select"
                id="subBook-select"
                className={
                  'direction-right w-90 col-sm-12 col-md-8 col-lg-9 mt-2 text-right '
                }
                placeholder="انتخاب زیر فصل کتاب درسی ..."
                options={subBookOptions}
                defaultValue={
                  props.editMode
                    ? subBookOptions.find(
                        opt =>
                          opt.id === props.selectedTest.fldFkSubBookChapter,
                      )
                    : subBookAdded === true
                    ? subBookOptions[subBookOptions.length - 1]
                    : ''
                }
                onChange={val => {
                  if (val !== null) {
                    props.loadTopic({ target: { value: val.id } });
                    updateSelectedSubBook(val);
                    updateSubBookId(val.id);
                    if (props.editMode === true) {
                      updateSelectedTopic(null);
                      updateEditTopic(false);
                    }
                  } else {
                    props.loadTopic({ target: { value: '' } });
                    updateSelectedSubBook(null);
                    updateSubBookId(null);
                    updateSelectedTopic(null);
                  }
                }}
                ref={subBookVal}
              />
              <Button
                outline
                color="white"
                className="add-book-btn rounded mt-3 mt-md-2 mr-0 mr-md-2 bg-white col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center"
                onClick={() => {
                  UpdateToggleSubBook(true);
                  updateEditSubBook(false);
                }}
              >
                <PlusIcon className="" />
              </Button>
              <Button
                outline
                color="white"
                className="add-book-btn edit-book-btn rounded mt-3 mt-md-2 mr-2 bg-white col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center"
                onClick={() => {
                  UpdateToggleSubBook(true);
                  updateEditSubBook(true);
                }}
                disabled={selectedSubBook === null ? true : false}
              >
                <EditIcon className="" />
              </Button>
              <InlineConfirmButton
                outline
                showTimer
                color="white"
                textValues={textValues}
                className="btn add-book-btn edit-book-btn delete-book-btn rounded mt-3 mt-md-2 mr-2 bg-white col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center  position-relative confirm-delete-subBook flex-column flex-center align-items-center"
                onClick={() => {
                  props.deleteSubBook(selectedSubBook.id, bookChapterId);
                  updateEditSubBook(false);
                  updateSelectedSubBook(null);
                  UpdateToggleSubBook(false);
                  UpdateSubBookAdded(false);
                }}
                disabled={selectedSubBook === null ? true : false}
              >
                <DeleteIcon className="mb-1" />
              </InlineConfirmButton>
              {toggleSubBook === true ? (
                <FormGroup
                  className="col-sm-12 col-md-8 col-lg-9 mt-4 px-0 d-flex align-items-center"
                  style={{ transitoin: '0.4s', animation: animations.fadeIn }}
                >
                  <Input
                    name="hashtag"
                    id="hashtag"
                    placeholder="تیتر زیر فصل کتاب درسی را وارد کنید"
                    className={'direction-right col-12'}
                    innerRef={subBookTitle}
                    defaultValue={
                      selectedSubBook !== null && editSubBook === true
                        ? selectedSubBook.label
                        : ''
                    }
                  />
                  <DoneIcon
                    className="done-btn col-1 mr-2"
                    onClick={addSubBook}
                  />
                  <CloseIcon
                    className="close-btn ml-2 mr-2 col-1"
                    onClick={() => UpdateToggleSubBook(false)}
                  />
                </FormGroup>
              ) : null}
            </FormGroup>
          </FormGroup>
          {/* Topic Options */}
          <FormGroup
            className="d-flex flex-column align-items-start"
            key={
              props.selectedTest
                ? props.selectedTest.fldFkTopic
                : props.selectedTest
            }
          >
            <FormGroup
              className="d-flex flex-wrap flex-md-wrap col-12 p-0 w-100 test-book-wrapper my-2 subBook-formGroup"
              key={TopicOptions.map(item => item.label)}
            >
              <Select
                closeMenuOnSelect={true}
                isClearable
                key={TopicOptions.map(item => item.label)}
                name="answer-select"
                id="answer-select"
                noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                className={
                  'direction-right w-90 col-sm-12 col-md-8 col-lg-9 mt-2 text-right'
                }
                placeholder="انتخاب مبحث کتاب درسی ..."
                options={TopicOptions}
                defaultValue={
                  props.editMode
                    ? TopicOptions.find(
                        opt => opt.id === props.selectedTest.fldFkTopic,
                      )
                    : topicAdded === true
                    ? TopicOptions[TopicOptions.length - 1]
                    : ''
                }
                onChange={val => {
                  if (val !== null) {
                    updateSelectedTopic(val);
                  } else {
                    updateSelectedTopic(null);
                  }
                }}
                ref={TopicVal}
              />
              <Button
                outline
                color="white"
                className="add-book-btn rounded mt-3 mt-md-2 mr-0 mr-md-2 bg-white col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center"
                onClick={() => {
                  UpdateToggleTopic(true);
                  updateEditTopic(false);
                }}
              >
                <PlusIcon className="" />
              </Button>
              <Button
                outline
                color="white"
                className="add-book-btn edit-book-btn rounded mt-3 mt-md-2 mr-2 bg-white col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center"
                onClick={() => {
                  UpdateToggleTopic(true);
                  updateEditTopic(true);
                }}
                disabled={selectedTopic === null ? true : false}
              >
                <EditIcon className="" />
              </Button>
              <InlineConfirmButton
                outline
                showTimer
                isExecuting={null}
                textValues={textValues}
                color="white"
                className="btn add-book-btn edit-book-btn delete-book-btn rounded mt-3 mt-md-2 mr-2 bg-white col-sm-4 col-md-2 col-lg-4 d-flex justify-content-center position-relative confirm-delete-subBook flex-column flex-center align-items-center"
                onClick={() => {
                  props.deleteTopic(selectedTopic.id, subBookId);
                  updateEditTopic(false);
                  updateSelectedTopic(null);
                  UpdateToggleTopic(false);
                  UpdateTopicAdded(false);
                }}
                disabled={selectedTopic === null ? true : false}
              >
                <DeleteIcon className="mb-1" />
              </InlineConfirmButton>
              {toggleTopic === true ? (
                <FormGroup
                  className="col-sm-12 col-md-8 col-lg-9 mt-4 px-0 d-flex align-items-center"
                  style={{ transitoin: '0.4s', animation: animations.fadeIn }}
                >
                  <Input
                    name="hashtag"
                    id="hashtag"
                    placeholder="تیتر مبحث کتاب درسی را وارد کنید"
                    className={'direction-right col-12'}
                    innerRef={TopicTitle}
                    defaultValue={
                      selectedTopic !== null && editTopic === true
                        ? selectedTopic.label
                        : ''
                    }
                  />
                  <DoneIcon
                    className="done-btn col-1 mr-2"
                    onClick={addTopic}
                  />
                  <CloseIcon
                    className="close-btn ml-2 mr-2 col-1"
                    onClick={() => UpdateToggleTopic(false)}
                  />
                </FormGroup>
              ) : null}
            </FormGroup>
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <FormGroup className="direction-right d-flex flex-column align-items-start justify-content-center flex-wrap">
        <Label for="exampleSelect" className="ml-1">
          سطح سوال
        </Label>
        {/* Range Slider */}
        <AddTestFormRangeSlider
          getValueSlider={getValueSlider}
          selectedTest={props.selectedTest}
          editMode={props.editMode}
        />
      </FormGroup>
      {/* Hashtag */}
      <FormGroup className="d-flex flex-column align-items-end">
        <Label for="hashtag" className="ml-auto">
          {' '}
          هشتگ{' '}
        </Label>
        <FormGroup className="d-flex col-12 p-0 flex-wrap">
          <Input
            name="hashtag"
            id="hashtag"
            placeholder="ریاضی"
            className={'direction-right col-sm-12 col-md-10 col-lg-11'}
            innerRef={hashtagVal}
            onKeyPress={e => (e.which === 13 ? addHashtag(e) : '')}
          />
          <Button
            style={{ marginTop: 0 }}
            outline
            color="white"
            className="add-book-btn rounded mt-2 mt-md-0 mr-0 mr-md-2 bg-white col-sm-3 col-md-2 col-lg-1"
            onClick={addHashtag}
          >
            <PlusIcon className="" />
          </Button>
        </FormGroup>
        <div
          className="ml-auto direction-right col-12 p-0 my-2"
          ref={hashtagWrapper}
        >
          <div className="hashtag-trend-wrapper d-flex flex-wrap bg-light mb-1 py-2 px-3">
            <Label for="test-session" className="ml-auto w-100">
              هشتگ های پر کاربرد
            </Label>
            <FormGroup className="d-flex flex-shrink-0">
              <AnimateGroup animationIn="popIn" animationOut="popOut">
                {loadHashtagTrend.map(hashtag => {
                  return (
                    <button
                      onClick={e => addHashtagTrend(e, hashtag.hashtagName)}
                      key={hashtag.pkHashtag}
                      className="btn btn-outline-secondary m-1"
                      ref={hashtagTrend}
                    >
                      # {hashtag.hashtagName}
                    </button>
                  );
                })}
              </AnimateGroup>
            </FormGroup>
          </div>
          {hashtags
            ? hashtags.map((name, i) => {
                return (
                  <button
                    onClick={e => deleteHashtag(e, name)}
                    key={i}
                    className="btn btn-secondary m-1 btn-hashtag position-relative"
                    style={{ animation: animations.bounceIn }}
                  >
                    # {name}
                    <CloseIcon className="icon-hashtag" />
                  </button>
                );
              })
            : ''}
        </div>
      </FormGroup>
      {/* Template Select */}
      <FormGroup tag="fieldset">
        <Label for="exampleSelect" className="ml-1">
          قالب
        </Label>
        <FormGroup
          check
          className="d-flex justify-content-around align-items-center flex-column flex-md-row"
          key={
            props.selectedTest
              ? props.selectedTest.pkTestMaster
              : props.selectedTest
          }
        >
          <Label check>
            <Input
              id="style"
              type="radio"
              name="radio1"
              className="d-none"
              onChange={() => getStyle(1)}
              defaultChecked={
                props.editMode
                  ? props.selectedTest.fldTemplate === 1
                    ? true
                    : false
                  : false
              }
            />
            <img
              src="/img/layout01.png"
              alt="layout"
              className="img-fluid w-50 add-test-from-img"
            />
          </Label>
          <Label check>
            <Input
              id="style"
              type="radio"
              name="radio1"
              className="d-none"
              onChange={() => getStyle(2)}
              defaultChecked={
                props.editMode
                  ? props.selectedTest.fldTemplate === 2
                    ? true
                    : false
                  : true
              }
            />
            <img
              src="/img/layout02.png"
              alt="layout"
              className="img-fluid w-50 add-test-from-img"
            />
          </Label>
          <Label check>
            <Input
              id="style"
              type="radio"
              name="radio1"
              className="d-none"
              onChange={() => getStyle(3)}
              defaultChecked={
                props.editMode
                  ? props.selectedTest.fldTemplate === 3
                    ? true
                    : false
                  : false
              }
            />
            <img
              src="/img/layout03.png"
              alt="layout"
              className="img-fluid w-50 add-test-from-img"
            />
          </Label>
        </FormGroup>
      </FormGroup>
      {/* Test Queestion */}
      <FormGroup className="my-4">
        <Label for="test-question" className="ml-1">
          عنوان تست
        </Label>
        <FormGroup
          className="d-flex flex-wrap flex-md-wrap col-12 p-0 w-100 test-book-wrapper position-relative"
          key={
            props.selectedTest
              ? props.selectedTest.pkTestMaster
              : props.selectedTest
          }
        >
          <Input
            name="test-question"
            id="test-question"
            type="text"
            defaultValue={disableTestTitle === true ? testTitle : ''}
            innerRef={testName}
            disabled={disableTestTitle}
            className="w-90 col-sm-12 col-md-10 col-lg-11 mt-2 text-right direction-right"
            key={disableTestTitle === true ? testTitle : disableTestTitle}
          />
          <Button
            outline
            color="white"
            className="add-book-btn edit-book-btn rounded mt-2 mt-md-12 mr-2 bg-white col-sm-5 col-md-2 col-lg-1"
            onClick={() => UpdateDisableTestTitle(!disableTestTitle)}
          >
            <EditIcon className="" />
          </Button>
        </FormGroup>
      </FormGroup>
      {/* Show preview */}
      <FormGroup>
        <PreviewTest
          editorText={editorText}
          updateShowEditor={updateShowEditor}
          updateEditorText={updateEditorText}
          showEditor={showEditor}
          getData={updatePreview}
          updateTitle={updateTitle}
          html={html}
          initValue={initValue}
          updateInitValue={updateInitValue}
          selectedTest={props.selectedTest}
          editMode={props.editMode}
          styleVal={styleVal}
          updateTestTitle={updateTestTitle}
          selectedTestPrev={props.selectedTestPrev}
          selectedTestNext={props.selectedTestNext}
          disablePrev={props.disablePrev}
          disableNext={props.disableNext}
          testNewNum={props.testNewNum}
          updateFiles={updateFiles}
        />
      </FormGroup>
      {/* Add New Test */}
      {showEditor ? (
        <FormGroup>
          <AddNewTestEditor
            updateEditorText={updateEditorText}
            editorText={editorText}
            titleEditor={titleEditor}
            updateTitle={updateTitle}
            updateHtml={updateHtml}
            initValue={initValue}
          />
        </FormGroup>
      ) : null}

      {/* Buttons */}
      <FormGroup className="text-right d-flex">
        {props.editMode === true ? (
          <>
            <Button
              color="primary"
              onClick={e => {
                updateEditing(true);
                props.checkKeepEditing(true);
                formData(e);
              }}
              className="ml-3 col-lg-2 col-md-3 col-sm-4 px-1"
            >
              ویرایش
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                props.checkKeepEditing(false);
                updateShowEditor(false);
                updateEditing(false);
                UpdateToggleSubBook(false);
                UpdateToggleTopic(false);
                updateEditTopic(false);
                updateSelectedTopic(null);
                updateEditSubBook(false);
                updateSelectedSubBook(null);
                props.resetTest();
              }}
              className="col-lg-2 col-md-3 col-sm-4"
            >
              اتمام ویرایش
            </Button>
          </>
        ) : (
          <Button
            className="ml-2 col-lg-2 col-md-3 col-sm-4"
            color="secondary"
            onClick={e => {
              updateEditing(false);
              props.checkKeepEditing(false);
              formData(e);
            }}
          >
            ذخیره
          </Button>
        )}
      </FormGroup>
    </Form>
  );
}

export default AddTestForm;
