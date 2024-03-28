import { Square } from "./Square.jsx"
export function WinnerModal({winner, resetGame}) {

    if (winner == null) return null

    const winnerText = winner == false ? 'Empate' : 'Ganó'
    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {
                        winner == false
                            ? 'Empate'
                            : 'Ganó:'
                    }
                </h2>

                <header>
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}