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

function DashboardPageModal(props) {
  let loadBooksOption = [];
  if (props.loadBooks) {
    props.loadBooks.forEach(data => {
      loadBooksOption.push({
        id: data.pkBook,
        label: data.bookName,
        value: data.bookName,
      });
    });
  }
  let gradeOption = [];
  if (props.GradeData) {
    props.GradeData.forEach(data => {
      gradeOption.push({
        id: data.pkGrade,
        label: data.gradeName,
        value: data.gradeName,
      });
    });
  }

  let majorOption = [];
  if (props.MajorData) {
    props.MajorData.forEach(data => {
      majorOption.push({
        id: data.pkMajor,
        label: data.majorName,
        value: data.majorName,
      });
    });
  }

  const bookName = React.createRef();
  const authName = React.createRef();
  const FkMajor = React.createRef();
  const FkGrade = React.createRef();
  const Fkbook = React.createRef();
  const form = React.createRef();
  const TestBookDesc = React.createRef();
  const price = React.createRef();

  const submit = e => {
    let id = props.isEditing ? props.editData.fldPkTestBook : -1;
    // Get Multi Select Value
    let FkBookVals = [];
    if (Fkbook.current.state.value.length !== 0) {
      Fkbook.current.state.value.forEach(item => {
        FkBookVals.push(item.id);
      });
    }
    let FkMajorVals = [];
    if (FkMajor.current.state.value.length !== 0) {
      FkMajor.current.state.value.forEach(item => {
        FkMajorVals.push(item.id);
      });
    }
    let FkGradeVals = [];
    if (FkGrade.current.state.value.length !== 0) {
      FkGrade.current.state.value.forEach(item => {
        FkGradeVals.push(item.id);
      });
    }
    // Send Data
    const getBookModal = {
      id,
      BookName: bookName.current.value,
      Author: authName.current.value,
      FkMajor: FkMajorVals.join(','),
      FkGrade: FkGradeVals.join(','),
      FkBook: FkBookVals.join(','),
      Description: TestBookDesc.current.value,
      Price: price.current.value,
      // numChapterTestBook: numChapterTestBook.current.value,
      // numChapterTestBook: 0,
    };
    // Validation
    if (!authName.current.value || !bookName.current.value) {
      alertify.error('پر کردن فیلدهای ستاره دار الزامی است');
      return;
    }
    if (
      FkMajor.current.state.value === '' ||
      FkMajor.current.state.value === null ||
      FkMajor.current.state.value === undefined ||
      FkMajor.current.state.value.length === 0
    ) {
      alertify.error('فیلد رشته اجباری است');
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
    props.getBookModal(getBookModal);
    setTimeout(() => {
      form.current.reset();
      props.dispatch(apiActions.getDashboard());
      props.toggle();
    }, 10);

    if (
      FkMajor.current.state.value === '' ||
      FkMajor.current.state.value === null ||
      FkMajor.current.state.value === undefined
    ) {
      alertify.error('فیلد رشته اجباری است');
    }
    if (
      FkGrade.current.state.value === '' ||
      FkGrade.current.state.value === null ||
      FkGrade.current.state.value === undefined
    ) {
      alertify.error('فیلد مقطع اجباری است');
    }
  };
  // Select Major And Grade by Default
  let selectedGrades, selectedMajors, selectedBooks;
  if (props.isEditing) {
    if (props.editData.grade !== null) {
      selectedGrades = props.editData.grade.split(',');
    }

    if (props.editData.major !== null) {
      selectedMajors = props.editData.major.split(',');
    }
    if (props.editData.book !== null) {
      selectedBooks = props.editData.book.split(',');
    }
  }
  return (
    <Modal
      isOpen={props.isOpen}
      //  toggle={props.toggle}
    >
      <ModalHeader>تعریف کتاب</ModalHeader>
      <ModalBody>
        {/* Forms */}
        <Form innerRef={form}>
          <FormGroup>
            <Label htmlFor="booksname">
              <span className="validation-red">* &nbsp;</span>نام کتاب{' '}
            </Label>
            <Input
              required
              type="text"
              name="booksname"
              id="booksname"
              placeholder="کتاب"
              className="text-right"
              defaultValue={props.isEditing ? props.editData.testBookName : ''}
              innerRef={bookName}
            />
          </FormGroup>
          {/* Author */}
          <FormGroup>
            <Label htmlFor="author">
              <span className="validation-red">* &nbsp;</span>مولف
            </Label>
            <Input
              required
              type="text"
              name="author"
              id="author"
              placeholder="اسم مولف"
              className="text-right"
              defaultValue={props.isEditing ? props.editData.authorName : ''}
              innerRef={authName}
            />
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              <span className="validation-red">* &nbsp;</span>
              کتاب
            </div>
            <Select
              key={loadBooksOption}
              defaultValue={
                props.isEditing && selectedBooks
                  ? selectedBooks.map(item => {
                      return loadBooksOption.find(
                        opt => opt.id === Number(item),
                      );
                    })
                  : ''
              }
              closeMenuOnSelect={false}
              required
              name="section-select"
              id="section-select"
              ref={Fkbook}
              className={'direction-right'}
              isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={loadBooksOption}
            />
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              <span className="validation-red">* &nbsp;</span>
              رشته
            </div>
            <Select
              key={majorOption}
              defaultValue={
                props.isEditing && selectedMajors
                  ? selectedMajors.map(item => {
                      return majorOption.find(opt => opt.id === Number(item));
                    })
                  : ''
              }
              closeMenuOnSelect={false}
              required
              name="section-select"
              id="section-select"
              ref={FkMajor}
              className={'direction-right'}
              isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={majorOption}
            />
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              <span className="validation-red">* &nbsp;</span>
              مقطع
            </div>
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
              name="section-select"
              id="section-select"
              ref={FkGrade}
              className={'direction-right'}
              isMulti
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={gradeOption}
            />
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              توضیحات
            </div>
            <Input
              className="direction-right col-12 form-control desc-quiz"
              type="textarea"
              name="text"
              id="exampleText"
              placeholder="کتاب تست..."
              innerRef={TestBookDesc}
              defaultValue={
                props.isEditing && props.editData
                  ? props.editData.testBookDiscription
                  : ''
              }
            />{' '}
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              قیمت
            </div>
            <div className="d-flex align-items-center">
              <Input
                className="direction-right col-11 form-control desc-quiz"
                type="text"
                name="text"
                id="exampleText"
                placeholder="10000"
                innerRef={price}
                defaultValue={
                  props.isEditing && props.editData
                    ? props.editData.fldPrice
                    : ''
                }
              />
              <span style={{ marginRight: '10px', fontSize: '16px' }}>
                ریال
              </span>
            </div>
          </FormGroup>
          <FormGroup className="mt-4">
            <ButtonGroup className="d-flex">
              <Button color="primary" className="ml-2 rounded" onClick={submit}>
                {props.isEditing ? 'ذخیره' : 'افزودن'}
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
