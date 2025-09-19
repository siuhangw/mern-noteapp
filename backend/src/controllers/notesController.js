import Note from "../models/Note.js";
const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Fetching all notes...", data: notes });
  } catch (error) {
    console.error("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
}

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Fetching note...", data: note });
  } catch (error) {
    console.error("Error in getNoteById controller: ", error);
  }
}

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({ message: "Note created successfully", data: savedNote });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
}

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, 
      { 
        title, 
        content 
      }, 
      { 
        new: true 
      });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", data: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
}

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", data: deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  }
}
export { getAllNotes, getNoteById, createNote, updateNote, deleteNote }