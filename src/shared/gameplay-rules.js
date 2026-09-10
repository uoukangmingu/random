(function installGameplayRules(global) {
  function createRaceForm(random = Math.random) {
    return {
      baseSpeed: 32 + random() * 6,
      tempoSeed: random() * Math.PI * 2,
      strideSeed: random() * Math.PI * 2,
      burstSeed: random() * Math.PI * 2,
      formBias: -2.4 + random() * 4.8,
      kickBias: random() * 6.5,
      staminaBias: random() * 5.8,
      sprintAt: .64 + random() * .15,
      sprintPower: 8 + random() * 12,
      finishTieBreak: random()
    }
  }

  function raceSprintBoost(progressRatio, horse) {
    const start = horse.sprintAt ?? .72
    if (progressRatio <= start || progressRatio >= 1) return 0
    const phase = (progressRatio - start) / (1 - start)
    return Math.sin(phase * Math.PI) * (horse.sprintPower || 0)
  }

  function sortRaceFinishers(crossings) {
    return crossings.slice().sort((a, b) => a.fraction - b.fraction || a.horse.finishTieBreak - b.horse.finishTieBreak)
  }

  function balloonGrowth({ elapsedMs, heldMs, turnRate, random = Math.random }) {
    const elapsed = Math.max(0, Math.min(160, elapsedMs))
    const surge = 1 + Math.min(1.15, Math.max(0, heldMs) / 1800)
    return (.18 + random() * .56) * elapsed / 64 * turnRate * surge
  }

  function reactionPattern(random = Math.random) {
    const duration = Math.round(1800 + random() * 3600)
    const count = Math.floor(random() * 3)
    const feints = Array.from({ length: count }, (_, index) => ({
      at: Math.round(duration * ((index + 1) / (count + 1)) - 180),
      duration: 320,
      text: index % 2 ? 'HOLD!' : 'WAIT!'
    }))
    return { duration, feints }
  }

  global.RandomRouletteGameplay = Object.freeze({ createRaceForm, raceSprintBoost, sortRaceFinishers, balloonGrowth, reactionPattern })
})(window)
