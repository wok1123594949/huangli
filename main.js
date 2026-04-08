'use strict';

/* =============================================
   黄历数据
   ============================================= */
const HEAVENLY_STEMS   = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const EARTHLY_BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ZODIACS          = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const NAYIN = [
  '海中金','炉中火','大林木','路旁土','剑锋金','山头火',
  '涧下水','城头土','白蜡金','杨柳木','泉中水','屋上土',
  '霹雳火','松柏木','长流水','砂中金','山下火','平地木',
  '壁上土','金箔金','覆灯火','天河水','大驿土','钗钏金',
  '桑柘木','大溪水','沙中土','天上火','石榴木','大海水',
];
const JIANCHU = ['建','除','满','平','定','执','破','危','成','收','开','闭'];
const JIANCHU_YI = {
  '建':['出行','上任','祭祀','求财'],
  '除':['沐浴','扫舍','祈福','求医'],
  '满':['纳财','开市','婚嫁','移徙'],
  '平':['修造','动土','出行','安床'],
  '定':['出行','订盟','祭祀','安葬'],
  '执':['祭祀','斋醮','收债','捕捉'],
  '破':['破屋','坏垣','余事勿取'],
  '危':['安床','祭祀','出行','沐浴'],
  '成':['嫁娶','移徙','开市','纳财'],
  '收':['收账','纳财','捕捉','猎取'],
  '开':['开市','出行','嫁娶','移徙','动土'],
  '闭':['筑堤','塞穴','合房','补垣'],
};
const JIANCHU_JI = {
  '建':['安葬','破土','动土'],
  '除':['嫁娶','移徙'],
  '满':['祭祀','出行'],
  '平':['葬礼'],
  '定':['开市','动土','破土'],
  '执':['嫁娶','开市','移徙'],
  '破':['万事不宜'],
  '危':['登高','涉水'],
  '成':['诉讼','词讼'],
  '收':['开市','嫁娶','移徙'],
  '开':['安葬','动土','破土'],
  '闭':['开市','出行','嫁娶'],
};
const LUCK_LEVEL = {
  '建':3,'除':4,'满':3,'平':3,'定':4,'执':2,'破':1,'危':2,'成':5,'收':3,'开':4,'闭':2
};
const LUCK_TEXT  = { 1:'凶', 2:'小凶', 3:'平', 4:'吉', 5:'大吉' };

const SHICHEN_NAMES  = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SHICHEN_TIMES  = ['23-01','01-03','03-05','05-07','07-09','09-11','11-13','13-15','15-17','17-19','19-21','21-23'];
const DEITY_CYCLE    = ['青龙','明堂','天刑','朱雀','金匮','天德','白虎','玉堂','天牢','玄武','司命','勾陈'];
const LUCKY_DEITIES  = new Set(['青龙','明堂','金匮','天德','玉堂','司命']);

const PENG_ZU_STEM   = ['甲不开仓财物耗散','乙不栽植千株不长','丙不修灶必见灾殃','丁不剃头头必生疮','戊不受田田主不祥','己不破券二比并亡','庚不经络织机虚张','辛不合酱主人不尝','壬不泱水更难提防','癸不词讼理弱敌强'];
const PENG_ZU_BRANCH = ['子不问卜自惹祸殃','丑不冠带主不还乡','寅不祭祀神鬼不尝','卯不穿井水泉不香','辰不哭泣必主重丧','巳不远行财物伏藏','午不苫盖屋主更张','未不服药毒气入肠','申不安床鬼祟入房','酉不会客醉坐颠狂','戌不吃犬作怪上床','亥不嫁娶不利新郎'];

const SOLAR_TERMS = [
  {month:1,  day:6,  name:'小寒'},{month:1,  day:20, name:'大寒'},
  {month:2,  day:4,  name:'立春'},{month:2,  day:19, name:'雨水'},
  {month:3,  day:6,  name:'惊蛰'},{month:3,  day:21, name:'春分'},
  {month:4,  day:5,  name:'清明'},{month:4,  day:20, name:'谷雨'},
  {month:5,  day:6,  name:'立夏'},{month:5,  day:21, name:'小满'},
  {month:6,  day:6,  name:'芒种'},{month:6,  day:21, name:'夏至'},
  {month:7,  day:7,  name:'小暑'},{month:7,  day:23, name:'大暑'},
  {month:8,  day:7,  name:'立秋'},{month:8,  day:23, name:'处暑'},
  {month:9,  day:8,  name:'白露'},{month:9,  day:23, name:'秋分'},
  {month:10, day:8,  name:'寒露'},{month:10, day:23, name:'霜降'},
  {month:11, day:7,  name:'立冬'},{month:11, day:22, name:'小雪'},
  {month:12, day:7,  name:'大雪'},{month:12, day:22, name:'冬至'},
];

/* =============================================
   密室攻略数据
   x/y 为相对坐标(0-1)，左上角为(0,0)
   ============================================= */
const MISHI_DATA_ERANGEL = [
  {
    id: 1, name: '斯塔伯尔庇护所', area: '斯塔伯尔西北', grid: 'FI',
    x: 0.688, y: 0.063, risk: '低',
    entry: '找到地下入口木质障碍，射击/手雷破坏后下楼梯，或使用密室钥匙开启金属门',
    loot:  '三级头盔、三级甲、AWM 概率约 60%、大量医疗包',
    tip:   '地处偏远，第三方干扰少，适合开局单人速刷，然后向南旋转圈',
  },
  {
    id: 2, name: '乔治波西北密室', area: '乔治波西北海岸', grid: 'BJ',
    x: 0.188, y: 0.188, risk: '中',
    entry: '海岸仓库地下室，木质隔断可用燃烧瓶静默破坏（约 8-10 秒），减少音频暴露',
    loot:  '三级头盔、三级甲、Groza 概率约 55%、肾上腺素',
    tip:   '乔治波人多，建议等第一波交火结束后再进，留意建筑二楼有人守点',
  },
  {
    id: 3, name: '塞韦尔尼南密室', area: '塞韦尔尼南部', grid: 'EJ',
    x: 0.563, y: 0.188, risk: '低',
    entry: '独立小建筑地下室，密室钥匙开启金属门（消耗钥匙）',
    loot:  '三级装备、M249 概率约 40%、急救包',
    tip:   '热门航线较少经过此处，早期物资良好，可与斯塔伯尔形成北线刷取路线',
  },
  {
    id: 4, name: '塔斯纳卡东密室', area: '塔斯纳卡东部', grid: 'GK',
    x: 0.813, y: 0.313, risk: '低',
    entry: '农场建筑群东侧地下入口，障碍可用载具撞击破坏',
    loot:  '三级装备、AWM / Groza 随机一把、大量医疗物资',
    tip:   '东部地图边缘，人流量少，获取物资后南下走海岸线旋转效率高',
  },
  {
    id: 5, name: '乔治波东密室', area: '乔治波东部', grid: 'CK',
    x: 0.313, y: 0.313, risk: '中',
    entry: '乔治波东侧仓库群，金属门需密室钥匙，木门可射击破坏',
    loot:  '三级装备、Groza 概率约 55%、肾上腺素 × 2-3',
    tip:   '乔治波与中央之间的过渡区，适合先刷乔治波西北密室再绕行至此',
  },
  {
    id: 6, name: '博物馆西密室', area: '博物馆西侧', grid: 'FL',
    x: 0.688, y: 0.438, risk: '低',
    entry: '博物馆建筑西翼地下室，使用密室钥匙或燃烧瓶破坏木质屏障',
    loot:  '三级头盔、三级甲、AWM 概率约 60%、急救包',
    tip:   '天然掩体多，博物馆建筑提供良好防御，进出路线规划好可实现零伤入场',
  },
  {
    id: 7, name: '医院南密室', area: '医院南侧', grid: 'BL',
    x: 0.188, y: 0.438, risk: '中',
    entry: '医院南侧地下入口，钥匙开启或射击破坏木质门（声音约 100m 可听见）',
    loot:  '三级装备、Groza / M249 随机、高密度医疗物资',
    tip:   '医院刷新大量钥匙，先在医院收集钥匙再进密室效率极高',
  },
  {
    id: 8, name: '波钦基西北密室', area: '波钦基西北', grid: 'CL',
    x: 0.313, y: 0.438, risk: '高',
    entry: '波钦基地下室入口位于西北建筑群，钥匙刷新率全图最高，需优先争夺',
    loot:  '三级头盔、三级甲、AWM 概率约 60%、Groza 概率约 55%、肾上腺素',
    tip:   '全图人流量最高的密室。进入前务必清除周边威胁，并在门口预设防守位',
  },
  {
    id: 9, name: '农场西密室', area: '农场西部', grid: 'EM',
    x: 0.563, y: 0.563, risk: '中',
    entry: '农场西侧独立房屋地下室，燃烧瓶静默进入最为推荐',
    loot:  '三级装备、M249 概率约 40%、急救包 × 3-4',
    tip:   '农场刷新大量钥匙，可结合波钦基密室规划中央双密室路线（约 90 秒完成）',
  },
  {
    id: 10, name: '水电站东密室', area: '水电站东部', grid: 'GM',
    x: 0.813, y: 0.563, risk: '中',
    entry: '水电站东侧建筑地下室，钥匙开启或射击破坏木质门',
    loot:  '三级装备、AWM 概率约 60%、大量医疗物资',
    tip:   '适合从东侧海岸路线推进，水电站周围视野开阔，注意提前排查建筑',
  },
  {
    id: 11, name: '渡轮码头北密室', area: '渡轮码头北部', grid: 'CN',
    x: 0.313, y: 0.688, risk: '低',
    entry: '码头附近地下室，木质障碍可用载具静默撞击破坏',
    loot:  '三级装备、Groza / M249 随机一把、医疗物资',
    tip:   '沿海位置，水路旋转方便，适合单人沿海岸线串联多个低危密室',
  },
  {
    id: 12, name: '普里莫尔斯克西北密室', area: '普里莫尔斯克西北', grid: 'BN',
    x: 0.188, y: 0.688, risk: '低',
    entry: '海岸建筑地下室，密室钥匙开启（钥匙一次性消耗）',
    loot:  '三级装备、AWM 概率约 60%、肾上腺素',
    tip:   '地图南部边缘，后期圈位可能不利，务必提前确认安全区再前往',
  },
  {
    id: 13, name: '军事基地北密室', area: '军事基地北区岛', grid: 'EN',
    x: 0.563, y: 0.688, risk: '高',
    entry: '军事基地北侧建筑地下入口，钥匙在营房高密度刷新',
    loot:  '三级头盔、三级甲、AWM + Groza 双概率、肾上腺素 × 3',
    tip:   '军事基地三密室中风险最低，可作为基地落点后第一优先目标',
  },
  {
    id: 14, name: '军事基地西密室', area: '军事基地西区岛', grid: 'EO',
    x: 0.500, y: 0.813, risk: '高',
    entry: '军事基地西侧建筑地下室，需先控制西侧制高点确保安全再进入',
    loot:  '三级装备、Groza 概率约 55%、M249 概率约 40%、大量医疗包',
    tip:   '需配合北密室一起争夺，建议队伍两人掩护一人刷取，分工明确',
  },
  {
    id: 15, name: '军事基地东密室', area: '军事基地东区岛', grid: 'FO',
    x: 0.688, y: 0.813, risk: '高',
    entry: '军事基地东侧建筑地下室，AWM / Groza 刷新率全图最高',
    loot:  '三级头盔、三级甲、AWM 概率 ~60%、Groza 概率 ~55%、肾上腺素',
    tip:   '军事基地最佳战利品密室，但也是争夺最激烈的区域，需 4 人队伍协同',
  },
];

/* ——— 泰戈地图 12 处密室 ——— */
const MISHI_DATA_TAEGO = [
  {
    id: 1, name: '터미널 지하 벙커', area: '航站楼地下', grid: 'D3',
    x: 0.46, y: 0.17, risk: '中',
    entry: '航站楼主楼北侧地下入口，射击木质障碍或使用密室钥匙开启',
    loot:  '三级头盔、三级甲、Mk12 / K2 随机、肾上腺素',
    tip:   '航站楼人流量大，建议先清楚二楼，再下地下室，提防背刺',
  },
  {
    id: 2, name: '부두 동쪽 창고', area: '釜山码头东仓库', grid: 'G4',
    x: 0.81, y: 0.39, risk: '高',
    entry: '码头东侧大型仓库地下室，金属门需密室钥匙，木质隔断可射击破坏',
    loot:  '三级装备、Mk12 概率 ~65%、Groza、大量医疗包',
    tip:   '釜山码头全图最热点区域之一，团队需多人协同清点后方可安全进入',
  },
  {
    id: 3, name: '화성 외곽 벙커', area: '华城西北郊', grid: 'C3',
    x: 0.34, y: 0.24, risk: '低',
    entry: '独立农仓地下室，燃烧瓶静默破坏木质障碍（约 8 秒）',
    loot:  '三级装备、K2 概率 ~45%、急救包',
    tip:   '偏远地带人少，适合单人快速刷取，然后向中央华城旋转',
  },
  {
    id: 4, name: '서북 해안 벙커', area: '西北海岸', grid: 'B2',
    x: 0.11, y: 0.19, risk: '低',
    entry: '海岸悬崖下方地下入口，使用密室钥匙开启金属门',
    loot:  '三级装备、Mk12 / M249 随机、肾上腺素',
    tip:   '位于地图边缘，第三方干扰极少，推荐水路旋转上岸后直接进入',
  },
  {
    id: 5, name: '서부 사원 지하', area: '西部寺庙', grid: 'B5',
    x: 0.13, y: 0.47, risk: '低',
    entry: '寺庙后院地下室，木质隔断可载具静默撞击破坏',
    loot:  '三级装备、K2 概率 ~40%、急救包 × 3',
    tip:   '寺庙提供天然掩体，进出安全，适合中线整补点',
  },
  {
    id: 6, name: '중앙 하천 섬', area: '中央河心岛', grid: 'D5',
    x: 0.38, y: 0.50, risk: '中',
    entry: '需游泳或载具渡河到达小岛，岛上建筑地下室用密室钥匙开启',
    loot:  '三级头盔、三级甲、Mk12 + Groza 双概率',
    tip:   '四面环水，进出皆需过河，视野开阔，注意来自河岸的狙击',
  },
  {
    id: 7, name: '학교 남쪽 밀실', area: '学校南侧', grid: 'E7',
    x: 0.57, y: 0.73, risk: '高',
    entry: '学校南侧建筑地下室，金属门需密室钥匙',
    loot:  '三级装备、Mk12 概率 ~65%、肾上腺素 × 2-3',
    tip:   '学校与监狱之间高度争夺，进入前务必清除学校内所有威胁',
  },
  {
    id: 8, name: '감옥 동쪽 밀실', area: '监狱东翼', grid: 'F7',
    x: 0.71, y: 0.65, risk: '高',
    entry: '监狱东翼地下牢房改造密室，射击或手雷破坏木质大门',
    loot:  '三级头盔、三级甲、Mk12 + K2 双概率、肾上腺素',
    tip:   '监狱区争夺激烈，建议落点监狱屋顶先掌控制高权',
  },
  {
    id: 9, name: '서남 마을 창고', area: '西南村落', grid: 'B7',
    x: 0.17, y: 0.78, risk: '低',
    entry: '村落谷仓地下室，木质障碍可用燃烧瓶静默破坏',
    loot:  '三级装备、Groza / K2 随机、急救包',
    tip:   '西南边缘，人流量少，圈小时物资丰厚但撤退路线受限，提前规划旋转',
  },
  {
    id: 10, name: '부두 남쪽 고지', area: '码头南侧高地', grid: 'G6',
    x: 0.72, y: 0.56, risk: '中',
    entry: '高地独立建筑地下室，密室钥匙开启或燃烧瓶破坏',
    loot:  '三级装备、Mk12 概率 ~50%、大量医疗物资',
    tip:   '高地视野极佳，进入后先架枪控制周边再打开密室',
  },
  {
    id: 11, name: '동북 산지 벙커', area: '东北山地', grid: 'G3',
    x: 0.69, y: 0.24, risk: '低',
    entry: '山地岩石掩体旁地下室，使用密室钥匙开启',
    loot:  '三级装备、M249 概率 ~40%、急救包',
    tip:   '地形复杂，第三方难以接近，适合开局抢占后静候时机',
  },
  {
    id: 12, name: '중앙 막사', area: '中央军营', grid: 'E5',
    x: 0.50, y: 0.57, risk: '中',
    entry: '军营主楼地下指挥室，金属门需密室钥匙',
    loot:  '三级头盔、三级甲、Mk12 概率 ~60%、肾上腺素',
    tip:   '全图中央，旋转最灵活，但也是各路队伍必争之地',
  },
];

/* ——— 荣都地图 4 处密室（共享密室钥匙机制）——— */
const MISHI_DATA_RONDO = [
  {
    id: 1, name: '북부 공장 지하', area: '北部工厂', grid: 'D2',
    x: 0.39, y: 0.23, risk: '高',
    entry: '工厂主楼地下室，开启任意一处密室后其余三处同时解锁（荣都独特机制）',
    loot:  '三级头盔、三级甲、ACE32 / FAMAS 高概率、肾上腺素 × 3',
    tip:   '四处密室同步开启，适合 4 人分散同时刷取，效率极高',
  },
  {
    id: 2, name: '동부 항구 창고', area: '东部港口', grid: 'G5',
    x: 0.70, y: 0.49, risk: '高',
    entry: '港口大型仓库地下室，密室钥匙开启后其余三处同步开放',
    loot:  '三级装备、ACE32 概率 ~70%、大量医疗包',
    tip:   '港口地形开阔，进入前需彻底清场，留人把风',
  },
  {
    id: 3, name: '남부 상업지구', area: '南部商业街', grid: 'D7',
    x: 0.43, y: 0.74, risk: '中',
    entry: '商业街地下停车场改造密室，需密室钥匙',
    loot:  '三级装备、FAMAS 概率 ~55%、肾上腺素',
    tip:   '商业街掩体多，但街道纵横容易被侧击，保持小组阵型',
  },
  {
    id: 4, name: '서부 주택가 지하', area: '西部住宅区', grid: 'B5',
    x: 0.22, y: 0.52, risk: '低',
    entry: '住宅区地下室，与其他三处共享解锁状态',
    loot:  '三级装备、ACE32 / FAMAS 随机、急救包 × 4',
    tip:   '西部相对安静，适合单人先行开启密室后通知队友',
  },
];

/* ——— 地图总配置 ——— */
const MAPS_CONFIG = {
  erangel: {
    id: 'erangel',
    name: '艾伦格',
    tileUrl: 'https://tile.nooblog.top/tile/Erangel/{z}/{x}/{y}.webp',
    subtitle: '艾伦格 · 15 处秘密地下室',
    rooms: MISHI_DATA_ERANGEL,
  },
  taego: {
    id: 'taego',
    name: '泰 戈',
    tileUrl: 'https://tile.nooblog.top/tile/Taego/{z}/{x}/{y}.webp',
    subtitle: '泰戈 · 12 处秘密地下室',
    rooms: MISHI_DATA_TAEGO,
  },
  rondo: {
    id: 'rondo',
    name: '荣 都',
    tileUrl: 'https://tile.nooblog.top/tile/Rondo/{z}/{x}/{y}.webp',
    subtitle: '荣都 · 4 处密室（共享解锁）',
    rooms: MISHI_DATA_RONDO,
  },
};

/* 圣杯消息池 */
const BEI_MESSAGES = {
  sheng: [
    '神明允准，此事可为，放手去做',
    '时机已至，大可前行，前途光明',
    '心诚则灵，神明点头，好运随行',
    '诸事顺遂，迎难而上，必有所成',
    '吉祥如意，勇往直前，神明庇护',
  ],
  xiao: [
    '神明欢笑，心念未诚，再掷一次',
    '缘分未到，静心再问，耐心等候',
    '天机未现，诚心礼拜，重新一问',
    '神明有意，心念不定，平心静气',
  ],
  yin: [
    '神明摇头，此事暂缓，三思而行',
    '时机未至，另觅他途，静候良机',
    '此路不通，宜换方向，转机自来',
    '稍安勿躁，暂时搁置，待时而动',
    '慎重行事，不可操之过急，再观其变',
  ],
};

const BEI_NAMES = { sheng:'◯ 圣杯', xiao:'◑ 笑杯', yin:'● 阴杯' };
const BEI_ICONS = { sheng:'🌕', xiao:'🌗', yin:'🌑' };

/* =============================================
   干支 & 黄历计算
   ============================================= */
function getJDN(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr
    + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
}

function getYearGanzhi(year) {
  const base = 4; // 甲子年 = 公元4年
  const idx  = ((year - base) % 60 + 60) % 60;
  return HEAVENLY_STEMS[idx % 10] + EARTHLY_BRANCHES[idx % 12];
}

function getMonthGanzhi(year, month) {
  const startStem = ((year - 4) % 5 + 5) % 5 * 2;
  const stemIdx   = (startStem + month - 1) % 10;
  const branchIdx = (month + 1) % 12;
  return HEAVENLY_STEMS[stemIdx] + EARTHLY_BRANCHES[branchIdx];
}

function getDayGanzhi(date) {
  const jdn  = getJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const stem = ((jdn + 5) % 10 + 10) % 10;
  const bran = ((jdn + 3) % 12 + 12) % 12;
  return { gz: HEAVENLY_STEMS[stem] + EARTHLY_BRANCHES[bran], stem, bran };
}

function getNayin(gz60Index) {
  return NAYIN[Math.floor(gz60Index / 2)];
}

function getJianchu(dayBranchIdx, monthBranchIdx) {
  const offset = (dayBranchIdx - monthBranchIdx + 12) % 12;
  return JIANCHU[offset];
}

function getSolarTerm(month, day) {
  for (const t of SOLAR_TERMS) {
    if (t.month === month && Math.abs(t.day - day) <= 1) return t.name;
  }
  return null;
}

function getMoonPhase(date) {
  const refNewMoon = new Date(2000, 0, 6, 18, 14);
  const lunation   = 29.53058867;
  const diffDays   = (date - refNewMoon) / (1000 * 60 * 60 * 24);
  return ((diffDays % lunation) + lunation) % lunation;
}

function getMoonPhaseName(phase) {
  if (phase < 1.85)  return { name:'新月', emoji:'🌑', pct:0 };
  if (phase < 7.38)  return { name:'峨眉月', emoji:'🌒', pct:25 };
  if (phase < 9.22)  return { name:'上弦月', emoji:'🌓', pct:50 };
  if (phase < 14.77) return { name:'盈凸月', emoji:'🌔', pct:75 };
  if (phase < 16.61) return { name:'满月',   emoji:'🌕', pct:100 };
  if (phase < 22.15) return { name:'亏凸月', emoji:'🌖', pct:75 };
  if (phase < 23.99) return { name:'下弦月', emoji:'🌗', pct:50 };
  if (phase < 29.53) return { name:'残月',   emoji:'🌘', pct:25 };
  return { name:'新月', emoji:'🌑', pct:0 };
}

function renderMoon(phase) {
  const shadow = document.getElementById('moonShadow');
  if (!shadow) return;
  const pct = phase / 29.53;
  if (pct < 0.5) {
    shadow.style.left = '';
    shadow.style.right = '0';
    shadow.style.borderRadius = '50%';
    const sc = 2 - pct * 4;
    shadow.style.transform = `scaleX(${Math.max(0, sc)})`;
  } else {
    shadow.style.right = '';
    shadow.style.left  = '0';
    shadow.style.borderRadius = '50%';
    const sc = (pct - 0.5) * 4 - 1;
    shadow.style.transform = `scaleX(${Math.max(0, sc)})`;
  }
}

function getShichenInfo(dayBranchIdx) {
  return SHICHEN_NAMES.map((name, i) => {
    const deityIdx  = (i - dayBranchIdx + 12) % 12;
    const deity     = DEITY_CYCLE[deityIdx];
    const isLucky   = LUCKY_DEITIES.has(deity);
    return { name, time: SHICHEN_TIMES[i], deity, isLucky };
  });
}

function getCurrentShichenIdx(hour) {
  if (hour >= 23 || hour < 1)  return 0;
  return Math.floor((hour - 1) / 2) + 1;
}

/* =============================================
   渲染黄历
   ============================================= */
function render() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();

  // 日期基础
  document.getElementById('dayNumber').textContent = String(d).padStart(2, '0');
  document.getElementById('yearLabel').textContent  = `${y}年${m}月`;

  // 农历日期
  const lunarFmt = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long', day: 'numeric' });
  document.getElementById('lunarDate').textContent = '农历 ' + lunarFmt.format(today);

  // 干支
  const yearGZ  = getYearGanzhi(y);
  const monthGZ = getMonthGanzhi(y, m);
  const dayData = getDayGanzhi(today);
  const { gz: dayGZ, stem: dayStemIdx, bran: dayBranIdx } = dayData;

  const zodiac = ZODIACS[((y - 4) % 12 + 12) % 12];
  const rowEl  = document.getElementById('ganzhiRow');
  rowEl.innerHTML = '';
  [
    `${yearGZ}年【${zodiac}】`,
    `${monthGZ}月`,
    `${dayGZ}日`,
  ].forEach(txt => {
    const sp = document.createElement('span');
    sp.className = 'gz-item';
    sp.textContent = txt;
    rowEl.appendChild(sp);
  });

  // 节气
  const term  = getSolarTerm(m, d);
  const badge = document.getElementById('jieqiBadge');
  if (term) {
    badge.textContent = term;
    badge.classList.add('visible');
    requestAnimationFrame(() => { badge.style.opacity = '1'; });
  }
  document.getElementById('jieqiInfo').textContent = term || '无';

  // 建除
  const monthBranIdx = ((m + 1) % 12);
  const jianchu      = getJianchu(dayBranIdx, monthBranIdx);

  document.getElementById('yiList').innerHTML = '';
  document.getElementById('jiList').innerHTML  = '';
  (JIANCHU_YI[jianchu] || []).forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tag yi-tag';
    el.textContent = t;
    el.style.animationDelay = `${i * 0.07}s`;
    document.getElementById('yiList').appendChild(el);
  });
  (JIANCHU_JI[jianchu] || []).forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tag ji-tag';
    el.textContent = t;
    el.style.animationDelay = `${i * 0.07}s`;
    document.getElementById('jiList').appendChild(el);
  });

  // 纳音
  const gz60 = ((dayStemIdx % 10) + (dayBranIdx % 12 < 0 ? 12 : 0));
  const gz60i = (dayStemIdx * 6 + Math.floor(dayBranIdx / 2)) % 30;
  document.getElementById('wuxing').textContent = NAYIN[gz60i] || NAYIN[0];

  // 冲煞
  const chongBranIdx = (dayBranIdx + 6) % 12;
  document.getElementById('chong').textContent = `冲${ZODIACS[chongBranIdx]}（${EARTHLY_BRANCHES[chongBranIdx]}）`;

  // 值神 & 运势
  document.getElementById('zhishen').textContent = jianchu;
  const luckVal = LUCK_LEVEL[jianchu] || 3;
  document.getElementById('luck').textContent = LUCK_TEXT[luckVal];

  // 月相
  const phase    = getMoonPhase(today);
  const phaseObj = getMoonPhaseName(phase);
  document.getElementById('moonName').textContent = `${phaseObj.emoji} ${phaseObj.name}`;
  document.getElementById('moonAge').textContent  = `月龄 ${phase.toFixed(1)} 天`;
  renderMoon(phase);

  // 彭祖
  document.getElementById('pengzuStem').textContent   = PENG_ZU_STEM[dayStemIdx];
  document.getElementById('pengzuBranch').textContent = PENG_ZU_BRANCH[dayBranIdx];

  // 十二时辰
  renderShichenGrid(dayBranIdx);
}

function renderShichenGrid(dayBranIdx) {
  const grid     = document.getElementById('shichenGrid');
  const items    = getShichenInfo(dayBranIdx);
  const hour     = new Date().getHours();
  const curIdx   = getCurrentShichenIdx(hour);
  grid.innerHTML = '';
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'shichen-item' +
      (item.isLucky ? ' lucky' : ' unlucky') +
      (i === curIdx ? ' current' : '');
    el.innerHTML = `
      <div class="sh-name">${item.name}</div>
      <div class="sh-deity">${item.deity}</div>
      <div class="sh-luck ${item.isLucky ? 'l' : 'u'}">${item.isLucky ? '吉' : '凶'}</div>
    `;
    grid.appendChild(el);
  });
}

function updateClock() {
  const now    = new Date();
  const h      = String(now.getHours()).padStart(2, '0');
  const mn     = String(now.getMinutes()).padStart(2, '0');
  const s      = String(now.getSeconds()).padStart(2, '0');
  const hour   = now.getHours();
  const scIdx  = getCurrentShichenIdx(hour);
  const scName = SHICHEN_NAMES[scIdx];
  document.getElementById('clockTime').textContent    = `${h}:${mn}:${s}`;
  document.getElementById('clockShichen').textContent = `${scName}时`;
  setTimeout(updateClock, 1000);
}

/* =============================================
   Tab 切换
   ============================================= */
function initTabs() {
  const tabs      = document.querySelectorAll('.tab-btn');
  const panels    = document.querySelectorAll('.panel');
  const indicator = document.getElementById('tabIndicator');

  const INDICATOR_CLASSES = ['', 'mid', 'right'];

  function switchTab(btn) {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('panel-' + btn.dataset.tab);
    if (target) target.classList.add('active');
    // 移动指示条（支持三挡）
    const idx = Array.from(tabs).indexOf(btn);
    indicator.className = 'tab-indicator' + (INDICATOR_CLASSES[idx] ? ' ' + INDICATOR_CLASSES[idx] : '');
    // 切入密室面板时初始化 / 刷新 Leaflet（需 DOM 可见）
    if (btn.dataset.tab === 'mishi') {
      requestAnimationFrame(() => {
        if (!mishiLeaflet) buildLeafletMap(mishiCurrentMap);
        else mishiLeaflet.invalidateSize();
      });
    }
  }

  tabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn)));
}

/* =============================================
   圣杯功能
   ============================================= */
let throwHistory = [];
let isThrowBusy  = false;

function getRandMsg(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 动画分两层：
 *  scene（bei-scene）负责上下飞弧 + 轻微倾斜，不影响 3D 翻面
 *  card（bei-card）  负责 rotateY 翻面，决定阳/阴
 */
async function animateBeiCard(scene, card, isYang, delay = 0) {
  // 先取消上次 fill:forwards 动画，再重置到阳面起始位
  card.getAnimations().forEach(a => a.cancel());
  card.style.transform = 'rotateY(0deg)';

  // 等待 delay + 2帧，确保浏览器已应用初始 transform
  await new Promise(r => setTimeout(r, delay));
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  const endY   = isYang ? 1440 : 1620; // 4×360=阳，4.5×360=阴
  const lift   = 72 + Math.random() * 28;
  const tiltZ  = (Math.random() - 0.5) * 22;
  const DUR    = 1650;

  // scene 动画：飞弧（translateY + 轻微 rotateZ 晃动）
  scene.animate([
    { transform: 'translateY(0px) rotateZ(0deg) scale(1)' },
    { transform: `translateY(-${lift * 0.55}px) rotateZ(${tiltZ * 0.5}deg) scale(1.06)`, offset: 0.22 },
    { transform: `translateY(-${lift}px) rotateZ(${tiltZ}deg) scale(1.1)`,               offset: 0.45 },
    { transform: `translateY(-${lift * 0.3}px) rotateZ(${tiltZ * 0.3}deg) scale(1.03)`, offset: 0.72 },
    { transform: `translateY(7px) rotateZ(0deg) scale(.97)`,                              offset: 0.9 },
    { transform: 'translateY(0px) rotateZ(0deg) scale(1)' },
  ], { duration: DUR, easing: 'cubic-bezier(.25,.46,.45,.94)' });

  // card 动画：纯 rotateY 翻面（不混入其他轴）
  return new Promise(resolve => {
    const anim = card.animate([
      { transform: 'rotateY(0deg)' },
      { transform: `rotateY(${endY}deg)` },
    ], {
      duration: DUR,
      easing: 'cubic-bezier(.12,.6,.3,1)',
      fill: 'forwards',
    });
    anim.onfinish = resolve;
  });
}

async function doThrow() {
  if (isThrowBusy) return;
  isThrowBusy = true;

  const btn    = document.getElementById('throwBtn');
  const result = document.getElementById('beiResult');
  const scene1 = document.getElementById('beiScene1');
  const scene2 = document.getElementById('beiScene2');
  const card1  = document.getElementById('beiCard1');
  const card2  = document.getElementById('beiCard2');

  btn.disabled = true;
  result.classList.add('hidden');

  // 提前确定随机结果
  const r1 = Math.random() < 0.5 ? 'yang' : 'yin';
  const r2 = Math.random() < 0.5 ? 'yang' : 'yin';

  // 并行动画（card2 延后 200ms，更自然）
  await Promise.all([
    animateBeiCard(scene1, card1, r1 === 'yang', 0),
    animateBeiCard(scene2, card2, r2 === 'yang', 200),
  ]);

  // 判断结果
  let fateType;
  if (r1 !== r2)           fateType = 'sheng';
  else if (r1 === 'yang')  fateType = 'xiao';
  else                     fateType = 'yin';

  // 展示结果
  document.getElementById('resultIcon').textContent = BEI_ICONS[fateType];
  const nameEl = document.getElementById('resultName');
  nameEl.textContent = BEI_NAMES[fateType];
  nameEl.className   = 'result-name ' + (fateType === 'yin' ? 'yin-r' : fateType);
  document.getElementById('resultMsg').textContent = getRandMsg(BEI_MESSAGES[fateType]);

  result.classList.remove('hidden');

  // 历史记录
  throwHistory.unshift({ type: fateType, time: new Date() });
  if (throwHistory.length > 7) throwHistory.pop();
  renderHistory();

  // 短暂延迟后解锁（下次掷杯时动画函数内部会重置杯筊）
  setTimeout(() => {
    btn.disabled = false;
    isThrowBusy  = false;
  }, 500);
}

function renderHistory() {
  const wrap = document.getElementById('historyDots');
  wrap.innerHTML = '';
  throwHistory.forEach((rec, i) => {
    const dot = document.createElement('div');
    dot.className = 'history-dot';
    dot.style.animationDelay = `${i * 0.05}s`;

    const mark = document.createElement('div');
    const typeClass = rec.type === 'yin' ? 'yin-r' : rec.type;
    mark.className = `dot-mark ${typeClass}`;
    const symbols = { sheng:'○', xiao:'◑', yin:'●' };
    mark.textContent = symbols[rec.type] || '?';

    const lbl = document.createElement('div');
    lbl.className = 'dot-label';
    const hr = rec.time.getHours().toString().padStart(2,'0');
    const mn = rec.time.getMinutes().toString().padStart(2,'0');
    lbl.textContent = `${hr}:${mn}`;

    dot.appendChild(mark);
    dot.appendChild(lbl);
    wrap.appendChild(dot);
  });
}

function initShengbei() {
  document.getElementById('throwBtn').addEventListener('click', doThrow);
}

/* =============================================
   开屏动画
   ============================================= */
function initIntro() {
  const intro = document.getElementById('intro');
  setTimeout(() => {
    intro.classList.add('hidden');
    document.body.classList.add('revealed');
  }, 2200);
}

/* =============================================
   背景画布（水墨粒子 + 落叶）
   ============================================= */
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const leaves    = [];

  const LEAF_COLORS = ['#c9a84c','#a07030','#8a5c1a','#7a4c10','#c0392b'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 水墨粒子
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * 1, y: Math.random() * 1,
      r: 0.5 + Math.random() * 1.8,
      a: 0.02 + Math.random() * 0.06,
      da: (Math.random() - 0.5) * 0.001,
      dx: (Math.random() - 0.5) * 0.0002,
      dy: -0.00005 - Math.random() * 0.0001,
    });
  }

  function mkLeaf() {
    return {
      x: 0.05 + Math.random() * 0.9,
      y: -0.05,
      r: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.03,
      dx: (Math.random() - 0.5) * 0.001,
      dy: 0.0004 + Math.random() * 0.0003,
      wobble: Math.random() * Math.PI * 2,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      alpha: 0.5 + Math.random() * 0.4,
    };
  }

  function drawLeaf(l) {
    const x = l.x * W;
    const y = l.y * H;
    ctx.save();
    ctx.globalAlpha = l.alpha;
    ctx.translate(x, y);
    ctx.rotate(l.rot);
    ctx.beginPath();
    ctx.moveTo(0, -l.r);
    ctx.bezierCurveTo(l.r * 1.2, -l.r * 0.6, l.r * 0.8, l.r * 0.4, 0, l.r);
    ctx.bezierCurveTo(-l.r * 0.8, l.r * 0.4, -l.r * 1.2, -l.r * 0.6, 0, -l.r);
    ctx.fillStyle = l.color;
    ctx.fill();
    ctx.restore();
  }

  let leafTimer = 0;

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // 粒子
    particles.forEach(p => {
      p.x  = (p.x + p.dx + 1) % 1;
      p.y  = (p.y + p.dy + 1) % 1;
      p.a  = Math.max(0.01, Math.min(0.12, p.a + p.da));
      if (p.a <= 0.01 || p.a >= 0.12) p.da *= -1;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.a})`;
      ctx.fill();
    });

    // 落叶
    leafTimer++;
    if (leafTimer % 90 === 0) leaves.push(mkLeaf());
    if (leaves.length > 22) leaves.splice(0, 1);

    leaves.forEach((l, i) => {
      l.wobble += 0.04;
      l.x  += l.dx + Math.sin(l.wobble) * 0.0005;
      l.y  += l.dy;
      l.rot += l.drot;
      if (l.y > 1.1) leaves.splice(i, 1);
      drawLeaf(l);
    });

    requestAnimationFrame(frame);
  }
  frame();
}

/* =============================================
   点击特效画布
   ============================================= */
function initFxCanvas() {
  const canvas = document.getElementById('fxCanvas');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const effects = [];

  window.spawnClickEffect = function(x, y) {
    // 墨晕
    effects.push({ type:'ripple', x, y, r:0, maxR:60+Math.random()*40, alpha:0.5, life:1 });
    // 墨滴
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 1.5 + Math.random() * 3;
      effects.push({
        type:'dot', x, y,
        vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1.5,
        r:  1.5 + Math.random() * 2,
        alpha: 0.7, life: 1,
      });
    }
    // 金色亮星
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 2 + Math.random() * 3;
      effects.push({
        type:'spark', x, y,
        vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 2,
        r:  1 + Math.random() * 1.5,
        alpha: 1, life: 1,
      });
    }
  };

  function fxFrame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = effects.length - 1; i >= 0; i--) {
      const e = effects[i];
      if (e.type === 'ripple') {
        e.r     += 3;
        e.alpha -= 0.022;
        e.life   = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${e.alpha})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      } else if (e.type === 'dot') {
        e.vy   += 0.15;
        e.x    += e.vx;
        e.y    += e.vy;
        e.alpha -= 0.03;
        e.life   = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60,40,10,${e.alpha})`;
        ctx.fill();
      } else if (e.type === 'spark') {
        e.vy   += 0.1;
        e.x    += e.vx;
        e.y    += e.vy;
        e.alpha -= 0.04;
        e.life   = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,180,80,${e.alpha})`;
        ctx.fill();
      }
      if (e.life <= 0) effects.splice(i, 1);
    }
    requestAnimationFrame(fxFrame);
  }
  fxFrame();
}

/* =============================================
   古筝音乐播放器
   ============================================= */
class GuzhengPlayer {
  constructor() {
    this._ctx     = null;
    this._reverb  = null;
    this._playing = false;
    this._timer   = null;
    this._scale   = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 784.00, 880.00];
  }
  _init() {
    if (this._ctx) return;
    this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    this._reverb = this._makeReverb(2.5);
  }
  _makeReverb(dur) {
    const sr  = this._ctx.sampleRate;
    const len = sr * dur;
    const buf = this._ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const conv = this._ctx.createConvolver();
    conv.buffer = buf;
    conv.connect(this._ctx.destination);
    return conv;
  }
  _pluck(freq, when, vol = 0.35) {
    const ctx = this._ctx;
    const osc = ctx.createOscillator();
    const tri = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = 'sine';
    tri.type = 'triangle';
    osc.frequency.setValueAtTime(freq, when);
    tri.frequency.setValueAtTime(freq * 2, when);
    const blend = ctx.createGain();
    blend.gain.value = 0.15;
    tri.connect(blend);
    blend.connect(g);
    osc.connect(g);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, when + 1.8);
    g.connect(this._reverb);
    g.connect(ctx.destination);
    osc.start(when); osc.stop(when + 2);
    tri.start(when); tri.stop(when + 2);
  }
  _schedule() {
    if (!this._playing) return;
    const now = this._ctx.currentTime;
    const patterns = [
      [0,2,4,7], [1,3,5,8], [0,4,6,9], [2,5,7,0], [4,6,8,1],
    ];
    const pat = patterns[Math.floor(Math.random() * patterns.length)];
    let t = now;
    pat.forEach(idx => {
      const freq = this._scale[idx] * (Math.random() > 0.85 ? 2 : 1);
      this._pluck(freq, t, 0.25 + Math.random() * 0.15);
      t += 0.35 + Math.random() * 0.25;
    });
    this._timer = setTimeout(() => this._schedule(), (t - now) * 1000 - 200);
  }
  start() {
    this._init();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    this._playing = true;
    this._schedule();
  }
  stop() {
    this._playing = false;
    clearTimeout(this._timer);
  }
}

function initMusic() {
  const btn    = document.getElementById('musicToggle');
  const player = new GuzhengPlayer();
  let   active = localStorage.getItem('musicOn') !== 'false';

  function update() {
    btn.classList.toggle('active', active);
    btn.classList.toggle('muted',  !active);
    if (active) player.start(); else player.stop();
    localStorage.setItem('musicOn', active);
  }

  btn.addEventListener('click', () => { active = !active; update(); });
  if (active) update();
}

/* =============================================
   彩蛋
   ============================================= */
function initEasterEgg() {
  let count = 0;
  const egg = document.getElementById('easterEgg');
  let   tid = null;

  document.addEventListener('eggClick', () => {
    count++;
    if (count >= 50) {
      count = 0;
      egg.classList.add('show');
      clearTimeout(tid);
      tid = setTimeout(() => egg.classList.remove('show'), 3500);
    }
  });

  egg.addEventListener('click', () => egg.classList.remove('show'));
}

/* =============================================
   密室攻略 — Leaflet 交互地图 + 卡片联动
   ============================================= */

const RISK_CLASS    = { '高': 'high',    '中': 'mid',    '低': 'low'    };
const RISK_COLOR_LF = { '高': '#e74c3c', '中': '#e08030', '低': '#27ae60' };

let mishiCurrentMap = 'erangel';
let mishiActiveId   = null;
let mishiFilterRisk = 'all';
let mishiLeaflet    = null;  // Leaflet 地图实例
let mishiLfMarkers  = {};    // id → Leaflet marker

/* Leaflet CRS.Simple: 每张地图 256×256 像素坐标系，zoom=0 = 1 tile
   LatLng(y_pix, x_pix) — 但 Leaflet y 轴从下到上，游戏坐标从上到下
   所以用 LatLng(-y_pix, x_pix) */
const LF_MAP_SIZE  = 256;     // tile service zoom=0 的地图像素尺寸
const LF_MIN_ZOOM  = -1;
const LF_MAX_ZOOM  = 3;

function roomToLatLng(room) {
  const px = room.x * LF_MAP_SIZE;
  const py = room.y * LF_MAP_SIZE;
  return L.latLng(-py, px);
}

/* ----- 初始化 / 重建 Leaflet 地图 ----- */
function buildLeafletMap(mapId) {
  const cfg = MAPS_CONFIG[mapId];
  const el  = document.getElementById('mishiLeafletMap');
  if (!el) return;

  // 销毁旧实例
  if (mishiLeaflet) {
    mishiLeaflet.remove();
    mishiLeaflet = null;
    mishiLfMarkers = {};
  }

  mishiLeaflet = L.map('mishiLeafletMap', {
    crs: L.CRS.Simple,
    minZoom: LF_MIN_ZOOM,
    maxZoom: LF_MAX_ZOOM,
    zoomSnap: 0.25,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
    touchZoom: true,
    doubleClickZoom: true,
  });

  // 瓦片层
  L.tileLayer(cfg.tileUrl, {
    minZoom: LF_MIN_ZOOM,
    maxZoom: LF_MAX_ZOOM,
    tileSize: 256,
    noWrap: true,
    bounds: [[ -LF_MAP_SIZE, 0 ], [ 0, LF_MAP_SIZE ]],
  }).addTo(mishiLeaflet);

  // 适配视野到全图
  mishiLeaflet.fitBounds([
    [ -LF_MAP_SIZE, 0 ],
    [ 0, LF_MAP_SIZE ],
  ]);

  // 渲染密室标记
  renderLfMarkers();
}

/* ----- 渲染 Leaflet Marker ----- */
function renderLfMarkers() {
  if (!mishiLeaflet) return;

  // 移除旧 markers
  Object.values(mishiLfMarkers).forEach(m => m.remove());
  mishiLfMarkers = {};

  const rooms = MAPS_CONFIG[mishiCurrentMap].rooms;
  rooms.forEach(room => {
    const rc      = RISK_CLASS[room.risk];
    const isActive = room.id === mishiActiveId;
    const hidden   = mishiFilterRisk !== 'all' && room.risk !== mishiFilterRisk;
    if (hidden) return;

    const icon = L.divIcon({
      className: '',
      html: `<div class="mishi-lf-marker risk-${rc}${isActive ? ' active' : ''}">${room.id}</div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });

    const marker = L.marker(roomToLatLng(room), { icon, zIndexOffset: isActive ? 100 : 0 })
      .addTo(mishiLeaflet)
      .on('click', () => {
        if (mishiActiveId === room.id) hideMishiDetail();
        else showMishiDetail(room);
      });

    mishiLfMarkers[room.id] = marker;
  });
}

/* ----- 切换地图 ----- */
function switchMishiMap(mapId) {
  mishiCurrentMap = mapId;
  mishiActiveId   = null;
  mishiFilterRisk = 'all';

  document.getElementById('mishiMapSubtitle').textContent = MAPS_CONFIG[mapId].subtitle;

  document.querySelectorAll('.mms-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.map === mapId)
  );
  document.querySelectorAll('.mf-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.risk === 'all')
  );

  hideMishiDetail();
  renderMishiCards('all');
  buildLeafletMap(mapId);
}

/* ----- 展示详情底栏 ----- */
function showMishiDetail(room) {
  mishiActiveId = room.id;
  const rc = RISK_CLASS[room.risk];

  document.getElementById('mdNum').textContent   = `No.${room.id} · ${room.grid} 区域`;
  document.getElementById('mdName').textContent  = room.name;
  document.getElementById('mdGrid').innerHTML    = `<span class="risk-badge ${rc}">${room.risk}危</span> &nbsp;${room.area}`;
  document.getElementById('mdRisk').textContent  = `${room.risk}危区域`;
  document.getElementById('mdEntry').textContent = room.entry;
  document.getElementById('mdLoot').textContent  = room.loot;
  document.getElementById('mdTip').textContent   = room.tip;

  document.getElementById('mishiDetail').classList.add('open');
  renderLfMarkers();
  highlightMishiCard(room.id);
  // 地图飞向该密室
  if (mishiLeaflet) {
    mishiLeaflet.setView(roomToLatLng(room), 1, { animate: true, duration: 0.5 });
  }
}

function hideMishiDetail() {
  document.getElementById('mishiDetail').classList.remove('open');
  mishiActiveId = null;
  renderLfMarkers();
  highlightMishiCard(null);
  // 复位到全图
  if (mishiLeaflet) {
    mishiLeaflet.fitBounds([[-LF_MAP_SIZE, 0], [0, LF_MAP_SIZE]], { animate: true });
  }
}

/* ----- 卡片高亮 ----- */
function highlightMishiCard(id) {
  document.querySelectorAll('.mishi-card').forEach(el => {
    el.classList.toggle('active-card', Number(el.dataset.id) === id);
  });
}

/* ----- 渲染卡片 ----- */
function renderMishiCards(filter) {
  mishiFilterRisk = filter || 'all';
  const grid = document.getElementById('mishiGrid');
  grid.innerHTML = '';

  const allRooms = MAPS_CONFIG[mishiCurrentMap].rooms;
  const list = mishiFilterRisk === 'all'
    ? allRooms
    : allRooms.filter(r => r.risk === mishiFilterRisk);
  // 过滤也要重绘地图标记
  renderLfMarkers();

  list.forEach((room, i) => {
    const rc   = RISK_CLASS[room.risk];
    const card = document.createElement('div');
    card.className = `mishi-card risk-${rc}`;
    card.dataset.id = room.id;
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <div class="mc-num">No.${room.id} · ${room.grid}</div>
      <div class="mc-name">${room.name}</div>
      <div class="mc-footer">
        <span class="mc-grid">${room.area}</span>
        <span class="risk-badge ${rc}">${room.risk}危</span>
      </div>
    `;
    card.addEventListener('click', () => {
      if (mishiActiveId === room.id) hideMishiDetail();
      else showMishiDetail(room);
    });
    grid.appendChild(card);
  });
}

/* ----- 初始化密室面板 ----- */
function initMishi() {
  // 地图选择器
  document.getElementById('mishiMapSel').addEventListener('click', e => {
    const btn = e.target.closest('.mms-btn');
    if (!btn || btn.dataset.map === mishiCurrentMap) return;
    switchMishiMap(btn.dataset.map);
  });

  // 过滤栏
  document.getElementById('mishiFilter').addEventListener('click', e => {
    const btn = e.target.closest('.mf-btn');
    if (!btn) return;
    document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMishiCards(btn.dataset.risk);
    hideMishiDetail();
  });

  // 详情关闭
  document.getElementById('mishiDetailClose').addEventListener('click', hideMishiDetail);

  // 初始渲染卡片
  renderMishiCards('all');
  // Leaflet 在 initTabs 切换密室 tab 时才初始化（确保 DOM 可见）
}

/* =============================================
   全局点击监听
   ============================================= */
function initClickListener() {
  document.addEventListener('click', e => {
    if (e.target.closest('#musicToggle')) return;
    if (e.target.closest('.tab-btn'))     return;
    if (e.target.closest('#throwBtn'))    return;
    if (typeof window.spawnClickEffect === 'function') {
      window.spawnClickEffect(e.clientX, e.clientY);
    }
    document.dispatchEvent(new CustomEvent('eggClick'));
  });
}

/* =============================================
   启动
   ============================================= */
(function boot() {
  initIntro();
  initBgCanvas();
  initFxCanvas();
  initTabs();
  initShengbei();
  initMishi();
  initMusic();
  initEasterEgg();
  initClickListener();
  render();
  updateClock();
})();
