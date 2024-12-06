import trollface from "../../static/troll-face.png"

export default function Header() {
    return (
        <header className="h-16 py-4 px-20 text-white app-gradient">
            <div className="h-full flex flex-row">
                <img src={trollface} />
                <h2 className="ml-3 font-bold text-xl">Meme Generator</h2>
            </div>
        </header>
    )
}