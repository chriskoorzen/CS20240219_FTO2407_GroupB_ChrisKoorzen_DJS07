import { useState, useRef } from "react"


export default function MemeText({text, textSize, deleteFunction, getBoundary}){
    const offSet = 5                                                // Default px offset from image boundary
    const [position, setPosition] = useState({x:offSet, y:offSet})  // Default position at top left
    const deleteButton = useRef(null)                               // reference to DOM element to hide/show
    const [memeTextSize] = useState(textSize)                       // Never changes

    let startX, startY, endX, endY                                  // Intermediary values to track movement

    function handleDragStart(event){
        startX = event.screenX
        startY = event.screenY
    }

    function handleDragEnd(event){
        endX = event.screenX
        endY = event.screenY

        // Logic to keep text within Meme picture bounds
        let boundary = getBoundary()
        let newX = position.x + (endX - startX)
        let newY = position.y + (endY - startY)

        if (newX < offSet){
            newX = offSet
        } else if ((newX + event.target.clientWidth) > boundary.x){
            newX = boundary.x - event.target.clientWidth - offSet
        }

        if (newY < offSet){
            newY = offSet
        } else if ((newY + event.target.clientHeight) > boundary.y){
            newY = boundary.y - event.target.clientHeight - offSet
        }

        const newPosition = {
            x: newX,
            y: newY,
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
            <pre className={`uppercase text-shadow text-white font-semibold ${memeTextSize}`}>
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