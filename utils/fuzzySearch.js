import React from 'react';
import Fuse from 'fuse.js';
import Highlighter from 'react-native-highlight-words';

const mapTurkishCharacters = str => {
  const charMap = {
    ş: 's',
    Ş: 'S',
    ğ: 'g',
    Ğ: 'G',
    ü: 'u',
    Ü: 'U',
    ö: 'o',
    Ö: 'O',
    ı: 'i',
    İ: 'I',
    ç: 'c',
    Ç: 'C',
  };

  return str
    .split('')
    .map(char => charMap[char] || char)
    .join('');
};

const filterText = ({data, searchKey, highlightColor, onSearch, searchText}) => {
  if (!searchText || !!onSearch) return data;

  const processedSearchText = mapTurkishCharacters(searchText);

  const processedData = data.map(item => ({
    ...item,
    _fuzzyData: mapTurkishCharacters(item[searchKey[0]]), // Assuming searchKey[0] is the primary field you're searching.
  }));

  // Setup Fuse.js options
  const fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['_fuzzyData'],
    includeScore: true,
  };

  // Create an instance of Fuse with the processed data and the defined options
  const fuse = new Fuse(processedData, fuseOptions);

  // Perform the search
  const results = fuse.search(processedSearchText);

  // Process the results for highlighting and other needs
  const filteredData = results.map(resultItem => {
    if (!highlightColor) return resultItem.item;

    const row = {};
    row.cleanData = resultItem.item;
    const keys = Object.keys(resultItem.item);
    for (const key of keys) {
      if (typeof resultItem.item[key] === 'string') {
        row[key] = (
          <Highlighter
            highlightStyle={{backgroundColor: highlightColor}}
            searchWords={[searchText]}
            textToHighlight={resultItem.item[key]}
          />
        );
      }
    }
    return row;
  });

  return filteredData;
};

export default filterText;
