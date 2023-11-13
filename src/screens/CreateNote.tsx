import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../../types/interface";
import { TextInput, Button, List } from "react-native-paper";
import { SafeAreaView, View, Alert } from "react-native";
import clientsData from "../components/data/clientsData.json";
import categoriesData from "../components/data/categoriesData.json";

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    client: { id: 0, name: "" },
    category: "",
    content: "",
  });
  const [nextId, setNextId] = useState(1);
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [expandedClient, setExpandedClient] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(false);

  useEffect(() => {
    setClients(clientsData.clients);
    setCategories(categoriesData.categories);
  }, []);

  const handleAddNote = useCallback(async () => {
    const newNote: Note = {
      id: nextId,
      title: note.title,
      client: note.client.name,
      category: note.category,
      content: note.content,
    };

    const existingNotes = await AsyncStorage.getItem("notes");
    let notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes.push(newNote);
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    setNextId(nextId + 1);
    setNote({ title: "", client: { id: 0, name: "" }, category: "", content: "" });
    Alert.alert("Note Added", "Your note has been successfully added.");
  }, [nextId, note]);

  const handleClientPress = useCallback((selectedClient: { id: number; name: string }) => {
    setNote((prevNote) => ({ ...prevNote, client: selectedClient }));
    setExpandedClient(false);
  }, []);
  

  const handleCategoryPress = useCallback((selectedCategory: { name: string }) => {
    setNote((prevNote) => ({ ...prevNote, category: selectedCategory.name }));
    setExpandedCategory(false);
  }, []);
  

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label={"Enter a title for note"}
          value={note.title}
          onChangeText={(title) => setNote((prevNote) => ({ ...prevNote, title }))}
        />
        <List.Accordion
          title={note.client.name ? note.client.name : "Select a Client"}
          expanded={expandedClient}
          onPress={() => setExpandedClient(!expandedClient)}
        >
          {clients.map((client) => (
            <List.Item
              key={client.id}
              title={client.name}
              onPress={() => handleClientPress(client)}
            />
          ))}
        </List.Accordion>
        <List.Accordion
          title={note.category ? note.category : "Select a Category"}
          expanded={expandedCategory}
          onPress={() => setExpandedCategory(!expandedCategory)}
        >
          {categories.map((category) => (
            <List.Item
              key={category.name}
              title={category.name}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </List.Accordion>
        <TextInput
          label={"Enter your note here"}
          value={note.content}
          onChangeText={(content) => setNote((prevNote) => ({ ...prevNote, content }))}
          multiline
          numberOfLines={10}
          style={{ height: 300 }}
        />
        <Button mode="contained" onPress={handleAddNote}>
          Add Note
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateNote;
