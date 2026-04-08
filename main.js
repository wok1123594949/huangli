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
  '建': { yi: ['祭祀','祈福','上梁','出行','入学','开光','求嗣'],    ji: ['嫁娶','动土','安葬','开市','破土','修造'] },
  '除': { yi: ['沐浴','理发','治病','祭祀','扫舍','解除','求医'],   ji: ['嫁娶','安葬','入宅','搬家','开市'] },
  '满': { yi: ['祭祀','纳财','入宅','求嗣','祈福','纳采'],          ji: ['嫁娶','开市','动土','安葬','诉讼'] },
  '平': { yi: ['出行','嫁娶','开市','修造','立约','纳采','开光'],   ji: ['求医','安葬','破土','动土'] },
  '定': { yi: ['嫁娶','开市','祭祀','入宅','立约','纳采','结盟'],   ji: ['出行','求医','诉讼','远行'] },
  '执': { yi: ['祭祀','纳财','捕猎','治病','理发'],                  ji: ['嫁娶','移徙','开市','出行','修造'] },
  '破': { yi: ['求医','拆卸','破屋','动土'],                         ji: ['嫁娶','开市','祭祀','出行','安葬','入宅'] },
  '危': { yi: ['祭祀','纳财','求医','解除'],                         ji: ['出行','登高','动土','开市','安床'] },
  '成': { yi: ['嫁娶','入宅','开市','祭祀','出行','立约','纳采'],   ji: ['诉讼','纳税','争讼'] },
  '收': { yi: ['纳财','嫁娶','入宅','祭祀','收债','纳采'],          ji: ['出行','开市','求医','治病'] },
  '开': { yi: ['嫁娶','开市','入宅','出行','祭祀','动土','修造'],   ji: ['安葬','治丧','修坟'] },
  '闭': { yi: ['安葬','治丧','塞穴','填沟','祭祀'],                  ji: ['嫁娶','出行','开市','动土','入宅'] }
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

const SHICHEN = ['子时','丑时','寅时','卯时','辰时','巳时','午时','未时','申时','酉时','戌时','亥时'];

/* 落叶颜色（秋日中国色调） */
const LEAF_COLORS = [
  [139, 32, 32],
  [181, 38, 30],
  [192, 99,  0],
  [160, 82, 45],
  [107, 58, 42],
  [201,140, 50]
];

/* ================================================================
   算法函数
================================================================ */
function getJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) +
         365 * y + Math.floor(y / 4) -
         Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getYearGanzhi(year) {
  const si = ((year - 4) % 10 + 10) % 10;
  const bi = ((year - 4) % 12 + 12) % 12;
  return { ganzhi: STEMS[si] + BRANCHES[bi], stemIdx: si, branchIdx: bi, zodiac: ZODIAC[bi] };
}

function getDayGanzhi(year, month, day) {
  const jdn    = getJDN(year, month, day);
  const offset = jdn - 2451545; // 2000-01-01 = 甲戌日
  const si     = ((offset % 10) + 10) % 10;
  const bi     = ((offset + 10) % 12 + 12) % 12;
  return { ganzhi: STEMS[si] + BRANCHES[bi], stemIdx: si, branchIdx: bi };
}

function getSolarMonthBranchIdx(year, month, day) {
  const doy = Math.round((new Date(year, month-1, day) - new Date(year, 0, 1)) / 86400000) + 1;
  const bounds = [
    {doy:6,   branch:1},  // 小寒 → 丑月
    {doy:35,  branch:2},  // 立春 → 寅月
    {doy:65,  branch:3},  // 惊蛰 → 卯月
    {doy:95,  branch:4},  // 清明 → 辰月
    {doy:126, branch:5},  // 立夏 → 巳月
    {doy:157, branch:6},  // 芒种 → 午月
    {doy:188, branch:7},  // 小暑 → 未月
    {doy:219, branch:8},  // 立秋 → 申月
    {doy:251, branch:9},  // 白露 → 酉月
    {doy:281, branch:10}, // 寒露 → 戌月
    {doy:311, branch:11}, // 立冬 → 亥月
    {doy:341, branch:0},  // 大雪 → 子月
  ];
  let branchIdx = 0;
  for (const b of bounds) {
    if (doy >= b.doy) branchIdx = b.branch;
  }
  return branchIdx;
}

function getMonthGanzhi(year, month, day) {
  const branchIdx   = getSolarMonthBranchIdx(year, month, day);
  const yearStemBase = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // 五虎遁年法
  const yStemIdx     = ((year - 4) % 10 + 10) % 10;
  const base         = yearStemBase[yStemIdx];
  const offset       = (branchIdx - 2 + 12) % 12;
  const stemIdx      = (base + offset) % 10;
  return { ganzhi: STEMS[stemIdx] + BRANCHES[branchIdx], stemIdx, branchIdx };
}

function getNayin(stemIdx, branchIdx) {
  for (let k = 0; k < 60; k++) {
    if (k % 10 === stemIdx && k % 12 === branchIdx) return NAYIN_60[k];
  }
  return '—';
}

function getJiChu(monthBranchIdx, dayBranchIdx) {
  const idx = ((dayBranchIdx - monthBranchIdx) % 12 + 12) % 12;
  return JICHU[idx];
}

function getSolarTerm(month, day) {
  for (const t of SOLAR_TERMS) {
    if (t.m === month && t.d === day) return { name: t.name, exact: true };
  }
  return null;
}

function getNearestSolarTerm(month, day) {
  const term = getSolarTerm(month, day);
  if (term) return term.name;
  let last = null;
  for (const t of SOLAR_TERMS) {
    if (t.m < month || (t.m === month && t.d <= day)) last = t.name;
  }
  return last || '—';
}

function getLunarDate(date) {
  try {
    const fmtM = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long' });
    const fmtD = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { day: 'numeric' });
    const mParts = fmtM.formatToParts(date);
    const dParts = fmtD.formatToParts(date);
    const monthStr = mParts.find(p => p.type === 'month')?.value || '';
    const dayStr   = dParts.find(p => p.type === 'day')?.value   || '';
    return { monthStr, dayStr, ok: true };
  } catch {
    return { monthStr: '', dayStr: '', ok: false };
  }
}

function getShichen(hour) {
  return SHICHEN[Math.floor(((hour + 1) % 24) / 2)];
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

  const jiChuName = getJiChu(mgz.branchIdx, dgz.branchIdx);
  const yiji      = JICHU_YIJI[jiChuName];
  const luck      = JICHU_LUCK[jiChuName];
  const nayin     = getNayin(dgz.stemIdx, dgz.branchIdx);
  const chongZodiac = CHONG_ZODIAC[dgz.branchIdx];
  const chongBranch = BRANCHES[(dgz.branchIdx + 6) % 12];
  const lunar       = getLunarDate(today);

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');

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
  document.getElementById('chong').textContent     = `冲${chongZodiac}(${chongBranch})`;
  document.getElementById('zhishen').textContent   = jiChuName;
  document.getElementById('luck').textContent      = luck;
  document.getElementById('jieqiInfo').textContent = termToday?.exact ? termToday.name : (termNearest || '—');
}

function renderTags(containerId, items, cls, baseDelay) {
  const container = document.getElementById(containerId);
  items.forEach((item, i) => {
    const tag = document.createElement('span');
    tag.className = `tag ${cls}`;
    tag.textContent = item;
    tag.style.animationDelay = `${baseDelay + i * 0.07}s`;
    container.appendChild(tag);
  });
}

/* ================================================================
   实时时钟
================================================================ */
function updateClock() {
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss  = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clockTime').textContent    = `${hh} : ${min} : ${ss}`;
  document.getElementById('clockShichen').textContent = getShichen(now.getHours());
}

/* ================================================================
   开屏动画管理
================================================================ */
function initIntro() {
  const intro = document.getElementById('intro');
  if (!intro) return;

  /* 开屏最后一个字 0.75s 开始, 0.55s 后完成 = 1.3s
     分割线 1.35s 完成, 副标题 1.7s 开始
     总计 ~2.3s 之后隐藏 */
  const INTRO_DURATION = 2400; // ms

  setTimeout(() => {
    intro.style.transition = 'opacity 0.65s ease';
    intro.style.opacity    = '0';
    intro.style.pointerEvents = 'none';
  }, INTRO_DURATION);

  setTimeout(() => {
    intro.remove();
  }, INTRO_DURATION + 700);

  /* 开屏结束后揭示主内容 */
  setTimeout(() => {
    document.body.classList.add('revealed');
  }, INTRO_DURATION + 100);
}

/* ================================================================
   Canvas 背景：水墨粒子 + 落叶
================================================================ */
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---- 水墨浮光粒子 ---- */
  const inkParticles = Array.from({ length: 24 }, () => createInkParticle());

  function createInkParticle() {
    const isGold = Math.random() < 0.25;
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 70 + 30,
      vx:    (Math.random() - 0.5) * 0.16,
      vy:    (Math.random() - 0.5) * 0.16,
      alpha: Math.random() * 0.11 + 0.02,
      color: isGold ? [201,168,76] : [60,35,20],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.003 + Math.random() * 0.004
    };
  }

  /* ---- 落叶粒子 ---- */
  const LEAF_COUNT = 14;
  const leaves = Array.from({ length: LEAF_COUNT }, () => createLeaf(true));

  function createLeaf(scattered) {
    const colorRgb = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    return {
      x:          Math.random() * (canvas.width || window.innerWidth),
      y:          scattered
                    ? Math.random() * (canvas.height || window.innerHeight)
                    : -20 - Math.random() * 80,
      size:       6 + Math.random() * 9,
      vx:         (Math.random() - 0.5) * 0.6,
      vy:         0.6 + Math.random() * 1.4,
      rotation:   Math.random() * Math.PI * 2,
      rotSpeed:   (Math.random() - 0.5) * 0.035,
      wobble:     Math.random() * Math.PI * 2,
      wobbleAmp:  0.3 + Math.random() * 0.5,
      wobbleSpd:  0.012 + Math.random() * 0.018,
      color:      colorRgb,
      alpha:      0.35 + Math.random() * 0.45
    };
  }

  /* ---- 画叶片 ---- */
  function drawLeaf(ctx, leaf) {
    const { x, y, size, rotation, color, alpha } = leaf;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo( size * 0.65, -size * 0.4,  size * 0.65,  size * 0.4, 0,  size);
    ctx.bezierCurveTo(-size * 0.65,  size * 0.4, -size * 0.65, -size * 0.4, 0, -size);
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    ctx.fill();

    /* 叶脉 */
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.8);
    ctx.lineTo(0,  size * 0.8);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    ctx.restore();
  }

  /* ---- 主绘制循环 ---- */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* 水墨粒子 */
    inkParticles.forEach(p => {
      p.pulse += p.pulseSpeed;
      const r     = p.r * (1 + 0.08 * Math.sin(p.pulse));
      const alpha = p.alpha * (0.85 + 0.15 * Math.sin(p.pulse + 1));
      const [R,G,B] = p.color;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      grad.addColorStop(0,   `rgba(${R},${G},${B},${alpha})`);
      grad.addColorStop(0.5, `rgba(${R},${G},${B},${alpha * 0.35})`);
      grad.addColorStop(1,   `rgba(${R},${G},${B},0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      p.x += p.vx; p.y += p.vy;
      if (p.x < -p.r)              p.x = canvas.width  + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;
      if (p.y < -p.r)              p.y = canvas.height + p.r;
      if (p.y > canvas.height + p.r) p.y = -p.r;
    });

    /* 落叶 */
    leaves.forEach((leaf, i) => {
      leaf.wobble += leaf.wobbleSpd;
      leaf.x       += leaf.vx + Math.sin(leaf.wobble) * leaf.wobbleAmp;
      leaf.y       += leaf.vy;
      leaf.rotation += leaf.rotSpeed;

      drawLeaf(ctx, leaf);

      /* 飘出屏幕后从顶部重生 */
      if (leaf.y > canvas.height + 30 ||
          leaf.x < -60 || leaf.x > canvas.width + 60) {
        leaves[i] = createLeaf(false);
      }
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

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* 监听全局点击 */
  document.addEventListener('click', e => {
    spawnClickEffect(e.clientX, e.clientY);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* 过滤失效粒子 */
    clickEffects = clickEffects.filter(p => p.alpha > 0.008);

    clickEffects.forEach(p => {
      if (p.type === 'ripple') {
        /* 扩散水墨圆环 */
        p.r     += 2.2;
        p.alpha *= 0.91;
        if (p.r <= p.maxR) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${p.color},${p.alpha})`;
          ctx.lineWidth   = 1.5;
          ctx.stroke();
        }
      } else if (p.type === 'inkDot') {
        /* 飞溅墨滴 */
        p.x    += p.vx;
        p.y    += p.vy;
        p.vx   *= p.decay;
        p.vy   *= p.decay;
        p.vy   += 0.05; // 重力
        p.alpha *= 0.93;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      } else if (p.type === 'sparkle') {
        /* 金色亮点 */
        p.x    += p.vx;
        p.y    += p.vy;
        p.vy   += 0.08;
        p.alpha *= 0.90;
        p.r    *= 0.97;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot += p.rotSpeed);
        /* 小菱形 */
        ctx.beginPath();
        ctx.moveTo(0, -p.r * 1.6);
        ctx.lineTo(p.r * 0.6, 0);
        ctx.lineTo(0, p.r * 1.6);
        ctx.lineTo(-p.r * 0.6, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(${p.color},1)`;
        ctx.fill();
        ctx.restore();
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

function spawnClickEffect(cx, cy) {
  /* 两圈水墨波纹 */
  for (let ring = 0; ring < 2; ring++) {
    const baseAlpha = ring === 0 ? 0.55 : 0.3;
    const delay = ring * 120;
    const colorStr = ring === 0 ? '201,168,76' : '181,38,30';
    setTimeout(() => {
      clickEffects.push({
        type: 'ripple', x: cx, y: cy,
        r: 3, maxR: 48 + ring * 20,
        alpha: baseAlpha,
        color: colorStr
      });
    }, delay);
  }

  /* 墨滴飞溅（8-12个） */
  const count = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.6;
    const speed = 2.5 + Math.random() * 3.5;
    const rnd   = Math.random();
    const color = rnd < 0.45 ? '181,38,30' :
                  rnd < 0.75 ? '201,168,76' :
                               '220,195,150';
    clickEffects.push({
      type: 'inkDot',
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      r: 2.5 + Math.random() * 2,
      alpha: 0.75 + Math.random() * 0.25,
      color,
      decay: 0.90
    });
  }

  /* 金色亮星（3-5个） */
  const sparkCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < sparkCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 3;
    clickEffects.push({
      type: 'sparkle',
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      r: 3 + Math.random() * 3,
      alpha: 0.9,
      color: '240,208,120',
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.2
    });
  }
}

/* ================================================================
   启动
================================================================ */
(function boot() {
  initIntro();
  initBgCanvas();
  initFxCanvas();
  render();
  updateClock();
  setInterval(updateClock, 1000);
})();
