/**
 * 財務会計総論 定期試験対策サイト
 * 問題データベース v2.0 - テスト範囲完全網羅版
 * 
 * 【テスト出題内容】（定期試験について.mdより）
 * ① キャッシュ・フロー計算書（営業CF計算、論述）
 * ② 有価証券の評価と計算（持ち合い株式）
 * ③ 簿記・会計用語（英語表現）
 * ④ 経過勘定の考え方、仕訳
 * ⑤ B/S、P/Lにおける表示区分
 * ⑥ 収益認識基準（工事進行基準の計算）
 */

const QUESTION_DATA = {
    meta: {
        title: "財務会計総論 定期試験対策",
        version: "2.0",
        totalQuestions: 80,
        lastUpdated: "2026-01-14"
    },

    chapters: [
        { id: 1, title: "会計の概要と財務会計の機能", weight: 10 },
        { id: 2, title: "利益計算の仕組み", weight: 10 },
        { id: 3, title: "会計公準・原則・基準", weight: 15 },
        { id: 4, title: "利益測定と資産評価", weight: 15 },
        { id: 5, title: "金融資産とキャッシュ・フロー", weight: 30 },
        { id: 6, title: "売上高と売上債権", weight: 20 }
    ],

    // テスト重点エリア（定期試験について.mdより抽出）
    examFocusAreas: [
        { id: "cf", title: "キャッシュ・フロー計算書", priority: "最重要", topics: ["営業CF計算（間接法）", "3区分", "利子配当の区分記載"] },
        { id: "securities", title: "有価証券の評価", priority: "最重要", topics: ["4分類", "評価基準", "持ち合い株式", "約定日基準"] },
        { id: "terms", title: "会計用語", priority: "重要", topics: ["英語表現", "認識・測定・記録・報告"] },
        { id: "accruals", title: "経過勘定", priority: "重要", topics: ["前払費用", "前受収益", "未払費用", "未収収益"] },
        { id: "display", title: "B/S・P/L表示区分", priority: "重要", topics: ["流動・固定分類", "営業外損益"] },
        { id: "revenue", title: "収益認識基準", priority: "重要", topics: ["5ステップ", "工事進行基準", "契約負債"] }
    ],

    questions: [
        // ========================================
        // 第1章：会計の概要（課題第1回より）
        // ========================================
        {
            id: "q1-1",
            chapter: 1,
            type: "fill-blank",
            source: "課題第1回 問題1",
            question: "会計とは、特定の経済主体が営む経済活動について、貨幣額を用いて【①】、【②】、【③】、【④】し、情報を分析・解釈するシステムである。",
            blanks: ["認識", "測定", "記録", "報告"],
            englishTerms: { "認識": "Recognition", "測定": "Measurement", "記録": "Recording", "報告": "Reporting" },
            explanation: "会計の4プロセス。Recognition→Measurement→Recording→Reportingの順。",
            simpleExplanation: "会計は「あ、取引があった！(認識)」→「いくら?(測定)」→「帳簿に書く(記録)」→「みんなに報告(報告)」の4ステップ！"
        },
        {
            id: "q1-2",
            chapter: 1,
            type: "quiz",
            source: "課題第1回 問題2",
            question: "財務会計の情報利用者は誰か？",
            options: ["内部(Internal)の管理者", "外部(External)の利害関係者", "従業員のみ", "税務署のみ"],
            answer: 1,
            explanation: "財務会計は株主・債権者・税務署などの外部(External)利害関係者向け。管理会計は内部(Internal)向け。",
            simpleExplanation: "財務会計=外の人向け(株主さんとか)、管理会計=会社の中の人向け(社長とか)"
        },
        {
            id: "q1-3",
            chapter: 1,
            type: "quiz",
            source: "課題第1回 問題2",
            question: "財務会計が提供する情報の性質は？",
            options: ["未来(Future)の情報", "過去(Past)の情報", "セグメント別情報", "非財務情報"],
            answer: 1,
            explanation: "財務会計は過去(Past)の情報を扱う。未来(Future)の情報は管理会計。",
            simpleExplanation: "財務会計=過去の記録(テストの結果みたいなもの)、管理会計=未来の計画(来年の目標みたいなもの)"
        },
        {
            id: "q1-4",
            chapter: 1,
            type: "quiz",
            source: "課題第1回 問題3",
            question: "経営者が株主から預かった資金を適切に管理・運用する責任を何というか？",
            options: ["説明責任(Accountability)", "受託責任(Stewardship)", "監査責任", "情報提供責任"],
            answer: 1,
            explanation: "受託責任(Stewardship)=お金を預かって運用する責任。説明責任(Accountability)=結果を報告する責任。",
            simpleExplanation: "受託責任=「お金預かったからちゃんと使うね」、説明責任=「こう使ったよって報告するね」"
        },
        {
            id: "q1-5",
            chapter: 1,
            type: "fill-blank",
            source: "課題第1回 問題4",
            question: "トライアングル体制：【①】(債権者保護)、【②】(投資家保護)、【③】(課税の公平性)",
            blanks: ["会社法", "金融商品取引法", "法人税法"],
            explanation: "日本の企業会計を規制する3つの法律。会社法→計算書類、金商法→有価証券報告書、法人税法→確定申告書。",
            simpleExplanation: "3つの法律が会計を見張ってる！会社法=借りた人守る、金商法=投資家守る、法人税法=ちゃんと税金払ってね"
        },

        // ========================================
        // 第2章：利益計算（課題第2回より）
        // ========================================
        {
            id: "q2-1",
            chapter: 2,
            type: "fill-blank",
            source: "課題第2回 問題1",
            question: "損益法：【①】－【②】＝当期純利益",
            blanks: ["収益", "費用"],
            explanation: "損益法はP/L(損益計算書)で計算。収益-費用=利益。",
            simpleExplanation: "売上から経費を引いたら儲け！シンプル！"
        },
        {
            id: "q2-2",
            chapter: 2,
            type: "fill-blank",
            source: "課題第2回 問題1",
            question: "財産法：【①】－【②】＝当期純利益",
            blanks: ["期末資本", "期首資本"],
            explanation: "財産法はB/S(貸借対照表)で計算。期末の純資産-期首の純資産=利益。",
            simpleExplanation: "1年で財産がどれだけ増えたか見る方法！年末の貯金-年初の貯金=今年稼いだ分"
        },
        {
            id: "q2-3",
            chapter: 2,
            type: "quiz",
            source: "課題第2回 問題2",
            question: "利益を「企業の効率の測定値」とみなし、収益と費用の対応(マッチング)を重視する考え方は？",
            options: ["資産負債観", "収益費用観", "動態論", "静態論"],
            answer: 1,
            explanation: "収益費用観(Revenue-Expense View)は利益=効率の測定値。費用収益対応を重視。",
            simpleExplanation: "収益費用観=「いくら売って、いくら使ったか」で効率を測る考え方"
        },
        {
            id: "q2-4",
            chapter: 2,
            type: "quiz",
            source: "課題第2回 問題2",
            question: "利益を「正味資源(資産－負債)の増分」とみなす考え方は？",
            options: ["収益費用観", "資産負債観", "動態論", "静態論"],
            answer: 1,
            explanation: "資産負債観(Asset-Liability View)では利益=純資産の増加額。資産・負債の定義が先。",
            simpleExplanation: "資産負債観=「持ってるもの-借金」が増えた分が利益って考え方"
        },
        {
            id: "q2-5",
            chapter: 2,
            type: "quiz",
            source: "課題第2回 問題3",
            question: "「期末株主資本＝期首株主資本＋当期純利益－配当」の関係を何という？",
            options: ["動態論", "静態論", "クリーン・サープラス関係", "アーティキュレーション"],
            answer: 2,
            explanation: "クリーン・サープラス関係(Clean Surplus Relation)。P/LとB/Sが完全に連動する関係。",
            simpleExplanation: "利益がそのまま純資産の増加になる、きれいな関係のこと！"
        },
        {
            id: "q2-6",
            chapter: 2,
            type: "quiz",
            source: "課題第2回 問題4",
            question: "シュマーレンバッハの動態論で、B/Sの本質的役割は？",
            options: ["財産状態の表示", "損益計算の連結環", "資金繰りの把握", "税金計算の基礎"],
            answer: 1,
            explanation: "動態論ではB/S=損益計算の連結環(未解決項目の収容場所)。前払費用や減価償却累計額などを一時的に保管する場所。",
            simpleExplanation: "B/Sは「まだ決着ついてない項目」を一時的に置いておく場所って考え方！"
        },

        // ========================================
        // 第3章：会計公準・原則（課題第3回より）
        // ========================================
        {
            id: "q3-1",
            chapter: 3,
            type: "fill-blank",
            source: "課題第3回 問題1",
            question: "3つの会計公準：【①】公準(企業と所有者の分離)、【②】公準(事業の継続性)、【③】公準(貨幣額で測定)",
            blanks: ["企業実体", "継続企業", "貨幣的評価"],
            englishTerms: { "企業実体": "Business Entity", "継続企業": "Going Concern", "貨幣的評価": "Monetary Postulate" },
            explanation: "会計の大前提となる3つの仮定。",
            simpleExplanation: "会計のルールが成り立つための3つの約束事！会社は別人格、ずっと続く、お金で測る、の3つ"
        },
        {
            id: "q3-2",
            chapter: 3,
            type: "quiz",
            source: "課題第3回 問題2",
            question: "「企業会計は真実な報告を提供するものでなければならない」という最上位の原則は？",
            options: ["正規の簿記の原則", "真実性の原則", "継続性の原則", "保守主義の原則"],
            answer: 1,
            explanation: "真実性の原則は7つの一般原則の最高規範。ただし「相対的真実」(ルールに従った結果としての真実)。",
            simpleExplanation: "会計の一番大事なルール！「ウソつくな」ってこと"
        },
        {
            id: "q3-3",
            chapter: 3,
            type: "quiz",
            source: "課題第3回 問題2",
            question: "「資本取引と損益取引を区別し、資本剰余金と利益剰余金を混同してはならない」原則は？",
            options: ["明瞭性の原則", "継続性の原則", "資本・利益区別の原則", "単一性の原則"],
            answer: 2,
            explanation: "資本・利益区別の原則=元手(資本)と稼ぎ(利益)を分ける。タコ配当を防止。",
            simpleExplanation: "元手と儲けをごちゃまぜにしちゃダメ！混ぜると「儲けてないのに配当出す」が起きる"
        },
        {
            id: "q3-4",
            chapter: 3,
            type: "quiz",
            source: "課題第3回 問題2",
            question: "「異なる目的のために異なる形式の財務諸表を作成しても、内容は同一の会計記録に基づく」原則は？",
            options: ["真実性の原則", "正規の簿記の原則", "明瞭性の原則", "単一性の原則"],
            answer: 3,
            explanation: "単一性の原則=「実質一元・形式多元」。二重帳簿(提出先で数字を変える)禁止。",
            simpleExplanation: "銀行用と税務署用で違う帳簿を作っちゃダメ！見た目は違っても中身は同じじゃないと"
        },
        {
            id: "q3-5",
            chapter: 3,
            type: "quiz",
            source: "課題第3回 問題3",
            question: "「企業の財政に不利な影響を及ぼす可能性がある場合に、健全な会計処理をする」原則は？",
            options: ["真実性の原則", "継続性の原則", "保守主義の原則", "明瞭性の原則"],
            answer: 2,
            explanation: "保守主義の原則(Conservatism)=「利益は控えめに、損失は早めに」計上する慎重な判断。",
            simpleExplanation: "悪いニュースは早めに、良いニュースは慎重に！石橋を叩いて渡る考え方"
        },

        // ========================================
        // 第4章：利益測定と資産評価 + 経過勘定
        // ========================================
        {
            id: "q4-1",
            chapter: 4,
            type: "quiz",
            source: "テキスト",
            question: "資産を取得した時の支出額(買った値段)で評価する方法は？",
            options: ["時価主義", "取得原価主義", "低価主義", "再調達原価"],
            answer: 1,
            explanation: "取得原価主義(Acquisition Cost Basis)=客観性・検証可能性に優れる。",
            simpleExplanation: "買った時の値段で記録する方法！領収書があるから証拠バッチリ"
        },
        {
            id: "q4-2",
            chapter: 4,
            type: "quiz",
            source: "テキスト",
            question: "収益の認識に適用される原則は？(従来の基準)",
            options: ["現金主義", "発生主義", "実現主義", "費用収益対応の原則"],
            answer: 2,
            explanation: "収益は実現主義。要件：①財貨の移転・役務の提供 ②貨幣性資産の受領。",
            simpleExplanation: "売上は「モノを渡して、お金(か売掛金)をもらった時」に計上！"
        },
        {
            id: "q4-3",
            chapter: 4,
            type: "quiz",
            source: "テキスト",
            question: "費用の認識に適用される基準は？",
            options: ["現金主義", "発生主義", "実現主義", "回収基準"],
            answer: 1,
            explanation: "費用は発生主義(Accrual Basis)で認識。経済的価値の消費事実に基づく。",
            simpleExplanation: "費用は「使った時」に計上！お金を払った時じゃないよ"
        },
        // 【重要】経過勘定（テスト範囲④）
        {
            id: "q4-4",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "当期に支払ったが、まだサービスを受けていない費用を何という？",
            options: ["前払費用", "未払費用", "前受収益", "未収収益"],
            answer: 0,
            explanation: "前払費用(Prepaid Expenses)=先払い。例：来期分の保険料を今期に支払った。",
            simpleExplanation: "先にお金払ったけど、まだサービスもらってない状態！来年の定期券を今年買った感じ"
        },
        {
            id: "q4-5",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "サービスを提供したが、まだ代金を受け取っていない収益を何という？",
            options: ["前払費用", "未払費用", "前受収益", "未収収益"],
            answer: 3,
            explanation: "未収収益(Accrued Revenue)=後でもらう。例：貸付金の利息が当期に発生したが、受取は来期。",
            simpleExplanation: "サービスはしたのに、まだお金もらってない状態！ツケで売った感じ"
        },
        {
            id: "q4-6",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "代金を受け取ったが、まだサービスを提供していない収益を何という？",
            options: ["前払費用", "未払費用", "前受収益", "未収収益"],
            answer: 2,
            explanation: "前受収益(Unearned Revenue)=先にもらう。例：来期分の家賃を今期に受け取った。",
            simpleExplanation: "お金もらったけど、まだサービスしてない状態！来月分の家賃を今月もらった感じ"
        },
        {
            id: "q4-7",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "サービスを受けたが、まだ代金を支払っていない費用を何という？",
            options: ["前払費用", "未払費用", "前受収益", "未収収益"],
            answer: 1,
            explanation: "未払費用(Accrued Expenses)=後で払う。例：借入金の利息が当期に発生したが、支払は来期。",
            simpleExplanation: "サービス受けたのに、まだお金払ってない状態！電気使ったけど支払いは来月って感じ"
        },
        {
            id: "q4-8",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "前払費用・未収収益はB/Sのどこに表示される？",
            options: ["流動資産", "固定資産", "流動負債", "純資産"],
            answer: 0,
            explanation: "前払費用・未収収益=資産(将来の経済的便益)。1年基準で流動資産。",
            simpleExplanation: "どっちも「これから」もらえるものだから資産！"
        },
        {
            id: "q4-9",
            chapter: 4,
            type: "quiz",
            source: "テスト範囲④経過勘定",
            question: "前受収益・未払費用はB/Sのどこに表示される？",
            options: ["流動資産", "固定資産", "流動負債", "純資産"],
            answer: 2,
            explanation: "前受収益・未払費用=負債(将来の義務)。1年基準で流動負債。",
            simpleExplanation: "どっちも「これから」払う/提供する義務だから負債！"
        },

        // ========================================
        // 第5章：キャッシュ・フロー計算書【最重要】
        // ========================================
        // 有価証券（課題第4回より）
        {
            id: "q5-1",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-1",
            question: "有価証券を購入によって取得した場合の、原則的な会計処理は？",
            options: ["修正受渡日基準", "約定日基準", "決済日基準", "発行日基準"],
            answer: 1,
            explanation: "約定日基準=売買契約を締結した日に認識。(参照: 金融商品に関する会計基準)",
            simpleExplanation: "「買う」って契約した日に計上！実際にお金を払う日じゃないよ"
        },
        {
            id: "q5-2",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-2⑴",
            question: "その他有価証券で、市場価格のない株式等の期末評価基準は？",
            options: ["時価", "取得原価", "償却原価", "低価法"],
            answer: 1,
            explanation: "市場価格のない株式等=取得原価で評価(時価がわからないため)。",
            simpleExplanation: "値段がいくらかわからない株は、買った時の値段のまま！"
        },
        {
            id: "q5-3",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-2⑵",
            question: "売買目的有価証券の期末評価基準は？",
            options: ["時価", "取得原価", "償却原価", "低価法"],
            answer: 0,
            explanation: "売買目的有価証券=時価評価、評価差額はP/L(当期損益)。",
            simpleExplanation: "デイトレ用の株！毎回時価に直して、損益もその年の利益に入れる"
        },
        {
            id: "q5-4",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-2⑶",
            question: "その他有価証券(市場価格あり)の期末評価基準は？",
            options: ["時価", "取得原価", "償却原価", "低価法"],
            answer: 0,
            explanation: "その他有価証券(市場価格あり)=時価評価、評価差額はB/S(純資産直入)。",
            simpleExplanation: "持ち合い株とか！時価に直すけど、損益には入れずにB/Sの純資産にぶち込む"
        },
        {
            id: "q5-5",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-2⑷",
            question: "満期保有目的債券の期末評価基準は？",
            options: ["時価", "取得原価", "償却原価", "低価法"],
            answer: 2,
            explanation: "満期保有目的債券=償却原価法。取得価額と額面の差額を満期に向けて調整。",
            simpleExplanation: "満期まで持つ債券は、買値と額面の差を毎年少しずつ調整していく！"
        },
        {
            id: "q5-6",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅰ-2⑸",
            question: "子会社株式の期末評価基準は？",
            options: ["時価", "取得原価", "償却原価", "低価法"],
            answer: 1,
            explanation: "子会社株式=取得原価(支配目的なので売る気がない)。減損処理を除く。",
            simpleExplanation: "子会社は売る気ないから、買った時の値段のまま！"
        },
        // CF計算書（課題第4回より）【超重要】
        {
            id: "q5-7",
            chapter: 5,
            type: "fill-blank",
            source: "課題第4回Ⅱ-1",
            question: "CF計算書の3区分(上から順に)：【①】活動、【②】活動、【③】活動",
            blanks: ["営業", "投資", "財務"],
            explanation: "キャッシュ・フロー計算書は営業→投資→財務の順で表示。",
            simpleExplanation: "①本業で稼ぐ ②設備投資 ③お金を借りる/返す の3つ！"
        },
        {
            id: "q5-8",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅱ-2(方法1)",
            question: "利子配当の記載方法1：受取利息・受取配当金はどの区分？",
            options: ["営業活動", "投資活動", "財務活動", "記載しない"],
            answer: 1,
            explanation: "方法1：受取利息・受取配当金→投資活動、支払利息・支払配当金→財務活動。",
            simpleExplanation: "方法1は「もらうお金=投資、払うお金=財務」で分ける！"
        },
        {
            id: "q5-9",
            chapter: 5,
            type: "quiz",
            source: "課題第4回Ⅱ-2(方法2)",
            question: "利子配当の記載方法2：受取利息・受取配当金・支払利息はどの区分？",
            options: ["営業活動", "投資活動", "財務活動", "記載しない"],
            answer: 0,
            explanation: "方法2：受取利息・受取配当金・支払利息→営業活動、支払配当金のみ→財務活動。",
            simpleExplanation: "方法2は「支払配当金だけ財務、あとは全部営業」！"
        },
        {
            id: "q5-10",
            chapter: 5,
            type: "fill-blank",
            source: "課題第4回Ⅱ-3",
            question: "現金には、手許現金のほか、【①】や【②】が含まれる。",
            blanks: ["当座預金", "普通預金"],
            explanation: "会計上の「現金」=通貨+すぐ引き出せる預金(当座・普通預金)。",
            simpleExplanation: "現金っていうと手持ちのお金だけど、会計では銀行のすぐ使えるお金も含む！"
        },
        {
            id: "q5-11",
            chapter: 5,
            type: "quiz",
            source: "5章テキスト",
            question: "現金同等物とされる短期投資の基準は？",
            options: ["取得日から1か月以内", "取得日から3か月以内", "取得日から6か月以内", "取得日から1年以内"],
            answer: 1,
            explanation: "現金同等物=取得日から満期日まで3か月以内の短期投資。",
            simpleExplanation: "3か月以内に現金になるものは「現金みたいなもの」扱い！"
        },
        // 間接法の計算ロジック【超重要】
        {
            id: "q5-12",
            chapter: 5,
            type: "quiz",
            source: "5章テキスト★暗記必須",
            question: "間接法において、減価償却費はどう調整？",
            options: ["税引前当期純利益から減算", "税引前当期純利益に加算", "調整しない", "投資CFに計上"],
            answer: 1,
            explanation: "減価償却費はP/Lで費用として引かれているが、現金は出ていないため加算して戻す。",
            simpleExplanation: "減価償却費=帳簿上の費用であって、現金は出てない！だから足し戻す"
        },
        {
            id: "q5-13",
            chapter: 5,
            type: "quiz",
            source: "5章テキスト★暗記必須",
            question: "間接法において、売掛金が増加した場合は？",
            options: ["加算", "減算", "調整不要", "投資CFに計上"],
            answer: 1,
            explanation: "売掛金増加=売上計上されたが現金は入っていない→減算。",
            simpleExplanation: "売掛金が増えた=売上はあるけど現金もらってない→引く！"
        },
        {
            id: "q5-14",
            chapter: 5,
            type: "quiz",
            source: "5章テキスト★暗記必須",
            question: "間接法において、買掛金が増加した場合は？",
            options: ["加算", "減算", "調整不要", "財務CFに計上"],
            answer: 0,
            explanation: "買掛金増加=仕入計上されたが現金は出ていない→加算。",
            simpleExplanation: "買掛金が増えた=費用はあるけど現金払ってない→足す！"
        },
        {
            id: "q5-15",
            chapter: 5,
            type: "quiz",
            source: "5章テキスト★暗記必須",
            question: "間接法において、棚卸資産が増加した場合は？",
            options: ["加算", "減算", "調整不要", "投資CFに計上"],
            answer: 1,
            explanation: "棚卸資産増加=現金で仕入れたが売上原価になっていない→減算。",
            simpleExplanation: "在庫が増えた=現金で買ったけど費用になってない→引く！"
        },
        {
            id: "q5-16",
            chapter: 5,
            type: "calculation",
            source: "テスト範囲①計算問題",
            question: "営業CFを計算せよ：税引前当期純利益500万円、減価償却費100万円、売掛金増加△30万円、買掛金増加+20万円、棚卸資産減少+10万円",
            formula: "営業CF=税引前当期純利益+減価償却費-売掛金増+買掛金増+棚卸資産減",
            answer: 600,
            unit: "万円",
            explanation: "500+100-30+20+10=600万円",
            simpleExplanation: "利益から始めて、現金動いてない分を足したり引いたり調整！"
        },
        {
            id: "q5-17",
            chapter: 5,
            type: "calculation",
            source: "テスト範囲①計算問題",
            question: "営業CFを計算せよ：税引前当期純利益800万円、減価償却費200万円、売掛金減少+50万円、買掛金減少△40万円、貸倒引当金繰入20万円",
            formula: "営業CF=800+200+50-40+20",
            answer: 1030,
            unit: "万円",
            explanation: "800+200+50-40+20=1,030万円。貸倒引当金繰入も非資金費用なので加算。",
            simpleExplanation: "引当金繰入も減価償却と同じで、帳簿上の費用だけど現金出てないから足す！"
        },
        // B/S・P/L表示区分
        {
            id: "q5-18",
            chapter: 5,
            type: "quiz",
            source: "テスト範囲⑤表示区分",
            question: "売買目的有価証券の評価差額はP/Lのどこに表示？",
            options: ["売上高", "営業外収益/費用", "特別利益/損失", "その他の包括利益"],
            answer: 1,
            explanation: "売買目的有価証券の評価差額=有価証券評価損益として営業外損益に計上。",
            simpleExplanation: "本業じゃないから営業外！株の損益は副業収入みたいなもの"
        },
        {
            id: "q5-19",
            chapter: 5,
            type: "quiz",
            source: "テスト範囲⑤表示区分",
            question: "固定資産売却益はP/Lのどこに表示？",
            options: ["売上高", "営業外収益", "特別利益", "その他の包括利益"],
            answer: 2,
            explanation: "固定資産売却益=臨時・異常な利益なので特別利益。",
            simpleExplanation: "固定資産を売るのはめったにないから「特別」扱い！"
        },
        {
            id: "q5-20",
            chapter: 5,
            type: "quiz",
            source: "テスト範囲⑤表示区分",
            question: "その他有価証券評価差額金はB/Sのどこに表示？",
            options: ["流動資産", "固定資産", "流動負債", "純資産(その他の包括利益累計額)"],
            answer: 3,
            explanation: "その他有価証券評価差額金=P/Lを通さず純資産の部に直入(全部純資産直入法)。",
            simpleExplanation: "売る気ないから損益にせず、B/Sの純資産に直接入れる！"
        },

        // ========================================
        // 第6章：収益認識【工事進行基準が超重要】
        // ========================================
        {
            id: "q6-1",
            chapter: 6,
            type: "fill-blank",
            source: "6章テキスト",
            question: "収益認識5ステップ：①【①】の識別 ②【②】の識別 ③【③】の算定 ④取引価格の【④】 ⑤収益の【⑤】",
            blanks: ["契約", "履行義務", "取引価格", "配分", "認識"],
            explanation: "新収益認識基準(IFRS15ベース)の5ステップ。",
            simpleExplanation: "①誰と約束? ②何を約束? ③いくら? ④どう分ける? ⑤いつ売上にする?"
        },
        {
            id: "q6-2",
            chapter: 6,
            type: "quiz",
            source: "6章テキスト",
            question: "新収益認識基準で収益を認識するタイミングは？",
            options: ["現金受領時", "実現主義(財貨移転時)", "支配の移転時", "契約締結時"],
            answer: 2,
            explanation: "新基準=支配の移転(Transfer of Control)時に認識。従来の実現主義から変更。",
            simpleExplanation: "お客さんが「これ俺のもの！」って使えるようになった時に売上計上！"
        },
        {
            id: "q6-3",
            chapter: 6,
            type: "quiz",
            source: "6章テキスト",
            question: "代金を受け取ったが、まだサービスを提供していない部分は？",
            options: ["売上高", "売掛金", "契約負債", "前払費用"],
            answer: 2,
            explanation: "契約負債(Contract Liability)=前受金に近い性質。将来サービスを提供する義務。",
            simpleExplanation: "お金もらったけどサービスまだ→「後で提供する義務」=負債！"
        },
        // 工事進行基準【計算問題超重要】
        {
            id: "q6-4",
            chapter: 6,
            type: "calculation",
            source: "テスト範囲⑥工事進行基準",
            question: "工事契約価額1,000万円、見積総原価800万円、当期発生原価320万円。当期の売上高は？",
            formula: "当期売上=契約価額×(当期発生原価÷見積総原価)",
            answer: 400,
            unit: "万円",
            explanation: "進捗度=320÷800=40%、売上=1,000×40%=400万円",
            simpleExplanation: "工事が40%終わったから、売上も40%計上！1000万×40%=400万円"
        },
        {
            id: "q6-5",
            chapter: 6,
            type: "calculation",
            source: "テスト範囲⑥工事進行基準",
            question: "工事契約価額2,000万円、見積総原価1,600万円、当期発生原価640万円。当期の売上高は？",
            formula: "進捗度=640÷1600=40%、売上=2000×40%",
            answer: 800,
            unit: "万円",
            explanation: "進捗度=640÷1,600=40%、売上=2,000×40%=800万円",
            simpleExplanation: "原価ベースで進捗率を計算！640÷1600=40%だから、2000万×40%=800万円"
        },
        {
            id: "q6-6",
            chapter: 6,
            type: "calculation",
            source: "テスト範囲⑥工事進行基準",
            question: "工事契約価額5,000万円、見積総原価4,000万円。前期末までの発生原価2,000万円、当期発生原価1,200万円。当期の売上高は？",
            formula: "当期進捗=(2000+1200)÷4000=80%、当期売上=5000×80%-前期売上(5000×50%)",
            answer: 1500,
            unit: "万円",
            explanation: "累計進捗80%、累計売上4,000万円。前期売上2,500万円(50%)。当期売上=4,000-2,500=1,500万円",
            simpleExplanation: "2年目の売上=今期までの累計売上-前期までの売上！引き算で求める"
        },
        {
            id: "q6-7",
            chapter: 6,
            type: "calculation",
            source: "6章設例(5ステップ)",
            question: "製品A(独立販売価格10,000円)と保守2年(独立販売価格5,000円)をセット12,000円で販売。製品Aへの配分額は？",
            formula: "配分額=12,000×(10,000÷15,000)",
            answer: 8000,
            unit: "円",
            explanation: "比率=10,000:5,000=2:1、製品A=12,000×(10,000÷15,000)=8,000円",
            simpleExplanation: "セット価格を「本来の値段の比率」で分ける！2:1だから8000円と4000円"
        },
        // 貸倒引当金
        {
            id: "q6-8",
            chapter: 6,
            type: "quiz",
            source: "6章テキスト",
            question: "経営状態に重大な問題がない一般債権の貸倒見積高の算定方法は？",
            options: ["財務内容評価法", "キャッシュ・フロー見積法", "貸倒実績率法", "担保評価法"],
            answer: 2,
            explanation: "一般債権=貸倒実績率法(過去の貸倒れ実績率を乗じる)。",
            simpleExplanation: "普通の取引先なら「過去の経験」から何%回収できないか予想！"
        },
        {
            id: "q6-9",
            chapter: 6,
            type: "quiz",
            source: "6章テキスト",
            question: "経営破綻した債務者への債権(破産更生債権等)の貸倒見積高は？",
            options: ["貸倒実績率法", "キャッシュ・フロー見積法", "財務内容評価法(担保控除後全額)", "時価評価法"],
            answer: 2,
            explanation: "破産更生債権等=財務内容評価法。債権額-担保処分見込額=全額引当。",
            simpleExplanation: "倒産した会社からは担保以外は取れない！残りは全部引当金に"
        },

        // ========================================
        // 英語用語フラッシュカード
        // ========================================
        { id: "fc-1", chapter: 1, type: "flashcard", front: "Recognition", back: "認識 - 取引があったと認める最初のステップ" },
        { id: "fc-2", chapter: 1, type: "flashcard", front: "Measurement", back: "測定 - 金額を算定する" },
        { id: "fc-3", chapter: 1, type: "flashcard", front: "Recording", back: "記録 - 帳簿に書き込む" },
        { id: "fc-4", chapter: 1, type: "flashcard", front: "Reporting", back: "報告 - 財務諸表として報告" },
        { id: "fc-5", chapter: 1, type: "flashcard", front: "Stewardship", back: "受託責任 - 預かったお金を適切に管理運用する責任" },
        { id: "fc-6", chapter: 1, type: "flashcard", front: "Accountability", back: "説明責任 - 管理運用の結果を報告する責任" },
        { id: "fc-7", chapter: 2, type: "flashcard", front: "Revenue-Expense View", back: "収益費用観 - 利益=効率の測定値、費用収益対応重視" },
        { id: "fc-8", chapter: 2, type: "flashcard", front: "Asset-Liability View", back: "資産負債観 - 利益=純資産の増分、資産負債の定義優先" },
        { id: "fc-9", chapter: 2, type: "flashcard", front: "Clean Surplus Relation", back: "クリーン・サープラス関係 - 期末資本=期首資本+利益-配当" },
        { id: "fc-10", chapter: 3, type: "flashcard", front: "Business Entity", back: "企業実体(公準) - 企業は所有者と別の存在" },
        { id: "fc-11", chapter: 3, type: "flashcard", front: "Going Concern", back: "継続企業(公準) - 企業は半永久的に続く" },
        { id: "fc-12", chapter: 3, type: "flashcard", front: "Conservatism", back: "保守主義 - 利益は控えめに、損失は早めに" },
        { id: "fc-13", chapter: 4, type: "flashcard", front: "Accrual Basis", back: "発生主義 - 経済的価値の消費時に費用計上" },
        { id: "fc-14", chapter: 4, type: "flashcard", front: "Realization Basis", back: "実現主義 - 財貨移転+貨幣性資産受領で収益計上" },
        { id: "fc-15", chapter: 4, type: "flashcard", front: "Prepaid Expenses", back: "前払費用 - 支払済だがサービス未受領(資産)" },
        { id: "fc-16", chapter: 4, type: "flashcard", front: "Accrued Expenses", back: "未払費用 - サービス受領済だが未払い(負債)" },
        { id: "fc-17", chapter: 5, type: "flashcard", front: "Cash Equivalents", back: "現金同等物 - 取得日から3か月以内満期の短期投資" },
        { id: "fc-18", chapter: 5, type: "flashcard", front: "Amortized Cost", back: "償却原価 - 満期保有目的債券の評価方法" },
        { id: "fc-19", chapter: 5, type: "flashcard", front: "Trading Securities", back: "売買目的有価証券 - 時価評価、差額P/L計上" },
        { id: "fc-20", chapter: 5, type: "flashcard", front: "Available-for-sale Securities", back: "その他有価証券 - 時価評価、差額B/S純資産直入" },
        { id: "fc-21", chapter: 5, type: "flashcard", front: "Operating Activities CF", back: "営業活動CF - 本業による現金の増減" },
        { id: "fc-22", chapter: 5, type: "flashcard", front: "Investing Activities CF", back: "投資活動CF - 設備投資等による現金の増減" },
        { id: "fc-23", chapter: 5, type: "flashcard", front: "Financing Activities CF", back: "財務活動CF - 資金調達・返済による現金の増減" },
        { id: "fc-24", chapter: 5, type: "flashcard", front: "Indirect Method", back: "間接法 - 税引前当期純利益から調整して営業CFを算出" },
        { id: "fc-25", chapter: 6, type: "flashcard", front: "Transfer of Control", back: "支配の移転 - 新収益認識基準の認識タイミング" },
        { id: "fc-26", chapter: 6, type: "flashcard", front: "Performance Obligation", back: "履行義務 - 顧客への約束単位" },
        { id: "fc-27", chapter: 6, type: "flashcard", front: "Contract Liability", back: "契約負債 - 代金受領済だがサービス未提供(負債)" },
        { id: "fc-28", chapter: 6, type: "flashcard", front: "Allowance for Doubtful Accounts", back: "貸倒引当金 - 回収不能見込額の引当" }
    ]
};

// アプリケーションに統合
if (typeof App !== 'undefined') {
    App.questions = QUESTION_DATA.questions;
    App.chapters = QUESTION_DATA.chapters;
    App.examFocusAreas = QUESTION_DATA.examFocusAreas;
}
