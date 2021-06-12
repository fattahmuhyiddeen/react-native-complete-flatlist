import React from 'react';
import Highlighter from "react-native-highlight-words";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  RefreshControl,
  Animated,
} from 'react-native';

class CompleteFlatList extends React.Component {
  state = {
    refreshing: false,
    searchText: '',
    rowScale: new Animated.Value(0),
    slide: new Animated.Value(0),
  };

  static defaultProps = {
    searchKey: [],
    placeholder: "Search ...",
    data: [],
    isRefreshing: false,
    renderItem: null,
    renderSeparator: () => <View style={styles.defaultSeparator} />,
    pullToRefreshCallback: null,
    onSearch: null,
    highlightColor: '',
    backgroundStyles: {},
    searchTextInputStyle: {},
    searchBarBackgroundStyles: {},
    showSearch: true,
    isJelly: false,
    slide: 'none',
    elementBetweenSearchAndList: null
  };

  constructor(props, defaultProps) {
    super(props, defaultProps)
    const { refreshOnLoad = true, pullToRefreshCallback } = props
    if (pullToRefreshCallback !== null && refreshOnLoad) {
      pullToRefreshCallback();
    }
  }

  componentDidMount() {
    if (this.props.slide != 'none') {
      Animated.spring(this.state.slide, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true,
      }).start();
    }
  }

  clearSearch = () => this.setState({ searchText: "" }, this.searchInput.clear)

  onRefresh = () => {
    this.props.pullToRefreshCallback();
    this.setState({ refreshing: true });
    setTimeout(() => this.setState({ refreshing: false }), 7000);
  };

  refresh = () => {
    this.setState({ refreshing: false, data: this.props.data });
  };

  filterText = () => {
    const { data, searchKey, highlightColor, onSearch } = this.props;
    if (this.state.searchText === '' || onSearch !== null) {
      return data;
    }
    const searchText = this.state.searchText.toLowerCase();
    const filteredData = [];
    for (let d = 0; d < data.length; d += 1) {
      dt = data[d];
      for (let s = 0; s < searchKey.length; s += 1) {
        sk = searchKey[s];
        const target = dt[sk];
        if (typeof target === "undefined" || target == null) {
          continue;
        }
        if (target.toLowerCase().indexOf(searchText) !== -1) {
          if (highlightColor === "") {
            filteredData.push(dt);
            break;
          }
          const row = {};
          row.cleanData = dt
          const keys = Object.keys(dt);
          for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            if (typeof dt[key] === "string") {
              row[key] = (
                <Highlighter
                  highlightStyle={{ backgroundColor: highlightColor }}
                  searchWords={[searchText]}
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

  onScrollBeginDrag = () => {
    Animated.spring(this.state.rowScale, {
      toValue: 5,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  onScrollEndDrag = () => {
    Animated.spring(this.state.rowScale, {
      toValue: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      renderItem,
      renderSeparator,
      pullToRefreshCallback,
      isRefreshing,
      backgroundStyles,
      searchBarBackgroundStyles,
      onSearch,
      placeholder,
      searchTextInputStyle,
      showSearch,
      isJelly,
      slide,
    } = this.props;
    const { searchText } = this.state;
    const filteredData = this.filterText();

    const scaleY = !isJelly ? 1 : this.state.rowScale.interpolate({
      inputRange: [0, 5],
      outputRange: [1, 0.9],
    });

    const jellyProps = isJelly ? {
      onScrollBeginDrag: this.onScrollBeginDrag,
      onScrollEndDrag: this.onScrollEndDrag,
    } : {}

    const searchbar = (
      <View style={[styles.searchBarContainer, searchBarBackgroundStyles]}>
        <TextInput
          ref={c => this.searchInput = c}
          style={[styles.searchBar, searchTextInputStyle]}
          placeholder={placeholder}
          clearButtonMode="while-editing"
          placeholderTextColor="#919188"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={searchText => this.setState({ searchText })}
          value={searchText}
          maxLength={100}
          returnKeyType='search'
          onSubmitEditing={() => onSearch && onSearch(this.state.searchText)}
        />
      </View>
    );

    return (
      <View style={[styles.container, backgroundStyles]}>
        {showSearch && searchbar}
        {this.props.elementBetweenSearchAndList}
        <FlatList
          style={{ height: '100%' }}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<Text style={styles.noData}>No data available</Text>}
          scrollEventThrottle={16}
          {...this.props}
          {...jellyProps}
          refreshControl={
            onSearch !== null ? (
              <RefreshControl refreshing={isRefreshing} onRefresh={() => onSearch(searchText)} />
            )
              :
              pullToRefreshCallback !== null ? (
                <RefreshControl refreshing={isRefreshing} onRefresh={pullToRefreshCallback} />
              ) : null
          }
          data={filteredData}
          renderItem={({ item, index, separators }) => {
            const translateX = slide == 'none' ? 0 : this.state.slide.interpolate({
              inputRange: [0, 1],
              outputRange: [((slide == 'right' ? 1 : -1) * ((index + 1) * 500)), 0],
            });
            return <Animated.View style={{ transform: [{ scaleY }, { translateX }] }}>{renderItem({ item, index, separators })}</Animated.View>
          }}
          style={styles.flatList}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  noData: { alignSelf: "center", textAlign: "center", marginTop: 20 },
  searchBarContainer: {
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    width: "100%"
  },
  searchBar: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 38,
    fontSize: 15,
    width: "100%",
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: '100%',
  },
  defaultSeparator: {
    height: 1,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#f2f2f2"
  },
  flatList: { height: "100%", width: "100%", backgroundColor: "transparent" }
});

export default CompleteFlatList;