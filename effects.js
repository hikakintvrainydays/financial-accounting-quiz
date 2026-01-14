/**
 * 正解時エフェクトシステム
 * 財務会計学習サイト用 - 飽きさせない多様なパターン
 */

// ===========================================
// エフェクト設定
// ===========================================
const CORRECT_EFFECTS = {
    // 連続正解数に応じてエフェクトを強化
    streakThresholds: {
        normal: 0,      // 通常
        good: 3,        // 3連続
        great: 5,       // 5連続
        amazing: 7,     // 7連続
        legendary: 10   // 10連続
    },

    // 褒め言葉パターン（ランダム選択）
    praiseMessages: {
        normal: [
            "正解！🎉", "すごい！✨", "その調子！💪", "ナイス！👍",
            "いいね！👏", "完璧！💯", "さすが！🌟", "天才！🧠"
        ],
        good: [
            "3連続！🔥", "絶好調！⚡", "ノリノリ！🎵", "止まらない！🚀",
            "キレッキレ！✂️", "無双モード！⚔️"
        ],
        great: [
            "5連続！！🔥🔥", "神ってる！👑", "覚醒してる！✨✨",
            "ゾーン突入！🎯", "完全制覇！💎"
        ],
        amazing: [
            "7連続！！！🔥🔥🔥", "もはや伝説！🏆", "会計の神！📊",
            "簿記マスター！📚", "財務諸表の支配者！👑"
        ],
        legendary: [
            "10連続！！！！🔥🔥🔥🔥", "レジェンド降臨！！！🐉",
            "歴史に刻まれた！！！📜", "全宇宙が祝福！！！🌌"
        ]
    },

    // 会計ジョーク（たまに表示）
    accountingJokes: [
        "借方と貸方が完璧に一致！⚖️",
        "これぞ真のB/Sバランス！📋",
        "クリーン・サープラスの権化！✨",
        "減価償却も涙目の正確さ！💧",
        "この仕訳、監査法人も唸る！👔",
        "引当金も不要なほどの確実性！💪",
        "キャッシュ・フローが潤沢！💰",
        "継続企業の前提、確保！🏢",
        "真実性の原則を体現！📖",
        "GAAPも認める実力！📜",
        // 財務諸表分析・企業価値評価ジョーク
        "ROE50%超え！！📈🔥",
        "これは秒殺問題です💨",
        "超過収益力でかすぎ！！💎✨",
        "PER10倍で割安認定！📊",
        "自己資本比率70%の安定感！🏰",
        "のれん代ゼロでも高評価！👑",
        "流動比率200%で安心！💧",
        "EBITDAマージン最強！📉→📈",
        "DCF法でも高評価確定！💵",
        "アナリストも太鼓判！👨‍💼✅"
    ],

    // アニメ風セリフ
    animeLines: [
        "なん...だと...！？この正解率...!",
        "ふっ...やはり天才か...",
        "これが...財務会計の力...!!",
        "まさか...ここまでとは...",
        "認めよう...お前は強い...",
        "その通りだ！(CV: 大塚明夫)",
        "異議なし！！(裁判風)",
        "圧倒的じゃないか...我が軍は..."
    ],

    // ゲーム風
    gameMessages: [
        "🎮 PERFECT!!", "🎮 EXCELLENT!", "🎮 GREAT!",
        "🎮 COMBO +1", "🎮 CRITICAL HIT!", "🎮 SUPER!",
        "🎮 MARVELOUS!", "🎮 LEGENDARY!", "🎮 GODLIKE!"
    ],

    // 食べ物シリーズ
    foodMessages: [
        "おいしい正解！🍕", "甘～い正解！🍰", "寿司食べたくなる正解！🍣",
        "ラーメン級のうまさ！🍜", "カレーのようにスパイシー！🍛",
        "たこ焼きのように丸い回答！🐙"
    ],

    // 動物シリーズ
    animalMessages: [
        "にゃんと正解！🐱", "わんだふる！🐶", "うさぎも跳ねる正解！🐰",
        "パンダもびっくり！🐼", "ペンギンも拍手！🐧", "フクロウも納得！🦉",
        "ライオンキング級！🦁"
    ],

    // スポーツ風
    sportsMessages: [
        "ゴーーール！⚽", "ホームラン！⚾", "スラムダンク！🏀",
        "エース！🎾", "ストライク！🎳", "ホールインワン！⛳",
        "金メダル！🥇"
    ]
};

// ===========================================
// エフェクト表示関数
// ===========================================
function showCorrectEffect(streakCount = 1) {
    // エフェクトのレベルを決定
    let level = 'normal';
    if (streakCount >= CORRECT_EFFECTS.streakThresholds.legendary) {
        level = 'legendary';
    } else if (streakCount >= CORRECT_EFFECTS.streakThresholds.amazing) {
        level = 'amazing';
    } else if (streakCount >= CORRECT_EFFECTS.streakThresholds.great) {
        level = 'great';
    } else if (streakCount >= CORRECT_EFFECTS.streakThresholds.good) {
        level = 'good';
    }

    // メインエフェクトをランダムに選択
    const effectType = selectRandomEffect(level);

    // エフェクトを実行
    executeEffect(effectType, level, streakCount);
}

function selectRandomEffect(level) {
    const effects = ['confetti', 'fireworks', 'stars', 'coins', 'emoji', 'text'];

    // 高レベルほど派手なエフェクトの確率UP
    if (level === 'legendary') {
        return 'legendary_combo'; // 複合エフェクト
    } else if (level === 'amazing') {
        return effects[Math.floor(Math.random() * effects.length)];
    }

    return effects[Math.floor(Math.random() * effects.length)];
}

function executeEffect(effectType, level, streakCount) {
    // オーバーレイを作成
    const overlay = createEffectOverlay();

    // メッセージを取得
    const message = getRandomMessage(level, streakCount);

    // エフェクトタイプに応じた処理
    switch (effectType) {
        case 'confetti':
            showConfettiEffect(overlay, message);
            break;
        case 'fireworks':
            showFireworksEffect(overlay, message);
            break;
        case 'stars':
            showStarsEffect(overlay, message);
            break;
        case 'coins':
            showCoinsEffect(overlay, message);
            break;
        case 'emoji':
            showEmojiShower(overlay, message);
            break;
        case 'text':
            showTextEffect(overlay, message, level);
            break;
        case 'legendary_combo':
            showLegendaryCombo(overlay, message, streakCount);
            break;
        default:
            showConfettiEffect(overlay, message);
    }

    // 自動削除
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
    }, 1500);
}

function createEffectOverlay() {
    // 既存のオーバーレイを削除
    const existing = document.getElementById('correct-effect-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'correct-effect-overlay';
    overlay.className = 'correct-effect-overlay';
    document.body.appendChild(overlay);

    return overlay;
}

function getRandomMessage(level, streakCount) {
    const messages = CORRECT_EFFECTS.praiseMessages[level];
    const baseMessage = messages[Math.floor(Math.random() * messages.length)];

    // たまに特殊メッセージを混ぜる
    const rand = Math.random();
    if (rand < 0.1) {
        // 10%の確率で会計ジョーク
        return CORRECT_EFFECTS.accountingJokes[Math.floor(Math.random() * CORRECT_EFFECTS.accountingJokes.length)];
    } else if (rand < 0.15) {
        // 5%の確率でアニメ風
        return CORRECT_EFFECTS.animeLines[Math.floor(Math.random() * CORRECT_EFFECTS.animeLines.length)];
    } else if (rand < 0.20) {
        // 5%の確率でゲーム風
        return CORRECT_EFFECTS.gameMessages[Math.floor(Math.random() * CORRECT_EFFECTS.gameMessages.length)];
    } else if (rand < 0.25) {
        // 5%の確率で食べ物
        return CORRECT_EFFECTS.foodMessages[Math.floor(Math.random() * CORRECT_EFFECTS.foodMessages.length)];
    } else if (rand < 0.30) {
        // 5%の確率で動物
        return CORRECT_EFFECTS.animalMessages[Math.floor(Math.random() * CORRECT_EFFECTS.animalMessages.length)];
    } else if (rand < 0.35) {
        // 5%の確率でスポーツ
        return CORRECT_EFFECTS.sportsMessages[Math.floor(Math.random() * CORRECT_EFFECTS.sportsMessages.length)];
    }

    return baseMessage;
}

// ===========================================
// 各エフェクトの実装
// ===========================================

// 紙吹雪エフェクト
function showConfettiEffect(overlay, message) {
    overlay.innerHTML = `
        <div class="effect-message effect-bounce">${message}</div>
        <div class="confetti-container"></div>
    `;

    const container = overlay.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#845ec2', '#ff6f91', '#ffc75f'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-delay: ${Math.random() * 0.5}s;
            animation-duration: ${1 + Math.random()}s;
        `;
        container.appendChild(confetti);
    }
}

// 花火エフェクト
function showFireworksEffect(overlay, message) {
    overlay.innerHTML = `
        <div class="effect-message effect-glow">${message}</div>
        <div class="fireworks-container"></div>
    `;

    const container = overlay.querySelector('.fireworks-container');

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(container, Math.random() * 80 + 10, Math.random() * 60 + 20);
        }, i * 200);
    }
}

function createFirework(container, x, y) {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#ff6b6b', '#ffd93d'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.className = 'firework-spark';
        const angle = (i / 12) * 360;
        spark.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            background: ${color};
            box-shadow: 0 0 6px ${color};
            --angle: ${angle}deg;
        `;
        container.appendChild(spark);
    }
}

// 星エフェクト
function showStarsEffect(overlay, message) {
    overlay.innerHTML = `
        <div class="effect-message effect-sparkle">${message}</div>
        <div class="stars-container"></div>
    `;

    const container = overlay.querySelector('.stars-container');

    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star-piece';
        star.textContent = ['⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 0.5}s;
            font-size: ${20 + Math.random() * 30}px;
        `;
        container.appendChild(star);
    }
}

// コインエフェクト
function showCoinsEffect(overlay, message) {
    overlay.innerHTML = `
        <div class="effect-message effect-golden">${message}</div>
        <div class="coins-container"></div>
    `;

    const container = overlay.querySelector('.coins-container');

    for (let i = 0; i < 25; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin-piece';
        coin.textContent = ['💰', '🪙', '💵', '💎'][Math.floor(Math.random() * 4)];
        coin.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 0.3}s;
            font-size: ${25 + Math.random() * 20}px;
        `;
        container.appendChild(coin);
    }
}

// 絵文字シャワー
function showEmojiShower(overlay, message) {
    overlay.innerHTML = `
        <div class="effect-message effect-rainbow">${message}</div>
        <div class="emoji-container"></div>
    `;

    const container = overlay.querySelector('.emoji-container');
    const emojis = ['🎉', '🎊', '✨', '💯', '🔥', '⚡', '🌈', '🎯', '👑', '🏆', '💪', '🚀'];

    for (let i = 0; i < 40; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-piece';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 0.4}s;
            font-size: ${20 + Math.random() * 25}px;
        `;
        container.appendChild(emoji);
    }
}

// テキストエフェクト（大きな文字）
function showTextEffect(overlay, message, level) {
    let textClass = 'effect-text-normal';
    if (level === 'great' || level === 'amazing') textClass = 'effect-text-great';
    if (level === 'legendary') textClass = 'effect-text-legendary';

    overlay.innerHTML = `
        <div class="effect-big-text ${textClass}">${message}</div>
    `;
}

// レジェンダリーコンボ（全部乗せ）
function showLegendaryCombo(overlay, message, streakCount) {
    overlay.innerHTML = `
        <div class="legendary-container">
            <div class="legendary-bg"></div>
            <div class="legendary-message">${message}</div>
            <div class="legendary-streak">${streakCount}連続正解！</div>
            <div class="legendary-particles"></div>
        </div>
    `;

    const particles = overlay.querySelector('.legendary-particles');
    const items = ['🔥', '⭐', '💎', '👑', '🏆', '✨', '🌟', '💰'];

    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'legendary-particle';
        p.textContent = items[Math.floor(Math.random() * items.length)];
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 0.5}s;
            font-size: ${15 + Math.random() * 35}px;
        `;
        particles.appendChild(p);
    }
}

// ===========================================
// グローバルに公開
// ===========================================
window.showCorrectEffect = showCorrectEffect;
window.CORRECT_EFFECTS = CORRECT_EFFECTS;
