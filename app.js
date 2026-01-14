/**
 * 財務会計総論 定期試験対策サイト
 * Main Application Logic
 */

// ===========================================
// グローバル状態管理
// ===========================================
const App = {
    // 問題データ
    questions: [],
    chapters: [],
    examFocusAreas: [],

    // 現在のセッション状態
    currentMode: null,
    currentQuestions: [],
    currentIndex: 0,
    currentScore: 0,
    sessionStartTime: null,
    sessionAnswers: [],
    currentStreak: 0,  // 連続正解カウンタ

    // タイマー関連
    timerInterval: null,
    timerValue: 15,

    // 進捗データ（LocalStorageから読み込み）
    progress: {
        totalAnswered: 0,
        totalCorrect: 0,
        chapterStats: {},
        questionStats: {},
        lastStudyDate: null,
        streakDays: 0
    }
};

// ===========================================
// 初期化
// ===========================================
document.addEventListener('DOMContentLoaded', async () => {
    // 進捗データの読み込み
    loadProgress();

    // 問題データの読み込み
    await loadQuestions();

    // UIの初期化
    initUI();

    // イベントリスナーの設定
    setupEventListeners();

    // ローディング完了
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 1800);
});

// ===========================================
// データ読み込み（外部ファイルまたは埋め込み）
// ===========================================
async function loadQuestions() {
    // 外部ファイル(questions_v2.js)からQUESTION_DATAが読み込まれているか確認
    if (typeof QUESTION_DATA !== 'undefined') {
        App.questions = QUESTION_DATA.questions;
        App.chapters = QUESTION_DATA.chapters;
        App.examFocusAreas = QUESTION_DATA.examFocusAreas;
        console.log(`✅ v2.0問題データ: ${App.questions.length}問を読み込みました`);
        return;
    }

    // フォールバック: 基本データ（外部ファイルが読み込めない場合）
    console.warn('⚠️ 外部問題データが見つかりません。基本データを使用します。');
    const data = {
        chapters: [
            { id: 1, title: "会計の概要と財務会計の機能" },
            { id: 2, title: "利益計算の仕組み" },
            { id: 3, title: "会計公準・原則・基準" },
            { id: 4, title: "利益測定と資産評価" },
            { id: 5, title: "金融資産とキャッシュ・フロー" },
            { id: 6, title: "売上高と売上債権" }
        ],
        examFocusAreas: [
            { id: "cf", title: "キャッシュ・フロー計算書", priority: "highest" },
            { id: "securities", title: "有価証券の評価", priority: "highest" }
        ],
        questions: [
            { id: "q1-1", chapter: 1, type: "quiz", question: "サンプル問題", options: ["A", "B", "C", "D"], answer: 0, explanation: "サンプル解説" }
        ]
    };

    App.questions = data.questions;
    App.chapters = data.chapters;
    App.examFocusAreas = data.examFocusAreas;
    console.log(`📋 ${App.questions.length}問の問題データを読み込みました`);
}

function loadProgress() {
    const saved = localStorage.getItem('財務会計_progress');
    if (saved) {
        App.progress = JSON.parse(saved);

        // 連続日数のチェック
        checkStreak();
    }
}

function saveProgress() {
    App.progress.lastStudyDate = new Date().toDateString();
    localStorage.setItem('財務会計_progress', JSON.stringify(App.progress));
}

function checkStreak() {
    const today = new Date().toDateString();
    const lastDate = App.progress.lastStudyDate;

    if (!lastDate) {
        App.progress.streakDays = 0;
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === today) {
        // 今日すでに学習済み
    } else if (lastDate === yesterday.toDateString()) {
        // 昨日学習した → 継続中
    } else {
        // 連続が途切れた
        App.progress.streakDays = 0;
    }
}

// ===========================================
// UI初期化
// ===========================================
function initUI() {
    // テーマの初期化
    initTheme();

    // 進捗サマリーの更新
    updateProgressSummary();

    // 章リストの生成
    renderChapterList();

    // 試験対策ポイントの生成
    renderFocusAreas();

    // 統計画面の初期化
    updateStatsScreen();
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function updateProgressSummary() {
    const totalSolved = App.progress.totalAnswered;
    const accuracy = App.progress.totalAnswered > 0
        ? Math.round((App.progress.totalCorrect / App.progress.totalAnswered) * 100)
        : 0;

    document.getElementById('total-solved').textContent = totalSolved;
    document.getElementById('accuracy-rate').textContent = `${accuracy}%`;
    document.getElementById('streak-count').textContent = App.progress.streakDays;
}

function renderChapterList() {
    const container = document.getElementById('chapter-list');
    container.innerHTML = '';

    App.chapters.forEach(chapter => {
        const stats = App.progress.chapterStats[chapter.id] || { answered: 0, correct: 0 };
        const totalQuestions = App.questions.filter(q => q.chapter === chapter.id).length;
        const progress = totalQuestions > 0 ? Math.round((stats.answered / totalQuestions) * 100) : 0;

        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.dataset.chapter = chapter.id;
        item.innerHTML = `
            <div class="chapter-info">
                <span class="chapter-number">${chapter.id}</span>
                <span class="chapter-title">${chapter.title}</span>
            </div>
            <span class="chapter-progress">${progress}%</span>
        `;

        item.addEventListener('click', () => startChapterQuiz(chapter.id));
        container.appendChild(item);
    });
}

function renderFocusAreas() {
    const container = document.getElementById('focus-grid');
    container.innerHTML = '';

    App.examFocusAreas.forEach(area => {
        const item = document.createElement('div');
        item.className = `focus-item priority-${area.priority}`;
        item.innerHTML = `
            <div>
                <div class="focus-title">${area.title}</div>
                <div class="focus-desc">${area.description}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// ===========================================
// イベントリスナー
// ===========================================
function setupEventListeners() {
    // テーマ切替
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // 統計ボタン
    document.getElementById('stats-btn').addEventListener('click', () => showScreen('stats-screen'));

    // モード選択
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => startMode(card.dataset.mode));
    });

    // 戻るボタン
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            stopTimer();
            showScreen(btn.dataset.target);
        });
    });

    // クイズ関連
    document.getElementById('next-question-btn').addEventListener('click', nextQuizQuestion);

    // フラッシュカード関連
    document.getElementById('flashcard').addEventListener('click', flipFlashcard);
    document.getElementById('flashcard-wrong').addEventListener('click', () => handleFlashcardAnswer(false));
    document.getElementById('flashcard-correct').addEventListener('click', () => handleFlashcardAnswer(true));

    // 穴埋め関連
    document.getElementById('fill-hint').addEventListener('click', revealHint);
    document.getElementById('fill-submit-btn').addEventListener('click', submitFillBlank);
    document.getElementById('fill-next-btn').addEventListener('click', nextFillBlank);

    // 計算ドリル関連
    document.getElementById('calc-submit-btn').addEventListener('click', submitCalculation);
    document.getElementById('calc-next-btn').addEventListener('click', nextCalculation);

    // 結果画面
    document.getElementById('retry-btn').addEventListener('click', retrySession);
    document.getElementById('back-home-btn').addEventListener('click', () => showScreen('home-screen'));

    // 統計リセット
    document.getElementById('reset-stats-btn').addEventListener('click', resetStats);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

// ===========================================
// 画面遷移
// ===========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    // ホーム画面に戻った時は進捗を更新
    if (screenId === 'home-screen') {
        updateProgressSummary();
        renderChapterList();
    }
}

// ===========================================
// モード開始
// ===========================================
function startMode(mode) {
    App.currentMode = mode;
    App.currentIndex = 0;
    App.currentScore = 0;
    App.sessionStartTime = Date.now();
    App.sessionAnswers = [];

    // モードに応じた問題をフィルタリング
    let filteredQuestions = [];

    switch (mode) {
        case 'quiz':
            filteredQuestions = App.questions.filter(q => q.type === 'quiz');
            break;
        case 'flashcard':
            filteredQuestions = App.questions.filter(q => q.type === 'flashcard');
            break;
        case 'fill-blank':
            filteredQuestions = App.questions.filter(q => q.type === 'fill-blank');
            break;
        case 'calculation':
            filteredQuestions = App.questions.filter(q => q.type === 'calculation');
            break;
    }

    // シャッフルして10問選択
    App.currentQuestions = shuffleArray(filteredQuestions).slice(0, 10);

    if (App.currentQuestions.length === 0) {
        alert('このモードの問題がありません');
        return;
    }

    // 画面遷移
    switch (mode) {
        case 'quiz':
            showScreen('quiz-screen');
            showQuizQuestion();
            break;
        case 'flashcard':
            showScreen('flashcard-screen');
            showFlashcard();
            break;
        case 'fill-blank':
            showScreen('fill-blank-screen');
            showFillBlank();
            break;
        case 'calculation':
            showScreen('calculation-screen');
            showCalculation();
            break;
    }
}

function startChapterQuiz(chapterId) {
    App.currentMode = 'quiz';
    App.currentIndex = 0;
    App.currentScore = 0;
    App.sessionStartTime = Date.now();
    App.sessionAnswers = [];

    // 指定された章のクイズ問題をフィルタリング
    const chapterQuestions = App.questions.filter(q => q.chapter === chapterId && q.type === 'quiz');

    if (chapterQuestions.length === 0) {
        alert('この章のクイズ問題がありません');
        return;
    }

    App.currentQuestions = shuffleArray(chapterQuestions);

    showScreen('quiz-screen');
    showQuizQuestion();
}

// ===========================================
// クイズモード
// ===========================================
function showQuizQuestion() {
    const question = App.currentQuestions[App.currentIndex];
    if (!question) {
        finishSession();
        return;
    }

    // 進捗表示
    document.getElementById('quiz-progress').textContent = `問題 ${App.currentIndex + 1}/${App.currentQuestions.length}`;
    document.getElementById('quiz-score').textContent = `スコア: ${App.currentScore}`;

    // 章バッジ
    document.getElementById('quiz-chapter-badge').textContent = `第${question.chapter}章`;

    // 問題文
    document.getElementById('quiz-question').textContent = question.question;

    // 選択肢
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => handleQuizAnswer(index));
        optionsContainer.appendChild(btn);
    });

    // タイマー開始
    startTimer();

    // フィードバックを隠す
    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.classList.remove('active');
    feedbackEl.classList.add('hidden');
}

function handleQuizAnswer(selectedIndex) {
    stopTimer();

    const question = App.currentQuestions[App.currentIndex];
    const isCorrect = selectedIndex === question.answer;

    // 選択肢の状態を更新
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, idx) => {
        opt.disabled = true;
        if (idx === question.answer) {
            opt.classList.add('correct');
        } else if (idx === selectedIndex && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    // スコア更新
    if (isCorrect) {
        App.currentScore += 10 + Math.floor(App.timerValue / 3); // 時間ボーナス
    }

    // セッション記録
    App.sessionAnswers.push({
        questionId: question.id,
        correct: isCorrect,
        chapter: question.chapter
    });

    // 進捗更新
    updateQuestionProgress(question.id, question.chapter, isCorrect);

    // フィードバック表示
    showQuizFeedback(isCorrect, question.explanation, question.simpleExplanation);
}

function showQuizFeedback(isCorrect, explanation, simpleExplanation) {
    const feedbackEl = document.getElementById('quiz-feedback');

    // 連続正解カウンタの更新
    if (isCorrect) {
        App.currentStreak++;
        // 正解時のみエフェクトを発動！
        if (typeof showCorrectEffect === 'function') {
            showCorrectEffect(App.currentStreak);
        }
        // 正解時のサウンドを再生！
        if (typeof playCorrectSound === 'function') {
            playCorrectSound(App.currentStreak);
        }
        // 15問ごとのボーナスゲームチェック
        if (typeof checkBonusGame === 'function') {
            checkBonusGame();
        }
    } else {
        App.currentStreak = 0; // 不正解で連続リセット
        // 不正解時のサウンド
        if (typeof playIncorrectSound === 'function') {
            playIncorrectSound();
        }
    }

    // simpleExplanationがある場合は両方表示
    const simpleSection = simpleExplanation ? `
        <div class="feedback-simple" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border-left: 4px solid #f59e0b;">
            <div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">📘 かんたん解説</div>
            <div style="color: #78350f; line-height: 1.6;">${simpleExplanation}</div>
        </div>
    ` : '';

    // 連続正解表示（3連続以上）
    const streakSection = (isCorrect && App.currentStreak >= 3) ? `
        <div class="streak-badge" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 700; margin-bottom: 1rem; display: inline-block;">
            🔥 ${App.currentStreak}連続正解！
        </div>
    ` : '';

    // フィードバックモーダルの内容を作成
    feedbackEl.innerHTML = `
        <div class="feedback-modal">
            <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
            <div class="feedback-text" style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}">${isCorrect ? '正解！🎉' : '不正解...'}</div>
            ${streakSection}
            ${simpleSection}
            <div class="feedback-explanation">${explanation}</div>
            <button class="btn-primary" id="next-question-btn">次の問題へ →</button>
        </div>
    `;

    // モーダルを表示
    feedbackEl.classList.remove('hidden');
    feedbackEl.classList.add('active');

    // 次へボタンのイベントリスナーを再設定
    document.getElementById('next-question-btn').addEventListener('click', nextQuizQuestion);
}

function nextQuizQuestion() {
    App.currentIndex++;

    if (App.currentIndex >= App.currentQuestions.length) {
        finishSession();
    } else {
        showQuizQuestion();
    }
}

// ===========================================
// タイマー
// ===========================================
function startTimer() {
    App.timerValue = 30;
    updateTimerDisplay();

    App.timerInterval = setInterval(() => {
        App.timerValue--;
        updateTimerDisplay();

        if (App.timerValue <= 0) {
            stopTimer();
            // タイムアウト処理
            handleQuizAnswer(-1); // 不正解扱い
        }
    }, 1000);
}

function stopTimer() {
    if (App.timerInterval) {
        clearInterval(App.timerInterval);
        App.timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerEl = document.querySelector('.timer-value');
    if (timerEl) {
        timerEl.textContent = App.timerValue;

        // 残り時間に応じて色を変更
        const timerContainer = document.getElementById('quiz-timer');
        if (App.timerValue <= 10) {
            timerContainer.style.background = 'var(--error)';
        } else {
            timerContainer.style.background = 'var(--accent-gradient)';
        }
    }
}

// ===========================================
// フラッシュカードモード
// ===========================================
function showFlashcard() {
    const card = App.currentQuestions[App.currentIndex];
    if (!card) {
        finishSession();
        return;
    }

    // 進捗表示
    document.getElementById('flashcard-progress').textContent = `${App.currentIndex + 1} / ${App.currentQuestions.length}`;

    // カードの内容
    document.getElementById('flashcard-front-content').textContent = card.front;
    document.getElementById('flashcard-back-content').textContent = card.back;

    // カードをリセット
    document.getElementById('flashcard').classList.remove('flipped');
}

function flipFlashcard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function handleFlashcardAnswer(remembered) {
    const card = App.currentQuestions[App.currentIndex];

    // セッション記録
    App.sessionAnswers.push({
        questionId: card.id,
        correct: remembered,
        chapter: card.chapter
    });

    if (remembered) {
        App.currentScore++;
    }

    // 進捗更新
    updateQuestionProgress(card.id, card.chapter, remembered);

    // 次のカード
    App.currentIndex++;

    if (App.currentIndex >= App.currentQuestions.length) {
        finishSession();
    } else {
        showFlashcard();
    }
}

// ===========================================
// 穴埋めモード
// ===========================================
function showFillBlank() {
    const question = App.currentQuestions[App.currentIndex];
    if (!question) {
        finishSession();
        return;
    }

    // 進捗表示
    document.getElementById('fill-progress').textContent = `問題 ${App.currentIndex + 1}/${App.currentQuestions.length}`;

    // 章バッジ
    document.getElementById('fill-chapter-badge').textContent = `第${question.chapter}章`;

    // 問題文を穴埋め形式に変換
    let questionHtml = question.question;
    question.blanks.forEach((blank, index) => {
        const placeholder = `【${index + 1}】`;
        questionHtml = questionHtml.replace(placeholder, `<input type="text" class="fill-input" data-index="${index}" placeholder="${index + 1}">`);
    });

    document.getElementById('fill-question').innerHTML = questionHtml;

    // ヒント
    const hintEl = document.getElementById('fill-hint');
    hintEl.classList.remove('revealed');
    if (question.hint) {
        hintEl.querySelector('.hint-text').textContent = 'ヒント: タップで表示';
        hintEl.dataset.hint = question.hint;
    } else {
        hintEl.style.display = 'none';
    }

    // フィードバックを隠す
    document.getElementById('fill-feedback').classList.remove('active');
    document.getElementById('fill-submit-btn').style.display = 'block';
}

function revealHint() {
    const hintEl = document.getElementById('fill-hint');
    if (!hintEl.classList.contains('revealed')) {
        hintEl.classList.add('revealed');
        hintEl.querySelector('.hint-text').textContent = hintEl.dataset.hint;
    }
}

function submitFillBlank() {
    const question = App.currentQuestions[App.currentIndex];
    const inputs = document.querySelectorAll('.fill-input');

    let allCorrect = true;
    const userAnswers = [];

    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        const correctAnswer = question.blanks[index];

        userAnswers.push(userAnswer);

        // 正誤判定（ひらがな・カタカナ・英語の揺れを考慮）
        const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);

        if (isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
            allCorrect = false;
        }

        input.disabled = true;
    });

    // セッション記録
    App.sessionAnswers.push({
        questionId: question.id,
        correct: allCorrect,
        chapter: question.chapter
    });

    if (allCorrect) {
        App.currentScore++;
    }

    // 進捗更新
    updateQuestionProgress(question.id, question.chapter, allCorrect);

    // フィードバック表示
    showFillFeedback(allCorrect, question.blanks, question.englishTerms);
}

function normalizeAnswer(str) {
    // 正規化: 全角→半角、ひらがな→カタカナ、小文字→大文字
    return str
        .normalize('NFKC')
        .replace(/[\u3041-\u3096]/g, match => String.fromCharCode(match.charCodeAt(0) + 0x60))
        .toLowerCase()
        .replace(/\s+/g, '');
}

function showFillFeedback(allCorrect, blanks, englishTerms) {
    const feedbackEl = document.getElementById('fill-feedback');
    const iconEl = document.getElementById('fill-feedback-icon');
    const textEl = document.getElementById('fill-feedback-text');
    const answersEl = document.getElementById('correct-answers');

    // 正解時のエフェクト・サウンド・ボーナスチェック
    if (allCorrect) {
        App.currentStreak++;
        if (typeof showCorrectEffect === 'function') {
            showCorrectEffect(App.currentStreak);
        }
        if (typeof playCorrectSound === 'function') {
            playCorrectSound(App.currentStreak);
        }
        if (typeof checkBonusGame === 'function') {
            checkBonusGame();
        }
    } else {
        App.currentStreak = 0;
        if (typeof playIncorrectSound === 'function') {
            playIncorrectSound();
        }
    }

    iconEl.textContent = allCorrect ? '✅' : '❌';
    iconEl.style.color = allCorrect ? 'var(--success)' : 'var(--error)';
    textEl.textContent = allCorrect ? '全問正解！🎉' : '惜しい！正解を確認しよう';
    textEl.style.color = allCorrect ? 'var(--success)' : 'var(--error)';

    // 正解リスト
    answersEl.innerHTML = '';
    blanks.forEach((blank, index) => {
        const english = englishTerms && englishTerms[blank] ? ` (${englishTerms[blank]})` : '';
        const item = document.createElement('div');
        item.className = 'correct-answer-item';
        item.innerHTML = `<span class="number">${index + 1}</span> ${blank}${english}`;
        answersEl.appendChild(item);
    });

    feedbackEl.classList.add('active');
    document.getElementById('fill-submit-btn').style.display = 'none';
}

function nextFillBlank() {
    App.currentIndex++;

    if (App.currentIndex >= App.currentQuestions.length) {
        finishSession();
    } else {
        showFillBlank();
    }
}

// ===========================================
// 計算ドリルモード
// ===========================================
function showCalculation() {
    const question = App.currentQuestions[App.currentIndex];
    if (!question) {
        finishSession();
        return;
    }

    // 進捗表示
    document.getElementById('calc-progress').textContent = `問題 ${App.currentIndex + 1}/${App.currentQuestions.length}`;

    // 章バッジ
    document.getElementById('calc-chapter-badge').textContent = `第${question.chapter}章`;

    // 問題文
    document.getElementById('calc-question').textContent = question.question;

    // 公式
    document.getElementById('calc-formula').textContent = question.formula;

    // 単位
    document.getElementById('calc-unit').textContent = question.unit;

    // 入力欄をクリア
    document.getElementById('calc-answer').value = '';

    // フィードバックを隠す
    document.getElementById('calc-feedback').classList.remove('active');
    document.getElementById('calc-submit-btn').style.display = 'block';
}

function submitCalculation() {
    const question = App.currentQuestions[App.currentIndex];
    const userAnswer = parseFloat(document.getElementById('calc-answer').value);

    const isCorrect = Math.abs(userAnswer - question.answer) < 0.01;

    // セッション記録
    App.sessionAnswers.push({
        questionId: question.id,
        correct: isCorrect,
        chapter: question.chapter
    });

    if (isCorrect) {
        App.currentScore++;
    }

    // 進捗更新
    updateQuestionProgress(question.id, question.chapter, isCorrect);

    // フィードバック表示
    showCalcFeedback(isCorrect, question.answer, question.unit, question.explanation);
}

function showCalcFeedback(isCorrect, correctAnswer, unit, explanation) {
    const feedbackEl = document.getElementById('calc-feedback');
    const iconEl = document.getElementById('calc-feedback-icon');
    const textEl = document.getElementById('calc-feedback-text');
    const explanationEl = document.getElementById('calc-explanation');

    // 正解時のエフェクト・サウンド・ボーナスチェック
    if (isCorrect) {
        App.currentStreak++;
        if (typeof showCorrectEffect === 'function') {
            showCorrectEffect(App.currentStreak);
        }
        if (typeof playCorrectSound === 'function') {
            playCorrectSound(App.currentStreak);
        }
        if (typeof checkBonusGame === 'function') {
            checkBonusGame();
        }
    } else {
        App.currentStreak = 0;
        if (typeof playIncorrectSound === 'function') {
            playIncorrectSound();
        }
    }

    iconEl.textContent = isCorrect ? '✅' : '❌';
    iconEl.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    textEl.textContent = isCorrect ? '正解！🎉' : `不正解... 正解: ${correctAnswer}${unit}`;
    textEl.style.color = isCorrect ? 'var(--success)' : 'var(--error)';

    explanationEl.textContent = explanation;

    feedbackEl.classList.add('active');
    document.getElementById('calc-submit-btn').style.display = 'none';
}

function nextCalculation() {
    App.currentIndex++;

    if (App.currentIndex >= App.currentQuestions.length) {
        finishSession();
    } else {
        showCalculation();
    }
}

// ===========================================
// セッション終了・結果表示
// ===========================================
function finishSession() {
    stopTimer();

    const totalQuestions = App.currentQuestions.length;
    const correctCount = App.sessionAnswers.filter(a => a.correct).length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const elapsedTime = Math.floor((Date.now() - App.sessionStartTime) / 1000);

    // 結果画面を更新
    document.getElementById('result-score-value').textContent = correctCount;
    document.getElementById('result-score-total').textContent = totalQuestions;
    document.getElementById('result-accuracy').textContent = `${accuracy}%`;
    document.getElementById('result-time').textContent = formatTime(elapsedTime);

    // 絵文字と励ましメッセージ
    let emoji, title;
    if (accuracy >= 80) {
        emoji = '🎉';
        title = '素晴らしい！';
    } else if (accuracy >= 60) {
        emoji = '👏';
        title = 'いい調子！';
    } else if (accuracy >= 40) {
        emoji = '💪';
        title = 'もう少し！';
    } else {
        emoji = '📚';
        title = '復習しよう！';
    }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;

    // Glows & Grows の生成
    generateGlowsAndGrows();

    // 連続日数の更新
    updateStreak();

    // 進捗保存
    saveProgress();

    // 結果画面表示
    showScreen('result-screen');
}

function generateGlowsAndGrows() {
    const glowsList = document.getElementById('glows-list');
    const growsList = document.getElementById('grows-list');

    glowsList.innerHTML = '';
    growsList.innerHTML = '';

    // 正解した問題の分析
    const correctAnswers = App.sessionAnswers.filter(a => a.correct);
    const incorrectAnswers = App.sessionAnswers.filter(a => !a.correct);

    // Glows
    if (correctAnswers.length > 0) {
        const correctChapters = [...new Set(correctAnswers.map(a => a.chapter))];
        correctChapters.forEach(ch => {
            const li = document.createElement('li');
            li.textContent = `第${ch}章の問題をよく理解しています！`;
            glowsList.appendChild(li);
        });
    }

    if (correctAnswers.length === App.sessionAnswers.length) {
        const li = document.createElement('li');
        li.textContent = '全問正解おめでとうございます！🌟';
        glowsList.appendChild(li);
    }

    // Grows
    if (incorrectAnswers.length > 0) {
        const incorrectChapters = [...new Set(incorrectAnswers.map(a => a.chapter))];
        incorrectChapters.forEach(ch => {
            const chapter = App.chapters.find(c => c.id === ch);
            if (chapter) {
                const li = document.createElement('li');
                li.textContent = `第${ch}章「${chapter.title}」を復習しましょう`;
                growsList.appendChild(li);
            }
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'この調子で他の範囲も挑戦！';
        growsList.appendChild(li);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = App.progress.lastStudyDate;

    if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
            App.progress.streakDays++;
        } else if (!lastDate) {
            App.progress.streakDays = 1;
        }
    }
}

function retrySession() {
    // 同じモードで再挑戦
    startMode(App.currentMode);
}

// ===========================================
// 進捗管理
// ===========================================
function updateQuestionProgress(questionId, chapter, isCorrect) {
    // 全体統計
    App.progress.totalAnswered++;
    if (isCorrect) {
        App.progress.totalCorrect++;
    }

    // 章別統計
    if (!App.progress.chapterStats[chapter]) {
        App.progress.chapterStats[chapter] = { answered: 0, correct: 0 };
    }
    App.progress.chapterStats[chapter].answered++;
    if (isCorrect) {
        App.progress.chapterStats[chapter].correct++;
    }

    // 問題別統計
    if (!App.progress.questionStats[questionId]) {
        App.progress.questionStats[questionId] = { attempts: 0, correct: 0 };
    }
    App.progress.questionStats[questionId].attempts++;
    if (isCorrect) {
        App.progress.questionStats[questionId].correct++;
    }

    // 保存
    saveProgress();
}

// ===========================================
// 統計画面
// ===========================================
function updateStatsScreen() {
    // 総合統計
    document.getElementById('stat-total-answered').textContent = App.progress.totalAnswered;

    const overallAccuracy = App.progress.totalAnswered > 0
        ? Math.round((App.progress.totalCorrect / App.progress.totalAnswered) * 100)
        : 0;
    document.getElementById('stat-overall-accuracy').textContent = `${overallAccuracy}%`;

    // 章別統計
    const chapterStatsList = document.getElementById('chapter-stats-list');
    chapterStatsList.innerHTML = '';

    App.chapters.forEach(chapter => {
        const stats = App.progress.chapterStats[chapter.id] || { answered: 0, correct: 0 };
        const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;

        const item = document.createElement('div');
        item.className = 'chapter-stat-item';
        item.innerHTML = `
            <span class="chapter-number">${chapter.id}</span>
            <div class="chapter-stat-bar">
                <div class="chapter-stat-bar-fill" style="width: ${accuracy}%"></div>
            </div>
            <span class="chapter-stat-value">${accuracy}%</span>
        `;
        chapterStatsList.appendChild(item);
    });

    // 苦手問題
    const weakList = document.getElementById('weak-list');
    weakList.innerHTML = '';

    const weakQuestions = Object.entries(App.progress.questionStats)
        .filter(([id, stats]) => stats.attempts >= 2 && (stats.correct / stats.attempts) < 0.5)
        .slice(0, 5);

    if (weakQuestions.length === 0) {
        weakList.innerHTML = '<div class="weak-item" style="background: var(--success-bg); color: var(--success);">苦手問題はありません！🎉</div>';
    } else {
        weakQuestions.forEach(([id, stats]) => {
            const question = App.questions.find(q => q.id === id);
            if (question) {
                const item = document.createElement('div');
                item.className = 'weak-item';
                item.textContent = question.question.substring(0, 50) + '...';
                weakList.appendChild(item);
            }
        });
    }
}

function resetStats() {
    if (confirm('本当にすべての学習データをリセットしますか？')) {
        App.progress = {
            totalAnswered: 0,
            totalCorrect: 0,
            chapterStats: {},
            questionStats: {},
            lastStudyDate: null,
            streakDays: 0
        };
        saveProgress();
        updateStatsScreen();
        updateProgressSummary();
        renderChapterList();
        alert('データをリセットしました');
    }
}

// ===========================================
// ユーティリティ関数
// ===========================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
