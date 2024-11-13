import { useState, useRef } from "react"


export default function MemeText({text, deleteFunction}){
    const [position, setPosition] = useState({x:5, y:5})    // Default position at top left
    const deleteButton = useRef(null)                       // reference to DOM element to hide/show

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

    function deleteSelf(){
        deleteFunction(text)
    }

    return(
        <div
            className="absolute cursor-pointer p-1 hover:border-2 border-dotted rounded"
            style={{
                left: `${position.x}px`,
                top:  `${position.y}px`
            }}

            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseEnter={()=>{deleteButton.current.classList.toggle("hidden")}}
            onMouseLeave={()=>{deleteButton.current.classList.toggle("hidden")}}
        >
            <pre className="uppercase text-shadow text-white font-semibold text-lg">
                {text}
            </pre>
            <button 
                className="hidden rounded-full absolute -right-2 -top-2 bg-red-400 font-semibold text-white text-sm px-[6px]"
                onClick={deleteSelf}
                ref={deleteButton}
            >
                x
            </button>
        </div>
    )
}