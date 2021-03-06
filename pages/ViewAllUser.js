import React from "react";
import { FlatList, Text, View } from "react-native";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("UserDatabase.db");

export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: []
    };
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              key={item.user_id}
              style={{ backgroundColor: "white", padding: 20 }}
            >
              <Text>Id: {item.user_id}</Text>
              <Text>Name: {item.user_name}</Text>
              <Text>Contact: {item.user_contact}</Text>
              <Text>Address: {item.user_address}</Text>
              <Text>Table Size: {item.user_partysizeLabel}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
