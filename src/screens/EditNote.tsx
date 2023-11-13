import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import DeleteNoteButton from "../components/DeleteNoteButton";
import { Note } from "../../types/interface";

const EditNote: React.FC = () => {
  const route = useRoute();
  const noteId = route.params?.noteId;

  const [note, setNote] = useState<Note | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          const parsedNotes: Note[] = JSON.parse(storedNotes);
          const selectedNote = parsedNotes.find((n) => n.id === noteId);
          if (selectedNote) {
            setNote(selectedNote);
          }
        }
      } catch (error) {
        console.error("Error fetching note", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleUpdateNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        const updatedNotes = parsedNotes.map((n: Note) =>
          n.id === noteId
            ? {
                ...n,
                title: note?.title || "",
                client: note?.client || "",
                category: note?.category || "",
                content: note?.content || "",
              }
            : n
        );

        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  return (
    <View>
      <TextInput
        label="Note Title"
        value={note?.title || ""}
        onChangeText={(text) => setNote((prevNote) => ({ ...prevNote, title: text }))}
      />
      <TextInput
        label="Client"
        value={note?.client || ""}
        onChangeText={(text) => setNote((prevNote) => ({ ...prevNote, client: text }))}
      />
      <TextInput
        label="Category"
        value={note?.category || ""}
        onChangeText={(text) => setNote((prevNote) => ({ ...prevNote, category: text }))}
      />
      <TextInput
        label="Note Content"
        value={note?.content || ""}
        onChangeText={(text) => setNote((prevNote) => ({ ...prevNote, content: text }))}
      />

      <Button mode="contained" onPress={handleUpdateNote}>
        Update Note
      </Button>
      <DeleteNoteButton noteId={noteId} onDelete={() => navigation.goBack()} />
    </View>
  );
};

export default EditNote;
