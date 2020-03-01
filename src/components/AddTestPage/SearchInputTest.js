import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

const SearchInputTest = props => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        className="cr-search-form__input text-right"
        placeholder="... جستجو"
        onChange={e => props.searched(e.currentTarget.value)}
      />
    </Form>
  );
};

export default SearchInputTest;
