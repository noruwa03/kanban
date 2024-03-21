import { useState } from "react";
import Card from "./Card";
import Indicator from "./Indicator";
import AddCard from "./AddCard";

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (evt, card) => {
    evt.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (evt) => {
    evt.preventDefault();
    highlightIndicator(evt);
    setActive(true);
  };

  const handleDragLeave = (evt) => {
    evt.preventDefault();
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (evt) => {
    setActive(false);
    clearHighlights();
    const cardId = evt.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(evt, indicators);

    const before = element.dataset.before || "-1";
    if (before.toString() !== cardId.toString()) {
      let copy = [...cards];
      let cardToTransfer = copy.find(
        (c) => c.id.toString() === cardId.toString()
      );
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id.toString() !== cardId.toString());

      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex(
          (el) => el.id.toString() === before.toString()
        );
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const highlightIndicator = (evt) => {
    const indicators = getIndicators();

    clearHighlights(indicators);
    const el = getNearestIndicator(evt, indicators);
    el.element.style.opacity = "1";
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (evt, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = evt.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const filterdCard = cards.filter((data) => data.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex flex-row items-center gap-2">
        <h1 className={`font-medium ${headingColor}`}>{title}</h1>
        <span className="rounded text-sm text-neutral-400">
          {filterdCard.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : ""
        }`}
      >
        {filterdCard.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <Indicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
