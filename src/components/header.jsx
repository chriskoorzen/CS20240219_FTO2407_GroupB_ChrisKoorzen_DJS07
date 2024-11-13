import trollface from "../../static/troll-face.png"

export default function Header() {
    return (
        <header className="h-16 p-4 flex flex-row justify-around text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="h-full flex flex-row">
                <img src={trollface} />
                <h2 className="ml-3 font-bold text-xl">Meme Generator</h2>
            </div>
            <h4 className="">React Course - Project 3</h4>
        </header>
    )
}