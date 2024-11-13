import { useState, useEffect } from 'react'
import MemeText from './memeText.jsx'


export default function Meme() {
    const [image, setImage] = useState(0)                       // The default image number
    const [memeData, setMemeData] = useState([{url:""}])        // The most basic object expected by <img src>
    const [textData, setTextData] = useState([])                // Meme texts

    useEffect(()=>{                                             // Retrieve meme data from remote source
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

    return (
        <main className="w-4/5 mx-auto">
            <div className="grid grid-rows-2 gap-5 my-8">
                
                <label>Meme Text
                    <input
                        type="text"
                        placeholder="Top Text"
                        className="p-2 rounded-lg border-2 block w-full"

                        onKeyUp={readUserInputText}
                    />
                </label>

                <button
                    className="app-gradient p-4 rounded-lg text-white font-bold active:border-2 border-black active:shadow-lg"
                    onClick={generateMeme}
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="relative w-fit h-fit">
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
                            />
                        )
                    }
                )}
            </div>

        </main>
    )
}