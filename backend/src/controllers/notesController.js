import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createANote(req,res){
    try {
        const {title,content} = req.body;
        const newNote = new Note({title, content});

        await newNote.save()
        res.status(201).json({message:"Note created successfully"});

    } catch (error) {
        console.log("Error in createAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote(req,res){
    try{
        const {title , content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new : true});

        if(!updateNote) return res.status(404).json({message : "Note not found!"});
        res.status(200).json({message : "Note updated successfully"});
    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote(req,res){
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote) return res.status(404).json({message:"Note not found!"});
        res.status(200).json({message:"Note Deleted Successfully"});
    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getNoteById = async (req,res) => {
    try{
        const fetchNote = await Note.findById(req.params.id);

        if(!fetchNote) return res.status(404).json({message : "Note Not Found!"});
        res.status(200).json({message:"Note details fetched successfully", note : fetchNote});
    } catch(error) {
        console.log("Error in fetchNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}
