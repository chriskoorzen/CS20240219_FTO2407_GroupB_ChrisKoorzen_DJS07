import { useState } from "react"


export default function MemeText({text, deleteFunction}){
    const [position, setPosition] = useState({x:5, y:5})    // Default position at top left

    let startX, startY, endX, endY                          // Intermediary values to track movement

    function handleDragStart(event){
        startX = event.screenX
        startY = event.screenY
    }

    function handleDragEnd(event){
        endX = event.screenX
        endY = event.screenY

        const newPosition = {
            x: position.x + (endX - startX),
            y: position.y + (endY - startY),
        }

        setPosition(newPosition)
    }

    return(
        <div
            className="absolute cursor-pointer"
            style={{
                left: `${position.x}px`,
                top:  `${position.y}px`
            }}

            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <pre className="uppercase text-shadow text-white font-semibold text-lg">
                {text}
            </pre>
        </div>
    )
}