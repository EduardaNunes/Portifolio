import PlayButton from './PlayButton'

export default function HeaderText({ texts }) {
  return (
    <div className="header-text flex-column">
      <div>
        <h2>{texts.greeting}</h2>
        <h1>{texts.name}</h1>
        <h2>
          {texts.roleIntro} <strong>{texts.role}</strong>
        </h2>
      </div>

      <div>
        <h3>{texts.playTitle}</h3>
        <p>{texts.playSubtitle}</p>
      </div>

      <PlayButton label={texts.playButton} />
    </div>
  )
}
