import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { Colors } from "./constants/style";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import HomeScreen from "./screens/HomeScreen";
import TransferScreen from "./screens/TransferScreen";
import PaymentScreen from "./screens/PaymentScreen";
import TransferMoneyScreen from "./screens/TransferScreens/TransferMoneyScreen";
import BeneficiaryScreen from "./screens/TransferScreens/BeneficiaryScreen";
import IdentityScreen from "./screens/IdentityScreens/IdentityScreen";
import VerificationScreen from "./screens/IdentityScreens/VerificationScreen";
import ReferralScreen from "./screens/IdentityScreens/ReferralScreen";
import SecurityScreen from "./screens/IdentityScreens/SecurityScreen";
import TransferToEasyPayScreen from "./screens/TransferScreens/TransferToEasyPay";
import TransferToMobileMoneyScreen from "./screens/TransferScreens/TransferToMobileMoneyScreen";
import DeviceScreen from "./screens/IdentityScreens/SecurityScreens/DeviceScreen";
import UpdatePasswordScreen from "./screens/IdentityScreens/SecurityScreens/UpdatePasswordScreen";
import AirtimeScreen from "./screens/PaymentScreens/AirtimeScreen";
import DataScreen from "./screens/PaymentScreens/DataScreen";
import LightBillScreen from "./screens/PaymentScreens/LightBillScreen";
import DstvScreen from "./screens/PaymentScreens/DstvScreen";
import DeleteScreen from "./screens/IdentityScreens/DeleteScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary900 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function TransferScreens() {
  return (
    <Stack.Navigator
      initialRouteName="TransferScreen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary900 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="TransferScreen" component={TransferScreen} />
      <Stack.Screen name="Beneficiary" component={BeneficiaryScreen} />
      <Stack.Screen name="Send money" component={TransferMoneyScreen} />
      <Stack.Screen
        name="Send To EasyPay User"
        component={TransferToEasyPayScreen}
      />
      <Stack.Screen
        name="Send Money To A Mobile Wallet"
        component={TransferToMobileMoneyScreen}
      />
    </Stack.Navigator>
  );
}

function PaymentScreens() {
  return (
    <Stack.Navigator initialRouteName="Payment Screen">
      <Stack.Screen
        name="Payment Screen"
        component={PaymentScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Airtime Screen"
        component={AirtimeScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Data Screen"
        component={DataScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Light Bill Screen"
        component={LightBillScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="DSTV Bill Screen"
        component={DstvScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <Stack.Navigator initialRouteName="Identity">
      <Stack.Screen
        name="Identity"
        component={IdentityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Referral"
        component={ReferralScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Your Device"
        component={DeviceScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Update Password"
        component={UpdatePasswordScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary900 },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary900 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary400 },
        headerRight: ({ tintColor }) => (
          <Ionicons
            name="log-out"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "EasyPay",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Transfer"
        component={TransferScreens}
        options={{
          headerTitle: "Transfer",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="send" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Payment"
        component={PaymentScreens}
        options={{
          headerTitle: "Payment",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="money" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function App() {
  const [fontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "roboto-light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function isFontLoaded() {
      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    isFontLoaded();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

export default App;
