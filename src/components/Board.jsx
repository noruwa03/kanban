import { useState, useEffect } from "react";
import Column from "./Column";
import DeleteCard from "./DeleteCard";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    hasChecked && localStorage.setItem("kanban:data", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const cardData = localStorage.getItem("kanban:data");
    setCards(cardData ? JSON.parse(cardData) : []);
    setHasChecked(true);
  }, []);

  return (
    <div className="h-full w-full lg:overflow-hidden overflow-scroll p-12 flex flex-row gap-3">
      <Column
        title="Backlog"
        headingColor="text-neutral-500"
        column="backlog"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Todo"
        headingColor="text-yellow-200"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        headingColor="text-blue-200"
        column="doing"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        headingColor="text-emerald-200"
        column="complete"
        cards={cards}
        setCards={setCards}
      />
      <DeleteCard setCards={setCards} />
    </div>
  );
};

export default Board;
