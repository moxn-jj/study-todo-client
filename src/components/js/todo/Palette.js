import React from "react";
import '../../css/todo/Palette.css';

const Palette = ({colors, onChangeColor}) => {

    const colorList = colors.map((color) => (
            <li 
                className={`color ${color}`} 
                onClick={() => {onChangeColor(color)}}
                key={color}>color</li>
        )
    );

    return (
        <div className="palette">
            <ul className="colors">
                {colorList}
            </ul>
        </div>
    );
}

export default Palette;