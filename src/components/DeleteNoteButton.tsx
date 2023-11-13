import React, {useState} from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../../types/interface";

interface DeleteNoteButtonProps {
    noteId: number;
    onDelete: () => void;
}

const DeleteNoteButton: React.FC<DeleteNoteButtonProps> = ({ noteId, onDelete }) => {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleDeleteNote = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes');
            if (storedNotes) {
                const parsedNotes: Note[] = JSON.parse(storedNotes);
                const updatedNotes = parsedNotes.filter((n) => n.id !== noteId);

                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

                onDelete();
                hideDialog();
            }
        } catch (error) {
            console.error('Error deleting note', error);
        }
    };

    return (
        <>
        <Button mode="outlined" onPress={showDialog} style={{marginTop: 10}}>
            Delete Note</Button>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Delete Note</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure you want to delete this note?</Text>
                    <Button onPress={handleDeleteNote}>Delete</Button>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={handleDeleteNote}>Delete</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        </>
    );
};

export default DeleteNoteButton;