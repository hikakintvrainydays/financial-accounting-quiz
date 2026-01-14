/**
 * ボーナスミニゲームシステム
 * 15問正解ごとにプレイ可能なマリオ風ミニゲーム
 */

// ミニゲームの状態管理
let miniGameState = {
    totalCorrect: 0,      // 累計正解数
    lastBonusAt: 0,       // 前回ボーナスを獲得した正解数
    bonusThreshold: 15    // ボーナス獲得に必要な正解数
};

// LocalStorageから読み込み
function loadMiniGameState() {
    const saved = localStorage.getItem('財務会計_minigame');
    if (saved) {
        miniGameState = JSON.parse(saved);
    }
}

// LocalStorageに保存
function saveMiniGameState() {
    localStorage.setItem('財務会計_minigame', JSON.stringify(miniGameState));
}

/**
 * 正解時に呼び出す関数
 * 15問ごとにミニゲームを起動
 */
function checkBonusGame() {
    miniGameState.totalCorrect++;
    saveMiniGameState();

    const correctSinceLastBonus = miniGameState.totalCorrect - miniGameState.lastBonusAt;

    if (correctSinceLastBonus >= miniGameState.bonusThreshold) {
        // ボーナスゲーム獲得！少し遅延させて表示
        setTimeout(() => {
            showBonusGameNotification();
        }, 1800); // エフェクト終了後
        return true;
    }

    return false;
}

/**
 * ボーナスゲーム獲得通知
 */
function showBonusGameNotification() {
    const notification = document.createElement('div');
    notification.className = 'bonus-notification';
    notification.innerHTML = `
        <div class="bonus-notification-content">
            <div class="bonus-icon">🎮</div>
            <div class="bonus-title">ボーナスゲーム解放！</div>
            <div class="bonus-desc">${miniGameState.bonusThreshold}問正解達成🎉</div>
            <button class="bonus-play-btn" onclick="startMiniGame()">遊ぶ！</button>
            <button class="bonus-skip-btn" onclick="skipMiniGame()">後で</button>
        </div>
    `;
    document.body.appendChild(notification);

    // アニメーション
    requestAnimationFrame(() => {
        notification.classList.add('active');
    });
}

/**
 * ミニゲームをスキップ
 */
function skipMiniGame() {
    const notification = document.querySelector('.bonus-notification');
    if (notification) {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }
    miniGameState.lastBonusAt = miniGameState.totalCorrect;
    saveMiniGameState();
}

/**
 * ミニゲーム開始
 */
function startMiniGame() {
    const notification = document.querySelector('.bonus-notification');
    if (notification) notification.remove();

    miniGameState.lastBonusAt = miniGameState.totalCorrect;
    saveMiniGameState();

    // ゲーム画面を表示
    showCoinCatchGame();
}

/**
 * コインキャッチゲーム
 * マリオ風：落ちてくるコインをクリックで集める
 */
function showCoinCatchGame() {
    const gameContainer = document.createElement('div');
    gameContainer.id = 'mini-game-container';
    gameContainer.className = 'mini-game-container';

    gameContainer.innerHTML = `
        <div class="mini-game-header">
            <span class="mini-game-title">💰 コインキャッチ！</span>
            <span class="mini-game-score">スコア: <span id="game-score">0</span></span>
            <span class="mini-game-time">残り: <span id="game-time">15</span>秒</span>
        </div>
        <div class="mini-game-area" id="game-area">
            <div class="mini-game-instruction">タップでコインをゲット！</div>
        </div>
    `;

    document.body.appendChild(gameContainer);

    requestAnimationFrame(() => {
        gameContainer.classList.add('active');
    });

    // ゲーム開始
    setTimeout(() => {
        runCoinCatchGame();
    }, 500);
}

/**
 * ゲームロジック実行
 */
function runCoinCatchGame() {
    const gameArea = document.getElementById('game-area');
    const scoreEl = document.getElementById('game-score');
    const timeEl = document.getElementById('game-time');

    let score = 0;
    let timeLeft = 15;
    let gameActive = true;

    // 説明を消す
    gameArea.querySelector('.mini-game-instruction').style.display = 'none';

    // タイマー
    const timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            endCoinCatchGame(score);
        }
    }, 1000);

    // コイン生成
    const coinTypes = [
        { emoji: '🪙', points: 10, speed: 2 },
        { emoji: '💰', points: 25, speed: 2.5 },
        { emoji: '💎', points: 50, speed: 3 },
        { emoji: '👑', points: 100, speed: 3.5 }
    ];

    function spawnCoin() {
        if (!gameActive) return;

        const coinType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
        // レアコインは確率を下げる
        const rarity = Math.random();
        let selectedCoin;
        if (rarity < 0.5) {
            selectedCoin = coinTypes[0]; // 50%
        } else if (rarity < 0.8) {
            selectedCoin = coinTypes[1]; // 30%
        } else if (rarity < 0.95) {
            selectedCoin = coinTypes[2]; // 15%
        } else {
            selectedCoin = coinTypes[3]; // 5%
        }

        const coin = document.createElement('div');
        coin.className = 'game-coin';
        coin.textContent = selectedCoin.emoji;
        coin.style.left = (Math.random() * 80 + 10) + '%';
        coin.style.animationDuration = selectedCoin.speed + 's';

        coin.addEventListener('click', () => {
            if (!gameActive) return;
            score += selectedCoin.points;
            scoreEl.textContent = score;

            // ポイント表示
            const pointPopup = document.createElement('div');
            pointPopup.className = 'point-popup';
            pointPopup.textContent = `+${selectedCoin.points}`;
            pointPopup.style.left = coin.style.left;
            pointPopup.style.top = coin.offsetTop + 'px';
            gameArea.appendChild(pointPopup);
            setTimeout(() => pointPopup.remove(), 500);

            // クリック音
            if (typeof playCorrectSound === 'function') {
                playCorrectSound(1);
            }

            coin.remove();
        });

        gameArea.appendChild(coin);

        // コイン削除（画面外に落ちた場合）
        setTimeout(() => {
            if (coin.parentElement) coin.remove();
        }, selectedCoin.speed * 1000);

        // 次のコイン生成
        if (gameActive) {
            setTimeout(spawnCoin, 300 + Math.random() * 400);
        }
    }

    spawnCoin();
}

/**
 * ゲーム終了
 */
function endCoinCatchGame(score) {
    const gameContainer = document.getElementById('mini-game-container');
    const gameArea = document.getElementById('game-area');

    // 残りのコインを消す
    gameArea.querySelectorAll('.game-coin').forEach(c => c.remove());

    // 結果表示
    let message, emoji;
    if (score >= 300) {
        message = 'スーパースター！！🌟';
        emoji = '🏆';
    } else if (score >= 200) {
        message = 'すごい！！';
        emoji = '🎉';
    } else if (score >= 100) {
        message = 'いいね！';
        emoji = '👍';
    } else {
        message = 'また挑戦しよう！';
        emoji = '💪';
    }

    gameArea.innerHTML = `
        <div class="game-result">
            <div class="result-emoji">${emoji}</div>
            <div class="result-message">${message}</div>
            <div class="result-score">スコア: ${score}点</div>
            <button class="btn-primary" onclick="closeMiniGame()">学習に戻る</button>
        </div>
    `;
}

/**
 * ミニゲームを閉じる
 */
function closeMiniGame() {
    const gameContainer = document.getElementById('mini-game-container');
    if (gameContainer) {
        gameContainer.classList.remove('active');
        setTimeout(() => gameContainer.remove(), 300);
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadMiniGameState();
});

// グローバルに公開
window.checkBonusGame = checkBonusGame;
window.startMiniGame = startMiniGame;
window.skipMiniGame = skipMiniGame;
window.closeMiniGame = closeMiniGame;
window.miniGameState = miniGameState;
