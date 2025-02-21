import React from "react";

interface Props {
  name: String;
  value: number;
}
const TaskCountCards: React.FC<Props> = ({ name, value }) => {
  return (
    <>
      <div className="card " style={{ width: "18rem" }}>
        <div className="card-body">
          <h1 className="card-title">{name}</h1>

          <h1>{value}</h1>
        </div>
      </div>
    </>
  );
};

export default TaskCountCards;
