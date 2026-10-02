// Web Audio Synthesis for Natural/Animal/Object Sounds
class SoundQuestSynth {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Rain (Filtered White Noise)
  playRain() {
    this.init();
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.2;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.8);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 1.8);
  }

  // 2. Wave / Sea (Low Pass Modulated Noise)
  playWave() {
    this.init();
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 1.2);
    filter.frequency.linearRampToValueAtTime(250, this.ctx.currentTime + 2.5);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 2.5);
  }

  // 3. Thunder (Low Frequency Impact + Decaying Noise)
  playThunder() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 1.5);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // 4. Wind (Swooshing Biquad Filter)
  playWind() {
    this.init();
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 1.0);
    filter.frequency.linearRampToValueAtTime(350, this.ctx.currentTime + 2.0);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.0);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 2.0);
  }

  // 5. Stream (Gentle bubbling high-pass noise)
  playStream() {
    this.init();
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2400;
    filter.Q.value = 3.0;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.8);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 1.8);
  }

  // 6. Fire (Crackle clicks + low rumble)
  playFire() {
    this.init();
    [0, 0.15, 0.35, 0.6, 0.85, 1.1].forEach(st => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 180 + Math.random() * 200;
      const t = this.ctx.currentTime + st;
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    });
  }

  // 7. Bird (Frequency Modulated Chirp)
  playBird() {
    this.init();
    [0, 0.25, 0.55].forEach(tOffset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const st = this.ctx.currentTime + tOffset;
      osc.frequency.setValueAtTime(2200, st);
      osc.frequency.linearRampToValueAtTime(3400, st + 0.08);
      osc.frequency.linearRampToValueAtTime(2600, st + 0.16);
      gain.gain.setValueAtTime(0.08, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.16);
    });
  }

  // 8. Frog (Low Dual-Tone Ribbit)
  playFrog() {
    this.init();
    [0, 0.3].forEach(tOffset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const st = this.ctx.currentTime + tOffset;
      osc.frequency.setValueAtTime(160, st);
      osc.frequency.linearRampToValueAtTime(220, st + 0.12);
      gain.gain.setValueAtTime(0.08, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.18);
    });
  }

  // 9. Cat (Meow Sine Pitch Slide)
  playCat() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(500, st);
    osc.frequency.linearRampToValueAtTime(750, st + 0.3);
    osc.frequency.linearRampToValueAtTime(450, st + 0.8);
    gain.gain.setValueAtTime(0.12, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.85);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.85);
  }

  // 10. Dog (Short Bark Sawtooth)
  playDog() {
    this.init();
    [0, 0.35].forEach(tOffset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const st = this.ctx.currentTime + tOffset;
      osc.frequency.setValueAtTime(320, st);
      osc.frequency.exponentialRampToValueAtTime(110, st + 0.18);
      gain.gain.setValueAtTime(0.15, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.18);
    });
  }

  // 11. Cow (Low Deep Moo)
  playCow() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(110, st);
    osc.frequency.linearRampToValueAtTime(140, st + 0.5);
    osc.frequency.linearRampToValueAtTime(95, st + 1.2);
    gain.gain.setValueAtTime(0.12, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 1.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 1.2);
  }

  // 12. Cricket (High Pitch rapid chirp)
  playCricket() {
    this.init();
    [0, 0.08, 0.16, 0.4, 0.48, 0.56].forEach(st => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 4500;
      const t = this.ctx.currentTime + st;
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    });
  }

  // 13. Bell (FM Synthesized Chime)
  playBell() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.8);
  }

  // 14. Siren (Two-Tone Ambulance)
  playSiren() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(800, st);
    osc.frequency.setValueAtTime(600, st + 0.3);
    osc.frequency.setValueAtTime(800, st + 0.6);
    osc.frequency.setValueAtTime(600, st + 0.9);
    gain.gain.setValueAtTime(0.06, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 1.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 1.2);
  }

  // 15. Clock (Short Tick-Tock Clicks)
  playClock() {
    this.init();
    [0, 0.4].forEach((tOffset, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 0 ? 1200 : 900;
      const st = this.ctx.currentTime + tOffset;
      gain.gain.setValueAtTime(0.12, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.05);
    });
  }

  // 16. Car Horn (Dual Sawtooth)
  playHorn() {
    this.init();
    [400, 500].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    });
  }

  // 17. Train (Chug-chug rhythm)
  playTrain() {
    this.init();
    [0, 0.18, 0.36, 0.54, 0.72].forEach(st => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 160;
      const t = this.ctx.currentTime + st;
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    });
  }

  // 18. Knock (Door Knock Knock)
  playKnock() {
    this.init();
    [0, 0.25].forEach(st => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 220;
      const t = this.ctx.currentTime + st;
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    });
  }

  // UI Effects: Wrong Buzzer & Correct Fanfare
  playWrong() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 130;
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playFanfare() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const st = this.ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.12, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.25);
    });
  }
}

// Quest Packs Data (6 items per pack = 18 total items)
const QUEST_PACKS = {
  nature: [
    { id: 'rain', label: '빗소리', emoji: '🌧️', soundFunc: 'playRain' },
    { id: 'wave', label: '파도소리', emoji: '🌊', soundFunc: 'playWave' },
    { id: 'thunder', label: '천둥소리', emoji: '⚡', soundFunc: 'playThunder' },
    { id: 'wind', label: '바람소리', emoji: '💨', soundFunc: 'playWind' },
    { id: 'stream', label: '시냇물 소리', emoji: '🏞️', soundFunc: 'playStream' },
    { id: 'fire', label: '모닥불 타닥', emoji: '🔥', soundFunc: 'playFire' }
  ],
  animals: [
    { id: 'bird', label: '새소리', emoji: '🐦', soundFunc: 'playBird' },
    { id: 'frog', label: '개구리', emoji: '🐸', soundFunc: 'playFrog' },
    { id: 'cat', label: '고양이', emoji: '🐱', soundFunc: 'playCat' },
    { id: 'dog', label: '강아지', emoji: '🐶', soundFunc: 'playDog' },
    { id: 'cow', label: '황소 음메', emoji: '🐮', soundFunc: 'playCow' },
    { id: 'cricket', label: '풀벌레 소리', emoji: '🦗', soundFunc: 'playCricket' }
  ],
  things: [
    { id: 'bell', label: '종소리', emoji: '🔔', soundFunc: 'playBell' },
    { id: 'siren', label: '사이렌', emoji: '🚑', soundFunc: 'playSiren' },
    { id: 'clock', label: '시계소리', emoji: '⏰', soundFunc: 'playClock' },
    { id: 'horn', label: '자동차 경적', emoji: '🚗', soundFunc: 'playHorn' },
    { id: 'train', label: '기차 칙칙폭폭', emoji: '🚂', soundFunc: 'playTrain' },
    { id: 'knock', label: '문 똑똑 소리', emoji: '🚪', soundFunc: 'playKnock' }
  ]
};

class SoundMatchGame {
  constructor() {
    this.synth = new SoundQuestSynth();
    this.currentPack = 'nature';
    this.score = 0;
    this.currentTarget = null;
    this.candidates = [];
    this.isAnswering = false;

    this.speakerBtn = document.getElementById('speakerBtn');
    this.rippleRing = document.getElementById('rippleRing');
    this.cardsGrid = document.getElementById('cardsGrid');
    this.feedbackMsg = document.getElementById('feedbackMsg');
    this.scoreVal = document.getElementById('scoreVal');
    this.badgeIcon = document.getElementById('badgeIcon');
    this.speakerHint = document.getElementById('speakerHint');

    this.initEvents();
    this.newRound();
  }

  initEvents() {
    document.querySelectorAll('.pack-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.pack-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentPack = e.target.dataset.pack;
        this.newRound();
      });
    });

    this.speakerBtn.addEventListener('click', () => {
      this.playSound();
    });
  }

  playSound() {
    if (!this.currentTarget) return;
    this.rippleRing.classList.remove('animating');
    void this.rippleRing.offsetWidth;
    this.rippleRing.classList.add('animating');

    const fnName = this.currentTarget.soundFunc;
    if (typeof this.synth[fnName] === 'function') {
      this.synth[fnName]();
    }
  }

  speakLabel(label) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(label);
      u.lang = 'ko-KR';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  }

  newRound() {
    this.isAnswering = false;
    const pack = QUEST_PACKS[this.currentPack];
    // Random target
    this.currentTarget = pack[Math.floor(Math.random() * pack.length)];
    // Select target + 3 random distractors (4 cards total)
    const distractors = pack.filter(item => item.id !== this.currentTarget.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3);
    this.candidates = [this.currentTarget, ...distractors].sort(() => 0.5 - Math.random());

    this.renderCards();
    this.feedbackMsg.textContent = '스피커를 누르고 소리를 들어보세요!';
    this.speakerHint.textContent = '스피커 버튼을 눌러보세요!';
    setTimeout(() => this.playSound(), 300);
  }

  renderCards() {
    this.cardsGrid.innerHTML = '';
    this.candidates.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card-item';
      card.innerHTML = `
        <span class="card-emoji">${item.emoji}</span>
        <span class="card-label">${item.label}</span>
      `;
      card.addEventListener('click', () => this.handleCardClick(card, item));
      this.cardsGrid.appendChild(card);
    });
  }

  handleCardClick(cardEl, item) {
    if (this.isAnswering) return;

    if (item.id === this.currentTarget.id) {
      // Correct!
      this.isAnswering = true;
      cardEl.classList.add('correct');
      this.synth.playFanfare();
      this.speakLabel(item.label);
      this.score++;
      this.scoreVal.textContent = this.score;
      this.feedbackMsg.textContent = `딩동댕! 정답은 '${item.label}' 맞아요!`;
      this.updateBadge();

      setTimeout(() => {
        this.newRound();
      }, 1400);
    } else {
      // Wrong!
      cardEl.classList.add('wrong');
      this.synth.playWrong();
      this.feedbackMsg.textContent = '아쉬워요! 다른 소리예요. 스피커를 다시 들어볼까요?';
      setTimeout(() => {
        cardEl.classList.remove('wrong');
      }, 600);
    }
  }

  updateBadge() {
    if (this.score >= 20) {
      this.badgeIcon.textContent = '👑 황금 귀 마스터';
    } else if (this.score >= 12) {
      this.badgeIcon.textContent = '⭐ 소리 탐정단';
    } else if (this.score >= 5) {
      this.badgeIcon.textContent = '🌿 쫑긋 새싹 귀';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SoundMatchGame();
});
