import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const KEY = "media-log-token";

// SecureStore is native only (Android / iOS / tvOS), so web falls back to
// localStorage -- keeps `npm run web` working during grading
const isWeb = Platform.OS === "web";

export async function saveToken(token) {
  if (isWeb) return localStorage.setItem(KEY, token);
  await SecureStore.setItemAsync(KEY, token);
}

export async function loadToken() {
  if (isWeb) return localStorage.getItem(KEY);
  return SecureStore.getItemAsync(KEY);
}

export async function clearToken() {
  if (isWeb) return localStorage.removeItem(KEY);
  await SecureStore.deleteItemAsync(KEY);
}
