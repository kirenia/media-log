import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Library from "./screens/Library";
import Log from "./screens/Log";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#282a36" },
          headerTintColor: "#f8f8f2",
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
