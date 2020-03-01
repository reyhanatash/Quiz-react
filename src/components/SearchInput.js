import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

const SearchInput = props => {
  // let searchWord = '';
  // const searchData = props.searchTest;
  // if (searchData) {
  //   const filterTest = searchData.filter(x =>
  //     x.name.toLowerCase().includes(searchWord.toLowerCase()),
  //   );
  //   var filterData = JSON.parse(JSON.stringify(searchData));
  //   console.log(filterData);
  //   console.log(filterTest);
  // }
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="... جستجو"
        // value={props.searchTest}
        // onChange={e => console.log(e.currentTarget.value)}
        // onChange={searchWord => this.setState({ searchWord })}
        // value={searchWord}
      />
    </Form>
  );
};

export default SearchInput;
