import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button, Label } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { apiActions } from '../../_actions';
import { connect } from 'react-redux';
import TeachersTestTable from '../Teachers/TeachersTestTable';
import Select from 'react-select';

class TestPage extends React.Component {
  state = {
    modal: false,
    modalData: {},
    defualtTestBookChapter: null,
    selectedChapter: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state) {
      if (!this.props.selectedFilterChapter) {
        this.props.dispatch(
          apiActionsAdmin.loadTestList(this.props.location.state.id),
        );
      } else {
        this.props.dispatch(
          apiActionsAdmin.loadTestList(
            this.props.location.state.id,
            this.props.selectedFilterChapter.id,
          ),
        );
      }
      this.props.dispatch(
        apiActions.loadTestBookChapter(this.props.location.state.id),
      );
    }
  }
  // Go TO View Test
  goToViewTest = (id, rowNumber) => {
    this.props.history.push({
      pathname: `/view-test`,
      state: { id, rowNumber },
    });
  };
  filterTestBook = id => {
    if (id.target.value !== '') {
      this.setState({ selectedChapter: id.target.value });
      setTimeout(() => {
        this.props.dispatch(
          apiActionsAdmin.loadTestList(
            this.props.location.state.id,
            Number(id.target.value),
          ),
        );
        this.props.dispatch(apiActionsAdmin.selectedFilterChapter(id.chapter));
      }, 300);
    } else {
      this.setState({ selectedChapter: null });
      this.props.dispatch(
        apiActionsAdmin.loadTestList(this.props.location.state.id, null),
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.loadTestBookChapter !== prevProps.loadTestBookChapter) {
      this.props.dispatch(apiActionsAdmin.selectedFilterChapter(null));
    }
  }
  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.loadTestList(0));
    this.props.dispatch(apiActions.loadTestBookChapter(0));
  }
  render() {
    let testBookChapterOption = [];
    if (this.props.loadTestBookChapter) {
      this.props.loadTestBookChapter.forEach(data => {
        testBookChapterOption.push({
          id: data.pkChapterTestBook,
          label: data.chapterTestBookName,
          value: data.chapterTestBookName,
        });
      });
    }
    return (
      <Page
        className="TestPage"
        title={`تست های ${
          this.props.location.state ? this.props.location.state.name : ''
        }`}
      >
        <Row>
          <Col className="bg-white">
            <div className="col-12 d-flex flex-column pr-0 pt-3">
              <h5 className="text-dark" style={{ fontSize: '0.95rem' }}>
                فیلتر تست ها بر اساس فصل کتاب تست
              </h5>
              <Select
                closeMenuOnSelect={true}
                isClearable={() =>
                  this.setState({ defualtTestBookChapter: null })
                }
                noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                key={testBookChapterOption.map(item => item.label)}
                name="answer-select"
                id="answer-select"
                className={'direction-right col-3 text-right text-dark mt-2'}
                placeholder="فصل کتاب تست"
                options={testBookChapterOption}
                defaultValue={
                  testBookChapterOption
                    ? !this.props.selectedFilterChapter ||
                      this.props.selectedFilterChapter === ''
                      ? testBookChapterOption[0]
                      : this.props.selectedFilterChapter
                    : ''
                }
                // value={this.state.defualtTestBookChapter}
                onChange={val => {
                  if (val !== null) {
                    this.filterTestBook({
                      target: { value: val.id },
                      chapter: val,
                    });
                  } else {
                    this.setState({
                      defualtTestBookChapter: null,
                      selectedChapter: null,
                    });
                    this.filterTestBook({
                      target: { value: '' },
                    });
                  }
                }}
              />
            </div>

            <TeachersTestTable
              key={this.props.users}
              newdata={this.props.loadTestList}
              goToViewTest={this.goToViewTest}
            />
          </Col>
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
    loadTestList: state.apiAdmin.loadTestList,
    loadTestBookChapter: state.api.loadTestBookChapter,
    selectedFilterChapter: state.apiAdmin.selectedChapter,
  };
}
export default connect(mapStateToProps)(TestPage);
