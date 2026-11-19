<script setup>
import { computed } from 'vue'
import HorseComparison from './HorseComparison.vue'
import Reveal from './Reveal.vue'
import TroyCharacters from './TroyCharacters.vue'
import TroyScene from './TroyScene.vue'

const props = defineProps({
  id: { type: Number, required: true },
  step: { type: Number, default: 0 },
})

const s = computed(() => props.step || 0)
const base = import.meta.env.BASE_URL

const slideTheme = computed(() => {
  if (props.id === 1 || props.id === 6 || props.id === 21) return 'theme-dark'
  if (props.id <= 8) return 'theme-parchment'
  return 'theme-alabaster'
})

const titles = [
  'Con ngựa thành Troy',
  'Mười năm vây hãm',
  'Người gác cổng mới',
  'Kiểm thử',
  'Những ngày yên bình',
  'Cho đến một buổi sáng…',
  'Ba tầng test, ba mô hình tư duy',
  'Code do AI sinh: đầu tư vào đâu?',
  'Oracle: cái “True” này từ đâu ra?',
  '5 dạng oracle',
  'Code sai, test vẫn PASS?',
  'Oracle độc lập ở cổng thành Troy',
  'Từ vài ví dụ sang nguyên tắc',
  'Demo: Troy thu nhỏ',
  'Giới hạn của Property-based Testing',
  'Thuật sĩ viết 200 bài kiểm tra trong một phút. Ai kiểm tra thuật sĩ?',
  'Mutation testing = cài gián điệp giả',
  'Bức tường được chứng minh theo bản vẽ',
  'Người, AI và công cụ',
  'Vì sao tất cả đều xanh mà pháo đài vẫn thất thủ?',
  'Khi nào cánh cổng nên mở?',
]

const chapters = [
  'MỘT CÂU CHUYỆN VỀ KIỂM THỬ',
  'CHƯƠNG I · CUỘC VÂY HÃM',
  'CHƯƠNG I · NGƯỜI GÁC CỔNG MỚI',
  'CHƯƠNG I · KIỂM THỬ',
  'CHƯƠNG I · NHỮNG NGÀY YÊN BÌNH',
  'CHƯƠNG II · MỘT BUỔI SÁNG',
  'CHƯƠNG III · CHIẾN LƯỢC KIỂM THỬ',
  'CHƯƠNG III · CHIẾN LƯỢC KIỂM THỬ',
  'PHẦN 3 · TEST ORACLE',
  'PHẦN 3 · TEST ORACLE',
  'PHẦN 3 · TEST ORACLE',
  'PHẦN 3 · TEST ORACLE',
  'PHẦN 4 · PROPERTY-BASED TESTING',
  'PHẦN 4 · PROPERTY-BASED TESTING',
  'PHẦN 4 · PROPERTY-BASED TESTING',
  'PHẦN 5 · TEST DO AI SINH',
  'PHẦN 5 · TEST DO AI SINH',
  'PHẦN 6 · FORMAL VERIFICATION',
  'PHẦN 7 · QUY TRÌNH VÀ KẾT LUẬN',
  'PHẦN 7 · QUY TRÌNH VÀ KẾT LUẬN',
  'TRỞ LẠI CỔNG THÀNH',
]

// Clue milestones synchronized with exact clue click steps:
// Slide 6 = 0/4, Slide 8 (click 2) = 1/4, Slide 12 (click 2) = 2/4, Slide 15 (click 3) = 3/4, Slide 18 (click 2) = 4/4
const milestones = [
  [8, 2],
  [12, 2],
  [15, 3],
  [18, 2],
]

const clues = computed(() =>
  milestones.filter(([id, reqStep]) => props.id > id || (props.id === id && s.value >= reqStep)).length,
)

const featureNames = ['has_four_legs', 'has_large_body', 'is_tall', 'has_mane', 'has_hooves']

const pytestRows = [
  { code: 'assert is_horse(black_horse) == True', at: 0 },
  { code: 'assert is_horse(white_horse) == True', at: 0 },
  { code: 'assert is_horse(brown_horse) == True', at: 0 },
  { code: 'assert is_horse(tiger) == False', at: 0 },
  { code: 'assert is_horse(dog) == False', at: 0 },
  { code: 'assert is_horse(image) == is_horse(flip(image))  # test theo tính chất', at: 1, flip: true },
]

const oracleRows = [
  { num: '01', name: 'Giá trị cụ thể', code: 'is_horse(black_horse) == True', isCode: true },
  { num: '02', name: 'Chuẩn tham chiếu', code: 'my_sort(x) == sorted(x)', isCode: true },
  { num: '03', name: 'Tính chất / bất biến', code: 'decode(encode(x)) == x', isCode: true },
  { num: '04', name: 'Quan hệ', code: 'Lật ảnh ngựa, kết quả không đổi.', flip: true },
  { num: '05', name: 'Ngầm định', code: 'Không crash, không treo.' },
]

const aiRisks = [
  ['Tautology', 'Kỳ vọng sao chép lại chính logic của code.'],
  ['Assertion yếu', 'Chỉ kiểm tra không văng lỗi, chưa kiểm tra logic.'],
  ['Mock quá mức', 'Cô lập hàm quá nhiều, che mất tương tác thật.'],
  ['Coverage ảo', 'Chạy qua 100% dòng code nhưng chưa kiểm chứng logic.'],
  ['Ảo giác API / hành vi', 'Test dựa trên thứ không tồn tại.'],
  ['Test giòn', 'Gắn chặt vào chi tiết cài đặt.'],
  ['Bỏ sót ca khó', 'Biên, lỗi, concurrency, bảo mật.'],
]

const reviewQuestions = [
  'Kỳ vọng này từ đâu ra?',
  'Nếu code sai, test có fail không?',
  'Mock có che mất logic thật không?',
  'Đã có ca biên và ca lỗi chưa?',
  'Test dựa vào hành vi hay chi tiết cài đặt?',
]

const workflowSteps = [
  { num: '1', role: 'Người', desc: 'Ý định, yêu cầu, đặc tả, oracle: “Ai được vào?”' },
  { num: '2', role: 'AI', desc: 'Sinh test từ đặc tả, đề xuất ca biên và property' },
  { num: '3', role: 'Công cụ', desc: 'PBT, mutation testing, fuzzing, contract test' },
  { num: '4', role: 'Người', desc: 'Kiểm tra kỳ vọng và lỗi bị bỏ sót' },
]

const finalClues = [
  {
    num: '01',
    title: 'Chỉ có unit test',
    desc: 'Không ai diễn tập tình huống bất thường xuyên suốt hệ thống.',
  },
  {
    num: '02',
    title: 'Thiếu oracle độc lập',
    desc: 'Chưa có căn cứ phân biệt ngựa thật và ngựa gỗ chứa lính.',
  },
  {
    num: '03',
    title: 'Property yếu',
    desc: 'Hàm luôn trả về True vẫn thỏa quan hệ lật ảnh.',
  },
  {
    num: '04',
    title: 'Ta test cái đại diện, không phải ý định',
    desc: 'Sai tiêu chí mở cổng: vật trông giống ngựa ≠ ngựa thật.',
  },
]
</script>

<template>
  <article
    class="deck-slide"
    :class="[slideTheme, 'page-' + id, { 'is-hero': id === 1 || id === 21 }]"
    :data-step="s"
  >
    <!-- Full-bleed Trojan Gate Scene on illustrated slides (1, 2, 6, 21) -->
    <TroyScene
      v-if="id === 1 || id === 2 || id === 6 || id === 21"
      :step="s"
      :mode="id === 1 ? 'intro' : id === 2 ? 'siege' : id === 6 ? 'fall' : 'closing'"
    />

    <!-- Top Header Bar -->
    <header class="slide-header">
      <div class="header-left">
        <span class="chapter-pill">{{ chapters[id - 1] }}</span>
        <span v-if="id === 8" class="stance-pill">Giả thuyết / quan điểm</span>
        <span v-if="id === 16" class="stance-pill">Giả thuyết: thiên về ca điển hình</span>
      </div>
      <div class="header-right">
        <div v-if="id === 16" class="wizard-badge" aria-hidden="true">
          <img :src="base + 'troy/image22.png'" alt="" />
        </div>
        <span class="slide-folio">{{ String(id).padStart(2, '0') }} / 21</span>
      </div>
    </header>

    <!-- =========================================================
         SLIDE 01 & 21: BOOKEND HERO SLIDES (clicks: 1)
         ========================================================= -->
    <template v-if="id === 1 || id === 21">
      <div class="hero-copy">
        <template v-if="id === 1">
          <div class="enter-cascade">
            <h1 class="hero-title">Con ngựa<br />thành Troy</h1>
            <p class="hero-subtitle">Tests are green, yet so are we...</p>
          </div>
        </template>

        <template v-else>
          <div class="enter-cascade">
            <h1 class="hero-title closing-q">Khi nào cánh cổng<br />nên mở?</h1>
          </div>
          <Reveal :step="s" :at="1">
            <div class="thank-you-card">
              <span class="thank-you-label">THANK YOU</span>
              <p>Khi mọi test đều xanh: kiểm thử và đảm bảo chất lượng trong thời đại AI viết code</p>
            </div>
          </Reveal>
        </template>
      </div>
    </template>

    <!-- =========================================================
         SLIDES 02–20: MAIN SLIDES
         ========================================================= -->
    <template v-else>
      <h1 class="slide-title">{{ titles[id - 1] }}</h1>

      <main class="slide-body">
        <!-- SLIDE 02: Mười năm vây hãm (clicks: 1) -->
        <template v-if="id === 2">
          <div class="story-panel">
            <div class="ten-years-card enter-cascade">
              <div class="siege-ornament" aria-hidden="true"><span>◆</span></div>
              <div class="big-stat">
                <strong>10</strong>
                <span>năm</span>
              </div>
              <p class="era-meta">Khoảng 1184 TCN</p>
              <div class="siege-year-marks" aria-hidden="true">
                <span v-for="year in 10" :key="year"></span>
              </div>
            </div>
          </div>
        </template>

        <!-- SLIDE 03: Người gác cổng mới (clicks: 2) -->
        <template v-if="id === 3">
          <div class="req-banner enter-cascade">
            <p>Yêu cầu: chỉ cho phép con người và ngựa <mark class="amber-mark">thật</mark> đi vào.</p>
          </div>

          <div class="grid-2col s3-grid">
            <div class="code-card full-h enter-cascade" style="--delay: 80ms">
              <div class="code-header">
                <span class="dots"><i></i><i></i><i></i></span>
                <span>is_horse.py</span>
              </div>
              <pre class="code-pre"><code><span class="kw">def</span> <span class="fn">is_horse</span>(image):
    obj = analyze(image)
<span class="code-hl" :class="{ active: s === 1 }">    features = [
        has_four_legs, has_large_body,
        is_tall, has_mane, has_hooves
    ]</span><span class="code-hl" :class="{ active: s === 2 }">    <span class="kw">return</span> <span class="fn">all</span>(f(obj) <span class="kw">for</span> f <span class="kw">in</span> features)</span></code></pre>
            </div>

            <div class="scan-booth enter-cascade" style="--delay: 130ms">
              <div class="feature-pills" :class="{ shown: s >= 1 }">
                <span v-for="(f, i) in featureNames" :key="f" :style="{ '--i': i }">
                  <i>✓</i> {{ f }}
                </span>
              </div>
              <div class="booth-actors">
                <div class="booth-horse" :class="{ scanned: s >= 1 }">
                  <TroyCharacters role="real-horse" coat="#7c4d2b" />
                  <div v-if="s === 1" class="mini-scanner"></div>
                </div>
                <div class="booth-guard">
                  <TroyCharacters role="guard" :pose="s >= 2 ? 'open-gate' : 'idle'" />
                </div>
              </div>
            </div>
          </div>

          <Reveal :step="s" :at="2">
            <div class="card-callout warm s3-bottom">
              <strong>Đủ năm đặc trưng → là ngựa</strong>
              <p>“Có bờm, có móng guốc… đủ năm món là ngựa. Còn gì phải nghĩ nữa?”</p>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 04: Kiểm thử (clicks: 2) -->
        <template v-if="id === 4">
          <div class="pytest-card">
            <div class="pytest-header">
              <div class="dots"><i></i><i></i><i></i></div>
              <span class="pytest-title">CI · pytest</span>
            </div>

            <div class="pytest-list">
              <div
                v-for="(row, i) in pytestRows"
                :key="row.code"
                class="pytest-row"
                :class="{ revealed: s >= row.at, 'hl-row': row.flip && s === 1 }"
                :style="row.at === 0 ? { '--stagger': i * 50 + 'ms' } : undefined"
              >
                <span class="row-tick">✓</span>
                <code class="row-code">{{ row.code }}</code>
                <!-- Persistent DOM node -> zero layout shift when row 6 reveals! -->
                <HorseComparison v-if="row.flip" compact :flipped="s >= 1" />
                <b class="pass-pill">PASS</b>
              </div>
            </div>
          </div>

          <Reveal :step="s" :at="2">
            <div class="s4-summary">
              <div class="summary-metric">
                <span class="metric-check">✓</span>
                <strong>6/6 passed</strong>
                <span class="cov-pill">coverage 100%</span>
              </div>
              <div class="summary-quote">
                <div class="mini-avatar">
                  <TroyCharacters role="guard" />
                </div>
                <p>“Toàn xanh cả! Tối nay ngủ ngon rồi.”</p>
              </div>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 05: Những ngày yên bình (clicks: 1) -->
        <template v-if="id === 5">
          <div class="grid-2col s5-grid">
            <div class="ci-peace-card enter-cascade">
              <div class="ci-card-top">
                <span class="status-dot"></span>
                <strong>CI · main · all checks passed</strong>
              </div>
              <div class="passed-grid">
                <div v-for="i in 12" :key="i" class="passed-tile" :style="{ '--i': i }">
                  <span>✓</span> passed
                </div>
              </div>

              <div class="peace-stage">
                <div class="passing-horse active">
                  <TroyCharacters role="real-horse" coat="#8a5630" />
                </div>
                <div class="stage-cassandra" :class="{ entered: s >= 1 }">
                  <TroyCharacters role="cassandra" :pose="s >= 1 ? 'warn' : 'idle'" />
                </div>
                <div class="stage-guard">
                  <TroyCharacters role="guard" :pose="s === 0 ? 'look-left' : 'idle'" />
                </div>
              </div>
            </div>

            <div class="s5-dialogue">
              <Reveal :step="s" :at="1">
                <div class="chat-message cassandra-message">
                  <div class="chat-avatar" aria-hidden="true">
                    <TroyCharacters role="cassandra" portrait />
                  </div>
                  <div class="chat-content">
                    <span class="speaker-label">Cassandra</span>
                    <div class="dialogue-card cassandra">
                      <blockquote>“Xanh thì xanh… nhưng chưa chắc đã an toàn đâu.”</blockquote>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal :step="s" :at="1" :delay="150">
                <div class="chat-message guard-message">
                  <div class="chat-avatar" aria-hidden="true">
                    <TroyCharacters role="guard" portrait />
                  </div>
                  <div class="chat-content">
                    <span class="speaker-label">Người gác cổng</span>
                    <div class="dialogue-card guard">
                      <blockquote>“Lại Cassandra nữa à? Dashboard vẫn xanh mà!”</blockquote>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </template>

        <!-- SLIDE 06: Cho đến một buổi sáng… (clicks: 4) -->
        <template v-if="id === 6">
          <div class="story-panel dark-glass-panel">
            <p class="fall-narrative enter-cascade">
              Quân Hy Lạp dường như đã rút. Trước cổng chỉ còn một con ngựa gỗ khổng lồ, được xem là lễ vật dâng nữ thần Athena theo truyền thuyết.
            </p>

            <Reveal :step="s" :at="1">
              <div class="eval-pill">
                <code>is_horse(wooden_horse)</code>
                <span>→</span>
                <strong>True</strong>
              </div>
            </Reveal>

            <Reveal :step="s" :at="4">
              <blockquote class="climax-question">
                Không test nào fail.<br />
                Vậy tại sao tất cả đều xanh mà pháo đài vẫn thất thủ?
              </blockquote>
            </Reveal>

            <Reveal :step="s" :at="4" :delay="150">
              <div class="clue-kickoff">
                Hãy cùng tìm ra câu trả lời: có <strong>4 manh mối.</strong>
              </div>
            </Reveal>
          </div>
        </template>

        <!-- SLIDE 07: Ba tầng test, ba mô hình tư duy (clicks: 2) -->
        <template v-if="id === 7">
          <div class="surface-card table-card enter-cascade">
            <table class="clean-table strategy-table">
              <thead>
                <tr>
                  <th>Tầng</th>
                  <th>Kiểm tra</th>
                  <th>Ưu</th>
                  <th>Nhược</th>
                  <th>Ở Troy</th>
                </tr>
              </thead>
              <tbody>
                <tr class="visible" style="--d: 40ms">
                  <th><span class="tier-badge unit">Unit</span></th>
                  <td>Một hàm / lớp, tách biệt</td>
                  <td class="pro-cell">Nhanh, rẻ, định vị lỗi</td>
                  <td class="con-cell">Không thấy lỗi ghép nối</td>
                  <td>Riêng người gác cổng</td>
                </tr>
                <tr class="visible" style="--d: 110ms">
                  <th><span class="tier-badge int">Integration</span></th>
                  <td>Nhiều thành phần thật</td>
                  <td class="pro-cell">Bắt lỗi giao diện, hợp đồng</td>
                  <td class="con-cell">Chậm hơn, khó dựng</td>
                  <td>Gác cổng + tuần tra + báo động</td>
                </tr>
                <tr class="visible" style="--d: 180ms">
                  <th><span class="tier-badge e2e">E2E</span></th>
                  <td>Luồng người dùng thật</td>
                  <td class="pro-cell">Sát thực tế nhất</td>
                  <td class="con-cell">Chậm, đắt, dễ flaky</td>
                  <td>Diễn tập cả thành bị tấn công</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Reveal :step="s" :at="1">
            <div class="foundation-bar">
              <span>Tầng nền</span>
              <p>Static analysis: type checker, linter</p>
            </div>
            <div class="models-grid">
              <div class="model-card">
                <svg viewBox="0 0 36 32" class="model-icon"><polygon points="18,3 33,29 3,29" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="8" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="1.6" /><line x1="13" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.6" /></svg>
                <div>
                  <strong>Pyramid · Cohn / Fowler</strong>
                  <span>Nhiều unit, ít E2E</span>
                </div>
              </div>
              <div class="model-card">
                <svg viewBox="0 0 36 32" class="model-icon"><path d="M9,6 H27 L24,18 C23,22 13,22 12,18 Z" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="18" y1="21" x2="18" y2="27" stroke="currentColor" stroke-width="2.2" /><line x1="11" y1="28" x2="25" y2="28" stroke="currentColor" stroke-width="2.2" /></svg>
                <div>
                  <strong>Trophy · Kent C. Dodds</strong>
                  <span>Nhiều integration</span>
                </div>
              </div>
              <div class="model-card">
                <svg viewBox="0 0 36 32" class="model-icon"><polygon points="12,5 24,5 30,16 24,27 12,27 6,16" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="6" y1="16" x2="30" y2="16" stroke="currentColor" stroke-width="1.5" /></svg>
                <div>
                  <strong>Honeycomb · Spotify</strong>
                  <span>Microservices + contract test</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal :step="s" :at="2">
            <p class="bottom-note"><strong>Chỉ là heuristic, không phải quy chuẩn.</strong></p>
          </Reveal>
        </template>

        <!-- SLIDE 08: Code do AI sinh: đầu tư vào đâu? (clicks: 2) -->
        <template v-if="id === 8">
          <div class="grid-2col s8-grid">
              <div class="surface-card point-card enter-cascade">
                <div class="sheet-stack" aria-hidden="true">
                  <span></span><span></span><span>test_()</span>
                </div>
                <div>
                  <h2>AI sinh hàng loạt unit test dễ</h2>
                  <p>Nguy cơ <strong>“pyramid hời hợt”</strong>.</p>
                </div>
              </div>

              <div class="surface-card point-card accent-left enter-cascade" style="--delay: 90ms">
                <div>
                  <h2>Hiểu sai yêu cầu, sai ghép nối</h2>
                  <p>Ưu tiên <strong>integration / contract test</strong>.<br />E2E cần <strong>“red team”</strong>: để kẻ tấn công thử.</p>
                </div>
              </div>
          </div>

          <Reveal :step="s" :at="1">
            <blockquote class="s8-quote">
              <p>“Timeo Danaos et dona ferentes”</p>
              <p class="s8-quote-translation">Ta sợ người Hy Lạp, kể cả khi họ mang quà.</p>
              <cite>— Laocoön</cite>
            </blockquote>
          </Reveal>

          <Reveal :step="s" :at="2">
            <div class="clue-banner">
              <span class="clue-num">01</span>
              <div class="clue-text">
                <strong>Manh mối 1</strong>
                <p>Cả 6 test chỉ là unit test trên một hàm. Không ai diễn tập tình huống “món quà lạ trước cổng”.</p>
              </div>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 09: Oracle: cái “True” này từ đâu ra? (clicks: 2) -->
        <template v-if="id === 9">
          <p class="slide-lead">Oracle quyết định kết quả chạy là đúng hay sai.</p>

          <div class="assertion-stage">
            <div class="assert-branch code-side active enter-cascade">
              <div class="assert-tokens">
                <span class="tok-kw">assert</span>
                <span class="tok-call">is_horse(image)</span>
                <span class="tok-op">==</span>
              </div>
              <span class="branch-badge navy">Kết quả từ code</span>
            </div>

            <div class="assert-branch oracle-side active enter-cascade" style="--delay: 140ms">
              <div class="expected-box">
                <span>expected</span>
              </div>
              <span class="branch-badge rust">Đáp án từ oracle</span>
            </div>
          </div>

          <Reveal :step="s" :at="1">
            <div class="oracle-troy-card">
              <div class="ot-horse">
                <img :src="base + 'troy/image13.svg'" alt="Ngựa gỗ" />
              </div>
              <div class="ot-guard">
                <div class="thought-bubble" aria-hidden="true">
                  <span class="thought-cloud">??</span>
                  <i class="dot-lg"></i>
                  <i class="dot-sm"></i>
                </div>
                <TroyCharacters role="guard" pose="look-left" />
              </div>
              <blockquote>
                “Với ngựa gỗ,<br />
                <strong>đáp án kỳ vọng</strong> lấy từ đâu?”
              </blockquote>
            </div>
          </Reveal>

          <Reveal :step="s" :at="2">
            <div class="formula-pill">
              <span>Mỗi test</span>
              <b>=</b>
              <span>đầu vào</span>
              <b>+</b>
              <strong>oracle</strong>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 10: 5 dạng oracle (clicks: 1 -> vào trang ra cả 5 ý mượt, click cuối ra nhận xét!) -->
        <template v-if="id === 10">
          <div class="oracle-list">
            <div
              v-for="(item, i) in oracleRows"
              :key="item.num"
              class="oracle-card-row shown enter-cascade"
              :style="{ '--delay': i * 55 + 'ms' }"
            >
              <span class="row-index">{{ item.num }}</span>
              <h2 class="row-title">{{ item.name }}</h2>
              <code v-if="item.isCode" class="row-expr">{{ item.code }}</code>
              <p v-else class="row-desc">{{ item.code }}</p>
              <div class="row-visual">
                <HorseComparison v-if="item.flip" compact :flipped="true" />
              </div>
            </div>
          </div>

          <Reveal :step="s" :at="1">
            <p class="bottom-note">Mỗi dạng có điểm mù. <strong>Có thể kết hợp nhiều oracle.</strong></p>
          </Reveal>
        </template>

        <!-- SLIDE 11: Code sai, test vẫn PASS? (clicks: 2) -->
        <template v-if="id === 11">
          <p class="slide-lead">Nếu code sai, oracle này có sai theo không?</p>

          <div class="truth-anchor enter-cascade">
            <p>100.000 giảm 10%: đáp án từ yêu cầu là <strong class="truth-val">90.000</strong>.</p>
          </div>

          <div class="grid-2col s11-grid">
            <Reveal :step="s" :at="1">
              <div class="compare-card wrong-source">
                <h2 class="compare-title warn">Chép output từ code</h2>
                <div class="code-card">
                  <pre class="code-pre"><code>actual = <span class="num-warn">85_000</span>
<span class="code-hl" :class="{ active: s === 1 }"><span class="kw">assert</span> actual == <span class="num-warn">85_000</span></span></code></pre>
                </div>
                <div class="verdict-row">
                  <span class="verdict-badge pass">PASS</span>
                  <p class="verdict-text">Code và kỳ vọng cùng sai.</p>
                </div>
              </div>
            </Reveal>

            <Reveal :step="s" :at="2">
              <div class="compare-card right-source">
                <h2 class="compare-title good">Tính từ yêu cầu</h2>
                <div class="code-card">
                  <pre class="code-pre"><code>actual = <span class="num-warn">85_000</span>
<span class="code-hl" :class="{ active: s === 2 }"><span class="kw">assert</span> actual == <span class="num-good">90_000</span></span></code></pre>
                </div>
                <div class="verdict-row">
                  <span class="verdict-badge fail">FAIL</span>
                  <p class="verdict-text">Test phát hiện kết quả sai.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </template>

        <!-- SLIDE 12: Oracle độc lập ở cổng thành Troy (clicks: 2) -->
        <template v-if="id === 12">
          <div class="grid-2col s12-grid">
            <TroyScene :step="s" mode="oracle" />

            <div class="s12-right">
              <h2 class="s12-question enter-cascade">Bên trong có người ẩn nấp không?</h2>

              <Reveal :step="s" :at="1">
                <div class="s12-sources">
                  <p class="section-kicker">Nguồn kiểm tra khác</p>
                  <div class="source-item">
                    <span>01</span>
                    <p>Lính từng giao tranh</p>
                  </div>
                  <div class="source-item">
                    <span>02</span>
                    <p>Thông tin tình báo</p>
                  </div>
                  <div class="source-item active-sensor">
                    <span>03</span>
                    <p>Cảm biến bên trong</p>
                  </div>
                  <div class="ai-rule-card">
                    Với AI: sinh test từ <strong>yêu cầu / đặc tả</strong>, rồi kiểm tra <strong>căn cứ của đáp án</strong>.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal :step="s" :at="2">
            <div class="clue-banner">
              <span class="clue-num">02</span>
              <div class="clue-text">
                <strong>Manh mối 2</strong>
                <p>Đội dev chỉ nghĩ tới các ca quen thuộc, chưa nghĩ tới ngựa gỗ chứa lính.</p>
              </div>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 13: Từ vài ví dụ sang nguyên tắc (clicks: 2) -->
        <template v-if="id === 13">
          <div class="grid-2col s13-top">
            <div class="s13-copy enter-cascade">
              <p class="slide-lead">
                Thay vì viết test cho từng ví dụ cụ thể, ta mô tả
                <strong>tính chất đúng với mọi đầu vào hợp lệ.</strong>
              </p>
              <p class="body-para">
                Công cụ tự động sinh hàng trăm, hàng nghìn trường hợp thử nghiệm và dùng
                <strong>shrinking</strong> thu nhỏ phản ví dụ về dạng đơn giản nhất.
              </p>
            </div>

            <div class="code-card enter-cascade" style="--delay: 90ms">
              <div class="code-header">
                <span class="dots"><i></i><i></i><i></i></span>
                <span>Hypothesis</span>
              </div>
              <pre class="code-pre"><code><span class="kw">from</span> hypothesis <span class="kw">import</span> given, strategies <span class="kw">as</span> st

<span class="code-hl" :class="{ active: s === 1 }">@given(st.lists(st.integers()))</span><span class="kw">def</span> <span class="fn">test_sort_is_idempotent</span>(xs):
<span class="code-hl" :class="{ active: s === 1 }">    <span class="kw">assert</span> sorted(sorted(xs)) == sorted(xs)</span></code></pre>
            </div>
          </div>

          <Reveal :step="s" :at="1">
            <div class="pbt-pipeline" :class="{ 'with-shrink': s >= 2 }">
              <div class="pipe-main">
                <div class="pipe-box primary">generator</div>
                <span class="flow-arrow">→</span>
                <div class="pipe-box neutral">hàng nghìn input</div>
                <span class="flow-arrow">→</span>
                <div class="pipe-box primary">property</div>
              </div>
              <div class="pipe-extra" :class="{ expanded: s >= 2 }">
                <span class="flow-arrow dashed">⇢</span>
                <div class="pipe-box warn">shrinking</div>
                <span class="flow-arrow dashed">→</span>
                <div class="pipe-box highlight">phản ví dụ tối thiểu</div>
              </div>
            </div>
          </Reveal>

          <Reveal :step="s" :at="2" :delay="180">
            <div class="tool-strip">
              <span>Công cụ:</span>
              <code>Hypothesis</code>
              <code>fast-check</code>
              <code>QuickCheck</code>
              <code>jqwik</code>
              <code>proptest</code>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 14: Demo: Troy thu nhỏ (clicks: 3 -> code highlight synced 1-1 with right cards!) -->
        <template v-if="id === 14">
          <div class="s14-layout">
            <div class="code-card s14-code enter-cascade">
              <div class="code-header">
                <span class="dots"><i></i><i></i><i></i></span>
                <span>troy_demo.py</span>
              </div>
              <pre class="code-pre"><code><span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">from</span> hypothesis <span class="kw">import</span> given, strategies <span class="kw">as</span> st

@dataclass
<span class="kw">class</span> <span class="fn">Thing</span>:
    kind: str
    looks_like_horse: bool
    is_alive: bool
    contains_person: bool  <span class="cm"># từ cảm biến độc lập</span>

<span class="kw">def</span> <span class="fn">gate_allows</span>(t: Thing) -> bool:
<span class="code-hl" :class="{ active: s === 2 }" style="margin-bottom: 8px">    <span class="kw">return</span> t.looks_like_horse</span>things = st.builds(
    Thing,
    kind=st.sampled_from([<span class="st">"horse"</span>, <span class="st">"wooden_horse"</span>, <span class="st">"cart"</span>, <span class="st">"box"</span>]),
    looks_like_horse=st.booleans(), is_alive=st.booleans(),
    contains_person=st.booleans(),
)

<span class="code-hl" :class="{ active: s === 1 }">@given(things)
<span class="kw">def</span> <span class="fn">test_no_hidden_person_gets_in</span>(t):
    <span class="kw">if</span> gate_allows(t):
<span class="code-hl" :class="{ active: s === 2 }">        <span class="kw">assert not</span> t.contains_person</span></span></code></pre>
            </div>

            <div class="s14-inspector">
              <Reveal :step="s" :at="1">
                <div class="surface-card prop-box">
                  <span class="section-kicker">Property</span>
                  <h2>Không vật thể nào chứa người lạ được qua cổng.</h2>
                </div>
              </Reveal>

              <Reveal :step="s" :at="2">
                <div class="counterexample-card">
                  <div class="ce-head">✘ Phản ví dụ</div>
                  <pre><code>Thing(
  kind='horse',
  <span class="ce-amber">looks_like_horse=True</span>,
  is_alive=False,
  <span class="ce-red">contains_person=True</span>
)</code></pre>
                </div>
              </Reveal>

              <Reveal :step="s" :at="3">
                <p class="s14-takeaway">
                  Máy nghĩ thay ta những ca ta không nghĩ tới <strong>nếu ta mô tả đúng nguyên tắc.</strong>
                </p>
              </Reveal>
            </div>
          </div>
        </template>

        <!-- SLIDE 15: Giới hạn của Property-based Testing (clicks: 3 -> code highlight synced with PASS card!) -->
        <template v-if="id === 15">
          <div class="grid-2col s15-grid">
            <div class="stack-col">
              <div class="surface-card limit-card enter-cascade">
                <h2>Property tốt đến từ ý nghĩa bài toán</h2>
                <p>Chất lượng property quyết định tất cả. Nếu property yếu, test vượt qua một cách vô nghĩa.</p>
              </div>

              <Reveal :step="s" :at="2">
                <div class="surface-card limit-card">
                  <h2>Generator kém &amp; giới hạn lấy mẫu</h2>
                  <p>Không chạm tới trường hợp lạ. Kiểm thử vẫn là <strong>lấy mẫu</strong>, không phải chứng minh.</p>
                </div>
              </Reveal>

              <Reveal :step="s" :at="2" :delay="110">
                <div class="surface-card limit-card">
                  <h2>AI đề xuất, con người thẩm định</h2>
                  <p>Cần người duyệt xem property có phản ánh đúng <strong>ý định ban đầu</strong> không.</p>
                </div>
              </Reveal>
            </div>

            <div class="stack-col">
              <div class="code-card enter-cascade" style="--delay: 80ms">
                <div class="code-header">
                  <span class="dots"><i></i><i></i><i></i></span>
                  <span>weak_property.py</span>
                </div>
                <pre class="code-pre"><code><span class="kw">def</span> <span class="fn">my_sort</span>(xs):
<span class="code-hl" :class="{ active: s === 1 }" style="margin-bottom: 8px">    <span class="kw">return</span> []</span><span class="code-hl" :class="{ active: s === 1 }"><span class="kw">assert</span> is_ascending(my_sort(xs))  <span class="cm"># ✔</span></span></code></pre>
                <div class="weak-pass-bar" :class="{ shown: s >= 1 }">
                  <span class="verdict-badge pass">PASS</span>
                  <span>Property yếu: <strong>pass nhưng vô nghĩa</strong></span>
                </div>
              </div>

              <Reveal :step="s" :at="1">
                <div class="surface-card mini-callout">
                  Mảng rỗng vẫn tăng dần, nên cần thêm ràng buộc như <strong>bảo toàn phần tử</strong>.
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal :step="s" :at="3">
            <div class="clue-banner">
              <span class="clue-num">03</span>
              <div class="clue-text">
                <strong>Manh mối 3</strong>
                <p>
                  <code>flip</code> nghe “khoa học” nhưng chỉ kiểm tra <span class="pill-consistency">tính nhất quán</span>, không kiểm tra
                  <strong class="pill-correctness">tính đúng</strong>. Hàm luôn trả <code>True</code> cũng thỏa nó.
                </p>
              </div>
              <HorseComparison answer="True" :flipped="s >= 3" />
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 16: Thuật sĩ viết 200 bài kiểm tra... (clicks: 2) -->
        <template v-if="id === 16">
          <div class="grid-2col s16-grid">
            <div class="surface-card risks-card enter-cascade">
              <h2>Những dấu hiệu cần cẩn thận</h2>
              <div class="risk-rows">
                <div
                  v-for="(r, i) in aiRisks"
                  :key="r[0]"
                  class="risk-row shown enter-cascade"
                  :style="{ '--delay': i * 40 + 'ms' }"
                >
                  <strong>{{ r[0] }}</strong>
                  <span>{{ r[1] }}</span>
                </div>
              </div>
            </div>

            <Reveal :step="s" :at="1">
              <div class="surface-card checklist-card">
                <h2>Checklist review 5 câu</h2>
                <div class="checklist-rows">
                  <div
                    v-for="(q, i) in reviewQuestions"
                    :key="q"
                    class="check-q"
                  >
                    <span class="q-idx">{{ i + 1 }}</span>
                    <p>{{ q }}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal :step="s" :at="2">
            <p class="bottom-note">
              Người viết tay cũng mắc các lỗi này. Vấn đề: <strong>oracle từ đâu, và ai đã thử phá test.</strong>
            </p>
          </Reveal>
        </template>

        <!-- SLIDE 17: Mutation testing = cài gián điệp giả (clicks: 2) -->
        <template v-if="id === 17">
          <div class="s17-top enter-cascade">
            <p class="slide-lead">
              Chèn lỗi nhân tạo vào code mà test vẫn qua = <strong>mutant sống sót</strong> = test lỏng.
            </p>
            <div class="spy-badge">
              <img :src="base + 'troy/image23.png'" alt="" />
              <span>MUTANT</span>
            </div>
          </div>

          <div class="surface-card table-card enter-cascade" style="--delay: 70ms">
            <table class="clean-table mutant-table">
              <thead>
                <tr>
                  <th>Mutant trên <code>is_horse</code></th>
                  <th>Kết quả 6 test</th>
                  <th>Ý nghĩa</th>
                </tr>
              </thead>
              <tbody>
                <tr class="visible" style="--d: 40ms">
                  <td><code>all(…) → any(…)</code></td>
                  <td><span class="status-pill red">FAIL · hổ có 4 chân → True</span></td>
                  <td><strong class="killed-text">✔ Bị giết: test có tác dụng</strong></td>
                </tr>
                <tr class="visible" style="--d: 110ms">
                  <td>Xóa <code class="strike">has_hooves</code></td>
                  <td><span class="status-pill green">Vẫn xanh</span></td>
                  <td><strong class="survived-text">✘ Sống sót: hổ/chó đã bị loại bởi đặc trưng khác</strong></td>
                </tr>
                <tr class="visible" style="--d: 180ms">
                  <td>Xóa <code class="strike">has_mane</code></td>
                  <td><span class="status-pill green">Vẫn xanh</span></td>
                  <td><strong class="survived-text">✘ Sống sót</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <Reveal :step="s" :at="1">
            <div class="s17-score-bar">
              <strong>Coverage 100% ≠ test mạnh.</strong>
              <span>Mutation score = tỷ lệ mutant bị giết.</span>
            </div>
          </Reveal>

          <Reveal :step="s" :at="2">
            <div class="s17-footer-notes">
              <p>Giới hạn: đo trên bộ test hiện có, tốn tài nguyên, có mutant tương đương; không tự tìm ra ngựa Trojan.</p>
              <div class="tool-strip compact">
                <code>mutmut</code>
                <code>Cosmic Ray</code>
                <code>Stryker</code>
                <code>PIT</code>
              </div>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 18: Bức tường được chứng minh theo bản vẽ (clicks: 2) -->
        <template v-if="id === 18">
          <div class="spectrum-bar enter-cascade">
            <div class="spec-group">
              <div class="spec-pills">
                <span>example test</span>
                <span>property-based</span>
                <span>fuzzing</span>
              </div>
              <small>Kiểm thử bằng đầu vào</small>
            </div>
            <div class="spec-divider"></div>
            <div class="spec-group">
              <div class="spec-pills">
                <span class="solid">model checking</span>
                <span class="solid">Proof</span>
              </div>
              <small>Kiểm chứng theo đặc tả</small>
            </div>
          </div>

          <div class="grid-2col s18-grid">
            <div class="surface-card fv-card enter-cascade" style="--delay: 80ms">
              <span class="section-kicker">Formal Verification</span>
              <h2>Dùng toán học để xác minh chương trình thỏa đặc tả</h2>
              <p>
                Mọi đầu vào thỏa <mark class="subtle-mark">điều kiện đã nêu</mark>, dưới các
                <mark class="subtle-mark">giả định của mô hình</mark>.
              </p>
            </div>

            <div class="vv-stack">
              <Reveal :step="s" :at="1">
                <div class="blueprint-box">
                  <span>Bản vẽ</span>
                  <code>“Cho ngựa vào” → đủ 5 dấu hiệu → True → cổng mở</code>
                </div>
              </Reveal>

              <div class="vv-cards">
                <Reveal :step="s" :at="1" :delay="90">
                  <div class="surface-card vv-card">
                    <strong>Verification</strong>
                    <p>Hàm làm đúng đặc tả?</p>
                  </div>
                </Reveal>

                <Reveal :step="s" :at="1" :delay="170">
                  <div class="surface-card vv-card warn-border">
                    <strong>Validation</strong>
                    <p>Đặc tả đáp ứng mục đích?</p>
                    <span class="vv-contrast"><mark class="amber-mark">Trông giống ngựa</mark> ≠ <strong>ngựa thật</strong></span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal :step="s" :at="2">
            <div class="clue-banner">
              <span class="clue-num">04</span>
              <div class="clue-text">
                <strong>Manh mối 4: Sai tiêu chí mở cổng</strong>
                <p>Hệ thống thấy vật trông giống ngựa và cho qua, thay vì ngựa thật.</p>
              </div>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 19: Người, AI và công cụ (clicks: 2) -->
        <template v-if="id === 19">
          <div class="grid-2col s19-grid">
            <div class="wf-grid-2x2">
              <div
                v-for="(w, idx) in workflowSteps"
                :key="w.num"
                class="wf-card active enter-cascade"
                :style="{ '--delay': idx * 65 + 'ms' }"
              >
                <div class="wf-top">
                  <span class="wf-num">{{ w.num }}.</span>
                  <span class="wf-role">{{ w.role }}</span>
                </div>
                <p>{{ w.desc }}</p>
              </div>
            </div>

            <Reveal :step="s" :at="1">
              <div class="surface-card table-card s19-table-card">
                <table class="clean-table risk-matrix">
                  <thead>
                    <tr>
                      <th>Loại code</th>
                      <th>Kỹ thuật đề xuất</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="visible" style="--d: 0ms">
                      <td><span class="ctx-pill low">CRUD thường</span></td>
                      <td>Test ví dụ + review</td>
                    </tr>
                    <tr class="visible" style="--d: 60ms">
                      <td><span class="ctx-pill mid">Logic nghiệp vụ</span></td>
                      <td>Thêm property-based</td>
                    </tr>
                    <tr class="visible" style="--d: 120ms">
                      <td><span class="ctx-pill high">Tài chính / an toàn</span></td>
                      <td>Mutation + contract + E2E có “red team”</td>
                    </tr>
                    <tr class="visible" style="--d: 180ms">
                      <td><span class="ctx-pill core">Lõi hệ thống</span></td>
                      <td>Model checking / formal verification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <Reveal :step="s" :at="2">
            <div class="principles-bar">
              <span>Lấy kỳ vọng từ yêu cầu</span>
              <i>·</i>
              <span>Review test như review code</span>
              <i>·</i>
              <span>Kiểm chứng theo mức rủi ro</span>
            </div>
          </Reveal>
        </template>

        <!-- SLIDE 20: Vì sao tất cả đều xanh mà pháo đài vẫn thất thủ? (clicks: 0) -->
        <template v-if="id === 20">
          <div class="s20-clues">
            <div
              v-for="(c, i) in finalClues"
              :key="c.num"
              class="recap-card shown enter-cascade"
              :style="{ '--delay': i * 65 + 'ms' }"
            >
              <span class="recap-num">{{ c.num }}</span>
              <div class="recap-body">
                <h2>{{ c.title }}</h2>
                <p>{{ c.desc }}</p>
              </div>
            </div>
          </div>
        </template>
      </main>
    </template>

    <!-- Bottom Footer & 4-Clue Progress Tracker -->
    <footer class="slide-footer">
      <span class="footer-brand">TROY · TESTING IN THE AGE OF AI</span>
      <div v-if="id >= 6 && id <= 20" class="clue-tracker">
        <span
          v-for="i in 4"
          :key="i"
          class="clue-slot"
          :class="{ lit: i <= clues }"
        >
          {{ i }}
        </span>
        <small>{{ clues }} / 4 MANH MỐI</small>
      </div>
    </footer>
  </article>
</template>
