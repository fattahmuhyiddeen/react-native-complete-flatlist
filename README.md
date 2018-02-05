# react-native-complete-flatlist
Extended version of react native flat list with many built in function such as search

Usage : 



```

import React, { Component } from 'react';
import { View, Text, Image, Platform, StatusBar } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';

class App extends Component {
  cell(data) {
    return <Text>{data.name}</Text>;
  }

  render() {
    const { navigation } = this.props;
    return (
      <CompleteFlatList
        searchKey={['name']}
        pullToRefreshCallback={() => {
          console.log('refreshing');
          //what to do when refresh. refresh loading will dismiss after 7 secs
        }}
        data={[
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
          { name: 'Fattah' },
          { name: 'Muhyiddeen' },
          { name: 'Develop' },
        ]}
        renderItem={this.cell.bind(this)}
      />
    );
  }
}



```




![ezgif-4-cf55f9d77a](https://user-images.githubusercontent.com/24792201/35791132-05755c86-0a81-11e8-8c1d-793b043abeea.gif)
