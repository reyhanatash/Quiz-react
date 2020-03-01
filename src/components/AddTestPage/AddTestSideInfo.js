import React from 'react';
import AuthorCard from '../Card/AuthorCard';
import { ListGroup, ListGroupItem, PopoverBody } from 'reactstrap';
import { AnimateOnChange } from 'react-animation';

export default function AddTestSide(props) {
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
  const foundSubBook = subBookOptions.find(
    opt => opt.id === props.selectedTest.fldFkSubBookChapter,
  );
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
  const foundTopic = TopicOptions.find(
    opt => opt.id === props.selectedTest.fldFkTopic,
  );
  return (
    <div style={{ height: '38%' }} className="d-flex align-items-center">
      <PopoverBody
        className="p-0 border-light tests-side-info"
        key={props.selectedTest}
      >
        <AuthorCard
          title="مشخصات تست"
          className="border-light text-dark tests-info-header"
        >
          <ListGroup flush className="flex-column-reverse bg-primary">
            <ListGroupItem
              className="bg-light tests-info-body rounded-0"
              key={props.selectedTest}
            >
              <span className="bg-primary text-white tests-info-item direction-right">
                {/* <AnimateOnChange durationOut={250}> */}
                فصل کتاب تست : {props.selectedTest.fldTestBookChapterName}
                {/* </AnimateOnChange> */}
              </span>
              <span className="bg-primary text-white tests-info-item direction-right">
                {/* <AnimateOnChange durationOut={250}> */}
                فصل کتاب درسی : {props.selectedTest.fldBookChapterName}
                {/* </AnimateOnChange> */}
              </span>
              <span className="bg-primary text-white tests-info-item direction-right">
                {/* <AnimateOnChange durationOut={250}> */}
                زیر فصل کتاب درسی : {foundSubBook ? foundSubBook.label : ' '}
                {/* </AnimateOnChange> */}
              </span>
              <span className="bg-primary text-white tests-info-item direction-right">
                {/* <AnimateOnChange durationOut={250}> */}
                مبحث کتاب درسی : {foundTopic ? foundTopic.label : ' '}
                {/* </AnimateOnChange> */}
              </span>
              <span className="bg-primary text-white tests-info-item direction-right">
                {/* <AnimateOnChange durationOut={250}> */}
                سطح سوال : {props.selectedTest.fldLevel}
                {/* </AnimateOnChange> */}
              </span>
            </ListGroupItem>
          </ListGroup>
        </AuthorCard>
      </PopoverBody>
    </div>
  );
}
