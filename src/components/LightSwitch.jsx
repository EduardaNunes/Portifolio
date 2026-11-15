import { useDraggableSwitch } from '../hooks/useDraggableSwitch'

export default function LightSwitch({ hint, onToggle }) {
  const { top, startDragging } = useDraggableSwitch(onToggle)

  return (
    <div className="light-switch-group flex-row">
      <div className="switch-text flex-column">
        {hint.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <img alt="Arrow pointing to light switch" />
      </div>

      <img
        className="light-dark-switch"
        alt="Light Switch"
        style={{ top }}
        draggable={false}
        onPointerDown={startDragging}
      />
    </div>
  )
}
