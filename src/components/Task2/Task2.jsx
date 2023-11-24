import React, { useState } from 'react';
import './Task2.css';

const Cell = ({
                  id,
                  onMouseEnter,
                  onMouseLeave,
                  onClick,
                  onDoubleClick,
                  columnColors,
                  hoveredColor,
              }) => {
    const column = (id - 1) % 6;
    const style = {
        backgroundColor: columnColors[column] || (id === 8 && hoveredColor ? hoveredColor : ''),
    };

    return (
        <div
            id={`cell-${id}`}
            className="grid-item"
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={() => onMouseLeave(id)}
            onClick={() => onClick(id)}
            onDoubleClick={() => onDoubleClick(id)}
            style={style}
        >
            {id}
        </div>
    );
};

const Task2 = () => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [coloredColumns, setColoredColumns] = useState({});
    const [colorPicker, setColorPicker] = useState({ show: false, cellId: null });

    const onHover = (id) => {
        if (id === 8) {
            setHoveredCell(getRandomColor());
        }
    };

    const onHoverOut = (id) => {
        if (id === 8) {
            setHoveredCell(null);
        }
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

    const onDoubleClick = (cellId) => {
        setColorPicker({
            show: true,
            cellId: cellId,
        });
    };

    const handleColorChange = (color) => {
        setColoredColumns({
            ...coloredColumns,
            [(colorPicker.cellId - 1) % 6]: color,
        });
        setColorPicker({ show: false, cellId: null }); // Hide color picker after color selection
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
        <>
            <div className="grid-container">
                {cells.map((id) => {
                    return (
                        <Cell
                            key={`cell-${id}`}
                            id={id}
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverOut}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                            columnColors={coloredColumns}
                            hoveredColor={hoveredCell && id === 8 ? hoveredCell : null}
                        />
                    );
                })}
            </div>
            {colorPicker.show && (
                <input
                    type="color"
                    defaultValue={coloredColumns[(colorPicker.cellId - 1) % 6] || '#ffffff'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                />
            )}
        </>
    );
};

export default Task2;
