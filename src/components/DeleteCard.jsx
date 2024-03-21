import { useState } from "react";
import { FaFire, FaTrash } from "react-icons/fa";
const DeleteCard = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (evt) => {
    evt.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (evt) => {
    evt.preventDefault();
    setActive(false);
  };

  const handleDragEnd = (evt) => {
    const cardId = evt.dataTransfer.getData("cardId");

    setCards((prev) =>
      prev.filter((c) => c.id.toString() !== cardId.toString())
    );
    setActive(false);
  };
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FaTrash />}
    </div>
  );
};

export default DeleteCard;
