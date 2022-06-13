
import React from 'react';
import Highlighter from "react-native-highlight-words";

const filterText = ({ data, searchKey, highlightColor, onSearch, searchText }) => {
    if (!searchText || !!onSearch) return data;

    const filteredData = [];
    for (const dt of data) {
      for (let s = 0; s < searchKey.length; s++) {
        sk = searchKey[s];
        const target = dt[sk];
        if (!target) continue;

        if (target.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          if (!highlightColor) {
            filteredData.push(dt);
            break;
          }
          const row = {};
          row.cleanData = dt;
          const keys = Object.keys(dt);
          for (const key of keys) {
            if (typeof dt[key] === "string") {
              row[key] = (
                <Highlighter
                  highlightStyle={{ backgroundColor: highlightColor }}
                  searchWords={[searchText.toLowerCase()]}
                  textToHighlight={dt[key]}
                />
              );
            }
          }
          filteredData.push(row);
          break;
        }
      }
    }
    return filteredData;
  };

  export default filterText;