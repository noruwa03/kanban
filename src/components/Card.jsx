import Indicator from "./Indicator";
import { motion } from "framer-motion";

const Card = ({ id, title, column, handleDragStart }) => {
  return (
    <>
      <Indicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(evt) => handleDragStart(evt, { id, title, column })}
        className="flex flex-col items-start gap-2 p-2 bg-neutral-800 cursor-grab border border-neutral-700 active:cursor-grabbing rounded"
      >
        <h1>{title}</h1>
      </motion.div>
    </>
  );
};

export default Card;
