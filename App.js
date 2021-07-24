import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "./pages/HomeScreen";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import ViewAllUser from "./pages/ViewAllUser";
import DeleteUser from "./pages/DeleteUser";

const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "HomeScreen",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  },
  View: {
    screen: ViewUser,
    navigationOptions: {
      title: "View User",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {
      title: "View All User",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  },
  Update: {
    screen: UpdateUser,
    navigationOptions: {
      title: "Update User",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  },
  Register: {
    screen: RegisterUser,
    navigationOptions: {
      title: "Register User",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  },
  Delete: {
    screen: DeleteUser,
    navigationOptions: {
      title: "Delete User",
      headerStyle: { backgroundColor: "#f05555" },
      headerTintColor: "#ffffff"
    }
  }
});

export default createAppContainer(App);
