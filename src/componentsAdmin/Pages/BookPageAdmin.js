import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { connect } from 'react-redux';
import UsersBooksTable from '../Users/UsersBooksTable';
import TestBooksTable from '../Users/TestBooksTable';
import TeachersBooksTable from '../Teachers/TeachersBooksTable';
import BookPageModal from '../Teachers/BookPageModal';
import Select from 'react-select';

class BookPage extends React.Component {
  state = {
    modal: false,
    type: 0,
    modalData: {},
    defualtFilter: null,
    loadTestBooks: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.location.pathname.split('/')[2]);
    if (this.props.location.state) {
      console.log(this.props.location.state);
      if (this.props.location.state.data) {
        this.props.dispatch(
          apiActionsAdmin.loadBooksPerUser(this.props.location.state.data.id),
        );
      } else if (
        this.props.location.state.type === 'allBooks' ||
        this.props.location.pathname.split('/')[2] === 'allBooks'
      ) {
        this.props.dispatch(apiActionsAdmin.loadTestBook(''));
      } else if (this.props.location.state.type === 'booksReadyToPublish') {
        this.props.dispatch(apiActionsAdmin.loadTestBookReadyToPublish(''));
      }
      this.setState({ type: this.props.location.state.type });
    } else if (this.props.location.pathname.split('/')[2]) {
      if (this.props.location.pathname.split('/')[2] === 'allBooks') {
        this.props.dispatch(apiActionsAdmin.loadTestBook(''));
      } else if (
        this.props.location.pathname.split('/')[2] === 'booksReadyToPublish'
      ) {
        this.props.dispatch(apiActionsAdmin.loadTestBookReadyToPublish(''));
      }
      this.setState({ type: this.props.location.pathname.split('/')[2] });
    }
    this.props.dispatch(apiActionsAdmin.loadRejectTypes());
  }
  // Go TO Book Page
  goToBookPageUser = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/new-test/${data.name}`,
      state: data,
    });
  };
  // Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
  };
  toggleModalDetails = data => {
    let find;
    if (this.state.type === 2) {
      find = this.props.userBooks.find(item => item.fldPkTestBook === data.id);
    }
    if (this.state.type === 'booksReadyToPublish') {
      find = this.props.loadTestBooksReadyToPublish.find(
        item => item.fldPkTestBook === data.id,
      );
    }

    console.log(find);
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalData: find,
    }));
  };
  goToTestPage = data => {
    this.props.history.push({
      pathname: `/tests`,
      state: data,
    });
  };
  refreshList = () => {
    setTimeout(() => {
      if (this.props.location.state || this.state.type) {
        if (this.props.location.state && this.props.location.state.data) {
          this.props.dispatch(
            apiActionsAdmin.loadBooksPerUser(this.props.location.state.data.id),
          );
        } else if (
          (this.props.location.state &&
            this.props.location.state.type === 'allBooks') ||
          this.state.type === 'allBooks'
        ) {
          this.props.dispatch(apiActionsAdmin.loadTestBook(''));
        } else if (
          (this.props.location.state &&
            this.props.location.state.type === 'booksReadyToPublish') ||
          this.state.type === 'booksReadyToPublish'
        ) {
          this.props.dispatch(apiActionsAdmin.loadTestBookReadyToPublish(''));
        }
      }
    }, 500);
  };
  approveOrRejectTestBook = (id, status, comment, type, row) => {
    const IsApprove = status === 0 ? true : status === 1 ? false : null;
    this.props.dispatch(
      apiActionsAdmin.approveOrRejectTestBook(id, type, IsApprove, comment),
    );
    this.refreshList();
    if (IsApprove) {
      this.publishToWordpress(row);
    }
  };
  updatePrice = (testBookId, price, archiveDate) => {
    this.props.dispatch(apiActionsAdmin.updatePrice(testBookId, Number(price)));
    // WP
    const status = archiveDate !== '' ? 0 : archiveDate === '' ? 1 : null;
    this.props.dispatch(
      apiActionsAdmin.updateTestBookWordpress(
        String(testBookId),
        String(status),
        price,
      ),
    );
    this.refreshList();
  };
  updatePercentage = (testBookId, percent, archiveDate) => {
    this.props.dispatch(
      apiActionsAdmin.updatePercentage(testBookId, Number(percent)),
    );
    this.refreshList();
  };
  updateArchive = (testBookId, archive, price) => {
    const isArchive = archive === 'checkedComplete' ? 1 : 0;
    this.props.dispatch(
      apiActionsAdmin.setArchiveTestBook(testBookId, isArchive),
    );
    // WP
    const status = isArchive === 1 ? 0 : isArchive === 0 ? 1 : null;
    this.props.dispatch(
      apiActionsAdmin.updateTestBookWordpress(
        String(testBookId),
        String(status),
        price,
      ),
    );
    this.refreshList();
  };
  goToQuizPage = data => {
    this.props.history.push({
      pathname: `/quiz`,
      state: data,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.props.location.pathname.split('/')[2]) {
        if (this.props.location.pathname.split('/')[2] === 'allBooks') {
          this.props.dispatch(apiActionsAdmin.loadTestBook(''));
        } else if (
          this.props.location.pathname.split('/')[2] === 'booksReadyToPublish'
        ) {
          this.props.dispatch(apiActionsAdmin.loadTestBookReadyToPublish(''));
        }
        this.setState({ type: this.props.location.pathname.split('/')[2] });
      }
    }
    if (prevProps.loadTestBooks !== this.props.loadTestBooks) {
      this.setState({ loadTestBooks: this.props.loadTestBooks });
    }
  }
  filterTestBooks = value => {
    if (value === null || value === '') {
      this.setState({ loadTestBooks: this.props.loadTestBooks });
    } else if (value === 1) {
      const filter = this.props.loadTestBooks.filter(
        item => item.fldApprove === true,
      );
      this.setState({ loadTestBooks: filter });
    } else if (value === 2) {
      const filter = this.props.loadTestBooks.filter(
        item => item.fldApprove === false,
      );
      this.setState({ loadTestBooks: filter });
    } else {
      this.setState({ loadTestBooks: this.props.loadTestBooks });
    }
  };
  publishToWordpress = data => {
    console.log(data);
    if (data) {
      this.props.dispatch(
        apiActionsAdmin.publishToWordpress(
          data.id,
          data.name,
          data.catagory,
          data.desc,
          data.desc.slice(0, 30),
          data.price,
          data.cover,
        ),
      );
    }
  };
  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.loadBooksPerUser(0));
    dispatch(apiActionsAdmin.loadTestBook(0));
    dispatch(apiActionsAdmin.loadTestBookReadyToPublish(0));
  }
  render() {
    let filterOptions = [
      {
        value: 0,
        id: 0,
        label: 'همه',
      },
      {
        value: 1,
        id: 1,
        label: 'تایید شده',
      },
      {
        value: 2,
        id: 2,
        label: 'تایید نشده',
      },
      // {
      //   value: 3,
      //   id: 3,
      //   label: 'تعیین نشده',
      // },
    ];
    return (
      <Page className="BookPage" title="کتاب ها">
        <Row>
          <Col>
            {this.state.type === 2 ? (
              this.props.userBooks && this.props.userBooks.length === 0 ? (
                <Col
                  className="bg-white py-2 mt-2 quiz-box-shadow"
                  style={{ minHeight: 400 }}
                >
                  <span className="mt-5 h5 text-center w-100 d-inline-block">
                    این طراح کتابی را نهایی نکرده است
                  </span>
                </Col>
              ) : (
                <TeachersBooksTable
                  key={this.props.userBooks}
                  title={'لیست کتاب طراح'}
                  newdata={this.props.userBooks}
                  // goToBookPage={this.goToBookPage}
                  toggleModalDetails={this.toggleModalDetails}
                  goToTestPage={this.goToTestPage}
                  loadRejectTypes={this.props.loadRejectTypes}
                  approveOrRejectTestBook={this.approveOrRejectTestBook}
                  updatePrice={this.updatePrice}
                  updatePercentage={this.updatePercentage}
                  updateArchive={this.updateArchive}
                  goToQuizPage={this.goToQuizPage}
                />
              )
            ) : this.state.type === 3 ? (
              this.props.userBooks && this.props.userBooks.length === 0 ? (
                <Col
                  className="bg-white py-2 mt-2 quiz-box-shadow"
                  style={{ minHeight: 400 }}
                >
                  <span className="mt-5 h5 text-center w-100 d-inline-block">
                    این کاربر کتابی را خریداری نکرده است
                  </span>
                </Col>
              ) : (
                <UsersBooksTable
                  key={this.props.userBooks}
                  newdata={this.props.userBooks}
                  openStudyModal={this.openStudyModal}
                  goToBookPageUser={this.goToBookPageUser}
                />
              )
            ) : this.state.type === 'allBooks' ? (
              <Col className="bg-white">
                <div className="col-12 d-flex flex-column pr-0 pt-3">
                  <h5 className="text-dark" style={{ fontSize: '0.95rem' }}>
                    فیلتر کتاب ها بر اساس وضعیت
                  </h5>
                  <Select
                    closeMenuOnSelect={true}
                    isClearable={() => this.setState({ defualtFilter: null })}
                    noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                    key={filterOptions.map(item => item.label)}
                    name="answer-select"
                    id="answer-select"
                    className={
                      'direction-right col-2 text-right text-dark mt-2'
                    }
                    placeholder="وضعیت"
                    options={filterOptions}
                    defaultValue={filterOptions ? filterOptions[0] : ''}
                    // value={this.state.defualtTestBookChapter}
                    onChange={val => {
                      if (val !== null) {
                        this.filterTestBooks(val.id);
                      } else {
                        this.setState({
                          defualtFilter: null,
                        });
                        this.filterTestBooks('');
                      }
                    }}
                  />
                </div>
                <TestBooksTable
                  key={this.state.loadTestBooks}
                  newdata={this.state.loadTestBooks}
                  loadRejectTypes={this.props.loadRejectTypes}
                  approveOrRejectTestBook={this.approveOrRejectTestBook}
                  updatePrice={this.updatePrice}
                  updatePercentage={this.updatePercentage}
                  updateArchive={this.updateArchive}
                />
              </Col>
            ) : this.state.type === 'booksReadyToPublish' ? (
              this.props.loadTestBooksReadyToPublish &&
              this.props.loadTestBooksReadyToPublish.length === 0 ? (
                <Col
                  className="bg-white py-2 mt-2 quiz-box-shadow"
                  style={{ minHeight: 400 }}
                >
                  <span className="mt-5 h5 text-center w-100 d-inline-block">
                    کتابی برای انتشار وجود ندارد
                  </span>
                </Col>
              ) : (
                <TeachersBooksTable
                  key={this.props.loadTestBooksReadyToPublish}
                  title={'لیست کتاب های آماده انتشار'}
                  newdata={this.props.loadTestBooksReadyToPublish}
                  toggleModalDetails={this.toggleModalDetails}
                  goToTestPage={this.goToTestPage}
                  loadRejectTypes={this.props.loadRejectTypes}
                  approveOrRejectTestBook={this.approveOrRejectTestBook}
                  updatePrice={this.updatePrice}
                  updatePercentage={this.updatePercentage}
                  updateArchive={this.updateArchive}
                  goToQuizPage={this.goToQuizPage}
                />
              )
            ) : (
              <h2>اررور</h2>
            )}
          </Col>
          <BookPageModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            modalData={this.state.modalData}
            getBookModal={this.getBookModal}
          />
        </Row>
        <Row className="px-2">
          <Col sm={12} md={11} lg={11} className="mb-0">
            <Button
              className="col-lg-2 col-md-5 col-sm-12"
              outline
              color="secondary"
              onClick={e => {
                e.preventDefault();
                this.props.history.goBack();
              }}
            >
              بازگشت
            </Button>
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadTestBooks: state.apiAdmin.loadTestBooks,
    userBooks: state.apiAdmin.userBooks,
    loadTestBooksReadyToPublish: state.apiAdmin.loadTestBooksReadyToPublish,
    loadRejectTypes: state.apiAdmin.loadRejectTypes,
  };
}
export default connect(mapStateToProps)(BookPage);
