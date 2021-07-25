import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Picker,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
//import DropDownPicker from 'react-native-dropdown-picker';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UserDatabase.db');

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
      user_sizeLabel: '',
    };
  }

  register_user = () => {
    var that = this;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    const { user_contact1 } = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address, user_contact1) VALUES (?,?,?,?)',
        [user_name, user_contact, user_address, user_contact1],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('You are Registered Successfully');
          } else {
            alert('Registration Failed');
          }
        }
      );
    });
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={(user_name) => this.setState({ user_name })}
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={(user_contact) => this.setState({ user_contact })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={(user_address) => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Contact No2"
              onChangeText={(user_contact1) => this.setState({ user_contact1 })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />

            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
