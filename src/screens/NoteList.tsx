import React, { useEffect, useState } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import { FAB, Card, List, Title, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../../types/interface";

const NotesList = ({ navigation }: { navigation: any }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteId, setNoteId] = useState<number | null>(null); // Add noteId state

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          const parsedNotes: Note[] = JSON.parse(storedNotes);
          setNotes(parsedNotes);
        }
      } catch (error) {
        console.error("Error getting notes", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      if (noteId !== null) {
        try {
          const storedNotes = await AsyncStorage.getItem("notes");
          if (storedNotes) {
            const parsedNotes: Note[] = JSON.parse(storedNotes);
            const selectedNote = parsedNotes.find((n) => n.id === noteId);
            if (selectedNote) {
              setNoteId(null); // Reset noteId after fetching the note
              setNotes((prevNotes) =>
                prevNotes.map((note) =>
                  note.id === noteId ? { ...note, ...selectedNote } : note
                )
              );
            }
          }
        } catch (error) {
          console.error("Error fetching note", error);
        }
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDeleteNote = async (id: number) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);

      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const renderItem = ({ item }: { item: Note }) => (
    <Pressable onPress={() => navigation.navigate("EditNote", { noteId: item.id })}>
      <Card>
        <Card.Content>
          <Text>
            <Title>{item.title}</Title>
          </Text>
          <List.Item
            title={`Client: ${item.client}`}
            description={`Category: ${item.category}`}
          />
          <Button onPress={() => handleDeleteNote(item.id)}>Delete Note</Button>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <FAB
        label="Add Note"
        icon="plus"
        style={{
          position: "absolute",
          marginTop: 10,
          marginBottom: 15,
          right: 0,
          top: 0,
        }}
        onPress={() => navigation.navigate("CreateNote")}
      />
      <View style={{ flex: 1, marginTop: 70 }}>
        {notes.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 16 }}>No notes to display</Text>
        ) : (
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default NotesList;
