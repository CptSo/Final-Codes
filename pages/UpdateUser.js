import React from "react";
import {
  Picker,
  View,
  ScrollView,
  Stylesheet,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("UserDatabase.db");

export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: "",
      user_name: "",
      user_contact: "",
      user_address: "",
      user_partysize: ""
    };
  }
  searchUser = () => {
    const { input_user_id } = this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM table_user where user_id = ?",
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log("len", len);
          if (len > 0) {
            console.log(results.rows.item(0).user_contact);
            this.setState({
              user_name: results.rows.item(0).user_name
            });
            this.setState({
              user_contact: results.rows.item(0).user_contact
            });
            this.setState({
              user_address: results.rows.item(0).user_address
            });
            this.setState({
              user_partysize: results.rows.item(0).user_partysize
            });
          } else {
            alert("No user found");
            this.setState({
              user_name: "",
              user_contact: "",
              user_address: "",
              user_partysize: ""
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that = this;
    const { input_user_id } = this.state;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    const { user_partysize } = this.state
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          if (user_partysize) {
          db.transaction(tx => {
            tx.executeSql(
              "UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?",
              [user_name, user_contact, user_address, input_user_id],
              (tx, results) => {
                console.log("Results", results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    "Success",
                    "User updated successfully",
                    [
                      {
                        text: "Ok",
                        onPress: () =>
                          that.props.navigation.navigate("HomeScreen")
                      }
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert("Updation Failed");
                }
              }
            );
          });
          } else {
            alert("Please choose Table Size");
          }
        } else {
          alert("Please fill Address");
        }
      } else {
        alert("Please fill Contact Number");
      }
    } else {
      alert("Please fill Name");
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <Mytextinput
              placeholder="Enter User Id"
              style={{ padding: 10 }}
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              style={{ padding: 10 }}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={"" + this.state.user_contact}
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              style={{ padding: 10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
              placeholder="Enter Address"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: "top", padding: 10 }}
            />

            <Text style={{ marginLeft: 35, marginTop: 10, color: '#007FFF' }}>
              Table for:
            </Text>
            <Picker
              selectedValue={this.state.user_partysizeLabel}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  user_partysizeLabel: itemValue,
                  choosenindex: itemIndex + 1,
                })
              }
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#007FFF',
                borderWidth: 1,
              }}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
            </Picker>


            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
