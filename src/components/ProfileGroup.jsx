export default function ProfileGroup({ hint, onClick }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') onClick()
  }

  return (
    <div className="flex-column profile-group">
      <img
        className="profile-pixelart"
        alt="My PixelArt Profile Image"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      />
      <img
        className="profile-arrow"
        alt="pixelart styled arrow pointing to my profile image"
      />
      <p>{hint}</p>
    </div>
  )
}
