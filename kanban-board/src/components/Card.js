import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "8px",
            margin: "4px 0",
            border: "1px solid darkgrey",
            borderRadius: "4px",
            background: "white",
            ...provided.draggableProps.style,
          }}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
