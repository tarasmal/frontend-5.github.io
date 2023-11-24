import React from 'react';
import './Task2.css';

const Cell = ({ id, onHover }) => {
    const onMouseEnterHandler = () => onHover(id);
    return (
        <div
            id={`cell-${id}`}
            className="grid-item"
            onMouseEnter={onMouseEnterHandler}
        >
            {id}
        </div>
    );
};


const Task2 = () => {
    let counter = 1;
    const cells = Array(6)
        .fill(null)
        .map(() => Array(6).fill(null).map(() => counter++));
    const onHover = () => {};
    return (
        <div className="grid-container">
            {
                cells.map((row, rowIndex) =>
                    row.map((id) => <Cell key={`cell-${id}`} id={id} onHover={onHover} />)
                )
            }
        </div>
    );
};

export default Task2;
