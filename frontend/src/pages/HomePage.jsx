import { useEffect, useState } from "react";
import api from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";
import Navbar from "../components/Navbar";
import Notecard from "../components/Notecard";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRatelimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.data);
        setIsRateLimited(false);
        console.log(res.data);
        console.log(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Fail to load notes");
        }
      }
    }
    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      <div className="container mx-auto px-4 py-8">
        {isLoading && <p className="text-center text-primary py-10">Loading...</p>}
        {notes.length === 0 && !isLoading && <NotesNotFound />}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <Notecard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;