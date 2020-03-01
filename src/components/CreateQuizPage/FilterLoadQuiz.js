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

  return (
    <div>
      <ListGroup flush className="bg-white direction-right pr-0">
        {/* <h5 className="py-2" style={{ paddingRight: '30px' }}>
          فیلتر تست
        </h5> */}
        <div className="d-flex flex-wrap mb-4">
          <ListGroupItem className="d-flex flex-column border-0 mb-0 col-sm-12 col-md-6 col-lg-4 p-0">
            {/* <span className="text-muted">کتاب</span> */}
            <Select
              closeMenuOnSelect={true}
              isClearable
              key={booksOption.map(item => item.label)}
              name="answer-select"
              id="answer-select"
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              className={'direction-right w-100 mt-2 text-right'}
              placeholder="فیلتر آزمون ها بر اساس کتاب"
              options={booksOption}
              onChange={val => {
                if (val !== null) {
                  props.filterByTestBook({
                    target: { value: val.id },
                  });
                } else {
                  props.filterByTestBook({
                    target: { value: '' },
                  });
                }
              }}
              //   defaultValue={
              //     props.selectedQuiz
              //       ? booksOption.find(
              //           opt => opt.id === props.selectedQuiz.bookId,
              //         )
              //       : null
              //   }
            />
          </ListGroupItem>
        </div>
      </ListGroup>
    </div>
  );
}

export default FilterQuiz;
