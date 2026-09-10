(function installSoundtrack(global) {
  // Original eight-bar scores. All audio is synthesized locally; no downloads or media tracking.
  const MAJOR = [0, 2, 4, 5, 7, 9, 11]
  const MINOR = [0, 2, 3, 5, 7, 8, 10]
  const tracks = {
    home: { title: '햇살 아래 작은 선택', bpm: 88, root: 60, scale: MAJOR, progression: [0, 5, 3, 4], instrument: 'keys', groove: 'soft', swing: .12,
      phrases: [[7, null, 9, 11, 9, null, 8, null], [7, 6, 4, null, 5, 4, 2, null]] },
    menu: { title: '오늘의 놀이터', bpm: 104, root: 62, scale: MAJOR, progression: [0, 3, 5, 4], instrument: 'pluck', groove: 'lounge', swing: .15,
      phrases: [[7, 9, null, 11, 9, 8, null, 4], [9, null, 7, 6, 4, null, 6, 7]] },
    luck: { title: '무엇을 골라볼까', bpm: 108, root: 65, scale: MAJOR, progression: [0, 5, 1, 4], instrument: 'mallet', groove: 'lounge', swing: .1,
      phrases: [[7, null, 9, 11, null, 9, 8, 7], [4, 6, 7, null, 9, 8, 7, null]] },
    physical: { title: '플레이 준비', bpm: 118, root: 60, scale: MAJOR, progression: [0, 3, 0, 4], instrument: 'synth', groove: 'arcade', swing: 0,
      phrases: [[7, null, 7, 9, 11, null, 9, 7], [4, 7, null, 9, 8, null, 6, 4]] },
    wheel: { title: '터보 캐러셀', bpm: 140, root: 62, scale: MINOR, progression: [0, 5, 2, 6], instrument: 'synth', groove: 'disco', swing: 0,
      phrases: [[7, 9, 11, 9, 7, 9, 13, 11], [11, null, 9, 7, 6, 7, 9, null]] },
    marble: { title: '통통 구슬 공방', bpm: 112, root: 67, scale: MAJOR, progression: [0, 4, 5, 3], instrument: 'mallet', groove: 'wood', swing: .13,
      phrases: [[7, null, 4, 6, 7, null, 9, 4], [9, 7, null, 4, 6, null, 2, 4]] },
    race: { title: '결승선 너머', bpm: 144, root: 62, scale: MAJOR, progression: [0, 3, 5, 4], instrument: 'brass', groove: 'gallop', swing: 0,
      phrases: [[7, 7, 9, null, 11, 9, 7, null], [11, null, 10, 9, 7, 6, 7, null]] },
    cardBattle: { title: '한 장의 변수', bpm: 102, root: 62, scale: MINOR, progression: [0, 3, 1, 4], instrument: 'keys', groove: 'lounge', swing: .2,
      phrases: [[7, null, 9, 10, null, 9, 6, null], [11, null, 9, 7, 6, null, 4, 6]] },
    arena: { title: '라운드 임팩트', bpm: 130, root: 57, scale: MINOR, progression: [0, 5, 3, 6], instrument: 'synth', groove: 'arcade', swing: 0,
      phrases: [[7, 7, null, 4, 7, 9, null, 11], [7, null, 6, 7, 4, null, 3, 4]] },
    suspense: { title: '빈 방아쇠', bpm: 72, root: 50, scale: MINOR, progression: [0, 0, 5, 4], instrument: 'pluck', groove: 'heartbeat', swing: 0,
      phrases: [[7, null, null, 8, null, null, 4, null], [6, null, null, null, 7, null, null, null]] },
    stock: { title: '네온 티커', bpm: 124, root: 64, scale: MINOR, progression: [0, 2, 5, 6], instrument: 'synth', groove: 'disco', swing: 0,
      phrases: [[7, 4, 9, null, 11, 9, 7, 4], [9, null, 7, 9, 6, 7, null, 4]] },
    ladder: { title: '구름 위 계단', bpm: 96, root: 60, scale: MAJOR, progression: [0, 1, 3, 4], instrument: 'bell', groove: 'soft', swing: .08,
      phrases: [[7, 8, 9, null, 11, null, 9, 8], [7, null, 6, null, 4, 5, 6, null]] },
    balloon: { title: '조심조심 부풀어', bpm: 98, root: 65, scale: MINOR, progression: [0, 3, 0, 4], instrument: 'pluck', groove: 'wood', swing: .12,
      phrases: [[7, null, 7, 8, null, 9, null, 6], [7, 6, null, 4, null, 6, 7, null]] },
    bombPass: { title: '째깍 다음 차례', bpm: 116, root: 57, scale: MINOR, progression: [0, 6, 5, 4], instrument: 'mallet', groove: 'clock', swing: 0,
      phrases: [[7, null, 6, null, 7, 9, null, 8], [7, null, 4, 6, null, 4, 3, null]] },
    precision: { title: '원 안의 리듬', bpm: 120, root: 64, scale: MAJOR, progression: [0, 3, 1, 4], instrument: 'pluck', groove: 'minimal', swing: 0,
      phrases: [[7, null, 9, null, 11, 9, null, 7], [4, 7, null, 6, 7, null, 9, null]] },
    keyReact: { title: '신호를 기다리며', bpm: 84, root: 62, scale: MINOR, progression: [0, 5, 3, 4], instrument: 'bell', groove: 'ambient', swing: 0,
      phrases: [[7, null, null, null, 11, null, null, null], [9, null, null, null, 6, null, null, null]] },
    bearFind: { title: '작은 곰의 선물 가게', bpm: 82, root: 69, scale: MAJOR, progression: [0, 3, 5, 4], instrument: 'bell', groove: 'soft', swing: .14,
      phrases: [[7, null, 9, 11, 9, null, 7, 6], [4, null, 6, 7, null, 9, 7, null]] },
    calmGame: { title: '작은 모험', bpm: 92, root: 65, scale: MAJOR, progression: [0, 5, 3, 4], instrument: 'keys', groove: 'soft', swing: .1,
      phrases: [[7, null, 9, null, 11, 9, null, 7], [4, null, 6, 7, null, 6, 4, null]] }
  }
  const instruments = Object.freeze({
    keys: { wave: 'sine', attack: .006, partial: 2, partialGain: .16 },
    bell: { wave: 'sine', attack: .004, partial: 2.76, partialGain: .12 },
    mallet: { wave: 'sine', attack: .003, partial: 4, partialGain: .09 },
    pluck: { wave: 'triangle', attack: .004 },
    synth: { wave: 'triangle', attack: .008, partial: 2, partialGain: .07 },
    brass: { wave: 'sawtooth', attack: .045 },
    pad: { wave: 'sine', attack: .14 },
    bass: { wave: 'triangle', attack: .008 },
    kick: { wave: 'sine', attack: .003, slideTo: 43 },
    tom: { wave: 'sine', attack: .003, slideTo: 85 },
    rim: { wave: 'triangle', attack: .001 },
    hat: { noise: true, attack: .002, highpass: 6200 },
    brush: { noise: true, attack: .009, highpass: 2200 }
  })
  const clamp = (x, low, high) => Math.max(low, Math.min(high, x))
  const midiHz = (midi) => 440 * Math.pow(2, (midi - 69) / 12)
  function scaleNote(track, degree) {
    const octave = Math.floor(degree / 7)
    return track.root + octave * 12 + track.scale[((degree % 7) + 7) % 7]
  }
  function getStepSeconds(key, night = false) {
    return 30 / ((tracks[key] || tracks.menu).bpm * (night ? .94 : 1))
  }
  function scoreStep(key, tick, { night = false, energy = .45 } = {}) {
    if (energy < 0) return []
    const track = tracks[key] || tracks.menu
    const step = tick % 8, bar = Math.floor(tick / 8) % 8
    const chord = track.progression[bar % 4]
    const seconds = getStepSeconds(key, night)
    const events = []
    const note = (instrument, midi, beats, gain, delay = 0) => events.push({ instrument, frequency: midiHz(midi), duration: beats * seconds, gain, delay })
    const percussion = (instrument, frequency, duration, gain) => events.push({ instrument, frequency, duration, gain, delay: 0 })
    const phrase = track.phrases[(bar < 4 ? bar : bar + 1) % 2]
    const degree = phrase[step]
    const intensity = clamp(energy, 0, 1)
    if (degree !== null) {
      const duration = track.instrument === 'bell' ? 2.8 : track.instrument === 'keys' ? 1.6 : .8
      const toneGain = track.instrument === 'brass' ? .046 : .105
      const resolved = bar === 7 && step >= 6 ? 7 : degree + chord
      let melodyMidi = scaleNote(track, resolved)
      if (melodyMidi > track.root + 23) melodyMidi -= 12
      if (!['bell', 'mallet'].includes(track.instrument)) melodyMidi -= 12
      note(track.instrument, melodyMidi, duration, toneGain * (step % 2 ? .78 : 1), step % 2 ? track.swing * seconds : 0)
    }
    if (step === 0) {
      for (const offset of [0, 2, 4, 6]) note('pad', scaleNote(track, chord + offset) - 12, 7.5, night ? .031 : .025)
    }
    if (step === 0 || step === 4 || (track.groove === 'lounge' && (step === 3 || step === 7))) {
      note('bass', scaleNote(track, chord + (step === 4 ? 4 : step === 7 ? 6 : 0)) - 24, step % 2 ? .65 : 1.5, track.groove === 'ambient' ? .045 : .115)
    }
    const drums = (night ? .64 : .9) * (.55 + .45 * intensity)
    const groove = track.groove
    if (['disco', 'arcade'].includes(groove)) {
      if (step % 2 === 0) percussion('kick', 125, .22, .18 * drums)
      if (step === 2 || step === 6) percussion('brush', 2200, .10, .085 * drums)
      if (step % 2) percussion('hat', 8000, .045, .038 * drums)
    } else if (groove === 'gallop') {
      if ([0, 3, 4, 7].includes(step)) percussion('kick', 145, .14, (step % 4 ? .11 : .18) * drums)
      if (step === 2 || step === 6) percussion('tom', 230, .14, .105 * drums)
      if (intensity > .6 && step % 2) percussion('hat', 7800, .045, .032 * drums)
    } else if (groove === 'heartbeat') {
      if (step < 2) percussion('kick', step ? 96 : 110, .23, (step ? .12 : .18) * drums)
      if (step === 5) percussion('rim', 1200, .025, .027 * drums)
    } else if (groove === 'clock') {
      percussion('rim', step % 2 ? 1100 : 1450, .025, .032 * drums)
      if (step === 0 || step === 4) percussion('kick', 105, .18, .13 * drums)
    } else if (groove !== 'ambient') {
      if (step === 0 || step === 4) percussion('kick', 115, .16, (groove === 'soft' ? .065 : .13) * drums)
      if (step === 2 || step === 6) percussion(groove === 'lounge' ? 'brush' : 'rim', groove === 'lounge' ? 2800 : 960, groove === 'lounge' ? .12 : .026, .045 * drums)
      if (groove === 'lounge' && step % 2) percussion('hat', 7000, .04, .02 * drums)
    }
    return events
  }

  function createPlayer(ctx, destination, options = {}) {
    const timers = options.timers || global
    const maxVoices = 28
    let active = null
    let totalVoices = 0
    const retiring = new Set()
    const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .5), ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    let noiseSeed = 73129
    for (let i = 0; i < noiseData.length; i++) {
      noiseSeed = (Math.imul(1664525, noiseSeed) + 1013904223) >>> 0
      noiseData[i] = (noiseSeed / 4294967296) * 2 - 1
    }
    function addVoice(session, event, at) {
      if (session.voices.size >= maxVoices || totalVoices >= 48) return
      const patch = instruments[event.instrument]
      const envelope = ctx.createGain()
      const sources = [], nodes = [envelope]
      const duration = Math.max(.025, event.duration)
      const attack = Math.min(duration * .3, patch.attack)
      const peak = Math.max(.0001, event.gain)
      envelope.gain.setValueAtTime(.0001, at)
      envelope.gain.linearRampToValueAtTime(peak, at + attack)
      envelope.gain.exponentialRampToValueAtTime(.0001, at + duration)
      envelope.connect(session.filter)
      const voice = { stop() {
        for (const source of sources) { try { source.stop(); } catch (error) {} }
        for (const node of nodes) { try { node.disconnect(); } catch (error) {} }
        if (session.voices.delete(voice)) totalVoices--
      } }
      if (patch.noise) {
        const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter()
        source.buffer = noiseBuffer
        filter.type = 'highpass'; filter.frequency.value = patch.highpass
        source.connect(filter); filter.connect(envelope)
        sources.push(source); nodes.push(source, filter)
      } else {
        const source = ctx.createOscillator()
        source.type = patch.wave
        source.frequency.setValueAtTime(event.frequency, at)
        if (patch.slideTo) source.frequency.exponentialRampToValueAtTime(patch.slideTo, at + duration * .8)
        source.connect(envelope); sources.push(source); nodes.push(source)
        if (patch.partial) {
          const partial = ctx.createOscillator(), partialGain = ctx.createGain()
          partial.type = 'sine'; partial.frequency.setValueAtTime(event.frequency * patch.partial, at)
          partialGain.gain.value = patch.partialGain
          partial.connect(partialGain); partialGain.connect(envelope)
          sources.push(partial); nodes.push(partial, partialGain)
        }
      }
      session.voices.add(voice)
      totalVoices++
      let ended = 0
      for (const source of sources) {
        source.onended = () => { if (++ended === sources.length) { for (const node of nodes) node.disconnect(); if (session.voices.delete(voice)) totalVoices-- } }
        source.start(at); source.stop(at + duration + .025)
      }
    }
    function release(session) {
      for (const voice of [...session.voices]) voice.stop()
      session.filter.disconnect(); session.mix.disconnect(); session.bus.disconnect()
      retiring.delete(session)
    }
    function stop(fadeSeconds = .22) {
      if (!active) return
      const session = active; active = null
      timers.clearInterval(session.timer)
      session.bus.gain.cancelScheduledValues(ctx.currentTime)
      session.bus.gain.setTargetAtTime(0, ctx.currentTime, Math.max(.01, fadeSeconds / 4))
      retiring.add(session)
      session.cleanup = timers.setTimeout(() => release(session), fadeSeconds * 1000 + 80)
    }
    function play(key, { night = false, getEnergy = () => .45 } = {}) {
      const actualKey = tracks[key] ? key : 'menu'
      const identity = `${actualKey}:${night ? 'night' : 'day'}`
      if (active?.identity === identity) return
      stop()
      const session = { identity, key: actualKey, night, getEnergy, tick: 0, nextAt: ctx.currentTime + .035,
        voices: new Set(), bus: ctx.createGain(), filter: ctx.createBiquadFilter(), mix: ctx.createGain(), mixLevel: -1 }
      session.filter.type = 'lowpass'; session.filter.frequency.value = night ? 2600 : 4300
      session.filter.Q.value = .5
      session.filter.connect(session.mix); session.mix.connect(session.bus); session.bus.connect(destination)
      session.bus.gain.setValueAtTime(0, ctx.currentTime)
      session.bus.gain.linearRampToValueAtTime(night ? .85 : 1, ctx.currentTime + .28)
      active = session
      const stepSeconds = getStepSeconds(actualKey, night)
      const schedule = () => {
        if (active !== session || ctx.state !== 'running') return
        const now = ctx.currentTime
        // Skip missed music beats after a stall; never enqueue an audible catch-up burst.
        if (session.nextAt < now - .12) {
          const skipped = Math.ceil((now - session.nextAt) / stepSeconds)
          session.tick += skipped; session.nextAt += skipped * stepSeconds
        }
        const energy = session.getEnergy()
        const level = energy < 0 ? 0 : 1
        if (level !== session.mixLevel) {
          session.mixLevel = level
          session.mix.gain.setTargetAtTime(level, now, .035)
        }
        while (session.nextAt < now + .18) {
          for (const event of scoreStep(actualKey, session.tick, { night, energy })) {
            addVoice(session, event, Math.max(now + .004, session.nextAt + event.delay))
          }
          session.tick++; session.nextAt += stepSeconds
        }
      }
      schedule()
      session.timer = timers.setInterval(schedule, 80)
    }
    function dispose() {
      stop(0)
      for (const session of [...retiring]) { timers.clearTimeout(session.cleanup); release(session) }
    }
    return Object.freeze({ play, stop, dispose, isPlaying: () => Boolean(active) })
  }
  global.RandomRouletteSoundtrack = Object.freeze({ tracks, instruments, getStepSeconds, scoreStep, createPlayer })
})(window)
