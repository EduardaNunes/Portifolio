/** Retorna um inteiro aleatório entre `min` e `max` (ambos inclusivos). */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
