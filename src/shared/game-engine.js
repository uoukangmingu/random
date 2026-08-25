(function installGameEngine(global) {
  function freezeOutcome(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
    Object.values(value).forEach(freezeOutcome)
    return Object.freeze(value)
  }

  function calculateWeightedOutcome(items, suppliedSeed) {
    const normalized = (items || []).map((item, index) => ({
      index,
      label: String(item?.label || '').trim(),
      weight: Number(item?.weight)
    }))

    if (normalized.length < 2 || normalized.some((item) => !item.label || !Number.isFinite(item.weight) || item.weight <= 0)) {
      throw new Error('INVALID_WEIGHTED_ITEMS')
    }

    const seed = Number.isFinite(Number(suppliedSeed))
      ? Number(suppliedSeed) >>> 0
      : global.RandomRouletteRng.randomUint32()
    const rng = global.RandomRouletteRng.createSeeded(seed)
    const totalWeight = normalized.reduce((sum, item) => sum + item.weight, 0)
    const pointer = rng() * totalWeight
    let cursor = 0
    let selected = normalized[normalized.length - 1]

    for (const item of normalized) {
      cursor += item.weight
      if (pointer < cursor) {
        selected = item
        break
      }
    }

    return freezeOutcome({
      type: 'weighted-wheel',
      seed,
      selectedIndex: selected.index,
      winner: selected.label,
      selectedWeight: selected.weight,
      totalWeight,
      turns: 6 + Math.floor(rng() * 3),
      createdAt: Date.now()
    })
  }

  function createFixedClock({ stepMs = 250, renderMs = 250 } = {}) {
    return {
      stepMs,
      renderMs,
      accumulatorMs: 0,
      lastNow: 0,
      lastRenderNow: 0
    }
  }

  function advanceFixedClock(clock, now, onStep, onRender) {
    const safeNow = Number(now) || performance.now()
    const delta = clock.lastNow ? Math.min(1000, Math.max(0, safeNow - clock.lastNow)) : 0
    clock.lastNow = safeNow
    clock.accumulatorMs += delta

    while (clock.accumulatorMs >= clock.stepMs) {
      clock.accumulatorMs -= clock.stepMs
      onStep?.(clock.stepMs)
    }

    if (!clock.lastRenderNow || safeNow - clock.lastRenderNow >= clock.renderMs) {
      clock.lastRenderNow = safeNow
      onRender?.(clock.accumulatorMs / clock.stepMs)
    }
  }

  global.RandomRouletteEngine = Object.freeze({
    calculateWeightedOutcome,
    createFixedClock,
    advanceFixedClock
  })
})(window)
