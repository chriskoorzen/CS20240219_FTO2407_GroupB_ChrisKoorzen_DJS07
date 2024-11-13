import { useState, useEffect, useRef } from 'react'
import domtoimage from 'dom-to-image'
import MemeText from './memeText.jsx'


export default function Meme() {
    const [image, setImage] = useState(0)                       // The default image number
    const [memeData, setMemeData] = useState([{url:""}])        // The most basic object expected by <img src>
    const [textData, setTextData] = useState([])                // Meme texts
    const memeBox = useRef(null)                                // MemeImage wrapper div

    useEffect(() => {                                           // Retrieve meme data from remote source
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                setMemeData(data.data.memes)
            })
    }, [])  // Init once


    function generateMeme(){
        let randomImage = image             // Set to current image number

        while (randomImage === image){      // Make sure random does not return the same image number
            randomImage = Math.floor(Math.random() * memeData.length)
        }

        setImage(randomImage)               // Set to new image (trigger re-render)
    }

    function readUserInputText(event){
        if(event.key === "Enter"){
            const memeText = event.target.value         // Get independent reference
            setTextData(data => [...data, memeText])    // Update
            event.target.value = ""                     // Reset input
        }
    }

    function deleteMemeText(text){
        const newTextData =  textData.filter(memeText => !(memeText===text))    // Filter out this text
        setTextData(newTextData)                                                // Update
    }

    function getBoundary(){
        const box = memeBox.current.getBoundingClientRect()     // Method to pass boundary prop to children
        return {
            x: box.width,
            y: box.height
        }
    }

    function saveImage(){
        domtoimage.toJpeg(memeBox.current, { quality: 0.95 })   // Use domtoimage to create image from DOM node
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'my-new-meme.jpeg';
            link.href = dataUrl;
            link.click();                                       // Auto download
        })
    }

    return (
        <main className="w-4/5 mx-auto">
            <div className="grid grid-rows-3 gap-5 my-8">
                
                <label>Meme Text
                    <input
                        type="text"
                        placeholder="Meme Text"
                        className="p-2 rounded-lg border-2 block w-full"

                        onKeyUp={readUserInputText}
                    />
                </label>

                <div className="flex flex-row justify-end rounded-lg border-2 border-gray-300 w-full p-2">
                    <button 
                        className="rounded-lg px-2 bg-green-500 text-white font-bold active:border-2 border-black active:shadow-lg"
                        onClick={saveImage}
                    >
                        Save Meme
                    </button>
                </div>

                <button
                    className="app-gradient p-4 rounded-lg text-white font-bold active:border-2 border-black active:shadow-lg"
                    onClick={generateMeme}
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div 
                className="relative w-fit h-fit"
                ref={memeBox}
            >
                <img 
                    className="object-contain border-2 mx-auto"
                    key={image} 
                    src={memeData[image].url}
                />

                {textData.map(
                    memeText => {
                        return (
                            <MemeText 
                                key={memeText}
                                text={memeText}
                                deleteFunction={deleteMemeText}
                                getBoundary={getBoundary}
                            />
                        )
                    }
                )}
            </div>

        </main>
    )
}