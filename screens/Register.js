import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function Register({ navigation }) {
  const { signUp } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setError(null);
    setBusy(true);
    try {
      await signUp(form.email.trim(), form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Make an account to start logging.</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6272a4"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#6272a4"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity
        style={[styles.button, busy && styles.buttonBusy]}
        onPress={handleSubmit}
        disabled={busy}>
        <Text style={styles.buttonText}>{busy ? "..." : "Create Account"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#282a36", padding: 20 },
  title: {
    fontSize: 28,
    color: "#ff79c6",
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: { color: "#6272a4", marginBottom: 20 },
  input: {
    backgroundColor: "#44475a",
    color: "#f8f8f2",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#bd93f9",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonBusy: { opacity: 0.6 },
  buttonText: { color: "#282a36", fontWeight: "bold" },
  link: { color: "#8be9fd", marginTop: 16, textAlign: "center" },
  error: {
    color: "#ff5555",
    backgroundColor: "#44475a",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
});
