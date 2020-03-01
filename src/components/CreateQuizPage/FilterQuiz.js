import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'reactstrap';
import Select from 'react-select';

function FilterQuiz(props) {
  ////////////////////////// Books ///////////////////////////////
  let booksOption = [];
  if (props.Books) {
    props.Books.forEach(data => {
      booksOption.push({
        id: data.fldPkTestBook,
        label: data.testBookName,
        value: data.testBookName,
      });
    });
  }
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
        id: data.fldPkHashtag,
        label: data.fldHashtagName,
        value: data.fldPkHashtag,
      });
    });
  }

  return (
    <Col>
      <ListGroup
        flush
        className="bg-white direction-right pr-0 py-2 quiz-box-shadow"
      >
        <h5 className="py-2" style={{ paddingRight: '30px' }}>
          فیلتر تست
        </h5>
        <Col className="d-flex flex-wrap mb-0">
          <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
            <span className="text-muted">کتاب</span>
            <Select
              closeMenuOnSelect={true}
              isClearable
              key={booksOption.map(item => item.label)}
              name="answer-select"
              id="answer-select"
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              className={'direction-right w-100 mt-2 text-right'}
              placeholder="شیمی سوم"
              options={booksOption}
              onChange={val => {
                if (val !== null) {
                  props.loadTestBookChapter({
                    target: { value: val.id },
                  });
                } else {
                  props.loadTestBookChapter({
                    target: { value: '' },
                  });
                }
              }}
              defaultValue={
                props.selectedQuiz
                  ? booksOption.find(
                      opt => opt.id === props.selectedQuiz.bookId,
                    )
                  : null
              }
            />
          </ListGroupItem>
          <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4">
            <span className="text-muted">فصل کتاب تست</span>
            <Select
              closeMenuOnSelect={true}
              isClearable
              key={testBookOption.map(item => item.label)}
              name="answer-select"
              id="answer-select"
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              className={'direction-right w-100 mt-2 text-right'}
              placeholder="تفکیک اسید ها"
              options={testBookOption}
              onChange={val => {
                if (val !== null) {
                  props.loadBookChapter({
                    target: { value: val.id },
                  });
                } else {
                  props.loadBookChapter({
                    target: { value: '' },
                  });
                }
              }}
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
              key={HashtagsOptions.map(item => item.label)}
              name="answer-select"
              id="answer-select"
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              className={'direction-right w-100 mt-2 text-right'}
              placeholder="کنکوری"
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
        </Col>
      </ListGroup>
    </Col>
  );
}

export default FilterQuiz;
