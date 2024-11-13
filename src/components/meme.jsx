

export default function Meme() {
    function generateMeme(event){
        event.preventDefault()
    }
    
    return (
        <main className="w-4/5 mx-auto mt-8">
            <form className="grid grid-rows-2 grid-cols-2 gap-5">
                
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
            </form>
        </main>
    )
}