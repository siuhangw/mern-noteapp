import { formatDate } from "../lib/utils";
import { PenSquare, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
const Notecard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Fail to delete note");
    }
  };

  return (
    <Link to={`/notes/${note._id}`} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="card-body p-2">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p>{note.content}</p>
        <div className="card-actions justify-end">
          <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
          <button className="btn btn-ghost btn-xs">
            <PenSquare className="size-4" />
          </button>
          <button className="btn btn-ghost btn-xs" onClick={(e) => handleDelete(e, note._id)}>
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Notecard;