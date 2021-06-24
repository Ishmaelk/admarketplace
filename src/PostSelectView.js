import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from './PostProvider';
import Select, { components } from 'react-select';
import { makeStyles } from '@material-ui/core';

const dropdownStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
  }),
  container: (provided, state) => ({
    ...provided,
    width: '400px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#FFF' : '#000',
    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    display: 'flex',
    flexDirection: 'row'
  })
}

const CustomOption = function({ children, data, ...rest }) {
  return (
    <components.Option {...rest}>
      <Link to={`posts/${data.value.id}`}>
        {children}
      </Link>
    </components.Option>
  )
}

export default function View1() {

  const classes = useStyles();

  const { posts } = useContext(PostContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = useMemo(() => posts.map(post => ({ label: post.title, value: post })), [posts])

  const handleOnChange = function(option) {
    setSelectedOption(option);
  }

  return (
    <div className={classes.container}>
      <Select
        components={{ Option: CustomOption }}
        styles={dropdownStyles}
        options={options}
        placeholder='Select a post'
        onChange={handleOnChange}
        value={selectedOption} />
    </div>
  );

}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '100px',
    '& a': {
      color: 'blue',
      textDecoration: 'none'
    }
  },
  optionLink: {

  }
});