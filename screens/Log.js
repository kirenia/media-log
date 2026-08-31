import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createBook } from "../api";
import { useAuth } from "../AuthContext";

export default function Log({ navigation }) {
  const { token } = useAuth();
  const [form, setForm] = useState({ title: "", author: "", mediaType: "" });
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setError(null);
    try {
      await createBook(form, token);
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Media</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#6272a4"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Author / Creator"
        placeholderTextColor="#6272a4"
        value={form.author}
        onChangeText={(text) => setForm({ ...form, author: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Media Type (book, movie, game...)"
        placeholderTextColor="#6272a4"
        value={form.mediaType}
        onChangeText={(text) => setForm({ ...form, mediaType: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log It</Text>
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
    marginBottom: 20,
  },
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
  buttonText: { color: "#282a36", fontWeight: "bold" },
  error: {
    color: "#ff5555",
    backgroundColor: "#44475a",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
});
