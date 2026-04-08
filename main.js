/* ================================================================
   数据定义
================================================================ */
const STEMS    = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ZODIAC   = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const WEEKDAYS = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

const NAYIN_60 = [
  '海中金','海中金','炉中火','炉中火','大林木','大林木',
  '路旁土','路旁土','剑锋金','剑锋金','山头火','山头火',
  '涧下水','涧下水','城头土','城头土','白蜡金','白蜡金',
  '杨柳木','杨柳木','泉中水','泉中水','屋上土','屋上土',
  '霹雳火','霹雳火','松柏木','松柏木','长流水','长流水',
  '砂中金','砂中金','山下火','山下火','平地木','平地木',
  '壁上土','壁上土','金箔金','金箔金','覆灯火','覆灯火',
  '天河水','天河水','大驿土','大驿土','钗钏金','钗钏金',
  '桑柘木','桑柘木','大溪水','大溪水','沙中土','沙中土',
  '天上火','天上火','石榴木','石榴木','大海水','大海水'
];

const JICHU = ['建','除','满','平','定','执','破','危','成','收','开','闭'];

const JICHU_YIJI = {
  '建': { yi:['祭祀','祈福','上梁','出行','入学','开光','求嗣'],    ji:['嫁娶','动土','安葬','开市','破土','修造'] },
  '除': { yi:['沐浴','理发','治病','祭祀','扫舍','解除','求医'],   ji:['嫁娶','安葬','入宅','搬家','开市'] },
  '满': { yi:['祭祀','纳财','入宅','求嗣','祈福','纳采'],          ji:['嫁娶','开市','动土','安葬','诉讼'] },
  '平': { yi:['出行','嫁娶','开市','修造','立约','纳采','开光'],   ji:['求医','安葬','破土','动土'] },
  '定': { yi:['嫁娶','开市','祭祀','入宅','立约','纳采','结盟'],   ji:['出行','求医','诉讼','远行'] },
  '执': { yi:['祭祀','纳财','捕猎','治病','理发'],                  ji:['嫁娶','移徙','开市','出行','修造'] },
  '破': { yi:['求医','拆卸','破屋','动土'],                         ji:['嫁娶','开市','祭祀','出行','安葬','入宅'] },
  '危': { yi:['祭祀','纳财','求医','解除'],                         ji:['出行','登高','动土','开市','安床'] },
  '成': { yi:['嫁娶','入宅','开市','祭祀','出行','立约','纳采'],   ji:['诉讼','纳税','争讼'] },
  '收': { yi:['纳财','嫁娶','入宅','祭祀','收债','纳采'],          ji:['出行','开市','求医','治病'] },
  '开': { yi:['嫁娶','开市','入宅','出行','祭祀','动土','修造'],   ji:['安葬','治丧','修坟'] },
  '闭': { yi:['安葬','治丧','塞穴','填沟','祭祀'],                  ji:['嫁娶','出行','开市','动土','入宅'] }
};

const JICHU_LUCK = {
  '建':'一般','除':'一般','满':'吉','平':'吉',
  '定':'大吉','执':'一般','破':'凶','危':'一般',
  '成':'大吉','收':'吉','开':'大吉','闭':'一般'
};

const CHONG_ZODIAC = ['马','羊','猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇'];

const SOLAR_TERMS = [
  {m:1, d:5, name:'小寒'},{m:1, d:20,name:'大寒'},
  {m:2, d:4, name:'立春'},{m:2, d:19,name:'雨水'},
  {m:3, d:6, name:'惊蛰'},{m:3, d:21,name:'春分'},
  {m:4, d:5, name:'清明'},{m:4, d:20,name:'谷雨'},
  {m:5, d:6, name:'立夏'},{m:5, d:21,name:'小满'},
  {m:6, d:6, name:'芒种'},{m:6, d:21,name:'夏至'},
  {m:7, d:7, name:'小暑'},{m:7, d:23,name:'大暑'},
  {m:8, d:7, name:'立秋'},{m:8, d:23,name:'处暑'},
  {m:9, d:8, name:'白露'},{m:9, d:23,name:'秋分'},
  {m:10,d:8, name:'寒露'},{m:10,d:23,name:'霜降'},
  {m:11,d:7, name:'立冬'},{m:11,d:22,name:'小雪'},
  {m:12,d:7, name:'大雪'},{m:12,d:22,name:'冬至'}
];

const SHICHEN_NAMES  = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SHICHEN_TIMES  = ['23-01','01-03','03-05','05-07','07-09','09-11','11-13','13-15','15-17','17-19','19-21','21-23'];
const SHICHEN_FULL   = ['子时','丑时','寅时','卯时','辰时','巳时','午时','未时','申时','酉时','戌时','亥时'];
const DEITY_CYCLE    = ['青龙','明堂','天刑','朱雀','金匮','天德','白虎','玉堂','天牢','玄武','司命','勾陈'];
const LUCKY_DEITIES  = new Set(['青龙','明堂','金匮','天德','玉堂','司命']); // 黄道六神

/* 彭祖百忌 */
const PENG_ZU_STEM = [
  '甲不开仓，财物耗散','乙不栽植，千株不长','丙不修灶，必见灾殃','丁不剃头，头必生疮',
  '戊不受田，田主不详','己不破券，二比并亡','庚不经络，织机虚张','辛不合酱，主人不尝',
  '壬不泱水，更难提防','癸不词讼，理弱敌强'
];
const PENG_ZU_BRANCH = [
  '子不问卜，自惹祸殃','丑不冠带，主不还乡','寅不祭祀，神鬼不尝','卯不穿井，水泉不香',
  '辰不哭泣，必主重丧','巳不远行，财物伏藏','午不苫盖，屋主更张','未不服药，毒气入肠',
  '申不安床，鬼祟入房','酉不会客，醉坐颠狂','戌不吃犬，作怪上床','亥不嫁娶，不利新郎'
];

/* 落叶颜色 */
const LEAF_COLORS = [
  [139,32,32],[181,38,30],[192,99,0],[160,82,45],[107,58,42],[201,140,50]
];

/* ================================================================
   算法函数
================================================================ */
function getJDN(year, month, day) {
  const a = Math.floor((14-month)/12);
  const y = year+4800-a;
  const m = month+12*a-3;
  return day+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
}

function getYearGanzhi(year) {
  const si = ((year-4)%10+10)%10;
  const bi = ((year-4)%12+12)%12;
  return { ganzhi: STEMS[si]+BRANCHES[bi], stemIdx:si, branchIdx:bi, zodiac:ZODIAC[bi] };
}

function getDayGanzhi(year, month, day) {
  const jdn    = getJDN(year, month, day);
  const offset = jdn - 2451545; // 2000-01-01 = 甲戌日
  const si     = ((offset%10)+10)%10;
  const bi     = ((offset+10)%12+12)%12;
  return { ganzhi: STEMS[si]+BRANCHES[bi], stemIdx:si, branchIdx:bi };
}

function getSolarMonthBranchIdx(year, month, day) {
  const doy = Math.round((new Date(year,month-1,day)-new Date(year,0,1))/86400000)+1;
  const bounds = [
    {doy:6,branch:1},{doy:35,branch:2},{doy:65,branch:3},{doy:95,branch:4},
    {doy:126,branch:5},{doy:157,branch:6},{doy:188,branch:7},{doy:219,branch:8},
    {doy:251,branch:9},{doy:281,branch:10},{doy:311,branch:11},{doy:341,branch:0}
  ];
  let b = 0;
  for (const bd of bounds) { if (doy >= bd.doy) b = bd.branch; }
  return b;
}

function getMonthGanzhi(year, month, day) {
  const bi  = getSolarMonthBranchIdx(year, month, day);
  const base = [2,4,6,8,0,2,4,6,8,0][((year-4)%10+10)%10];
  const si  = (base + (bi-2+12)%12) % 10;
  return { ganzhi: STEMS[si]+BRANCHES[bi], stemIdx:si, branchIdx:bi };
}

function getNayin(stemIdx, branchIdx) {
  for (let k=0; k<60; k++) {
    if (k%10===stemIdx && k%12===branchIdx) return NAYIN_60[k];
  }
  return '—';
}

function getJiChu(monthBranchIdx, dayBranchIdx) {
  return JICHU[((dayBranchIdx-monthBranchIdx)%12+12)%12];
}

function getSolarTerm(month, day) {
  for (const t of SOLAR_TERMS) {
    if (t.m===month && t.d===day) return { name:t.name, exact:true };
  }
  return null;
}

function getNearestSolarTerm(month, day) {
  const t = getSolarTerm(month, day);
  if (t) return t.name;
  let last = null;
  for (const st of SOLAR_TERMS) {
    if (st.m < month || (st.m===month && st.d<=day)) last = st.name;
  }
  return last || '—';
}

function getLunarDate(date) {
  try {
    const fmtM = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month:'long' });
    const fmtD = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { day:'numeric' });
    const monthStr = fmtM.formatToParts(date).find(p=>p.type==='month')?.value || '';
    const dayStr   = fmtD.formatToParts(date).find(p=>p.type==='day')?.value   || '';
    return { monthStr, dayStr, ok:true };
  } catch { return { monthStr:'', dayStr:'', ok:false }; }
}

function getShichen(hour) {
  return SHICHEN_FULL[Math.floor(((hour+1)%24)/2)];
}

/* 月相计算 (参考新月: 2025-01-29 12:35 UTC) */
function getMoonPhase(date) {
  const REF_NEW_MOON  = new Date('2025-01-29T12:35:00Z');
  const LUNAR_CYCLE   = 29.530588853;
  const elapsed = (date - REF_NEW_MOON) / 86400000;
  return ((elapsed % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
}

function getMoonPhaseName(phase) {
  if (phase < 1.85)  return { name:'朔·新月',   emoji:'🌑', pct: 0 };
  if (phase < 7.38)  return { name:'娥眉月',     emoji:'🌒', pct: phase/14.77*50 };
  if (phase < 9.23)  return { name:'上弦月',     emoji:'🌓', pct: 50 };
  if (phase < 14.77) return { name:'盈凸月',     emoji:'🌔', pct: 50+((phase-9.23)/5.54)*50 };
  if (phase < 16.61) return { name:'望·满月',    emoji:'🌕', pct: 100 };
  if (phase < 22.15) return { name:'亏凸月',     emoji:'🌖', pct: 100-((phase-16.61)/5.54)*50 };
  if (phase < 24.92) return { name:'下弦月',     emoji:'🌗', pct: 50 };
  return               { name:'残月',           emoji:'🌘', pct: (29.53-phase)/6.61*50 };
}

/* 渲染月相阴影（CSS transform 模拟相位） */
function renderMoon(phase) {
  const shadowEl = document.getElementById('moonShadow');
  const nameEl   = document.getElementById('moonName');
  const ageEl    = document.getElementById('moonAge');
  if (!shadowEl) return;

  const info = getMoonPhaseName(phase);

  /* 用 translateX 偏移阴影遮盖实现月相 */
  /* pct=0 全遮(新月), pct=100 不遮(满月)
     前半段:阴影从右移走 → 右侧亮起(娥眉→上弦→盈凸)
     后半段:阴影从左推入 → 左侧暗起(亏凸→下弦→残月) */
  let shadowStyle = '';
  const pct = info.pct;
  if (pct <= 50) {
    /* 0→50: 新月→上弦, 阴影覆盖右侧, translateX 从 0 向 -100% */
    const x = (50 - pct) * 2; /* 100→0% */
    shadowStyle = `translateX(${x}%)`;
  } else {
    /* 50→100: 上弦→满月, 阴影从左推 */
    /* 反向: 左侧出现阴影 */
    const x = -(pct - 50) * 2; /* 0→-100% */
    shadowStyle = `translateX(${x}%)`;
  }
  /* 满月: 阴影移出, 新月: 阴影在中 */
  if (pct >= 98) shadowStyle = 'translateX(-100%)'; // 满月 shadow 移走
  if (pct <= 2)  shadowStyle = 'translateX(0%)';    // 新月 shadow 留住

  shadowEl.style.transform = shadowStyle;
  nameEl.textContent = info.emoji + '  ' + info.name;
  ageEl.textContent  = `农历第 ${Math.round(phase)} 天`;
}

/* 十二时辰吉凶 */
function getShichenGrid(dayBranchIdx) {
  return SHICHEN_NAMES.map((name, i) => {
    const deity  = DEITY_CYCLE[(i + dayBranchIdx) % 12];
    const lucky  = LUCKY_DEITIES.has(deity);
    const time   = SHICHEN_TIMES[i];
    return { name, time, deity, lucky, fullName: SHICHEN_FULL[i] };
  });
}

function getCurrentShichenIdx(hour) {
  return Math.floor(((hour + 1) % 24) / 2);
}

/* ================================================================
   渲染黄历数据
================================================================ */
function render() {
  const today   = new Date();
  const year    = today.getFullYear();
  const month   = today.getMonth() + 1;
  const day     = today.getDate();
  const weekday = WEEKDAYS[today.getDay()];

  const ygz = getYearGanzhi(year);
  const mgz = getMonthGanzhi(year, month, day);
  const dgz = getDayGanzhi(year, month, day);

  const termToday   = getSolarTerm(month, day);
  const termNearest = getNearestSolarTerm(month, day);
  const jiChuName   = getJiChu(mgz.branchIdx, dgz.branchIdx);
  const yiji        = JICHU_YIJI[jiChuName];
  const luck        = JICHU_LUCK[jiChuName];
  const nayin       = getNayin(dgz.stemIdx, dgz.branchIdx);
  const chongZ      = CHONG_ZODIAC[dgz.branchIdx];
  const chongB      = BRANCHES[(dgz.branchIdx+6)%12];
  const lunar       = getLunarDate(today);

  const mm = String(month).padStart(2,'0');
  const dd = String(day).padStart(2,'0');

  document.getElementById('yearLabel').textContent =
    `${year} 年　${ygz.ganzhi} 年　${ygz.zodiac}年`;
  document.getElementById('dayNumber').textContent = `${mm}·${dd}`;

  const lunarEl = document.getElementById('lunarDate');
  if (lunar.ok && lunar.monthStr) {
    lunarEl.innerHTML = `农历 ${lunar.monthStr}${lunar.dayStr}&ensp;<span class="weekday-tag">${weekday}</span>`;
  } else {
    lunarEl.innerHTML = weekday;
  }

  const ganzhiRow = document.getElementById('ganzhiRow');
  [`${ygz.ganzhi}年`, `${mgz.ganzhi}月`, `${dgz.ganzhi}日`].forEach(text => {
    const span = document.createElement('span');
    span.className = 'gz-item';
    span.textContent = text;
    ganzhiRow.appendChild(span);
  });

  if (termToday?.exact) {
    const badge = document.getElementById('jieqiBadge');
    badge.textContent = `✦  今日${termToday.name}`;
    badge.classList.add('visible');
    requestAnimationFrame(() => { badge.style.opacity = '1'; });
  }

  renderTags('yiList', yiji.yi, 'yi-tag', 0.85);
  renderTags('jiList', yiji.ji, 'ji-tag', 0.85);

  document.getElementById('wuxing').textContent    = nayin;
  document.getElementById('chong').textContent     = `冲${chongZ}(${chongB})`;
  document.getElementById('zhishen').textContent   = jiChuName;
  document.getElementById('luck').textContent      = luck;
  document.getElementById('jieqiInfo').textContent = termToday?.exact ? termToday.name : (termNearest||'—');

  /* 月相 */
  const moonPhase = getMoonPhase(today);
  renderMoon(moonPhase);

  /* 彭祖百忌 */
  document.getElementById('pengzuStem').textContent   = PENG_ZU_STEM[dgz.stemIdx];
  document.getElementById('pengzuBranch').textContent = PENG_ZU_BRANCH[dgz.branchIdx];

  /* 十二时辰吉凶 */
  renderShichenGrid(dgz.branchIdx, today.getHours());
}

function renderTags(containerId, items, cls, baseDelay) {
  const container = document.getElementById(containerId);
  items.forEach((item, i) => {
    const tag = document.createElement('span');
    tag.className = `tag ${cls}`;
    tag.textContent = item;
    tag.style.animationDelay = `${baseDelay + i*0.07}s`;
    container.appendChild(tag);
  });
}

function renderShichenGrid(dayBranchIdx, hour) {
  const grid    = document.getElementById('shichenGrid');
  const currentIdx = getCurrentShichenIdx(hour);
  const items   = getShichenGrid(dayBranchIdx);

  grid.innerHTML = '';
  items.forEach((sc, i) => {
    const div = document.createElement('div');
    div.className = `shichen-item ${sc.lucky ? 'lucky' : 'unlucky'}${i===currentIdx?' current':''}`;

    div.innerHTML = `
      <div class="sc-name">${sc.name}时</div>
      <div class="sc-time">${sc.time}</div>
      <div class="sc-deity">${sc.deity}</div>
      <div class="sc-dot"></div>
    `;
    div.title = `${sc.fullName} (${sc.time}) · ${sc.deity} · ${sc.lucky?'吉':'凶'}`;
    grid.appendChild(div);
  });
}

/* ================================================================
   实时时钟（每秒更新 + 时辰高亮更新）
================================================================ */
function updateClock() {
  const now   = new Date();
  const hh    = String(now.getHours()).padStart(2,'0');
  const min   = String(now.getMinutes()).padStart(2,'0');
  const ss    = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clockTime').textContent    = `${hh} : ${min} : ${ss}`;
  document.getElementById('clockShichen').textContent = getShichen(now.getHours());

  /* 每分钟整点更新时辰高亮 */
  if (now.getSeconds() === 0) {
    const dgz = getDayGanzhi(now.getFullYear(), now.getMonth()+1, now.getDate());
    renderShichenGrid(dgz.branchIdx, now.getHours());
  }
}

/* ================================================================
   开屏动画管理
================================================================ */
function initIntro() {
  const intro = document.getElementById('intro');
  if (!intro) return;
  const INTRO_DURATION = 2400;
  setTimeout(() => {
    intro.style.transition  = 'opacity 0.65s ease';
    intro.style.opacity     = '0';
    intro.style.pointerEvents = 'none';
  }, INTRO_DURATION);
  setTimeout(() => intro.remove(), INTRO_DURATION + 700);
  setTimeout(() => document.body.classList.add('revealed'), INTRO_DURATION + 100);
}

/* ================================================================
   古筝音效 — Web Audio API 五声调式
================================================================ */
class GuzhengPlayer {
  constructor() {
    this.ctx       = null;
    this.master    = null;
    this.reverb    = null;
    this.playing   = false;
    this.timerId   = null;
    this.nextTime  = 0;
  }

  _init() {
    if (this.ctx) return;
    this.ctx    = new (window.AudioContext || window.webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.45;
    this.master.connect(this.ctx.destination);
    this.reverb = this._makeReverb();
  }

  _makeReverb() {
    const ctx    = this.ctx;
    const rate   = ctx.sampleRate;
    const len    = rate * 2.5;
    const buf    = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, 2.5);
      }
    }
    const conv  = ctx.createConvolver();
    conv.buffer = buf;
    const g     = ctx.createGain();
    g.gain.value = 0.28;
    conv.connect(g);
    g.connect(this.master);
    return conv;
  }

  _pluck(freq, time, vol = 0.22) {
    const ctx  = this.ctx;
    /* 基音 (三角波) + 高八度泛音 (正弦) */
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const g    = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.value = freq;
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2.003;

    const g2 = ctx.createGain();
    g2.gain.value = 0.28;
    osc2.connect(g2);
    g2.connect(g);
    osc1.connect(g);

    /* 古筝拨弦包络: 极快起音 → 缓慢衰减 */
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(vol, time + 0.006);
    g.gain.exponentialRampToValueAtTime(vol * 0.65, time + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0008, time + 2.8);

    g.connect(this.master);
    g.connect(this.reverb);

    osc1.start(time); osc1.stop(time + 3.2);
    osc2.start(time); osc2.stop(time + 3.2);
  }

  _schedule() {
    if (!this.playing) return;
    /* 五声音阶 C 调: 宫商角徵羽 */
    const SCALE = [
      261.63, 293.66, 329.63, 392.00, 440.00,   // C4 D4 E4 G4 A4
      523.25, 587.33, 659.25, 783.99, 880.00,    // C5 D5 E5 G5 A5
      1046.50, 1174.66                            // C6 D6
    ];

    const now = this.ctx.currentTime;
    let t = Math.max(now, this.nextTime);

    /* 随机乐句 (3-6 音) */
    const phraseLen = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < phraseLen; i++) {
      const freq = SCALE[Math.floor(Math.random() * SCALE.length)];
      const vol  = 0.14 + Math.random() * 0.18;
      this._pluck(freq, t, vol);

      /* 30% 概率同时拨第二根弦 (和声) */
      if (Math.random() < 0.3) {
        this._pluck(SCALE[Math.floor(Math.random()*SCALE.length)], t+0.04, vol*0.65);
      }
      t += 0.28 + Math.random() * 0.85;
    }

    this.nextTime = t + 1.2 + Math.random() * 2.5;
    const delay   = (this.nextTime - now) * 1000 - 600;
    this.timerId  = setTimeout(() => this._schedule(), Math.max(delay, 800));
  }

  start() {
    this._init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.playing  = true;
    this.nextTime = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(0.45, this.ctx.currentTime, 0.3);
    this._schedule();
  }

  stop() {
    this.playing = false;
    if (this.timerId) clearTimeout(this.timerId);
    if (this.master) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
  }
}

const player = new GuzhengPlayer();

function initMusic() {
  const btn     = document.getElementById('musicToggle');
  const labelEl = document.getElementById('musicLabel');
  let   active  = localStorage.getItem('guzheng') === 'on';

  function applyState() {
    if (active) {
      btn.classList.add('active');
      btn.classList.remove('muted');
      labelEl.textContent = '乐';
      player.start();
    } else {
      btn.classList.remove('active');
      btn.classList.add('muted');
      labelEl.textContent = '静';
      player.stop();
    }
    localStorage.setItem('guzheng', active ? 'on' : 'off');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation(); // 不计入彩蛋点击
    active = !active;
    applyState();
  });

  /* 初始状态：默认静音（首次访问）*/
  if (active) applyState();
  else btn.classList.add('muted');
}

/* ================================================================
   Canvas 背景：水墨粒子 + 落叶
================================================================ */
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const inkParticles = Array.from({length:22}, () => mkInk());

  function mkInk() {
    const g = Math.random() < 0.25;
    return {
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*70+30, vx:(Math.random()-.5)*.16, vy:(Math.random()-.5)*.16,
      alpha: Math.random()*.11+.02, color: g?[201,168,76]:[60,35,20],
      pulse: Math.random()*Math.PI*2, pulseSpeed: .003+Math.random()*.004
    };
  }

  const leaves = Array.from({length:14}, () => mkLeaf(true));
  function mkLeaf(scattered) {
    const c = LEAF_COLORS[Math.floor(Math.random()*LEAF_COLORS.length)];
    return {
      x: Math.random()*(canvas.width||window.innerWidth),
      y: scattered ? Math.random()*(canvas.height||window.innerHeight) : -20-Math.random()*80,
      size: 6+Math.random()*9, vx:(Math.random()-.5)*.6,
      vy: .6+Math.random()*1.4, rotation: Math.random()*Math.PI*2,
      rotSpeed: (Math.random()-.5)*.035, wobble: Math.random()*Math.PI*2,
      wobbleAmp: .3+Math.random()*.5, wobbleSpd: .012+Math.random()*.018,
      color: c, alpha: .35+Math.random()*.45
    };
  }

  function drawLeaf(ctx, l) {
    ctx.save();
    ctx.globalAlpha = l.alpha;
    ctx.translate(l.x, l.y);
    ctx.rotate(l.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -l.size);
    ctx.bezierCurveTo( l.size*.65,-l.size*.4,  l.size*.65, l.size*.4, 0,  l.size);
    ctx.bezierCurveTo(-l.size*.65, l.size*.4, -l.size*.65,-l.size*.4, 0, -l.size);
    ctx.fillStyle = `rgb(${l.color[0]},${l.color[1]},${l.color[2]})`;
    ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,-l.size*.8); ctx.lineTo(0,l.size*.8);
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=.5; ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    inkParticles.forEach(p => {
      p.pulse += p.pulseSpeed;
      const r = p.r*(1+.08*Math.sin(p.pulse));
      const a = p.alpha*(.85+.15*Math.sin(p.pulse+1));
      const [R,G,B] = p.color;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
      g.addColorStop(0,`rgba(${R},${G},${B},${a})`);
      g.addColorStop(.5,`rgba(${R},${G},${B},${a*.35})`);
      g.addColorStop(1,`rgba(${R},${G},${B},0)`);
      ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-p.r)p.x=canvas.width+p.r;
      if(p.x>canvas.width+p.r)p.x=-p.r;
      if(p.y<-p.r)p.y=canvas.height+p.r;
      if(p.y>canvas.height+p.r)p.y=-p.r;
    });

    leaves.forEach((l,i) => {
      l.wobble+=l.wobbleSpd;
      l.x+=l.vx+Math.sin(l.wobble)*l.wobbleAmp;
      l.y+=l.vy; l.rotation+=l.rotSpeed;
      drawLeaf(ctx,l);
      if(l.y>canvas.height+30||l.x<-60||l.x>canvas.width+60) leaves[i]=mkLeaf(false);
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ================================================================
   点击特效画布
================================================================ */
let clickEffects = [];

function initFxCanvas() {
  const canvas = document.getElementById('fxCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clickEffects = clickEffects.filter(p=>p.alpha>0.008);
    clickEffects.forEach(p => {
      if (p.type==='ripple') {
        p.r+=2.2; p.alpha*=.91;
        if(p.r<=p.maxR){
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.strokeStyle=`rgba(${p.color},${p.alpha})`; ctx.lineWidth=1.5; ctx.stroke();
        }
      } else if(p.type==='inkDot') {
        p.x+=p.vx; p.y+=p.vy; p.vx*=p.decay; p.vy*=p.decay; p.vy+=.05; p.alpha*=.93;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.color},${p.alpha})`; ctx.fill();
      } else if(p.type==='sparkle') {
        p.x+=p.vx; p.y+=p.vy; p.vy+=.08; p.alpha*=.90; p.r*=.97;
        ctx.save(); ctx.globalAlpha=p.alpha; ctx.translate(p.x,p.y); ctx.rotate(p.rot+=p.rotSpeed);
        ctx.beginPath();
        ctx.moveTo(0,-p.r*1.6); ctx.lineTo(p.r*.6,0); ctx.lineTo(0,p.r*1.6); ctx.lineTo(-p.r*.6,0);
        ctx.closePath(); ctx.fillStyle=`rgba(${p.color},1)`; ctx.fill();
        ctx.restore();
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function spawnClickEffect(cx, cy) {
  for(let ring=0; ring<2; ring++){
    const baseA = ring===0?.55:.3;
    const col   = ring===0?'201,168,76':'181,38,30';
    setTimeout(()=>{
      clickEffects.push({type:'ripple',x:cx,y:cy,r:3,maxR:48+ring*20,alpha:baseA,color:col});
    }, ring*120);
  }
  const cnt = 8+Math.floor(Math.random()*5);
  for(let i=0;i<cnt;i++){
    const ang = (Math.PI*2*i/cnt)+(Math.random()-.5)*.6;
    const spd = 2.5+Math.random()*3.5;
    const rnd = Math.random();
    const col = rnd<.45?'181,38,30':rnd<.75?'201,168,76':'220,195,150';
    clickEffects.push({type:'inkDot',x:cx,y:cy,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd-1,
      r:2.5+Math.random()*2,alpha:.75+Math.random()*.25,color:col,decay:.90});
  }
  const sc = 3+Math.floor(Math.random()*3);
  for(let i=0;i<sc;i++){
    const ang=Math.random()*Math.PI*2, spd=3+Math.random()*3;
    clickEffects.push({type:'sparkle',x:cx,y:cy,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd-2,
      r:3+Math.random()*3,alpha:.9,color:'240,208,120',rot:Math.random()*Math.PI,
      rotSpeed:(Math.random()-.5)*.2});
  }
}

/* ================================================================
   彩蛋：累计点击 50 次 → 显示 lrbnb
================================================================ */
function initEasterEgg() {
  let count   = 0;
  let shown   = false;
  const egg   = document.getElementById('easterEgg');

  document.addEventListener('click', e => {
    /* 音乐按钮不计入 */
    if (e.target.closest('#musicToggle')) return;

    count++;
    if (count >= 50 && !shown) {
      shown = true;
      egg.classList.add('show');

      /* 3.5 秒后自动关闭 */
      setTimeout(() => {
        egg.classList.remove('show');
        setTimeout(() => { shown = false; count = 0; }, 500);
      }, 3500);
    }
  });

  /* 点击彩蛋本身关闭 */
  egg.addEventListener('click', () => {
    egg.classList.remove('show');
    setTimeout(() => { shown = false; count = 0; }, 500);
  });
}

/* ================================================================
   统一点击监听（特效 + 彩蛋）
================================================================ */
function initClickListener() {
  document.addEventListener('click', e => {
    if (e.target.closest('#musicToggle')) return;
    spawnClickEffect(e.clientX, e.clientY);
  });
}

/* ================================================================
   启动
================================================================ */
(function boot() {
  initIntro();
  initBgCanvas();
  initFxCanvas();
  initMusic();
  initEasterEgg();
  initClickListener();
  render();
  updateClock();
  setInterval(updateClock, 1000);
})();
