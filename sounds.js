/**
 * 正解時サウンドシステム
 * Web Audio APIを使用してブラウザ内で音を生成
 */

// AudioContext（一度だけ初期化）
let audioContext = null;

/**
 * AudioContextを取得または初期化
 */
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

/**
 * 正解時のサウンドを再生
 * 連続正解数に応じてサウンドが変化
 */
function playCorrectSound(streakCount = 1) {
    try {
        const ctx = getAudioContext();

        // ブラウザがサスペンド状態の場合は再開
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        // 連続正解数に応じたサウンドタイプを選択
        if (streakCount >= 10) {
            playLegendarySound(ctx);
        } else if (streakCount >= 5) {
            playAmazingSound(ctx);
        } else if (streakCount >= 3) {
            playComboSound(ctx);
        } else {
            playBasicCorrectSound(ctx);
        }
    } catch (e) {
        console.log('サウンド再生エラー:', e);
    }
}

/**
 * 基本的な正解サウンド（ピコン！）
 */
function playBasicCorrectSound(ctx) {
    const now = ctx.currentTime;

    // オシレーター1（メイン音）
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.setValueAtTime(1108, now + 0.1); // C#6

    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialDecayTo = 0.01;
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.2);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.2);
}

/**
 * コンボサウンド（3連続以上）
 */
function playComboSound(ctx) {
    const now = ctx.currentTime;

    // 上昇するアルペジオ
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const startTime = now + i * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.linearRampToValueAtTime(0.01, startTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.15);
    });
}

/**
 * 素晴らしいサウンド（5連続以上）
 */
function playAmazingSound(ctx) {
    const now = ctx.currentTime;

    // ファンファーレ風
    const melodyNotes = [
        { freq: 523.25, time: 0, duration: 0.1 },     // C5
        { freq: 659.25, time: 0.1, duration: 0.1 },   // E5
        { freq: 783.99, time: 0.2, duration: 0.1 },   // G5
        { freq: 1046.5, time: 0.3, duration: 0.3 },   // C6 (長め)
    ];

    melodyNotes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.freq, now);

        const startTime = now + note.time;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.linearRampToValueAtTime(0.01, startTime + note.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.duration);
    });

    // 和音を追加
    const chordNotes = [523.25, 659.25, 783.99]; // C major
    chordNotes.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.1, now + 0.3);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + 0.3);
        osc.stop(now + 0.7);
    });
}

/**
 * レジェンダリーサウンド（10連続以上）
 */
function playLegendarySound(ctx) {
    const now = ctx.currentTime;

    // 壮大なファンファーレ
    const sequence = [
        { freq: 392.00, time: 0, duration: 0.15 },    // G4
        { freq: 523.25, time: 0.15, duration: 0.15 }, // C5
        { freq: 659.25, time: 0.30, duration: 0.15 }, // E5
        { freq: 783.99, time: 0.45, duration: 0.15 }, // G5
        { freq: 1046.5, time: 0.60, duration: 0.4 },  // C6
    ];

    sequence.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.freq, now);

        const startTime = now + note.time;
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.linearRampToValueAtTime(0.01, startTime + note.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.duration + 0.1);
    });

    // 最後に壮大な和音
    const finalChord = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C major + octave
    finalChord.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.08, now + 0.6);
        gain.gain.linearRampToValueAtTime(0.01, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + 0.6);
        osc.stop(now + 1.2);
    });
}

/**
 * 不正解時のサウンド（ブッ）
 */
function playIncorrectSound() {
    try {
        const ctx = getAudioContext();

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.15);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    } catch (e) {
        console.log('サウンド再生エラー:', e);
    }
}

// グローバルに公開
window.playCorrectSound = playCorrectSound;
window.playIncorrectSound = playIncorrectSound;
