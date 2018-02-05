import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

class CompleteFlatList extends Component {
  constructor(props) {
    super(props);

    this.filterText = this.filterText.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      behavior: 'padding',
      refreshing: false,
      searchText: '',
    };
  }

  onRefresh() {
    this.props.pullToRefreshCallback();
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 7000);
  }

  refresh() {
    if (this.props.data.length === 0) {
      filtereddata = [{ type: 'emptyrow', name: 'No data available' }];
    }
    filtereddata = this.props.data;
    this.setState({ refreshing: false, data: filtereddata });
  }

  filterText() {
    const { data, searchKey } = this.props;
    const { searchText } = this.state;

    if (searchText === '') {
      return data;
    }

    const filteredData = [];
    for (let d = 0; d < data.length; d++) {
      dt = data[d];
      for (let s = 0; s < searchKey.length; s++) {
        sk = searchKey[s];
        const target = dt[sk];
        if (target.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          filteredData.push(dt);
        }
      }
    }

    return filteredData;
  }

  renderEmptyRow = () => <Text style={styles.noData}>No data available</Text>;

  render() {
    const { renderItem, renderSeparator, pullToRefreshCallback } = this.props;
    const filteredData = this.filterText();
    if (filteredData.length === 0) {
      filteredData.push({ showEmptyRow: true });
    }

    const searchbar = (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search ..."
          clearButtonMode="while-editing"
          placeholderTextColor="#919188"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text =>
            this.setState({
              searchText: text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
            })
          }
          value={this.state.searchText}
          maxLength={100}
        />
      </View>
    );

    const refreshcontrol =
      pullToRefreshCallback == null ? null : (
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      );

    return (
      <KeyboardAvoidingView
        behavior={this.state.behavior}
        style={styles.container}
      >
        {this.props.searchKey.length > 0 && searchbar}
        <FlatList
          refreshControl={refreshcontrol}
          data={filteredData}
          renderItem={item =>
            (filteredData.length === 1 && filteredData[0].showEmptyRow !== null
              ? this.renderEmptyRow()
              : renderItem(item.item))
          }
          style={styles.flatList}
          ItemSeparatorComponent={renderSeparator}
        />
      </KeyboardAvoidingView>
    );
  }
}

CompleteFlatList.propTypes = {
  searchKey: PropTypes.array,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  renderSeparator: PropTypes.func,
  pullToRefreshCallback: PropTypes.func,
};
CompleteFlatList.defaultProps = {
  searchKey: [],
  data: [],
  renderItem: null,
  renderSeparator: () => <View style={styles.defaultSeparator} />,
  pullToRefreshCallback: null,
};

const styles = StyleSheet.create({
  noData: { alignSelf: 'center', textAlign: 'center', marginTop: 20 },
  searchBarContainer: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#a7a7a8',
    width: '100%',
  },
  searchBar: {
    borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: 'white',
    height: 44,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  defaultSeparator: { height: 1, backgroundColor: '#CCCCCC' },
  flatList: { height: '100%', width: '100%', backgroundColor: 'transparent' },
});

export default CompleteFlatList;
