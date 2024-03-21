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
    <>
      {cards.length > 0 ? null : (
        <h1 className="pt-6 mb-2 grid lg:place-content-center place-content-start lg:text-3xl text-xl px-4 font-semibold">
          Set a Task
        </h1>
      )}

      <div className="h-full w-full lg:overflow-x-hidden overflow-x-scroll lg:p-12 p-4 flex flex-row gap-3">
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
    </>
  );
};

export default Board;
