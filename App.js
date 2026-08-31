import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "./AuthContext";
import Library from "./screens/Library";
import Log from "./screens/Log";
import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

// the gate: protected screens only exist in the navigator once there's a token,
// so there's no route to reach them while logged out
function Routes() {
  const { token, restoring } = useAuth();

  if (restoring) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#bd93f9" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#282a36" },
        headerTintColor: "#f8f8f2",
      }}>
      {token ? (
        <>
          <Stack.Screen
            name="Library"
            component={Library}
            options={{ title: "Media Log" }}
          />
          <Stack.Screen
            name="Log"
            component={Log}
            options={{ title: "Log Media" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Log In" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#282a36",
    alignItems: "center",
    justifyContent: "center",
  },
});
