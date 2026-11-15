import { GAME_PAGE_URL } from '../data/constants'

export default function PlayButton({ label }) {
  const goToGame = () => window.location.assign(GAME_PAGE_URL)

  return (
    <button className="btn-animation" onClick={goToGame}>
      <div className="btn btn-play">
        <div className="btn-border btn-border-top" />
        <div className="btn-highlight" />
        <div className="btn-center">
          <p>{label}</p>
        </div>
        <div className="btn-border btn-border-bottom" />
      </div>
    </button>
  )
}
