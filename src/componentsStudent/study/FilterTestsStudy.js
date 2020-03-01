import React from 'react';
import { ListGroup, ListGroupItem, Col, Input } from 'reactstrap';
import Select from 'react-select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

function FilterQuiz(props) {
  ////////////////////////// Books ///////////////////////////////
  let statusOption = [
    {
      id: 1,
      label: 'نیاز به مرور دارم',
      value: 1,
    },
    {
      id: 2,
      label: 'نیاز به مرور ندارم',
      value: 2,
    },
    {
      id: 3,
      label: 'رد میکنم',
      value: 3,
    },
  ];
  ///////////////////////////////////////// Tests Options ///////////////////////
  let testBookOption = [];
  if (props.TestBookChapter) {
    props.TestBookChapter.forEach(data => {
      testBookOption.push({
        id: data.pkChapterTestBook,
        label: data.chapterTestBookName,
        value: data.chapterTestBookName,
      });
    });
  }
  //////////////////////////////////////////// Books Options ///////////////
  let bookChapterOption = [];
  if (props.BookChapter) {
    props.BookChapter.forEach(data => {
      bookChapterOption.push({
        id: data.fldPkBookChapter,
        label: data.fldBookChapterName,
        value: data.fldBookChapterName,
      });
    });
  }
  ///////////////////////////////////////// SubBook Options  /////////////
  let subBookOptions = [];
  if (props.SubBook) {
    props.SubBook.forEach(data => {
      subBookOptions.push({
        id: data.fldPkSubBookChapter,
        label: data.fldName,
        value: data.fldName,
      });
    });
  }
  ///////////////////////////////////////// Topic Options  //////////////
  let TopicOptions = [];
  if (props.Topic) {
    props.Topic.forEach(data => {
      TopicOptions.push({
        id: data.fldPkTopic,
        label: data.fldName,
        value: data.fldName,
      });
    });
  }
  ///////////////////////////////////////// Hashtags Options  //////////////
  let HashtagsOptions = [];
  if (props.Hashtags) {
    props.Hashtags.forEach(data => {
      HashtagsOptions.push({
        id: data.pk,
        label: data.hashtag,
        value: data.pk,
      });
    });
  }
  return (
    <div className="container px-0 position-relative">
      <ListGroup flush className="direction-right pr-0 py-2 ">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h5
              className="py-3 mb-0"
              style={{ paddingRight: '45px', fontSize: '19px' }}
            >
              فیلتر تست
            </h5>{' '}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Col className="d-flex flex-wrap mb-0">
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">فصل کتاب تست</span>
                <Input
                  disabled
                  name="answer-select"
                  id="answer-select"
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="تفکیک اسید ها"
                  value={
                    props.loadTestBookChapter ? props.loadTestBookChapter : ''
                  }
                />
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">فصل کتاب درسی</span>
                <Select
                  closeMenuOnSelect={true}
                  isClearable
                  key={bookChapterOption.map(item => item.label)}
                  name="answer-select"
                  id="answer-select"
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="مولکول ها در خدمت تندرستی"
                  options={bookChapterOption}
                  onChange={val => {
                    if (val !== null) {
                      props.loadSubBook({
                        target: { value: val.id },
                      });
                    } else {
                      props.loadSubBook({
                        target: { value: '' },
                      });
                    }
                  }}
                />
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">زیرفصل</span>
                <Select
                  closeMenuOnSelect={true}
                  isClearable
                  key={subBookOptions.map(item => item.label)}
                  name="answer-select"
                  id="answer-select"
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="بخش اول"
                  options={subBookOptions}
                  onChange={val => {
                    if (val !== null) {
                      props.loadTopic({
                        target: { value: val.id },
                      });
                    } else {
                      props.loadTopic({
                        target: { value: '' },
                      });
                    }
                  }}
                />
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">مبحث</span>
                <Select
                  closeMenuOnSelect={true}
                  isClearable
                  key={TopicOptions.map(item => item.label)}
                  name="answer-select"
                  id="answer-select"
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="مبحث اول"
                  options={TopicOptions}
                  onChange={val => {
                    if (val !== null) {
                      props.onChangeTopic({
                        target: { value: val.id },
                      });
                    } else {
                      props.onChangeTopic({
                        target: { value: '' },
                      });
                    }
                  }}
                />
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">هشتگ</span>
                <Select
                  closeMenuOnSelect={true}
                  isClearable
                  key={
                    props.Hashtags
                      ? props.Hashtags
                      : HashtagsOptions.map(item => item.label)
                  }
                  name="answer-select"
                  id="answer-select"
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="سخت"
                  options={HashtagsOptions}
                  onChange={val => {
                    if (val !== null) {
                      props.onChangeHashtag({
                        target: { value: val.id },
                      });
                    } else {
                      props.onChangeHashtag({
                        target: { value: '' },
                      });
                    }
                  }}
                />
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
                <span className="text-muted">وضعیت</span>
                <Select
                  closeMenuOnSelect={true}
                  isClearable
                  key={statusOption.map(item => item.label)}
                  name="answer-select"
                  id="answer-select"
                  noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                  className={'direction-right w-100 mt-2 text-right'}
                  placeholder="نیاز به مرور دارم"
                  options={statusOption}
                  onChange={val => {
                    if (val !== null) {
                      props.onChangeStudyStatus({
                        target: { value: val.id },
                      });
                    } else {
                      props.onChangeStudyStatus({
                        target: { value: '' },
                      });
                    }
                  }}
                  defaultValue={
                    props.selectedQuiz
                      ? statusOption.find(
                          opt => opt.id === props.selectedQuiz.bookId,
                        )
                      : null
                  }
                />
              </ListGroupItem>
            </Col>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </ListGroup>
    </div>
  );
}

export default FilterQuiz;
