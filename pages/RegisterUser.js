import React from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';

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
    const { user_sizeLabel } = this.state;
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          if (user_sizeLabel) {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO table_user (user_name, user_contact, user_address, user_sizeLabel) VALUES (?,?,?,?)',
                [user_name, user_contact, user_address, user_sizeLabel],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Registered Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('HomeScreen'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    alert('Registration Failed');
                  }
                }
              );
            });
          } else {
            alert('Please choose party size');
          }
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
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

            <Text style = {{ marginLeft: 35, marginTop: 10, color: "#007FFF"}}>
                Table for:
              </Text>
              <Picker
                selectedValue={user_sizeLabel}
                style={{ marginLeft: 35, marginRight: 35, marginTop: 10, borderColor: '#007FFF', borderWidth: 1}}
                onValueChange={(itemValue, itemIndex) => setUserPartySize(itemValue)}
              >
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
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
