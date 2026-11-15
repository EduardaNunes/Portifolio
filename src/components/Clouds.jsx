import { useState } from 'react'
import { randomInt } from '../utils/random'

const CLOUD_COUNT = 20
const MIN_DURATION_S = 40
const MAX_DURATION_S = 59

function createClouds() {
  return Array.from({ length: CLOUD_COUNT }, (_, index) => ({
    id: index,
    top: `${(100 / CLOUD_COUNT) * index}vh`,
    left: `${randomInt(0, 100)}vw`,
    animation: `across ${randomInt(MIN_DURATION_S, MAX_DURATION_S)}s linear infinite`,
  }))
}

export default function Clouds() {
  // Inicializador "lazy": as nuvens são sorteadas só uma vez.
  const [clouds] = useState(createClouds)

  return (
    <section className="clouds" aria-hidden="true">
      {clouds.map(({ id, ...style }) => (
        <img key={id} className="cloud" alt="" style={style} />
      ))}
    </section>
  )
}
