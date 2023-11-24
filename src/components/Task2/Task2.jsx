import React, { useState } from 'react';
import './Task2.css';

const Cell = ({ id, onHover, onHoverOut, onClick, columnColors, hoveredColor }) => {
    const onMouseEnterHandler = () => onHover(id);
    const onMouseLeaveHandler = () => onHoverOut(id);
    const onClickHandler = () => onClick(id);

    const column = (id - 1) % 6;
    const isColumnColored = columnColors[column];
    const style = {
        backgroundColor: id === 8 && hoveredColor ? hoveredColor : isColumnColored ? isColumnColored : undefined,
    };

    return (
        <div
            id={`cell-${id}`}
            className="grid-item"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={onClickHandler}
            style={style}
        >
            {id}
        </div>
    );
};


const Task2 = () => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [coloredColumns, setColoredColumns] = useState({});

    const onHover = (id) => {
        if (id === 8) {
            setHoveredCell(getRandomColor());
        }
    };

    const onHoverOut = () => {
        setHoveredCell(null);
    };

    const onClick = (id) => {
        const clickedColumn = (id - 1) % 6;
        const newColoredColumns = { ...coloredColumns };

        let shouldColor = !!newColoredColumns[clickedColumn];
        for (let i = clickedColumn; i < 6; i += 2) {
            if (shouldColor) {
                delete newColoredColumns[i];
            } else {
                newColoredColumns[i] = getRandomColor();
            }
        }
        setColoredColumns(newColoredColumns);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const cells = Array.from({ length: 36 }, (_, index) => index + 1);
    return (
        <div className="grid-container">
            {cells.map((id) => {
                const column = (id - 1) % 6;
                return (
                    <Cell
                        key={`cell-${id}`}
                        id={id}
                        onHover={onHover}
                        onHoverOut={onHoverOut}
                        onClick={onClick}
                        columnColors={coloredColumns}
                        hoveredColor={hoveredCell && id === 8 ? hoveredCell : null}
                    />
                );
            })}
        </div>
    );
};

export default Task2;
