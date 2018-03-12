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

