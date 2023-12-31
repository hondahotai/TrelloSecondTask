import "./Board.css";
import React from "react";
import Column from "../columns/Columns";
import "../columns/Columns.css";
import { useSelector } from "react-redux";
import { ColumnData } from "../../state/ducks/columns/types";
import {RootState} from "../../state/appState";

const Board = () => {
  const columns = useSelector((state: RootState) => state.column);

  return (
      <div className="board">
        {columns.map((column: ColumnData) => (
            <Column key={column.id} index={column.id} />
        ))}
      </div>
  );
};

export default Board;
