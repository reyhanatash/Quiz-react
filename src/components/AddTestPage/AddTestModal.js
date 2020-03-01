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
import Select from 'react-select';
import alertify from 'alertifyjs';

function AddBooksPageModal(props) {
  const bookOptions = React.createRef();
  const FkGrade = React.createRef();
  const title = React.createRef();

  // Grade Options
  let gradeOption = [];
  if (props.GradeData) {
    props.GradeData.forEach(data => {
      gradeOption.push({
        id: data.fldPkGrade,
        label: data.fldGradeName,
        value: data.fldPkGrade,
      });
    });
  }

  // Books Options
  let bookChapterOption = [];
  if (props.bookChapterData) {
    props.bookChapterData.forEach(data => {
      bookChapterOption.push({
        id: data.fldPkBookChapter,
        label: data.fldBookChapterName,
        value: data.fldPkBookChapter,
      });
    });
  }
  // Add Book Chapter
  const addBookChapter = e => {
    e.preventDefault();
    // Validation
    if (
      title.current.value === '' ||
      title.current.value === null ||
      title.current.value === undefined
    ) {
      alertify.error('فیلد عنوان اجباری است');
      return;
    }
    if (
      bookOptions.current.state.value === '' ||
      bookOptions.current.state.value === null ||
      bookOptions.current.state.value === undefined ||
      bookOptions.current.state.value.length === 0
    ) {
      alertify.error('فیلد انتخاب فصل کتاب درسی اجباری است');
      return;
    }
    if (
      FkGrade.current.state.value === '' ||
      FkGrade.current.state.value === null ||
      FkGrade.current.state.value === undefined ||
      FkGrade.current.state.value.length === 0
    ) {
      alertify.error('فیلد مقطع اجباری است');
      return;
    }
    // Get Multi Select Options
    let FkGradeVals = [];
    if (FkGrade.current.state.value.length !== 0) {
      FkGrade.current.state.value.forEach(item => {
        FkGradeVals.push(item.id);
      });
    }
    let FkTestBookVals = [];
    if (bookOptions.current.state.value.length !== 0) {
      bookOptions.current.state.value.forEach(item => {
        FkTestBookVals.push(item.id);
      });
    }
    // Send Data
    const getChapterModal = {
      id: props.isEditing
        ? props.editBookChapterModal[0].pkTestBookChapter
        : -1,
      BookName: title.current.value,
      FkTestBook: FkTestBookVals.join(','),
      FkGrade: FkGradeVals.join(','),
      FkBookChapter: props.selectedItem.fldPkTestBook,
    };
    console.log(getChapterModal);
    props.addBookChapter(getChapterModal);
    props.toggle();
    props.loadAgain();
  };
  // Select Major And Grade by Default
  let selectedGrades, selectedBookChapter;
  if (props.isEditing) {
    if (props.editBookChapterModal[0].grade !== null) {
      selectedGrades = props.editBookChapterModal[0].grade.split(',');
    }
    if (props.editBookChapterModal[0].bookChapter !== null) {
      selectedBookChapter = props.editBookChapterModal[0].bookChapter.split(
        ',',
      );
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      // toggle={props.toggle}
    >
      <ModalHeader>تعریف فصل جدید</ModalHeader>
      <ModalBody>
        {/* Forms */}
        <Form className="add-test-from ">
          <FormGroup className="d-flex flex-column">
            <Label htmlFor="title">
              <span className="validation-red">* &nbsp;</span>عنوان{' '}
            </Label>
            <Input
              required
              type="text"
              name="title"
              id="title"
              placeholder="عنوان فصل"
              className="text-right"
              innerRef={title}
              defaultValue={
                props.isEditing
                  ? props.editBookChapterModal[0].testBookChapterName
                  : ''
              }
            />
          </FormGroup>
          <FormGroup className="d-flex flex-column">
            <Label htmlFor="bookChapter-select">
              <span className="validation-red">* &nbsp;</span> فصل کتاب درسی{' '}
            </Label>
            <Select
              key={bookChapterOption}
              defaultValue={
                props.isEditing && selectedBookChapter
                  ? selectedBookChapter.map(item => {
                      return bookChapterOption.find(
                        opt => opt.id === Number(item),
                      );
                    })
                  : ''
              }
              closeMenuOnSelect={false}
              required
              name="bookChapter-select"
              id="bookChapter-select"
              ref={bookOptions}
              className={'direction-right'}
              isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={bookChapterOption}
            />
          </FormGroup>
          <FormGroup className="d-flex flex-column">
            <Label htmlFor="grade-select">
              <span className="validation-red">* &nbsp;</span>مقطع{' '}
            </Label>
            <Select
              key={gradeOption}
              defaultValue={
                props.isEditing && selectedGrades
                  ? selectedGrades.map(item => {
                      return gradeOption.find(opt => opt.id === Number(item));
                    })
                  : ''
              }
              closeMenuOnSelect={false}
              required
              name="grade-select"
              id="grade-select"
              ref={FkGrade}
              className={'direction-right'}
              isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={gradeOption}
            />
          </FormGroup>
          {/* Buttons */}
          <FormGroup className="pt-3">
            <ButtonGroup className="d-flex">
              <Button
                color="primary"
                className="ml-2 rounded"
                onClick={addBookChapter}
              >
                {props.openEditModal ? 'ویرایش' : 'افزودن'}
              </Button>{' '}
              <Button
                color="secondary"
                className="rounded"
                onClick={props.toggle}
              >
                بازگشت
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default AddBooksPageModal;
