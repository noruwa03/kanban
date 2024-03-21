import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };
  return (
    <>
      {adding ? (
        <>
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="p-2 w-full rounded bg-black text-white border border-gray-100 placeholder:text-sm placeholder-violet-300 focus:outline-0"
            ></textarea>
            <div className="mt-1.5 flex flex-row items-end justify-end gap-1.5 w-full">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex flex-row items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-sm text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                Add <FiPlus />
              </button>
            </div>
          </motion.form>
        </>
      ) : (
          <motion.button
            layout
          onClick={() => setAdding(true)}
          className="flex flex-row items-center gap-3 w-full px-3 py-1.5 text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
