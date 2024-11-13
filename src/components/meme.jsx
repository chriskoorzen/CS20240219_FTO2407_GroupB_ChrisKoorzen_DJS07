import { useState, useEffect } from 'react'


export default function Meme() {
    const [image, setImage] = useState(0)                       // The default image number
    const [memeData, setMemeData] = useState([{url:""}])        // The most basic object expected by <img src>

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


    return (
        <main className="w-4/5 mx-auto mt-8">
            <div className="grid grid-rows-2 grid-cols-2 gap-5">
                
                <label>Top Text
                    <input
                        type="text"
                        placeholder="Top Text"
                        className="p-2 rounded-lg border-2 block w-full"
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Bottom Text"
                        className="p-2 rounded-lg border-2 block w-full"
                    />
                </label>

                <button
                    onClick={generateMeme}
                    className="col-span-2 app-gradient p-4 rounded-lg text-white font-bold active:border-2 border-black active:shadow-lg">
                
                    Get a new meme image 🖼
                </button>
            </div>

            <img key={image} src={memeData[image].url}/>
        </main>
    )
}