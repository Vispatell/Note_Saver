import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Reducer/pasteSlice";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const [title, setTitle] = useState(""); // State for input field
  const [description, setDescription] = useState(""); // State for textarea
  const dispatch = useDispatch();
  const pasteId = searchParams.get("pasteId"); // Get pasteId from URL params

  const updatePaste = pastes.find((p) => p._id === pasteId);

  useEffect(() => {
    if (updatePaste) {
      setTitle(updatePaste.title);
      setDescription(updatePaste.description);
    }
  }, []);

  function createPaste() {
    const paste = {
      title: title,
      description: description,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setDescription("");
    setSearchParams({});
  }

  return (
    <div className="bg-[#212121] h-fit text-white p-6 flex flex-col items-center mt-14">
      {/* Title Input & Button */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full sm:w-[76%] p-3 bg-[#333] text-white rounded-md border border-gray-600 outline-none focus:border-yellow-400 transition"
        />
        <button
          className="bg-yellow-500 text-black px-5 py-3 w-full sm:w-auto rounded-md font-semibold hover:bg-yellow-600 transition"
          onClick={createPaste}
        >
          {pasteId ? "Update Note" : "Create Note"}
        </button>
      </div>

      {/* Textarea for Note Description */}
      <textarea
        placeholder="Enter note description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="scroller w-full max-w-2xl mt-4 p-3 bg-[#333] text-white rounded-md border border-gray-600 outline-none h-[460px] resize-none focus:border-yellow-400 transition"
      ></textarea>
    </div>
  );
}
export default Home;
