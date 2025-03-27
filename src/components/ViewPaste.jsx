import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const { id } = useParams();
  const paste = pastes.find((p) => p._id === id);

  return (
    <div>
      <div className="bg-[#212121] h-fit text-white p-6 flex flex-col items-center mt-14">
        {/* Title Input & Button */}
        <div className="w-full max-w-2xl flex items-center gap-4">
          <input
            type="text"
            value={paste.title}
            readOnly
            className="w-[100%] p-3 bg-[#333] text-white rounded-md border border-gray-600 outline-none"
          />
        </div>

        {/* Textarea for Note Description */}
        <textarea
          value={paste.description}
          readOnly
          className="scroller w-full max-w-2xl mt-4 p-3 bg-[#333] text-white rounded-md border border-gray-600 outline-none h-[460px] resize-none"
        ></textarea>
      </div>
    </div>
  );
}

export default ViewPaste;
