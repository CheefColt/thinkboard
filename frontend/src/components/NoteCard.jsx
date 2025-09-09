import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formateDate } from "../lib/utils.js";
import { useState } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({note, setNotes}) => {
  const [deleteLoad,setDeleteLoad] = useState(false);

  const handleDelete = async (e,id) =>{
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
        await api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter(note => note._id !== id));
        toast.success("Delete Success");
    } catch (error) {
        console.log("Unable to Delete", error);
        toast.error("Delete Unsuccessful");
    } finally{
        setDeleteLoad(false);
        deleteStatus(true);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]"
    >

      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formateDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            {{ deleteLoad } && (
              <button className="btn btn-ghost btn-xs text-error" disabled={deleteLoad} onClick={(e) => handleDelete(e,note._id)}>
                <Trash2Icon className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
