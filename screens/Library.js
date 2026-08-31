import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getBooks, updateBook, deleteBook } from "../api";
import { useAuth } from "../AuthContext";

export default function Library({ navigation }) {
  const { user, token, signOut } = useAuth();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    mediaType: "",
  });

  const loadBooks = useCallback(() => {
    getBooks(token)
      .then(setBooks)
      .catch((err) => setError(err.message));
  }, [token]);

  useFocusEffect(loadBooks);

  function selectBook(book) {
    setSelectedId(book._id);
    setEditForm({
      title: book.title,
      author: book.author,
      mediaType: book.mediaType,
    });
  }

  async function handleUpdate() {
    const updated = await updateBook(selectedId, editForm, token);
    setBooks(books.map((b) => (b._id === selectedId ? updated : b)));
    setSelectedId(null);
  }

  async function handleDelete(id) {
    await deleteBook(id, token);
    setBooks(books.filter((b) => b._id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Media Log</Text>
          <Text style={styles.who}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.logButton}
        onPress={() => navigation.navigate("Log")}>
        <Text style={styles.logButtonText}>Log Media</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          selectedId === item._id ? (
            <View style={styles.item}>
              <TextInput
                style={styles.input}
                value={editForm.title}
                onChangeText={(text) =>
                  setEditForm({ ...editForm, title: text })
                }
              />
              <TextInput
                style={styles.input}
                value={editForm.author}
                onChangeText={(text) =>
                  setEditForm({ ...editForm, author: text })
                }
              />
              <TextInput
                style={styles.input}
                value={editForm.mediaType}
                onChangeText={(text) =>
                  setEditForm({ ...editForm, mediaType: text })
                }
              />
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedId(null)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => selectBook(item)}
                style={{ flex: 1 }}>
                <Text style={styles.itemText}>
                  {item.title}, {item.author} ({item.mediaType})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#282a36", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 28, color: "#ff79c6", fontWeight: "bold" },
  who: { color: "#6272a4", fontSize: 12 },
  signOutText: { color: "#ff5555" },
  error: {
    color: "#ff5555",
    backgroundColor: "#44475a",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  logButton: {
    backgroundColor: "#bd93f9",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  logButtonText: { color: "#282a36", fontWeight: "bold" },
  item: {
    backgroundColor: "#44475a",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: { color: "#f8f8f2" },
  deleteText: { color: "#ff5555" },
  input: {
    backgroundColor: "#282a36",
    color: "#f8f8f2",
    padding: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  saveButton: {
    backgroundColor: "#50fa7b",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: { color: "#282a36", fontWeight: "bold" },
  cancelText: { color: "#8be9fd" },
});
