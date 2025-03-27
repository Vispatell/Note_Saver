import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaEye,
  FaCalendar,
  FaCopy,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";
import { removeFrompastes, resetAllPastes } from "../Reducer/pasteSlice";
import { toast } from "react-toastify";

function Pastes() {
  const [search, setSearch] = useState("");
  const [sharePaste, setSharePaste] = useState(null);
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  // Filter pastes based on search input
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(index) {
    dispatch(removeFrompastes(index));
  }

  function resetHandler() {
    dispatch(resetAllPastes());
  }

  function openShareModal(paste) {
    setSharePaste(paste);
  }

  function closeShareModal() {
    setSharePaste(null);
  }

  function handleCopy() {
    const shareUrl = `${window.location.origin}/pastes/${sharePaste._id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied", {
      position: "top-right",
      autoClose: 2900,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div className="bg-[#212121] min-h-screen p-6 text-white">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search question here..."
          className="w-full p-3 rounded-md bg-[#181818] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Title */}
      <div className="max-w-4xl mx-auto space-y-4 mt-10">
        <div className="flex justify-between px-2 items-center">
          <h2 className="text-2xl font-bold mb-4 ">All Notes</h2>
          <button
            className="px-2 py-2.5 bg-yellow-500 text-black text-sm rounded-lg"
            onClick={resetHandler}
          >
            Reset All
          </button>
        </div>

        {/* Pastes List */}
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste, index) => (
            <div
              key={paste._id}
              className="bg-[#181818] p-4 rounded-md shadow-md border border-gray-700"
            >
              {/* Paste Title */}
              <h3 className="text-xl font-bold mb-2">{paste.title}</h3>

              {/* Paste Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {paste.description}
              </p>

              {/* Actions & Date */}
              <div className="flex justify-between items-center">
                {/* Action Icons */}
                <div className="flex space-x-3">
                  <a
                    href={`/?pasteId=${paste._id}`}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <FaEdit size={18} />
                  </a>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash size={18} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-blue-400"
                    onClick={() => openShareModal(paste)}
                  >
                    <FaShareAlt size={18} />
                  </button>
                  <a
                    href={`/pastes/${paste._id}`}
                    className="text-gray-400 hover:text-green-400"
                  >
                    <FaEye size={18} />
                  </a>
                </div>

                {/* Date & Code Tag */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-400">
                    <FaCalendar className="mr-2" />
                    {paste.createdAt}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No Notes found.</p>
        )}
      </div>

      {/* Share Modal */}
      {sharePaste && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#181818] p-6 rounded-lg text-white w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Share Note</h2>
              <button onClick={closeShareModal}>
                <FaTimes size={18} />
              </button>
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check this out: ${window.location.origin}/pastes/${sharePaste._id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check this out: ${window.location.origin}/pastes/${sharePaste._id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/pastes/${sharePaste._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/pastes/${sharePaste._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="w-full bg-gray-700 text-white p-2 mt-4 rounded-md flex items-center justify-center"
            >
              <FaCopy className="mr-2" />
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pastes;
