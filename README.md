# react-native-complete-flatlist

Extended version of react native flat list with many built in function such as search, pull to refresh, no data available message if empty row

![ezgif-3-734272a58f](https://user-images.githubusercontent.com/24792201/35842001-724e51be-0b3a-11e8-8a4b-77eb8b4ed17f.gif)

Caution:

`renderItem` props return `item` and `index` parameters
`item` parameter returns a single element in `item` array. But if search text is not empty dan `highlightColor` props is set to any color, `item` parameter will return new structure of JSON object (in order to render highlighted text in jsx). This might break your logic. Therefore, if you want to access original structure of your data, it will be under `item.cleanData`. Remember, `item.cleanData` only exist if `highlightColor` props and search textfield is not empty (user is searching)

Usage :

```
import React, {useRef} from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';

const list = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Ali', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Abu', status: 'Active', time: '8:11 PM', date: '1 Jan 2018' },
  { name: 'Fitri', status: 'Active', time: '8:20 PM', date: '1 Jan 2018' },
  { name: 'Armi', status: 'Active', time: '8:33 PM', date: '1 Jan 2018' },
  { name: 'Eidit', status: 'Active', time: '9:10 PM', date: '1 Jan 2018' },
  { name: 'Hamdan', status: 'Active', time: '10:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];

const App = () => {
  const ref = useRef();
  const renderItem = ({item, index}) => {
    const data = item.cleanData ? item.cleanData : item;

    console.log('item (if search bar is not empty and prop highlightColor is not empty, item will contains extra data to enable highlight feature)', item);
    console.log('cleanData (if search bar is not empty and prop highlightColor is not empty, cleanData will contain original data structure without extra data)', item.cleanData);


    console.log('this is index number : ' + index);

    console.log(data + ' this is original data');

    return <Text>{item.name}</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CompleteFlatList
        searchKey={['name', 'status', 'time', 'date']}
        pullToRefreshCallback={() => console.log('refreshing')}
        data={list}
        // renderSeparator={null}
        ref={ref}
        highlightColor="yellow"
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => ref.current.clearSearch()} style={{ padding: 5 }}>
        <Text>Clear Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;



```

### Upgrading from V 1.x.x to V 2.x.x

Change from `renderItem={(data, index) => {} }` to `renderItem={({item, index, separators}) => {} }` (similar like the on in Original Flatlist)

### Properties

All FlatList props should work plus props mentioned below

| Prop                          | Type                                                                                                 | Description                                                                                                                                                                                                                                                                                                               | Default                                                             | Required                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `showSearch`                  | boolean                                                                                              | If `true` (and `searchKey` prop is defined), search bar will be shown.                                                                                                                                                                                                                                                    | true                                                                | Optional                                                                |
| `isJelly`                     | boolean                                                                                              | If `true`, when user scroll, the list will expand a lil bit, and when user stop drag, the list will back to original size (iMessage on iPhone style)                                                                                                                                                                      | false                                                               | Optional                                                                |
| `slide`                       | string                                                                                               | Animation how every items come into the list. Can be "none", "left" or "right"                                                                                                                                                                                                                                            | `none`                                                              | Optional                                                                |
| `data`                        | array of objects                                                                                     | Data to be rendered in the list                                                                                                                                                                                                                                                                                           | []                                                                  | Required (come on, ofcourse u need data for this)                       |
| `backgroundStyles`            | style object                                                                                         | Style of the flatlist background                                                                                                                                                                                                                                                                                          | null                                                                | Optional                                                                |
| `searchBarBackgroundStyles`   | style object                                                                                         | Style of the searchbar background                                                                                                                                                                                                                                                                                         | null                                                                | Optional                                                                |
| `pullToRefreshCallback`       | function                                                                                             | Callback function when user pull to refresh                                                                                                                                                                                                                                                                               | null                                                                | Optional (Pull to refresh will not be available if this is not supplied |
| `isLoading`                   | boolean                                                                                              | if true, the loading will be shown on top of the list.                                                                                                                                                                                                                                                                    | false                                                               | Optional                                                                |
| `renderItem`                  | function that return a JSX element (Just like RN's ListView and FlatList)                            | Template of a row in the Flat List                                                                                                                                                                                                                                                                                        | null (open for PR if anyone wish to make default template for this) | Required (since I dont do default template yet)                         |
| `renderSeparator`             | function that return a JSX element to be rendered between rows(Just like RN's ListView and FlatList) | Template of separator in the Flat List                                                                                                                                                                                                                                                                                    | `() => <View style={{ height: 1, width: "80%", alignSelf: "center", backgroundColor: "#f2f2f2" }} />`                                                    | Optional                                                                |
| `placeholder`                 | string                                                                                               | Placeholder of search field                                                                                                                                                                                                                                                                                               | "Search ..."                                                        | Optional                                                                |
| `searchTextInputStyle`        | object (style for React Native's TextInput component)                                                | style for search field                                                                                                                                                                                                                                                                                                    | null                                                                | Optional                                                                |
| `highlightColor`              | color                                                                                                | color of higlighted words background when match search keyword. Please read the pre caution if using this prop on top of the readme                                                                                                                                                                                       | yellow                                                              | Optional                                                                |
| `searchKey`                   | array of string                                                                                      | This should be name of keys available in data which will be use to search. If this prop is not supplied, search text input will not be rendered. `**Warning: nested key not yet supported`                                                                                                                                | []                                                                | Optional (if not supplied, search field will not appear)                |
| `elementBetweenSearchAndList` | JSX element                                                                                          | What to render between searchbar and the list                                                                                                                                                                                                                                                                             | null                                                                | Optional                                                                |
| `refreshOnLoad`               | boolean                                                                                              | If `true`, prop `pullToRefreshCallback` will be called if available                                                                                                                                                                                                                                                       | true                                                                | Optional                                                                |
| `onSearch`                    | function that will replace `pullToRefreshCallback`                                                   | If exist, `pullToRefreshCallback` will be overrided. This will not triggered on key press, but on return key pressed. This props is introduced if search trigger result from API. If you just want local search (search from existing array), this props is not needed. `onSearch` will automatic get `keyword` parameter | ()=>null                                                            | Optional                                                                |

### Methods

If you have `ref` to the component,
```
const completeFlatList = useRef();
...
 <CompleteFlatList
   ...
    ref={completeFlatList}
   ...
 />

```

or in component based

```

<CompleteFlatList
   ...
   ref={c => this.completeFlatList = c}
   ...
/>
```

you can use any method(s) below:
```completeFlatList.current.methodName()```

or in component based

```this.completeFlatList.methodName()```

| Method      | Description                         |
| ----------- | ----------------------------------- |
| clearSearch | Clear search input programmatically |
