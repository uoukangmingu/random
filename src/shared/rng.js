(function installRandomService(global) {
  const UINT32_RANGE = 0x100000000

  function randomUint32() {
    try {
      if (global.crypto?.getRandomValues) {
        const values = new Uint32Array(1)
        global.crypto.getRandomValues(values)
        return values[0] >>> 0
      }
    } catch (error) {}

    return ((Date.now() ^ Math.floor(performance.now() * 1000) ^ Math.floor(Math.random() * UINT32_RANGE)) >>> 0)
  }

  function createSeeded(seed = randomUint32()) {
    let state = Number(seed) >>> 0
    return function seededRandom() {
      state = (state + 0x6D2B79F5) >>> 0
      let value = state
      value = Math.imul(value ^ (value >>> 15), value | 1)
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
      return ((value ^ (value >>> 14)) >>> 0) / UINT32_RANGE
    }
  }

  function randomInt(maxExclusive) {
    const max = Math.floor(Number(maxExclusive))
    if (!Number.isFinite(max) || max <= 0) return 0

    if (global.crypto?.getRandomValues && max <= UINT32_RANGE) {
      const limit = UINT32_RANGE - (UINT32_RANGE % max)
      let value = 0
      do {
        value = randomUint32()
      } while (value >= limit)
      return value % max
    }

    return Math.floor(Math.random() * max)
  }

  global.RandomRouletteRng = Object.freeze({
    randomUint32,
    randomInt,
    createSeeded
  })
})(window)
