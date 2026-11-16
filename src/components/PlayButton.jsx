export default function PlayButton({ label, onPlay }) {
  return (
    <button className="btn-animation" onClick={() => onPlay?.()}>
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
