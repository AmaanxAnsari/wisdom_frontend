// // TagsSelect.js

import React from 'react';
import Select, { components } from 'react-select';

const TagsSelect = ({ options, selectedTags, handleTagChange, handleCreateOption, handleInputChange, inputValue }) => {
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCreateOption(props.selectProps.inputValue);
            }}
          >
            ➕
          </div>
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <Select
      isMulti
      isCreatable  // Enable creatable
      options={options.map((tag) => ({
        label: tag,
        value: tag,
      }))}
      value={selectedTags.map((tag) => ({
        label: tag,
        value: tag,
      }))}
      onChange={handleTagChange}
      onCreateOption={handleCreateOption}
      components={{ DropdownIndicator }}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      placeholder="Create or select tags"
    />
  );
};

export default TagsSelect;
