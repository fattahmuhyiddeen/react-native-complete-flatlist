# react-native-complete-flatlist
Extended version of react native flat list with many built in function such as search, pull to refresh, no data available message if empty row

![ezgif-3-734272a58f](https://user-images.githubusercontent.com/24792201/35842001-724e51be-0b3a-11e8-8a4b-77eb8b4ed17f.gif)

Usage : 



```

import React, { Component } from 'react';
import { View, Text, Image, Platform, StatusBar } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';


const data = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];

class App extends Component {
  cell(data) {
    return <Text>{data.name}</Text>;
  }

  render() {
    const { navigation } = this.props;
    return (
      <CompleteFlatList
      searchKey={['name', 'status', 'time', 'date']}
      highlightColor="yellow"
      pullToRefreshCallback={() => {
        alert('refreshing');
      }}
      data={data}
      renderSeparator={null}
      renderItem={this.cell.bind(this)}
    />
    );
  }
}



```



### Properties
|Prop|Type|Description|Default|Required|
|----|----|-----------|-------|--------|
|`data`|array of objects|Data to be rendered in the list|[]|Required (come on, ofcourse u need data for this)|
|`renderEmptyRow`|function that return a JSX element|Will be rendered when data is empty or search does not match any keyword|```()=><Text style={styles.noData}>{'No data available'}</Text>```|Optional|
|`backgroundStyles`|style object|Style of the flatlist background|null|Optional|
|`searchBarBackgroundStyles`|style object|Style of the searchbar background|null|Optional|
|`pullToRefreshCallback`|function|Callback function when user pull to refresh|null|Optional (Pull to refresh will not be available if this is not supplied|
|`isRefreshing`|boolean|if true, the loading will be shown on top of the list. Can only be used if prop `pullToRefreshCallback` not null|false|Optional|
|`renderItem`|function that return a JSX element (Just like RN's ListView and FlatList)|Template of a row in the Flat List|null (open for PR if anyone wish to make default template for this)|Required (since I dont do default template yet) |
|`renderSeparator`|function that return a JSX element to be rendered between rows(Just like RN's ListView and FlatList)|Template of separator in the Flat List|a thin line|Optional|
|`placeholder`|string|Placeholder of search field|"Search ..."|Optional|
|`highlightColor`|color|color of higlighted words background when match search keyword|yellow|Optional|
|`searchKey`|array of string|This should be name of keys available in data which will be use to search|null|Optional (if not supplied, search field will not appear)|
|`elementBetweenSearchAndList`|JSX element|What to render between searchbar and the list|null|Optional|
|`refreshOnLoad`|boolean|If `true`, prop `pullToRefreshCallback` will be called if available|true|Optional|
|`onSearch`|function that will replace `pullToRefreshCallback`|If exist, `pullToRefreshCallback` will be overrided, but search will not affect on key press, but on return key pressed. `onSearch` will automatic get `keyword` parameter|()=>null|Optional|