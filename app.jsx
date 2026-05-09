/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

/* ---------- THEME ---------- */
const THEMES = {
  clay: {
    bg: "#f5efe6",
    surface: "#ffffff",
    ink: "#1f1a14",
    inkSoft: "#5b5246",
    line: "#e6dccb",
    accent: "#c4541b",        // terracotta
    accentInk: "#ffffff",
    chip: "#efe6d6",
    success: "#3f7a4a",
    warn: "#c89030",
    danger: "#a8331f",
    map: "#ece2cf",
  },
  sage: {
    bg: "#eef0e9",
    surface: "#ffffff",
    ink: "#1a201c",
    inkSoft: "#4d574f",
    line: "#dde2d6",
    accent: "#3f7a52",        // forest green
    accentInk: "#ffffff",
    chip: "#e3e8db",
    success: "#3f7a52",
    warn: "#b8862b",
    danger: "#a8331f",
    map: "#e6ead9",
  },
  dusk: {
    bg: "#eee8ee",
    surface: "#ffffff",
    ink: "#1d1923",
    inkSoft: "#5a5366",
    line: "#e3dde6",
    accent: "#6b3f9c",        // violet
    accentInk: "#ffffff",
    chip: "#ebe4ee",
    success: "#3f7a52",
    warn: "#c89030",
    danger: "#a8331f",
    map: "#e8e2ec",
  },
  ember: {
    bg: "#f5ede8",
    surface: "#ffffff",
    ink: "#1f1813",
    inkSoft: "#5d4f44",
    line: "#ebd9c9",
    accent: "#b1361d",        // deep ember
    accentInk: "#ffffff",
    chip: "#f0dccd",
    success: "#3f7a4a",
    warn: "#c89030",
    danger: "#a8331f",
    map: "#ecdac8",
  },
};

const ThemeCtx = createContext(THEMES.clay);
const useTheme = () => useContext(ThemeCtx);

/* ---------- I18N ---------- */
const LANGS = [
  { code: "en", label: "English", native: "English", flag: "EN" },
  { code: "es", label: "Spanish", native: "Español", flag: "ES" },
  { code: "fr", label: "French", native: "Français", flag: "FR" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "AR", rtl: true },
  { code: "zh", label: "Chinese", native: "中文", flag: "ZH" },
  { code: "ru", label: "Russian", native: "Русский", flag: "RU" },
];

const STR = {
  en: {
    welcome: "Help your community recover faster",
    welcomeSub: "Share photos of damage where you live. Your reports help responders reach people who need help.",
    chooseLang: "Choose your language",
    continue: "Continue",
    getStarted: "Get started",
    skip: "Skip",
    privacy: "You report anonymously. Your exact location is never shared publicly — reports are aggregated and anonymized before export.",
    privacyTitle: "How we protect you",
    iAgree: "I understand, continue",
    home: "Home",
    map: "Map",
    queue: "Queue",
    you: "You",
    newReport: "New report",
    nearby: "Nearby reports",
    yourImpact: "Your impact",
    reports: "reports",
    badges: "badges",
    streak: "day streak",
    capturePhoto: "Take a photo of the damage",
    captureHint: "Stand back so the whole structure is visible. We'll geo-tag automatically.",
    retake: "Retake",
    next: "Next",
    back: "Back",
    pinLocation: "Confirm the location",
    pinHint: "Drag the pin to the affected building. Tap a footprint to snap to it.",
    describeTitle: "Describe what you see",
    damageLevel: "Damage level",
    minimal: "Minimal / no damage",
    minimalDesc: "Cosmetic or no visible damage. Still functional.",
    partial: "Partially damaged",
    partialDesc: "Repairable. Usable with caution.",
    complete: "Completely damaged",
    completeDesc: "Structurally unsafe or destroyed.",
    infraType: "Type of infrastructure",
    residential: "Residential",
    commercial: "Commercial",
    government: "Government",
    utility: "Utility",
    transport: "Transport",
    community: "Community",
    public: "Public space",
    crisisType: "Nature of the crisis",
    earthquake: "Earthquake",
    flood: "Flood",
    hurricane: "Hurricane",
    wildfire: "Wildfire",
    conflict: "Conflict",
    other: "Other",
    notes: "Notes (optional)",
    notesPh: "Anything responders should know? E.g. people trapped, blocked road…",
    debris: "Debris blocking site?",
    yes: "Yes",
    no: "No",
    submit: "Submit report",
    submitting: "Saving to your device…",
    submittedTitle: "Saved",
    submittedSub: "Will sync when you're back online.",
    submittedSubOnline: "Submitted to UNDP Rapid Observer.",
    done: "Done",
    offline: "You're offline",
    offlineQueue: "Queued — will send when online",
    syncing: "Syncing…",
    synced: "Synced",
    queueTitle: "Outbox",
    queueEmpty: "Nothing waiting. You're all caught up.",
    sendNow: "Send now",
    export: "Export data",
    exportHint: "Download all reports in your area as a structured file.",
    csv: "CSV (spreadsheet)",
    geojson: "GeoJSON (map data)",
    mapTitle: "Reports near you",
    cluster: "Cluster",
    heatmap: "Heatmap",
    pins: "Pins",
    reportsHere: "reports here",
    badgeFirst: "First report",
    badgeFirstD: "Submitted your first damage report",
    badgeStreak: "3-day streak",
    badgeStreakD: "Reported on three different days",
    badgeMapper: "Block mapper",
    badgeMapperD: "Mapped 10+ buildings on one block",
    profile: "Your profile",
    aliasHint: "You appear publicly as",
    changeLang: "Change language",
    helpThanks: "Thank you for helping",
    nReports: "n reports help responders prioritize",
    minsAgo: "min ago",
    hoursAgo: "h ago",
    daysAgo: "d ago",
    requireBldg: "Pick a building",
    poweredBy: "Open data for crisis response",
  },
  es: {
    welcome: "Ayuda a tu comunidad a recuperarse más rápido",
    welcomeSub: "Comparte fotos de los daños en tu zona. Tus reportes ayudan a llegar a quienes más lo necesitan.",
    chooseLang: "Elige tu idioma",
    continue: "Continuar",
    getStarted: "Empezar",
    skip: "Omitir",
    privacy: "Reportas de forma anónima. Tu ubicación exacta nunca se comparte públicamente; los reportes se agregan y anonimizan antes de exportarse.",
    privacyTitle: "Cómo te protegemos",
    iAgree: "Entendido, continuar",
    home: "Inicio",
    map: "Mapa",
    queue: "Pendientes",
    you: "Tú",
    newReport: "Nuevo reporte",
    nearby: "Reportes cercanos",
    yourImpact: "Tu impacto",
    reports: "reportes",
    badges: "insignias",
    streak: "días seguidos",
    capturePhoto: "Toma una foto del daño",
    captureHint: "Aléjate para que se vea toda la estructura. Geolocalizamos automáticamente.",
    retake: "Repetir",
    next: "Siguiente",
    back: "Atrás",
    pinLocation: "Confirma la ubicación",
    pinHint: "Arrastra el pin al edificio afectado. Toca una forma para fijarlo.",
    describeTitle: "Describe lo que ves",
    damageLevel: "Nivel de daño",
    minimal: "Mínimo / sin daño",
    minimalDesc: "Cosmético o sin daño visible. Funcional.",
    partial: "Parcialmente dañado",
    partialDesc: "Reparable. Usable con precaución.",
    complete: "Totalmente dañado",
    completeDesc: "Inseguro o destruido.",
    infraType: "Tipo de infraestructura",
    residential: "Residencial",
    commercial: "Comercial",
    government: "Gobierno",
    utility: "Servicios",
    transport: "Transporte",
    community: "Comunitario",
    public: "Espacio público",
    crisisType: "Tipo de crisis",
    earthquake: "Terremoto",
    flood: "Inundación",
    hurricane: "Huracán",
    wildfire: "Incendio",
    conflict: "Conflicto",
    other: "Otro",
    notes: "Notas (opcional)",
    notesPh: "¿Algo que deban saber? Ej. personas atrapadas, calle bloqueada…",
    debris: "¿Escombros bloqueando?",
    yes: "Sí",
    no: "No",
    submit: "Enviar reporte",
    submitting: "Guardando…",
    submittedTitle: "Guardado",
    submittedSub: "Se enviará cuando vuelvas a estar en línea.",
    submittedSubOnline: "Enviado a UNDP Rapid Observer.",
    done: "Listo",
    offline: "Sin conexión",
    offlineQueue: "En cola — se enviará al conectar",
    syncing: "Sincronizando…",
    synced: "Sincronizado",
    queueTitle: "Bandeja de salida",
    queueEmpty: "Nada pendiente. Todo al día.",
    sendNow: "Enviar ahora",
    export: "Exportar datos",
    exportHint: "Descarga los reportes de tu zona en formato estructurado.",
    csv: "CSV (hoja)",
    geojson: "GeoJSON",
    mapTitle: "Reportes cercanos",
    cluster: "Agrupar",
    heatmap: "Mapa de calor",
    pins: "Puntos",
    reportsHere: "reportes aquí",
    badgeFirst: "Primer reporte",
    badgeFirstD: "Enviaste tu primer reporte",
    badgeStreak: "3 días seguidos",
    badgeStreakD: "Reportaste en tres días",
    badgeMapper: "Mapeador",
    badgeMapperD: "Mapeaste 10+ edificios",
    profile: "Tu perfil",
    aliasHint: "Apareces públicamente como",
    changeLang: "Cambiar idioma",
    helpThanks: "Gracias por ayudar",
    nReports: "n reportes ayudan a priorizar",
    minsAgo: "min",
    hoursAgo: "h",
    daysAgo: "d",
    requireBldg: "Elige un edificio",
    poweredBy: "Datos abiertos para crisis",
  },
  fr: {
    welcome: "Aidez votre communauté à se relever plus vite",
    welcomeSub: "Partagez des photos des dommages près de chez vous. Vos signalements aident les secours.",
    chooseLang: "Choisissez votre langue",
    continue: "Continuer",
    getStarted: "Commencer",
    skip: "Passer",
    privacy: "Vous signalez de façon anonyme. Votre position exacte n'est jamais partagée ; les rapports sont agrégés et anonymisés avant export.",
    privacyTitle: "Comment nous vous protégeons",
    iAgree: "Compris, continuer",
    home: "Accueil",
    map: "Carte",
    queue: "File",
    you: "Vous",
    newReport: "Nouveau rapport",
    nearby: "À proximité",
    yourImpact: "Votre impact",
    reports: "rapports",
    badges: "badges",
    streak: "jours",
    capturePhoto: "Photographiez les dégâts",
    captureHint: "Reculez pour voir toute la structure. Géolocalisation automatique.",
    retake: "Reprendre",
    next: "Suivant",
    back: "Retour",
    pinLocation: "Confirmez la position",
    pinHint: "Déplacez le repère sur le bâtiment touché.",
    describeTitle: "Décrivez ce que vous voyez",
    damageLevel: "Niveau de dégâts",
    minimal: "Minimal / aucun",
    minimalDesc: "Cosmétique ou aucun. Fonctionnel.",
    partial: "Partiellement endommagé",
    partialDesc: "Réparable. Utilisable avec précaution.",
    complete: "Totalement détruit",
    completeDesc: "Instable ou détruit.",
    infraType: "Type d'infrastructure",
    residential: "Résidentiel",
    commercial: "Commercial",
    government: "Gouvernement",
    utility: "Services",
    transport: "Transport",
    community: "Communauté",
    public: "Espace public",
    crisisType: "Nature de la crise",
    earthquake: "Séisme",
    flood: "Inondation",
    hurricane: "Cyclone",
    wildfire: "Incendie",
    conflict: "Conflit",
    other: "Autre",
    notes: "Notes (facultatif)",
    notesPh: "Personnes piégées, route bloquée…",
    debris: "Débris bloquant ?",
    yes: "Oui",
    no: "Non",
    submit: "Envoyer",
    submitting: "Enregistrement…",
    submittedTitle: "Enregistré",
    submittedSub: "Envoi dès reconnexion.",
    submittedSubOnline: "Envoyé au PNUD Rapid Observer.",
    done: "Terminé",
    offline: "Hors ligne",
    offlineQueue: "En file — envoi à la reconnexion",
    syncing: "Synchronisation…",
    synced: "Synchronisé",
    queueTitle: "Boîte d'envoi",
    queueEmpty: "Rien en attente.",
    sendNow: "Envoyer",
    export: "Exporter",
    exportHint: "Téléchargez les rapports de votre zone.",
    csv: "CSV",
    geojson: "GeoJSON",
    mapTitle: "Rapports près de vous",
    cluster: "Grouper",
    heatmap: "Chaleur",
    pins: "Points",
    reportsHere: "rapports ici",
    badgeFirst: "Premier rapport",
    badgeFirstD: "Vous avez signalé",
    badgeStreak: "3 jours",
    badgeStreakD: "Trois jours de suite",
    badgeMapper: "Cartographe",
    badgeMapperD: "10+ bâtiments cartographiés",
    profile: "Profil",
    aliasHint: "Vous apparaissez comme",
    changeLang: "Changer de langue",
    helpThanks: "Merci de votre aide",
    nReports: "n rapports aident à prioriser",
    minsAgo: "min",
    hoursAgo: "h",
    daysAgo: "j",
    requireBldg: "Choisir un bâtiment",
    poweredBy: "Données ouvertes pour les crises",
  },
  ar: {
    welcome: "ساعد مجتمعك على التعافي بسرعة",
    welcomeSub: "شارك صور الأضرار في منطقتك. تساعد بلاغاتك المستجيبين على الوصول لمن يحتاجهم.",
    chooseLang: "اختر لغتك",
    continue: "متابعة",
    getStarted: "ابدأ",
    skip: "تخطي",
    privacy: "تُبلِّغ بشكل مجهول. لا يُشارك موقعك الدقيق علنًا — تُجمَّع البلاغات وتُجهَّل قبل التصدير.",
    privacyTitle: "كيف نحميك",
    iAgree: "فهمت، متابعة",
    home: "الرئيسية",
    map: "الخريطة",
    queue: "قائمة الإرسال",
    you: "أنت",
    newReport: "بلاغ جديد",
    nearby: "بلاغات قريبة",
    yourImpact: "أثرك",
    reports: "بلاغات",
    badges: "شارات",
    streak: "أيام متتالية",
    capturePhoto: "التقط صورة للأضرار",
    captureHint: "ابتعد قليلاً لرؤية المبنى كاملاً. سنحدد الموقع تلقائيًا.",
    retake: "إعادة",
    next: "التالي",
    back: "رجوع",
    pinLocation: "أكِّد الموقع",
    pinHint: "اسحب العلامة إلى المبنى المتضرر.",
    describeTitle: "صف ما تراه",
    damageLevel: "مستوى الضرر",
    minimal: "ضرر طفيف / لا يوجد",
    minimalDesc: "تجميلي أو لا يوجد. يعمل.",
    partial: "ضرر جزئي",
    partialDesc: "قابل للإصلاح. يُستخدم بحذر.",
    complete: "ضرر كامل",
    completeDesc: "غير آمن أو مدمر.",
    infraType: "نوع البنية التحتية",
    residential: "سكني",
    commercial: "تجاري",
    government: "حكومي",
    utility: "مرافق",
    transport: "نقل",
    community: "مجتمعي",
    public: "فضاء عام",
    crisisType: "طبيعة الأزمة",
    earthquake: "زلزال",
    flood: "فيضان",
    hurricane: "إعصار",
    wildfire: "حريق",
    conflict: "نزاع",
    other: "أخرى",
    notes: "ملاحظات (اختياري)",
    notesPh: "أشخاص محاصرون، طريق مغلق…",
    debris: "حطام يعيق الموقع؟",
    yes: "نعم",
    no: "لا",
    submit: "إرسال البلاغ",
    submitting: "جارٍ الحفظ…",
    submittedTitle: "تم الحفظ",
    submittedSub: "سيُرسل عند عودة الاتصال.",
    submittedSubOnline: "أُرسل إلى UNDP Rapid Observer.",
    done: "تم",
    offline: "غير متصل",
    offlineQueue: "في الانتظار — يُرسل عند الاتصال",
    syncing: "مزامنة…",
    synced: "تمت المزامنة",
    queueTitle: "صندوق الإرسال",
    queueEmpty: "لا شيء في الانتظار.",
    sendNow: "إرسال الآن",
    export: "تصدير البيانات",
    exportHint: "نزّل بلاغات منطقتك بصيغة منظمة.",
    csv: "CSV",
    geojson: "GeoJSON",
    mapTitle: "بلاغات قريبة",
    cluster: "تجميع",
    heatmap: "خريطة حرارية",
    pins: "نقاط",
    reportsHere: "بلاغات هنا",
    badgeFirst: "أول بلاغ",
    badgeFirstD: "أرسلت أول بلاغ",
    badgeStreak: "3 أيام",
    badgeStreakD: "بلّغت ثلاثة أيام",
    badgeMapper: "رسام خرائط",
    badgeMapperD: "10+ مبانٍ",
    profile: "ملفك",
    aliasHint: "تظهر علنًا باسم",
    changeLang: "تغيير اللغة",
    helpThanks: "شكرًا لمساعدتك",
    nReports: "n بلاغات تساعد على الأولوية",
    minsAgo: "د",
    hoursAgo: "س",
    daysAgo: "ي",
    requireBldg: "اختر مبنى",
    poweredBy: "بيانات مفتوحة للاستجابة",
  },
  zh: {
    welcome: "帮助你的社区更快恢复",
    welcomeSub: "分享你所在地区的灾损照片。你的报告帮助救援人员到达需要援助的人。",
    chooseLang: "选择语言",
    continue: "继续",
    getStarted: "开始",
    skip: "跳过",
    privacy: "你以匿名方式上报。精确位置不会公开 — 报告在导出前会聚合并去标识化处理。",
    privacyTitle: "我们如何保护你",
    iAgree: "明白，继续",
    home: "主页",
    map: "地图",
    queue: "待发送",
    you: "你",
    newReport: "新报告",
    nearby: "附近报告",
    yourImpact: "你的贡献",
    reports: "份报告",
    badges: "徽章",
    streak: "连续天",
    capturePhoto: "拍摄损坏照片",
    captureHint: "请退后让整个建筑入镜。我们会自动定位。",
    retake: "重拍",
    next: "下一步",
    back: "返回",
    pinLocation: "确认位置",
    pinHint: "拖动图钉到受损建筑。",
    describeTitle: "描述你看到的",
    damageLevel: "损坏程度",
    minimal: "轻微/无损",
    minimalDesc: "外观损伤或无可见损坏。可使用。",
    partial: "部分损坏",
    partialDesc: "可修复。需谨慎使用。",
    complete: "完全损坏",
    completeDesc: "结构不安全或已毁。",
    infraType: "基础设施类型",
    residential: "住宅",
    commercial: "商业",
    government: "政府",
    utility: "市政",
    transport: "交通",
    community: "社区",
    public: "公共空间",
    crisisType: "危机类型",
    earthquake: "地震",
    flood: "洪水",
    hurricane: "台风",
    wildfire: "野火",
    conflict: "冲突",
    other: "其他",
    notes: "备注（可选）",
    notesPh: "有人被困、道路封闭…",
    debris: "现场是否有碎片阻挡？",
    yes: "是",
    no: "否",
    submit: "提交报告",
    submitting: "保存中…",
    submittedTitle: "已保存",
    submittedSub: "联网后会自动发送。",
    submittedSubOnline: "已提交至 UNDP Rapid Observer。",
    done: "完成",
    offline: "离线",
    offlineQueue: "队列中 — 联网后发送",
    syncing: "同步中…",
    synced: "已同步",
    queueTitle: "发件箱",
    queueEmpty: "无待发送。",
    sendNow: "立即发送",
    export: "导出数据",
    exportHint: "下载附近报告（结构化格式）。",
    csv: "CSV",
    geojson: "GeoJSON",
    mapTitle: "附近报告",
    cluster: "聚合",
    heatmap: "热力图",
    pins: "标点",
    reportsHere: "份报告",
    badgeFirst: "首个报告",
    badgeFirstD: "已提交首个报告",
    badgeStreak: "3 天连续",
    badgeStreakD: "三天报告",
    badgeMapper: "街区测绘",
    badgeMapperD: "测绘 10+ 栋建筑",
    profile: "个人资料",
    aliasHint: "你公开显示为",
    changeLang: "更改语言",
    helpThanks: "感谢你的帮助",
    nReports: "n 份报告有助于优先排序",
    minsAgo: "分钟",
    hoursAgo: "小时",
    daysAgo: "天",
    requireBldg: "请选择建筑",
    poweredBy: "面向危机响应的开放数据",
  },
  ru: {
    welcome: "Помогите своей общине быстрее восстановиться",
    welcomeSub: "Делитесь фото повреждений в вашем районе. Ваши сообщения помогают спасателям.",
    chooseLang: "Выберите язык",
    continue: "Далее",
    getStarted: "Начать",
    skip: "Пропустить",
    privacy: "Вы сообщаете анонимно. Точные координаты не публикуются — отчёты агрегируются и обезличиваются перед экспортом.",
    privacyTitle: "Как мы защищаем вас",
    iAgree: "Понятно, продолжить",
    home: "Главная",
    map: "Карта",
    queue: "Очередь",
    you: "Вы",
    newReport: "Новое сообщение",
    nearby: "Рядом",
    yourImpact: "Ваш вклад",
    reports: "сообщений",
    badges: "значков",
    streak: "дней подряд",
    capturePhoto: "Сфотографируйте повреждения",
    captureHint: "Отойдите, чтобы попало всё здание. Геолокация автоматически.",
    retake: "Заново",
    next: "Далее",
    back: "Назад",
    pinLocation: "Подтвердите место",
    pinHint: "Перетащите метку на здание.",
    describeTitle: "Опишите увиденное",
    damageLevel: "Уровень повреждений",
    minimal: "Минимальные / нет",
    minimalDesc: "Косметические или нет. Работает.",
    partial: "Частичные",
    partialDesc: "Ремонтопригодно. С осторожностью.",
    complete: "Полные",
    completeDesc: "Аварийное или разрушено.",
    infraType: "Тип инфраструктуры",
    residential: "Жилое",
    commercial: "Коммерческое",
    government: "Госучреждение",
    utility: "Коммунальное",
    transport: "Транспорт",
    community: "Общественное",
    public: "Общ. пространство",
    crisisType: "Характер кризиса",
    earthquake: "Землетрясение",
    flood: "Наводнение",
    hurricane: "Ураган",
    wildfire: "Пожар",
    conflict: "Конфликт",
    other: "Другое",
    notes: "Заметки (необязательно)",
    notesPh: "Люди в ловушке, перекрытая дорога…",
    debris: "Завалы?",
    yes: "Да",
    no: "Нет",
    submit: "Отправить",
    submitting: "Сохранение…",
    submittedTitle: "Сохранено",
    submittedSub: "Отправится при подключении.",
    submittedSubOnline: "Отправлено в UNDP Rapid Observer.",
    done: "Готово",
    offline: "Нет сети",
    offlineQueue: "В очереди — отправится при сети",
    syncing: "Синхронизация…",
    synced: "Синхронизировано",
    queueTitle: "Исходящие",
    queueEmpty: "Ничего нет.",
    sendNow: "Отправить",
    export: "Экспорт",
    exportHint: "Скачайте сообщения в структурированном виде.",
    csv: "CSV",
    geojson: "GeoJSON",
    mapTitle: "Сообщения рядом",
    cluster: "Группа",
    heatmap: "Тепловая",
    pins: "Точки",
    reportsHere: "сообщений",
    badgeFirst: "Первое сообщение",
    badgeFirstD: "Отправлено первое",
    badgeStreak: "3 дня",
    badgeStreakD: "Три дня подряд",
    badgeMapper: "Картограф",
    badgeMapperD: "10+ зданий",
    profile: "Профиль",
    aliasHint: "Вы отображаетесь как",
    changeLang: "Сменить язык",
    helpThanks: "Спасибо за помощь",
    nReports: "n сообщений помогают приоритизировать",
    minsAgo: "мин",
    hoursAgo: "ч",
    daysAgo: "д",
    requireBldg: "Выберите здание",
    poweredBy: "Открытые данные для кризисов",
  },
};

const I18nCtx = createContext({ t: (k) => STR.en[k] || k, lang: "en", setLang: () => {} });
const useI18n = () => useContext(I18nCtx);

/* ---------- DUMMY DATA ---------- */
const CENTER = [38.0, 23.73]; // Athens-ish, generic Mediterranean
const seedReports = () => {
  const r = [];
  const rand = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const levels = ["minimal", "partial", "complete"];
  const types = ["residential", "commercial", "government", "utility", "transport", "community", "public"];
  for (let i = 0; i < 64; i++) {
    const lat = CENTER[0] + (rand(i * 13) - 0.5) * 0.012;
    const lng = CENTER[1] + (rand(i * 17 + 1) - 0.5) * 0.018;
    r.push({
      id: "rpt_" + i.toString(36),
      lat, lng,
      level: levels[Math.floor(rand(i * 7) * 3)],
      type: types[Math.floor(rand(i * 11) * types.length)],
      ts: Date.now() - Math.floor(rand(i * 23) * 1000 * 60 * 60 * 72),
      synced: true,
    });
  }
  return r;
};

/* ---------- ROOT ---------- */
function App() {
  const t = window.tw || {};
  const themeKey = (t.theme || "clay");
  const theme = THEMES[themeKey] || THEMES.clay;

  const [route, setRoute] = useState("welcome"); // welcome | privacy | home | map | queue | you | new
  const [lang, setLang] = useState("en");
  const [online, setOnline] = useState(true);
  const [reports, setReports] = useState(() => seedReports());
  const [queue, setQueue] = useState([]); // unsynced reports
  const [badges, setBadges] = useState(["first"]);
  const [draft, setDraft] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  // i18n helpers
  const i18n = useMemo(() => ({
    lang,
    setLang,
    t: (k) => (STR[lang] && STR[lang][k]) || STR.en[k] || k,
    rtl: lang === "ar",
  }), [lang]);

  // simulate sync when online flips on
  useEffect(() => {
    if (online && queue.length) {
      const tmo = setTimeout(() => {
        setReports((r) => [...r, ...queue.map((q) => ({ ...q, synced: true }))]);
        setQueue([]);
      }, 1400);
      return () => clearTimeout(tmo);
    }
  }, [online, queue.length]);

  const submitReport = (rep) => {
    const full = {
      id: "rpt_" + Math.random().toString(36).slice(2, 8),
      ts: Date.now(),
      synced: online,
      ...rep,
    };
    if (online) {
      setReports((r) => [...r, full]);
    } else {
      setQueue((q) => [...q, full]);
    }
    // award badge
    setBadges((b) => Array.from(new Set([...b, "first", reports.length + queue.length >= 9 ? "mapper" : null].filter(Boolean))));
  };

  return (
    <ThemeCtx.Provider value={theme}>
      <I18nCtx.Provider value={i18n}>
        <div
          dir={i18n.rtl ? "rtl" : "ltr"}
          style={{
            width: "100%", height: "100%",
            background: theme.bg, color: theme.ink,
            fontFamily: "'Instrument Sans', 'Inter', system-ui, sans-serif",
            display: "flex", flexDirection: "column",
            overflow: "hidden", position: "relative",
          }}
        >
          <StatusBar online={online} />
          <OfflineBanner online={online} />
          {route === "welcome" && <Welcome onNext={() => setRoute("privacy")} />}
          {route === "privacy" && <Privacy onNext={() => setRoute("home")} />}
          {route === "home" && (
            <Home
              reports={reports}
              queue={queue}
              badges={badges}
              onNew={() => { setDraft({ step: 0 }); setRoute("new"); }}
              onMap={() => setRoute("map")}
              onQueue={() => setRoute("queue")}
              onYou={() => setRoute("you")}
              onExport={() => setExportOpen(true)}
            />
          )}
          {route === "new" && (
            <NewReport
              draft={draft}
              setDraft={setDraft}
              onCancel={() => setRoute("home")}
              onDone={(rep) => { submitReport(rep); setRoute("home"); }}
              online={online}
            />
          )}
          {route === "map" && (
            <MapScreen reports={[...reports, ...queue]} onBack={() => setRoute("home")} />
          )}
          {route === "queue" && (
            <QueueScreen queue={queue} onBack={() => setRoute("home")} online={online} />
          )}
          {route === "you" && (
            <YouScreen badges={badges} reports={reports} queue={queue} onBack={() => setRoute("home")} onChangeLang={() => setRoute("welcome")} />
          )}
          {route !== "welcome" && route !== "privacy" && route !== "new" && (
            <TabBar route={route} setRoute={setRoute} queueCount={queue.length} />
          )}
          {exportOpen && <ExportSheet onClose={() => setExportOpen(false)} reports={reports} />}
          <ConnectivityToggle online={online} setOnline={setOnline} />
        </div>
      </I18nCtx.Provider>
    </ThemeCtx.Provider>
  );
}

/* ---------- STATUS BAR ---------- */
function StatusBar({ online }) {
  const theme = useTheme();
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <div style={{
      height: 44, padding: "0 22px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontSize: 14, fontWeight: 600, color: theme.ink,
      flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <SignalIcon />
        <WifiIcon active={online} />
        <BatteryIcon />
      </div>
    </div>
  );
}

function OfflineBanner({ online }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  if (online) return null;
  const sub = {
    en: "Reports are saved on this device and will sync automatically when you reconnect.",
    es: "Los reportes se guardan en este dispositivo y se sincronizarán automáticamente al reconectar.",
    fr: "Les rapports sont enregistrés sur cet appareil et se synchroniseront automatiquement à la reconnexion.",
    ar: "تُحفظ البلاغات على هذا الجهاز وتُزامَن تلقائيًا عند عودة الاتصال.",
    zh: "报告保存在本机,联网后会自动同步。",
    ru: "Сообщения сохраняются на устройстве и синхронизируются при восстановлении сети.",
  }[lang];
  return (
    <div style={{
      margin: "0 12px 8px", padding: "8px 12px",
      borderRadius: 10, background: theme.warn, color: "#fff",
      display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2 5c4-3 8-3 12 0M4 8c2.5-2 5.5-2 8 0M6 11c1-0.7 3-0.7 4 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 2l12 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>{t("offline")}</div>
        <div style={{ fontSize: 11.5, lineHeight: 1.35, opacity: 0.95, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}
const SignalIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11"><g fill="currentColor"><rect x="0" y="8" width="3" height="3" rx="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="11" rx="0.5"/></g></svg>
);
const WifiIcon = ({ active }) => (
  <svg width="16" height="11" viewBox="0 0 16 11" style={{ opacity: active ? 1 : 0.25 }}>
    <path d="M8 9.5l1.5-1.5a2 2 0 00-3 0L8 9.5zM8 6.5l3-3a6 6 0 00-6 0l3 3zM8 3.5l4.5-4.5a10 10 0 00-9 0L8 3.5z" fill="currentColor" transform="translate(0 1.5)"/>
  </svg>
);
const BatteryIcon = () => (
  <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" fill="none"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor"/><rect x="23" y="3.5" width="2" height="5" rx="1" fill="currentColor"/></svg>
);

/* ---------- WELCOME / LANG ---------- */
function Welcome({ onNext }) {
  const theme = useTheme();
  const { lang, setLang, t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const moreLabel = {
    en: "Browse 110+ more languages",
    es: "Ver más de 110 idiomas",
    fr: "Voir 110+ autres langues",
    ar: "تصفّح 110+ لغة أخرى",
    zh: "浏览 110+ 种其他语言",
    ru: "Ещё 110+ языков",
  }[lang];
  const dialogTitle = {
    en: "All languages", es: "Todos los idiomas", fr: "Toutes les langues",
    ar: "كل اللغات", zh: "所有语言", ru: "Все языки",
  }[lang];
  const searchPh = {
    en: "Search 116 languages…", es: "Buscar entre 116 idiomas…",
    fr: "Rechercher 116 langues…", ar: "ابحث بين 116 لغة…",
    zh: "在 116 种语言中搜索…", ru: "Поиск среди 116 языков…",
  }[lang];
  const closeLabel = { en: "Close", es: "Cerrar", fr: "Fermer", ar: "إغلاق", zh: "关闭", ru: "Закрыть" }[lang];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 24px 24px" }}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        gap: 18, paddingBottom: 8,
      }}>
        <Mark size={56} />
        <h1 style={{ fontSize: 34, lineHeight: 1.05, margin: 0, fontWeight: 600, letterSpacing: -0.6, textWrap: "balance" }}>
          {t("welcome")}
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.45, margin: 0, color: theme.inkSoft, textWrap: "pretty" }}>
          {t("welcomeSub")}
        </p>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: theme.inkSoft, marginBottom: 10 }}>
          {t("chooseLang")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          {LANGS.map((L) => (
            <button key={L.code}
              onClick={() => setLang(L.code)}
              style={{
                padding: "12px 14px", borderRadius: 12,
                background: lang === L.code ? theme.ink : theme.surface,
                color: lang === L.code ? theme.bg : theme.ink,
                border: `1px solid ${lang === L.code ? theme.ink : theme.line}`,
                textAlign: "start", display: "flex", flexDirection: "column", gap: 2,
                fontFamily: "inherit", cursor: "pointer",
              }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{L.native}</span>
              <span style={{ fontSize: 11, opacity: 0.6 }}>{L.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setShowAll(true)} style={{
          width: "100%", background: "transparent", border: "none",
          padding: "8px 0 14px", marginBottom: 4,
          color: theme.accent, fontSize: 13, fontWeight: 600,
          fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M1.5 7h11M7 1.5c2 1.7 2 9.3 0 11M7 1.5c-2 1.7-2 9.3 0 11" stroke="currentColor" strokeWidth="1.2" fill="none"/>
          </svg>
          {moreLabel}
        </button>
        <PrimaryButton onClick={onNext}>{t("getStarted")}</PrimaryButton>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: theme.inkSoft, letterSpacing: 0.4 }}>
          {t("poweredBy")}
        </div>
      </div>

      {showAll && (
        <AllLanguagesSheet
          onClose={() => setShowAll(false)}
          title={dialogTitle}
          searchPh={searchPh}
          closeLabel={closeLabel}
        />
      )}
    </div>
  );
}

const EXTRA_LANGS = [
  ["pt", "Portuguese", "Português"], ["de", "German", "Deutsch"], ["it", "Italian", "Italiano"],
  ["nl", "Dutch", "Nederlands"], ["pl", "Polish", "Polski"], ["uk", "Ukrainian", "Українська"],
  ["tr", "Turkish", "Türkçe"], ["fa", "Persian", "فارسی"], ["ur", "Urdu", "اردو"],
  ["hi", "Hindi", "हिन्दी"], ["bn", "Bengali", "বাংলা"], ["ta", "Tamil", "தமிழ்"],
  ["te", "Telugu", "తెలుగు"], ["ml", "Malayalam", "മലയാളം"], ["pa", "Punjabi", "ਪੰਜਾਬੀ"],
  ["ja", "Japanese", "日本語"], ["ko", "Korean", "한국어"], ["vi", "Vietnamese", "Tiếng Việt"],
  ["th", "Thai", "ไทย"], ["my", "Burmese", "မြန်မာ"], ["km", "Khmer", "ខ្មែរ"],
  ["id", "Indonesian", "Bahasa Indonesia"], ["ms", "Malay", "Bahasa Melayu"], ["tl", "Filipino", "Filipino"],
  ["sw", "Swahili", "Kiswahili"], ["am", "Amharic", "አማርኛ"], ["ti", "Tigrinya", "ትግርኛ"],
  ["so", "Somali", "Soomaali"], ["ha", "Hausa", "Hausa"], ["yo", "Yoruba", "Yorùbá"],
  ["ig", "Igbo", "Igbo"], ["zu", "Zulu", "isiZulu"], ["xh", "Xhosa", "isiXhosa"],
  ["af", "Afrikaans", "Afrikaans"], ["mg", "Malagasy", "Malagasy"], ["rw", "Kinyarwanda", "Kinyarwanda"],
  ["he", "Hebrew", "עברית"], ["el", "Greek", "Ελληνικά"], ["ro", "Romanian", "Română"],
  ["bg", "Bulgarian", "Български"], ["hr", "Croatian", "Hrvatski"], ["sr", "Serbian", "Српски"],
  ["sk", "Slovak", "Slovenčina"], ["sl", "Slovenian", "Slovenščina"], ["cs", "Czech", "Čeština"],
  ["hu", "Hungarian", "Magyar"], ["fi", "Finnish", "Suomi"], ["sv", "Swedish", "Svenska"],
  ["no", "Norwegian", "Norsk"], ["da", "Danish", "Dansk"], ["is", "Icelandic", "Íslenska"],
  ["et", "Estonian", "Eesti"], ["lv", "Latvian", "Latviešu"], ["lt", "Lithuanian", "Lietuvių"],
  ["ka", "Georgian", "ქართული"], ["hy", "Armenian", "Հայերեն"], ["az", "Azerbaijani", "Azərbaycan"],
  ["kk", "Kazakh", "Қазақша"], ["ky", "Kyrgyz", "Кыргызча"], ["uz", "Uzbek", "Oʻzbekcha"],
  ["tg", "Tajik", "Тоҷикӣ"], ["mn", "Mongolian", "Монгол"], ["ne", "Nepali", "नेपाली"],
  ["si", "Sinhala", "සිංහල"], ["lo", "Lao", "ລາວ"], ["ps", "Pashto", "پښتو"],
  ["ku", "Kurdish", "Kurdî"], ["sd", "Sindhi", "سنڌي"], ["mr", "Marathi", "मराठी"],
  ["gu", "Gujarati", "ગુજરાતી"], ["or", "Odia", "ଓଡ଼ିଆ"], ["as", "Assamese", "অসমীয়া"],
  ["kn", "Kannada", "ಕನ್ನಡ"], ["dv", "Dhivehi", "ދިވެހި"], ["ca", "Catalan", "Català"],
  ["eu", "Basque", "Euskara"], ["gl", "Galician", "Galego"], ["cy", "Welsh", "Cymraeg"],
  ["ga", "Irish", "Gaeilge"], ["gd", "Scots Gaelic", "Gàidhlig"], ["mt", "Maltese", "Malti"],
  ["sq", "Albanian", "Shqip"], ["mk", "Macedonian", "Македонски"], ["bs", "Bosnian", "Bosanski"],
  ["be", "Belarusian", "Беларуская"], ["lb", "Luxembourgish", "Lëtzebuergesch"],
  ["fy", "Frisian", "Frysk"], ["br", "Breton", "Brezhoneg"], ["co", "Corsican", "Corsu"],
  ["oc", "Occitan", "Occitan"], ["sc", "Sardinian", "Sardu"], ["fo", "Faroese", "Føroyskt"],
  ["smi", "Sámi", "Sámegiella"], ["qu", "Quechua", "Runasimi"], ["ay", "Aymara", "Aymar aru"],
  ["gn", "Guaraní", "Avañe'ẽ"], ["nah", "Nahuatl", "Nāhuatl"], ["ht", "Haitian Creole", "Kreyòl ayisyen"],
  ["jam", "Jamaican Patois", "Patwa"], ["bi", "Bislama", "Bislama"], ["fj", "Fijian", "Vakaviti"],
  ["sm", "Samoan", "Gagana Sāmoa"], ["to", "Tongan", "Lea fakatonga"], ["mi", "Māori", "Māori"],
  ["haw", "Hawaiian", "ʻŌlelo Hawaiʻi"], ["mh", "Marshallese", "Kajin M̧ajeļ"],
  ["bo", "Tibetan", "བོད་སྐད"], ["ug", "Uyghur", "ئۇيغۇرچە"], ["dz", "Dzongkha", "རྫོང་ཁ"],
  ["ckb", "Sorani", "سۆرانی"], ["wo", "Wolof", "Wolof"], ["ff", "Fulah", "Fulfulde"],
  ["sn", "Shona", "ChiShona"], ["ny", "Chichewa", "Chichewa"], ["nso", "Sepedi", "Sepedi"],
  ["st", "Sesotho", "Sesotho"], ["tn", "Setswana", "Setswana"], ["ts", "Tsonga", "Xitsonga"],
];

function AllLanguagesSheet({ onClose, title, searchPh, closeLabel }) {
  const theme = useTheme();
  const { setLang } = useI18n();
  const [q, setQ] = useState("");
  const filtered = EXTRA_LANGS.filter(([code, en, native]) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return code.includes(s) || en.toLowerCase().includes(s) || native.toLowerCase().includes(s);
  });
  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "flex-end", zIndex: 50,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: theme.bg, width: "100%", borderRadius: "22px 22px 0 0",
        padding: "12px 20px 24px", maxHeight: "82%", display: "flex", flexDirection: "column",
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 2, background: theme.line, margin: "4px auto 14px" }}/>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "transparent", border: "none", color: theme.inkSoft,
            fontFamily: "inherit", fontSize: 13, cursor: "pointer", padding: 0,
          }}>{closeLabel}</button>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPh}
          style={{
            padding: "10px 14px", borderRadius: 10, border: `1px solid ${theme.line}`,
            background: theme.surface, color: theme.ink, fontSize: 13.5,
            fontFamily: "inherit", outline: "none", marginBottom: 10,
          }}/>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {filtered.map(([code, en, native]) => (
            <button key={code} onClick={() => {
              const supported = ["en","es","fr","ar","zh","ru"];
              setLang(supported.includes(code) ? code : "en");
              onClose();
            }} style={{
              padding: "11px 12px", borderRadius: 10,
              background: theme.surface, border: `1px solid ${theme.line}`,
              textAlign: "start", fontFamily: "inherit", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: theme.ink }}>{native}</span>
              <span style={{ fontSize: 11, color: theme.inkSoft }}>{en}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: theme.inkSoft, fontSize: 13 }}>—</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Mark({ size = 40 }) {
  const theme = useTheme();
  // Stylized pin: teardrop silhouette with a soft pulse arc — reads as "location signal"
  return (
    <div style={{ width: size, height: size * 1.05, position: "relative", display: "inline-block" }}>
      <svg width={size} height={size * 1.05} viewBox="0 0 40 42" fill="none" style={{ display: "block" }}>
        {/* outward pulse arcs */}
        <path d="M6 14 a14 14 0 0 1 28 0" stroke={theme.accent} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M10 14 a10 10 0 0 1 20 0" stroke={theme.accent} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round"/>
        {/* teardrop pin */}
        <path
          d="M20 4 C12.8 4 7 9.6 7 16.6 C7 23 12 28 18.5 36.4 a2 2 0 0 0 3 0 C28 28 33 23 33 16.6 C33 9.6 27.2 4 20 4 Z"
          fill={theme.accent}
        />
        {/* inner notch — gives it a distinct silhouette, not a bullseye */}
        <path d="M20 11 l4 6 -4 3 -4 -3 z" fill={theme.bg} opacity="0.95"/>
      </svg>
    </div>
  );
}

function Privacy({ onNext }) {
  const theme = useTheme();
  const { t } = useI18n();
  const items = [
    { ic: "lock", txt: t("privacy") },
    { ic: "loc", txt: { en: "Location is captured only for reports you submit. You can override it any time.", es: "La ubicación se captura solo para los reportes que envías. Puedes cambiarla.", fr: "La position n'est captée que pour vos rapports. Vous pouvez la modifier.", ar: "يُلتقط الموقع فقط لبلاغاتك. يمكنك تعديله.", zh: "仅在你提交时采集位置。可随时修改。", ru: "Геолокация только для ваших сообщений. Можно изменить."}[useI18n().lang] || "" },
    { ic: "off", txt: { en: "Reports are saved on this device when you're offline and sync later.", es: "Los reportes se guardan localmente sin conexión y se sincronizan después.", fr: "Les rapports sont enregistrés hors ligne et synchronisés plus tard.", ar: "تُحفظ البلاغات على جهازك دون اتصال وتُزامن لاحقًا.", zh: "离线时保存在本机，联网后同步。", ru: "Без сети сохраняется на устройстве и синхронизируется позже."}[useI18n().lang] || "" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 24px 24px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 600, margin: "16px 0 26px", letterSpacing: -0.4 }}>{t("privacyTitle")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: theme.chip, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: theme.accent,
            }}>
              {it.ic === "lock" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.6"/></svg>}
              {it.ic === "loc" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 17s5-4.5 5-9a5 5 0 10-10 0c0 4.5 5 9 5 9z" stroke="currentColor" strokeWidth="1.6"/><circle cx="10" cy="8" r="1.6" fill="currentColor"/></svg>}
              {it.ic === "off" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 7c4-3 10-3 14 0M5.5 10c2.5-2 6.5-2 9 0M8 13c1-0.7 3-0.7 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="10" cy="16" r="1.2" fill="currentColor"/></svg>}
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: theme.ink }}>{it.txt}</p>
          </div>
        ))}
      </div>
      <PrimaryButton onClick={onNext}>{t("iAgree")}</PrimaryButton>
    </div>
  );
}

/* ---------- PRIMITIVES ---------- */
function PrimaryButton({ children, onClick, disabled }) {
  const theme = useTheme();
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: "100%", padding: "16px 18px", borderRadius: 14,
        background: disabled ? theme.line : theme.ink, color: disabled ? theme.inkSoft : theme.bg,
        fontSize: 16, fontWeight: 600, fontFamily: "inherit", border: "none",
        cursor: disabled ? "default" : "pointer", letterSpacing: -0.1,
      }}>{children}</button>
  );
}

function GhostButton({ children, onClick, full }) {
  const theme = useTheme();
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto", padding: "14px 16px", borderRadius: 14,
      background: "transparent", color: theme.ink, border: `1px solid ${theme.line}`,
      fontSize: 15, fontWeight: 500, fontFamily: "inherit", cursor: "pointer",
    }}>{children}</button>
  );
}

/* ---------- HOME ---------- */
function Home({ reports, queue, badges, onNew, onMap, onQueue, onYou, onExport }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const todayCount = reports.filter(r => Date.now() - r.ts < 1000*60*60*24).length;
  const last5 = [...reports].sort((a,b)=>b.ts-a.ts).slice(0,5);

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "8px 0 100px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ padding: "4px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Mark size={36} />
          <button onClick={onYou} style={{
            width: 38, height: 38, borderRadius: "50%",
            background: theme.chip, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600, color: theme.ink, fontFamily: "inherit", cursor: "pointer",
          }}>RA</button>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: "18px 0 4px", letterSpacing: -0.3, lineHeight: 1.15 }}>
          {{
            en: "Good to see you back.",
            es: "Bien tenerte de vuelta.",
            fr: "Ravi de vous revoir.",
            ar: "سعيدون بعودتك.",
            zh: "很高兴再见到你。",
            ru: "Рады видеть вас снова.",
          }[lang]}
        </h2>
        <p style={{ margin: 0, color: theme.inkSoft, fontSize: 14.5 }}>
          {todayCount} {t("reports")} · {queue.length} {t("offlineQueue").split(" — ")[0].toLowerCase()}
        </p>
      </div>

      {/* Big CTA card */}
      <div style={{ padding: "0 24px" }}>
        <button onClick={onNew} style={{
          width: "100%", textAlign: "start",
          background: theme.ink, color: theme.bg,
          padding: "22px 22px 26px", borderRadius: 22, border: "none", fontFamily: "inherit",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: theme.accent,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 9h4l2-2.5h6L19 9h4v13H5V9z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round"/>
              <circle cx="14" cy="15" r="3.5" stroke="#fff" strokeWidth="1.7"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>{t("newReport")}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              {{
                en: "Photo · location · damage level",
                es: "Foto · ubicación · daño",
                fr: "Photo · position · dégâts",
                ar: "صورة · موقع · ضرر",
                zh: "照片 · 位置 · 损坏",
                ru: "Фото · место · ущерб",
              }[lang]}
            </div>
          </div>
          <div style={{ fontSize: 22 }}>{lang === "ar" ? "←" : "→"}</div>
          {/* decorative concentric rings */}
          <div aria-hidden style={{
            position: "absolute", right: -50, top: -50, width: 180, height: 180,
            borderRadius: "50%", border: `1px solid ${theme.accent}66`, opacity: 0.5,
          }}/>
          <div aria-hidden style={{
            position: "absolute", right: -30, top: -30, width: 120, height: 120,
            borderRadius: "50%", border: `1px solid ${theme.accent}88`, opacity: 0.7,
          }}/>
        </button>
      </div>

      {/* Impact strip */}
      <div style={{ padding: "0 24px" }}>
        <SectionHead label={{
          en: "Your contribution",
          es: "Tu contribución",
          fr: "Votre contribution",
          ar: "مساهمتك",
          zh: "你的贡献",
          ru: "Ваш вклад",
        }[lang]} />
        <div style={{
          background: theme.surface, border: `1px solid ${theme.line}`,
          borderRadius: 14, padding: "14px 16px",
        }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: theme.ink }}>
            {{
              en: "Responders prioritized 4 blocks near you using community reports last week.",
              es: "Los equipos priorizaron 4 cuadras cerca de ti gracias a reportes comunitarios la semana pasada.",
              fr: "Les équipes ont priorisé 4 îlots près de chez vous grâce aux rapports communautaires.",
              ar: "حدّد المستجيبون أولوية 4 أحياء قربك بفضل بلاغات المجتمع الأسبوع الماضي.",
              zh: "上周,救援人员根据社区报告优先处理了你附近4个街区。",
              ru: "На прошлой неделе спасатели приоритизировали 4 квартала рядом с вами благодаря сообщениям.",
            }[lang]}
          </p>
          <div style={{ display: "flex", gap: 18, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.line}` }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1, letterSpacing: -0.4 }}>12</div>
              <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.6 }}>{t("reports")}</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1, letterSpacing: -0.4 }}>8</div>
              <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.6 }}>
                {{ en: "buildings", es: "edificios", fr: "bâtiments", ar: "مبانٍ", zh: "建筑", ru: "зданий" }[lang]}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1, letterSpacing: -0.4 }}>3</div>
              <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.6 }}>
                {{ en: "responders helped", es: "equipos ayudados", fr: "équipes aidées", ar: "فرق ساعدتها", zh: "团队", ru: "бригад" }[lang]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini map preview */}
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <SectionHead label={t("nearby")} />
          <button onClick={onMap} style={{
            background: "transparent", border: "none", color: theme.accent,
            fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", padding: 0,
          }}>{t("map")} {lang === "ar" ? "←" : "→"}</button>
        </div>
        <button onClick={onMap} style={{
          width: "100%", height: 180, borderRadius: 16,
          background: theme.map, border: `1px solid ${theme.line}`,
          padding: 0, position: "relative", overflow: "hidden", cursor: "pointer",
        }}>
          <MiniMap reports={reports.slice(0, 30)} />
        </button>
      </div>

      {/* Recent */}
      <div style={{ padding: "0 24px" }}>
        <SectionHead label={
          { en: "Latest in your area", es: "Reciente en tu zona", fr: "Récent près de chez vous", ar: "حديثًا قرب منطقتك", zh: "你附近最新", ru: "Недавние рядом" }[lang]
        } />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {last5.map((r) => <ReportRow key={r.id} r={r} />)}
        </div>
      </div>

      {/* Export */}
      <div style={{ padding: "0 24px" }}>
        <button onClick={onExport} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "14px 16px", borderRadius: 14,
          background: theme.surface, border: `1px solid ${theme.line}`,
          fontFamily: "inherit", cursor: "pointer", textAlign: "start",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: theme.chip,
            display: "flex", alignItems: "center", justifyContent: "center", color: theme.accent,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v9m0 0l-3.5-3.5M9 11l3.5-3.5M3 13v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: theme.ink }}>{t("export")}</div>
            <div style={{ fontSize: 12, color: theme.inkSoft }}>{t("exportHint")}</div>
          </div>
          <span style={{ color: theme.inkSoft }}>{lang === "ar" ? "‹" : "›"}</span>
        </button>
      </div>
    </div>
  );
}

function SectionHead({ label }) {
  const theme = useTheme();
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase",
      color: theme.inkSoft, margin: "0 0 10px",
    }}>{label}</div>
  );
}

function Stat({ n, label }) {
  const theme = useTheme();
  return (
    <div style={{
      background: theme.surface, border: `1px solid ${theme.line}`,
      borderRadius: 14, padding: "14px 12px",
    }}>
      <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1, letterSpacing: -0.5 }}>{n}</div>
      <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
    </div>
  );
}

function BadgeChip({ k, earned }) {
  const theme = useTheme();
  const { t } = useI18n();
  const labels = { first: t("badgeFirst"), streak: t("badgeStreak"), mapper: t("badgeMapper") };
  return (
    <div style={{
      flexShrink: 0, padding: "8px 12px 8px 8px", borderRadius: 999,
      background: earned ? theme.chip : "transparent",
      border: `1px solid ${earned ? "transparent" : theme.line}`,
      display: "flex", alignItems: "center", gap: 8,
      opacity: earned ? 1 : 0.55,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        background: earned ? theme.accent : theme.line,
        color: earned ? theme.accentInk : theme.inkSoft,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
      }}>
        {k === "first" && "★"}
        {k === "streak" && "▲"}
        {k === "mapper" && "◆"}
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: theme.ink }}>{labels[k]}</span>
    </div>
  );
}

function ReportRow({ r }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const colors = {
    minimal: theme.success,
    partial: theme.warn,
    complete: theme.danger,
  };
  const ago = (() => {
    const d = Date.now() - r.ts;
    if (d < 1000*60*60) return Math.max(1, Math.floor(d/60000)) + " " + t("minsAgo");
    if (d < 1000*60*60*24) return Math.floor(d/3600000) + " " + t("hoursAgo");
    return Math.floor(d/86400000) + " " + t("daysAgo");
  })();
  const typeLabel = t(r.type) || r.type;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 12px", borderRadius: 12,
      background: theme.surface, border: `1px solid ${theme.line}`,
    }}>
      <div style={{
        width: 8, height: 36, borderRadius: 4, background: colors[r.level],
      }}/>
      <div style={{
        width: 36, height: 36, borderRadius: 8, background: theme.chip,
        display: "flex", alignItems: "center", justifyContent: "center", color: theme.inkSoft,
      }}>
        <TypeIcon type={r.type} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: theme.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {typeLabel} · {t(r.level)}
        </div>
        <div style={{ fontSize: 11.5, color: theme.inkSoft, marginTop: 2 }}>
          {r.lat.toFixed(4)}, {r.lng.toFixed(4)} · {ago}
        </div>
      </div>
      {!r.synced && (
        <div style={{
          fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 999,
          background: theme.warn + "22", color: theme.warn, letterSpacing: 0.4, textTransform: "uppercase",
        }}>{t("offline")}</div>
      )}
    </div>
  );
}

function TypeIcon({ type }) {
  const m = {
    residential: <path d="M3 9l7-5 7 5v8H3V9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    commercial: <path d="M3 8h14l-1 9H4L3 8zm3 0V6a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    government: <path d="M3 16h14M5 16V9m4 7V9m2 7V9m4 7V9M3 9h14L10 4 3 9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    utility: <path d="M11 3l-6 9h4l-1 5 6-9h-4l1-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    transport: <path d="M5 14h10M3 11l2-6h10l2 6M5 14v3M15 14v3M6 17h2M12 17h2" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    community: <path d="M10 4l-7 4v9h14V8l-7-4z M8 17v-5h4v5" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    public: <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
  };
  return <svg width="20" height="20" viewBox="0 0 20 20">{m[type] || m.residential}</svg>;
}

/* ---------- MINI MAP (simulated) ---------- */
function MiniMap({ reports }) {
  const theme = useTheme();
  // project lat/lng to box
  const minLat = CENTER[0] - 0.006, maxLat = CENTER[0] + 0.006;
  const minLng = CENTER[1] - 0.009, maxLng = CENTER[1] + 0.009;
  const proj = (lat, lng) => [
    ((lng - minLng) / (maxLng - minLng)) * 100,
    (1 - (lat - minLat) / (maxLat - minLat)) * 100,
  ];
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* fake roads */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <g stroke={theme.line} strokeWidth="0.6" fill="none">
          <path d="M0 30 L100 35"/>
          <path d="M0 60 L100 65"/>
          <path d="M0 80 L100 78"/>
          <path d="M25 0 L30 100"/>
          <path d="M55 0 L62 100"/>
          <path d="M80 0 L85 100"/>
        </g>
        {/* footprints */}
        <g fill={theme.bg} stroke={theme.line} strokeWidth="0.4">
          {Array.from({length: 30}).map((_,i) => {
            const x = (i*7) % 95 + 2;
            const y = (i*11) % 90 + 4;
            return <rect key={i} x={x} y={y} width={3+(i%3)} height={2+(i%2)+1.2} />;
          })}
        </g>
      </svg>
      {reports.map((r) => {
        const [x, y] = proj(r.lat, r.lng);
        const c = r.level === "minimal" ? theme.success : r.level === "partial" ? theme.warn : theme.danger;
        return <div key={r.id} style={{
          position: "absolute", left: `${x}%`, top: `${y}%`,
          width: 10, height: 10, borderRadius: "50%", background: c,
          border: "2px solid #fff", transform: "translate(-50%, -50%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}/>;
      })}
      <div style={{
        position: "absolute", left: 12, bottom: 10,
        fontSize: 10, color: theme.inkSoft, letterSpacing: 0.4,
        background: theme.surface + "cc", padding: "3px 8px", borderRadius: 999,
      }}>{reports.length} reports · 0.8 km radius</div>
    </div>
  );
}

/* ---------- TAB BAR ---------- */
function TabBar({ route, setRoute, queueCount }) {
  const theme = useTheme();
  const { t } = useI18n();
  const tabs = [
    { id: "home", label: t("home"), icon: (
      <g fill="currentColor"><path d="M12 3.2 3.5 10v10.5h6v-6h5v6h6V10L12 3.2z"/></g>
    ) },
    { id: "map", label: t("map"), icon: (
      <g><path d="M3 6.2v13.6l5.5-2.2 7 2.2 5.5-2.2V4l-5.5 2.2-7-2.2L3 6.2z" fill="currentColor"/><path d="M8.5 4v13.5M15.5 6.5V20" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/></g>
    ) },
    { id: "queue", label: t("queue"), icon: (
      <g fill="currentColor"><circle cx="5" cy="7" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="5" cy="17" r="1.6"/><rect x="9" y="6" width="12" height="2" rx="1"/><rect x="9" y="11" width="12" height="2" rx="1"/><rect x="9" y="16" width="9" height="2" rx="1"/></g>
    ), badge: queueCount },
    { id: "you", label: t("you"), icon: (
      <g fill="currentColor"><circle cx="12" cy="8" r="3.6"/><path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7H4z"/></g>
    ) },
  ];
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 12,
      background: theme.surface, borderRadius: 22,
      border: `1px solid ${theme.line}`,
      padding: "10px 6px", display: "flex",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    }}>
      {tabs.map((tab) => {
        const active = route === tab.id;
        return (
          <button key={tab.id} onClick={() => setRoute(tab.id)} style={{
            flex: 1, background: "transparent", border: "none", fontFamily: "inherit",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "6px 4px", cursor: "pointer", color: active ? theme.accent : theme.inkSoft,
            position: "relative",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">{tab.icon}</svg>
            <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, letterSpacing: 0.2 }}>{tab.label}</span>
            {tab.badge ? (
              <span style={{
                position: "absolute", top: 2, right: "calc(50% - 18px)",
                background: theme.accent, color: theme.accentInk,
                fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 999, minWidth: 14, textAlign: "center",
              }}>{tab.badge}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- NEW REPORT FLOW ---------- */
function NewReport({ draft, setDraft, onCancel, onDone, online }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const step = draft?.step ?? 0;
  const data = draft?.data || {};

  const set = (k, v) => setDraft({ step, data: { ...data, [k]: v } });

  const next = () => setDraft({ step: step + 1, data });
  const back = () => step === 0 ? onCancel() : setDraft({ step: step - 1, data });

  const steps = ["photo", "pin", "describe", "submitting"];
  const cur = steps[step];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: theme.bg }}>
      <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={back} style={{
          width: 38, height: 38, borderRadius: 12, background: theme.surface,
          border: `1px solid ${theme.line}`, fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", color: theme.ink,
        }}>{lang === "ar" ? "→" : "←"}</button>
        <div style={{ flex: 1, display: "flex", gap: 4 }}>
          {steps.slice(0, 3).map((s, i) => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? theme.accent : theme.line,
            }}/>
          ))}
        </div>
        <button onClick={onCancel} style={{
          background: "transparent", border: "none", color: theme.inkSoft,
          fontFamily: "inherit", fontSize: 13, cursor: "pointer", padding: "0 6px",
        }}>✕</button>
      </div>

      {cur === "photo" && <CapturePhoto data={data} set={set} next={next} />}
      {cur === "pin" && <PinLocation data={data} set={set} next={next} />}
      {cur === "describe" && <Describe data={data} set={set} onSubmit={() => { setDraft({ step: 3, data }); setTimeout(() => onDone({ ...data, lat: data.lat || CENTER[0], lng: data.lng || CENTER[1] }), 1100); }} />}
      {cur === "submitting" && <Submitting online={online} />}
    </div>
  );
}

function CapturePhoto({ data, set, next }) {
  const theme = useTheme();
  const { t } = useI18n();
  const [cap, setCap] = useState(data.photo || null);
  const [isImage, setIsImage] = useState(!!(data.photo && data.photo.startsWith("data:")));
  const fileRef = useRef(null);

  // Demo fallback (used on desktop where there's no camera, alongside the real picker)
  const fakePhotos = [
    `linear-gradient(180deg, #6e7c84 0%, #6e7c84 55%, #4a3f33 55%, #4a3f33 100%)`,
    `linear-gradient(180deg, #8d99a4 0%, #8d99a4 50%, #5e4d3f 50%, #5e4d3f 100%)`,
    `linear-gradient(180deg, #a08e75 0%, #a08e75 60%, #3d3328 60%, #3d3328 100%)`,
  ];
  const useDemo = () => {
    const p = fakePhotos[Math.floor(Math.random() * fakePhotos.length)];
    setCap(p); setIsImage(false); set("photo", p);
  };
  const openCamera = () => fileRef.current && fileRef.current.click();
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setCap(url); setIsImage(true); set("photo", url);
    };
    reader.readAsDataURL(f);
    e.target.value = ""; // allow retake of same file
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 24px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, margin: "10px 0 6px", letterSpacing: -0.3, lineHeight: 1.2 }}>
        {t("capturePhoto")}
      </h2>
      <p style={{ margin: "0 0 18px", color: theme.inkSoft, fontSize: 14 }}>{t("captureHint")}</p>

      <div style={{
        flex: 1, borderRadius: 18, position: "relative", overflow: "hidden",
        background: cap && !isImage ? cap : (isImage ? "#000" : theme.line),
        backgroundImage: isImage ? `url(${cap})` : undefined,
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18, minHeight: 280,
      }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFile}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
        {!cap && (
          <div style={{ textAlign: "center", color: theme.inkSoft, padding: 20 }}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" style={{ marginBottom: 10 }}>
              <rect x="6" y="14" width="46" height="34" rx="4" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="29" cy="31" r="9" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M21 14l3-4h10l3 4" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <div style={{ fontSize: 13 }}>Tap below to open camera</div>
            <button onClick={useDemo} style={{
              marginTop: 10, background: "transparent", border: `1px solid ${theme.line}`,
              padding: "5px 10px", borderRadius: 999, fontFamily: "inherit",
              color: theme.inkSoft, fontSize: 11, cursor: "pointer",
            }}>use demo image</button>
          </div>
        )}
        {cap && !isImage && (
          <>
            {/* Decorative — windows / cracks for the simulated building photo */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
              <g fill="rgba(0,0,0,0.25)">
                <rect x="15" y="8" width="14" height="14"/>
                <rect x="38" y="8" width="14" height="14"/>
                <rect x="61" y="8" width="14" height="14"/>
                <rect x="15" y="28" width="14" height="14"/>
                <rect x="38" y="28" width="14" height="14"/>
                <rect x="61" y="28" width="14" height="14"/>
              </g>
              <path d="M30 0 L34 28 L26 35 L40 60" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" fill="none"/>
              <path d="M70 0 L66 22 L74 30" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" fill="none"/>
            </svg>
          </>
        )}
        {cap && (
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(0,0,0,0.55)", color: "#fff",
            fontSize: 11, padding: "4px 10px", borderRadius: 999,
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="2" fill="#fff"/><circle cx="5" cy="5" r="4" stroke="#fff" strokeWidth="1" fill="none"/></svg>
            38.0012, 23.7345 · ±6m
          </div>
        )}
        {/* Camera capture button — real */}
        <button onClick={openCamera} style={{
          position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)",
          width: 70, height: 70, borderRadius: "50%",
          background: "#fff", border: "4px solid rgba(0,0,0,0.15)",
          cursor: "pointer", padding: 0,
        }} aria-label="Open camera">
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fff", border: `2px solid ${theme.ink}` }}/>
        </button>
      </div>

      {cap && (
        <div style={{ display: "flex", gap: 10 }}>
          <GhostButton onClick={() => { setCap(null); setIsImage(false); set("photo", null); }} full>{t("retake")}</GhostButton>
          <PrimaryButton onClick={next}>{t("next")}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* ---------- LEAFLET PIN MAP ---------- */
function PinLocation({ data, set, next }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const youRef = useRef(null);
  const [bldg, setBldg] = useState(data.bldg || null);
  const [coords, setCoords] = useState([data.lat || CENTER[0] + 0.001, data.lng || CENTER[1] + 0.001]);
  const [geoStatus, setGeoStatus] = useState("idle"); // idle | locating | ok | error

  // Trigger real geolocation; recenter map and pin to user's actual position
  const locateMe = () => {
    if (!navigator.geolocation) { setGeoStatus("error"); return; }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setGeoStatus("ok");
        setCoords([latitude, longitude]);
        set("lat", latitude); set("lng", longitude);
        const L = window.L;
        if (mapRef.current && L) {
          mapRef.current.setView([latitude, longitude], 17);
          if (markerRef.current) markerRef.current.setLatLng([latitude, longitude]);
          // "you are here" dot with accuracy halo
          if (youRef.current) { youRef.current.halo.remove(); youRef.current.dot.remove(); }
          const halo = L.circle([latitude, longitude], {
            radius: Math.max(accuracy || 30, 10),
            color: "#2a78ff", weight: 1, fillColor: "#2a78ff", fillOpacity: 0.12,
          }).addTo(mapRef.current);
          const dot = L.circleMarker([latitude, longitude], {
            radius: 6, color: "#fff", weight: 2, fillColor: "#2a78ff", fillOpacity: 1,
          }).addTo(mapRef.current);
          youRef.current = { halo, dot };
        }
      },
      () => setGeoStatus("error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  useEffect(() => {
    if (!window.L || !ref.current) return;
    const L = window.L;
    const map = L.map(ref.current, {
      center: coords, zoom: 17, zoomControl: false, attributionControl: false,
      dragging: true, scrollWheelZoom: false, doubleClickZoom: false,
    });
    mapRef.current = map;
    // soft tile
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", { maxZoom: 20 }).addTo(map);

    // synthetic building footprints near center
    const footprints = [];
    const seed = (s) => { const x = Math.sin(s)*10000; return x-Math.floor(x); };
    for (let i = 0; i < 18; i++) {
      const cy = CENTER[0] + (seed(i*3)-0.5)*0.0025;
      const cx = CENTER[1] + (seed(i*5+1)-0.5)*0.0035;
      const w = 0.00025 + seed(i*7)*0.0004;
      const h = 0.0002 + seed(i*9)*0.00035;
      const corners = [
        [cy-h, cx-w], [cy-h, cx+w], [cy+h, cx+w], [cy+h, cx-w]
      ];
      const polygon = L.polygon(corners, {
        color: theme.line, weight: 1, fillColor: theme.bg, fillOpacity: 0.95,
      }).addTo(map);
      polygon.on("click", () => {
        footprints.forEach(p => p.setStyle({ color: theme.line, fillColor: theme.bg, fillOpacity: 0.95 }));
        polygon.setStyle({ color: theme.accent, fillColor: theme.accent, fillOpacity: 0.35 });
        const c = polygon.getBounds().getCenter();
        marker.setLatLng(c);
        setCoords([c.lat, c.lng]);
        setBldg("BLDG-" + (1000 + i));
        set("lat", c.lat); set("lng", c.lng); set("bldg", "BLDG-" + (1000+i));
      });
      footprints.push(polygon);
    }

    // pin marker
    const icon = L.divIcon({
      className: "ro-pin", iconSize: [40, 50], iconAnchor: [20, 46],
      html: `<div style="
        position:relative; width:40px; height:50px;
      ">
        <div style="position:absolute;left:50%;top:0;transform:translateX(-50%);
          width:36px;height:36px;border-radius:50%;background:${theme.accent};
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 14px rgba(0,0,0,0.25);border:3px solid #fff;">
          <div style="width:8px;height:8px;border-radius:50%;background:#fff"></div>
        </div>
        <div style="position:absolute;left:50%;top:32px;transform:translateX(-50%) rotate(45deg);
          width:14px;height:14px;background:${theme.accent};border-right:3px solid #fff;border-bottom:3px solid #fff;"></div>
      </div>`,
    });
    const marker = L.marker(coords, { icon, draggable: true }).addTo(map);
    markerRef.current = marker;
    marker.on("dragend", () => {
      const ll = marker.getLatLng();
      setCoords([ll.lat, ll.lng]);
      set("lat", ll.lat); set("lng", ll.lng);
    });

    return () => map.remove();
  }, []);

  // Auto-locate on mount
  useEffect(() => { const tmo = setTimeout(locateMe, 350); return () => clearTimeout(tmo); }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 24px 14px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: "10px 0 4px", letterSpacing: -0.3 }}>{t("pinLocation")}</h2>
        <p style={{ margin: 0, color: theme.inkSoft, fontSize: 14 }}>{t("pinHint")}</p>
      </div>
      <div style={{ flex: 1, position: "relative", margin: "0 16px", borderRadius: 18, overflow: "hidden", border: `1px solid ${theme.line}` }}>
        <div ref={ref} style={{ width: "100%", height: "100%", background: theme.map }}/>
        <button onClick={locateMe} title="Locate me" style={{
          position: "absolute", right: 12, bottom: 60,
          width: 44, height: 44, borderRadius: 12,
          background: theme.surface, border: `1px solid ${theme.line}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: geoStatus === "ok" ? theme.accent : theme.ink,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 400,
        }}>
          {geoStatus === "locating" ? (
            <div style={{ width: 16, height: 16, border: `2px solid ${theme.line}`, borderTopColor: theme.accent, borderRadius: "50%", animation: "ro-spin 700ms linear infinite" }}/>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" fill="currentColor"/>
              <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 1v3M10 16v3M1 10h3M16 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
        {geoStatus === "error" && (
          <div style={{
            position: "absolute", right: 12, bottom: 110, maxWidth: 200,
            background: theme.warn, color: "#fff", fontSize: 11,
            padding: "6px 10px", borderRadius: 8, lineHeight: 1.4,
          }}>Location unavailable — drag the pin manually.</div>
        )}
        <div style={{
          position: "absolute", left: 12, top: 12,
          background: theme.surface, padding: "8px 12px", borderRadius: 12,
          border: `1px solid ${theme.line}`, fontSize: 12, color: theme.ink,
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: theme.accent }}/>
          {bldg ? bldg : <span style={{ color: theme.inkSoft }}>{t("requireBldg")}</span>}
        </div>
        <div style={{
          position: "absolute", left: 12, bottom: 12, right: 12,
          background: theme.surface, padding: "10px 12px", borderRadius: 12,
          border: `1px solid ${theme.line}`, fontSize: 11, color: theme.inkSoft,
          display: "flex", justifyContent: "space-between",
        }}>
          <span>📍 {coords[0].toFixed(5)}, {coords[1].toFixed(5)}</span>
          <span>what3words: ///rapid.signal.help</span>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <PrimaryButton onClick={next}>{t("next")}</PrimaryButton>
      </div>
    </div>
  );
}

/* ---------- DESCRIBE ---------- */
function Describe({ data, set, onSubmit }) {
  const theme = useTheme();
  const { t } = useI18n();
  const [level, setLevel] = useState(data.level || null);
  const [type, setType] = useState(data.type || null);
  const [crisis, setCrisis] = useState(data.crisis || null);
  const [debris, setDebris] = useState(data.debris ?? null);
  const [notes, setNotes] = useState(data.notes || "");

  const ready = level && type;

  const damages = [
    { k: "minimal", c: theme.success },
    { k: "partial", c: theme.warn },
    { k: "complete", c: theme.danger },
  ];
  const types = ["residential", "commercial", "government", "utility", "transport", "community", "public"];
  const crises = ["earthquake", "flood", "hurricane", "wildfire", "conflict", "other"];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "8px 24px 0" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: "10px 0 18px", letterSpacing: -0.3 }}>{t("describeTitle")}</h2>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div>
          <SectionHead label={t("damageLevel")} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {damages.map(d => (
              <button key={d.k} onClick={() => { setLevel(d.k); set("level", d.k); }}
                style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "12px 14px", borderRadius: 14,
                  background: level === d.k ? theme.surface : theme.surface,
                  border: `2px solid ${level === d.k ? d.c : theme.line}`,
                  fontFamily: "inherit", cursor: "pointer", textAlign: "start",
                  transition: "border-color 120ms",
                }}>
                <div style={{ width: 12, height: 36, borderRadius: 4, background: d.c, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: theme.ink }}>{t(d.k)}</div>
                  <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 2 }}>{t(d.k + "Desc")}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `2px solid ${level === d.k ? d.c : theme.line}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: level === d.k ? d.c : "transparent",
                }}>
                  {level === d.k && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <SectionHead label={t("infraType")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {types.map(k => (
              <button key={k} onClick={() => { setType(k); set("type", k); }}
                style={{
                  display: "flex", gap: 10, alignItems: "center",
                  padding: "10px 12px", borderRadius: 12,
                  background: type === k ? theme.ink : theme.surface,
                  color: type === k ? theme.bg : theme.ink,
                  border: `1px solid ${type === k ? theme.ink : theme.line}`,
                  fontFamily: "inherit", cursor: "pointer", textAlign: "start", fontSize: 13.5,
                }}>
                <TypeIcon type={k}/>
                <span style={{ fontWeight: 500 }}>{t(k)}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <SectionHead label={t("crisisType")} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {crises.map(k => (
              <button key={k} onClick={() => {
                const nv = crisis === k ? null : k;
                setCrisis(nv); set("crisis", nv);
              }}
                style={{
                  padding: "8px 14px", borderRadius: 999,
                  background: crisis === k ? theme.accent : theme.surface,
                  color: crisis === k ? theme.accentInk : theme.ink,
                  border: `1px solid ${crisis === k ? theme.accent : theme.line}`,
                  fontFamily: "inherit", cursor: "pointer", fontSize: 13, fontWeight: 500,
                }}>{t(k)}</button>
            ))}
          </div>
        </div>

        <div>
          <SectionHead label={t("debris")} />
          <div style={{ display: "flex", gap: 8 }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => { setDebris(v); set("debris", v); }}
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 12,
                  background: debris === v ? theme.ink : theme.surface,
                  color: debris === v ? theme.bg : theme.ink,
                  border: `1px solid ${debris === v ? theme.ink : theme.line}`,
                  fontFamily: "inherit", cursor: "pointer", fontSize: 14, fontWeight: 500,
                }}>{v ? t("yes") : t("no")}</button>
            ))}
          </div>
        </div>

        <div>
          <SectionHead label={t("notes")} />
          <textarea value={notes}
            onChange={(e) => { setNotes(e.target.value); set("notes", e.target.value); }}
            placeholder={t("notesPh")}
            rows={3}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 12,
              background: theme.surface, border: `1px solid ${theme.line}`,
              color: theme.ink, fontSize: 14, fontFamily: "inherit", resize: "none",
              outline: "none",
            }}/>
        </div>
      </div>

      <div style={{ padding: 16, borderTop: `1px solid ${theme.line}`, background: theme.bg }}>
        <PrimaryButton onClick={onSubmit} disabled={!ready}>{t("submit")}</PrimaryButton>
      </div>
    </div>
  );
}

function Submitting({ online }) {
  const theme = useTheme();
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  useEffect(() => { const tmo = setTimeout(() => setDone(true), 700); return () => clearTimeout(tmo); }, []);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{
        width: 84, height: 84, borderRadius: "50%",
        background: done ? theme.success : theme.chip,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 22, transition: "background 200ms",
      }}>
        {!done && (
          <div style={{
            width: 36, height: 36, border: `3px solid ${theme.line}`, borderTopColor: theme.accent,
            borderRadius: "50%", animation: "ro-spin 700ms linear infinite",
          }}/>
        )}
        {done && <svg width="42" height="42" viewBox="0 0 42 42"><path d="M10 22l8 8 14-16" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{done ? t("submittedTitle") : t("submitting")}</div>
      <div style={{ fontSize: 14, color: theme.inkSoft, marginTop: 6, textAlign: "center", textWrap: "balance" }}>
        {done && (online ? t("submittedSubOnline") : t("submittedSub"))}
      </div>
    </div>
  );
}

/* ---------- MAP SCREEN ---------- */
function MapScreen({ reports, onBack }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const [view, setView] = useState("pins"); // pins | heat | cluster
  const ref = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!window.L || !ref.current) return;
    const L = window.L;
    const map = L.map(ref.current, {
      center: CENTER, zoom: 14.5, zoomControl: false, attributionControl: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", { maxZoom: 20 }).addTo(map);

    // building footprints density layer
    const fpGroup = L.layerGroup().addTo(map);
    for (let i = 0; i < 60; i++) {
      const seed = (s) => { const x = Math.sin(s)*10000; return x-Math.floor(x); };
      const cy = CENTER[0] + (seed(i*3)-0.5)*0.012;
      const cx = CENTER[1] + (seed(i*5+1)-0.5)*0.018;
      const w = 0.0003 + seed(i*7)*0.0005;
      const h = 0.00025 + seed(i*9)*0.0004;
      L.rectangle([[cy-h, cx-w],[cy+h, cx+w]], {
        color: theme.line, weight: 0.6, fillColor: "#fff", fillOpacity: 0.7,
      }).addTo(fpGroup);
    }

    layerRef.current = { map, layer: null, L };
    return () => map.remove();
  }, []);

  // re-render layer when view or reports change
  useEffect(() => {
    const ctx = layerRef.current;
    if (!ctx) return;
    const { map, L } = ctx;
    if (ctx.layer) { ctx.layer.forEach(x => map.removeLayer(x)); }
    const layers = [];

    if (view === "pins") {
      reports.forEach(r => {
        const c = r.level === "minimal" ? theme.success : r.level === "partial" ? theme.warn : theme.danger;
        const m = L.circleMarker([r.lat, r.lng], {
          radius: 6, color: "#fff", weight: 2, fillColor: c, fillOpacity: 1,
        }).addTo(map);
        layers.push(m);
      });
    } else if (view === "heat") {
      // diy heatmap with concentric circles
      reports.forEach(r => {
        const c = r.level === "complete" ? theme.danger : r.level === "partial" ? theme.warn : theme.success;
        [60, 40, 22].forEach((rad, i) => {
          const m = L.circle([r.lat, r.lng], {
            radius: rad, color: "transparent", fillColor: c, fillOpacity: 0.08 + i*0.03,
          }).addTo(map);
          layers.push(m);
        });
      });
    } else if (view === "cluster") {
      // grid clustering
      const cells = {};
      reports.forEach(r => {
        const key = `${r.lat.toFixed(3)}_${r.lng.toFixed(3)}`;
        cells[key] = cells[key] || { lat: 0, lng: 0, n: 0, levels: {} };
        cells[key].lat += r.lat; cells[key].lng += r.lng; cells[key].n += 1;
        cells[key].levels[r.level] = (cells[key].levels[r.level] || 0) + 1;
      });
      Object.values(cells).forEach(c => {
        const lat = c.lat / c.n, lng = c.lng / c.n;
        const dominant = Object.entries(c.levels).sort((a,b)=>b[1]-a[1])[0][0];
        const col = dominant === "complete" ? theme.danger : dominant === "partial" ? theme.warn : theme.success;
        const size = Math.min(48, 22 + c.n * 3);
        const icon = L.divIcon({
          className: "ro-cluster", iconSize: [size, size], iconAnchor: [size/2, size/2],
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;background:${col};
            color:#fff;font-weight:700;font-size:${size > 36 ? 14 : 12}px;
            display:flex;align-items:center;justify-content:center;border:3px solid #fff;
            box-shadow:0 2px 6px rgba(0,0,0,0.2);font-family:inherit;
          ">${c.n}</div>`,
        });
        const m = L.marker([lat, lng], { icon }).addTo(map);
        layers.push(m);
      });
    }
    ctx.layer = layers;
  }, [view, reports.length, theme]);

  return (
    <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
      <div ref={ref} style={{ flex: 1, background: theme.map }}/>

      {/* top bar */}
      <div style={{
        position: "absolute", top: 12, left: 12, right: 12,
        display: "flex", gap: 8, alignItems: "center",
      }}>
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 12,
          background: theme.surface, border: `1px solid ${theme.line}`,
          fontFamily: "inherit", cursor: "pointer", color: theme.ink,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>{lang === "ar" ? "→" : "←"}</button>
        <div style={{
          flex: 1, padding: "0 14px", height: 40, display: "flex", alignItems: "center",
          background: theme.surface, border: `1px solid ${theme.line}`, borderRadius: 12,
          fontSize: 13, fontWeight: 500, color: theme.ink,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          {t("mapTitle")} <span style={{ color: theme.inkSoft, marginLeft: 6, fontWeight: 400 }}>· {reports.length}</span>
        </div>
      </div>

      {/* segmented view toggle */}
      <div style={{
        position: "absolute", top: 64, left: 12,
        background: theme.surface, border: `1px solid ${theme.line}`,
        borderRadius: 12, padding: 4, display: "flex", gap: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        {[["pins", t("pins")], ["heat", t("heatmap")], ["cluster", t("cluster")]].map(([k, label]) => (
          <button key={k} onClick={() => setView(k)} style={{
            padding: "6px 12px", borderRadius: 8,
            background: view === k ? theme.ink : "transparent",
            color: view === k ? theme.bg : theme.ink,
            border: "none", fontFamily: "inherit", cursor: "pointer",
            fontSize: 12, fontWeight: 600,
          }}>{label}</button>
        ))}
      </div>

      {/* legend */}
      <div style={{
        position: "absolute", right: 12, top: 64,
        background: theme.surface, border: `1px solid ${theme.line}`,
        borderRadius: 12, padding: "10px 12px", fontSize: 11,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontWeight: 700, color: theme.inkSoft, letterSpacing: 0.6, textTransform: "uppercase", fontSize: 9, marginBottom: 6 }}>
          {t("damageLevel")}
        </div>
        <Legend dot={theme.success} label={t("minimal")} />
        <Legend dot={theme.warn} label={t("partial")} />
        <Legend dot={theme.danger} label={t("complete")} />
      </div>

      {/* bottom stats */}
      <div style={{
        position: "absolute", left: 12, right: 12, bottom: 80,
        background: theme.surface, border: `1px solid ${theme.line}`,
        borderRadius: 14, padding: "12px 14px",
        display: "flex", gap: 14, alignItems: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
      }}>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <MiniStat n={reports.filter(r => r.level === "minimal").length} dot={theme.success} />
          <MiniStat n={reports.filter(r => r.level === "partial").length} dot={theme.warn} />
          <MiniStat n={reports.filter(r => r.level === "complete").length} dot={theme.danger} />
        </div>
      </div>
    </div>
  );
}
function Legend({ dot, label }) {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 0" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot }}/>
      <span style={{ color: theme.ink }}>{label}</span>
    </div>
  );
}
function MiniStat({ n, dot }) {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: dot }}/>
      <span style={{ fontSize: 18, fontWeight: 600, color: theme.ink, lineHeight: 1 }}>{n}</span>
    </div>
  );
}

/* ---------- QUEUE SCREEN ---------- */
function QueueScreen({ queue, onBack, online }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  return (
    <div style={{ flex: 1, padding: "8px 24px 100px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 12, background: theme.surface,
          border: `1px solid ${theme.line}`, fontFamily: "inherit", cursor: "pointer", color: theme.ink,
        }}>{lang === "ar" ? "→" : "←"}</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{t("queueTitle")}</h2>
      </div>

      <div style={{
        padding: "14px 16px", borderRadius: 14, marginBottom: 18,
        background: online ? theme.success + "1a" : theme.warn + "1a",
        border: `1px solid ${online ? theme.success + "44" : theme.warn + "44"}`,
        display: "flex", gap: 12, alignItems: "center",
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: online ? theme.success : theme.warn,
          animation: queue.length && online ? "ro-pulse 1s ease-out infinite" : "none",
        }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>
            {online ? (queue.length ? t("syncing") : t("synced")) : t("offline")}
          </div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 2 }}>
            {queue.length} {t("reports")}
          </div>
        </div>
      </div>

      {queue.length === 0 && (
        <div style={{
          padding: "40px 20px", textAlign: "center", color: theme.inkSoft,
          background: theme.surface, border: `1px dashed ${theme.line}`, borderRadius: 14,
        }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✓</div>
          <div style={{ fontSize: 14 }}>{t("queueEmpty")}</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {queue.map(r => <ReportRow key={r.id} r={r} />)}
      </div>
    </div>
  );
}

/* ---------- YOU ---------- */
function YouScreen({ badges, reports, queue, onBack, onChangeLang }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const [alias, setAlias] = useState(() => {
    try { return localStorage.getItem("ro_alias") || "RA-7K2P"; } catch { return "RA-7K2P"; }
  });
  const [editing, setEditing] = useState(false);
  const [draftAlias, setDraftAlias] = useState(alias);
  const commitAlias = () => {
    const v = (draftAlias || "").trim().slice(0, 20) || "RA-7K2P";
    setAlias(v); setEditing(false);
    try { localStorage.setItem("ro_alias", v); } catch {}
  };
  const initials = alias.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "RA";
  return (
    <div style={{ flex: 1, padding: "8px 24px 100px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 12, background: theme.surface,
          border: `1px solid ${theme.line}`, fontFamily: "inherit", cursor: "pointer", color: theme.ink,
        }}>{lang === "ar" ? "→" : "←"}</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{t("profile")}</h2>
      </div>

      <div style={{
        background: theme.surface, border: `1px solid ${theme.line}`, borderRadius: 18,
        padding: "20px 18px", display: "flex", gap: 14, alignItems: "center", marginBottom: 18,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: theme.accent,
          color: theme.accentInk, display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 600, fontSize: 22,
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>
            {{ en: "Anonymous reporter", es: "Reportero anónimo", fr: "Contributeur anonyme", ar: "مُبلِّغ مجهول", zh: "匿名报告者", ru: "Анонимный наблюдатель" }[lang]}
          </div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 4, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span>{t("aliasHint")}:</span>
            {!editing && (
              <>
                <span style={{ fontFamily: "ui-monospace, monospace", color: theme.ink, fontWeight: 600 }}>{alias}</span>
                <button onClick={() => { setDraftAlias(alias); setEditing(true); }} style={{
                  background: "transparent", border: `1px solid ${theme.line}`,
                  padding: "2px 8px", borderRadius: 999, cursor: "pointer",
                  fontFamily: "inherit", fontSize: 11, color: theme.inkSoft,
                }}>
                  {{ en: "Edit", es: "Editar", fr: "Modifier", ar: "تحرير", zh: "编辑", ru: "Изменить" }[lang]}
                </button>
              </>
            )}
            {editing && (
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                <input
                  autoFocus
                  value={draftAlias}
                  maxLength={20}
                  onChange={(e) => setDraftAlias(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") commitAlias(); if (e.key === "Escape") setEditing(false); }}
                  style={{
                    fontFamily: "ui-monospace, monospace", fontSize: 12, padding: "4px 8px",
                    border: `1px solid ${theme.accent}`, borderRadius: 8, outline: "none",
                    color: theme.ink, background: theme.surface, width: 120,
                  }}
                />
                <button onClick={commitAlias} style={{
                  background: theme.accent, color: theme.accentInk, border: "none",
                  padding: "4px 10px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "inherit", fontSize: 11, fontWeight: 600,
                }}>
                  {{ en: "Save", es: "Guardar", fr: "OK", ar: "حفظ", zh: "保存", ru: "ОК" }[lang]}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>



      <SectionHead label={{ en: "Your contribution", es: "Tu contribución", fr: "Votre contribution", ar: "مساهمتك", zh: "你的贡献", ru: "Ваш вклад" }[lang]} />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.line}`, borderRadius: 14,
        padding: "16px 18px", marginBottom: 24, display: "flex", flexDirection: "column", gap: 10,
      }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: theme.ink }}>
          {{
            en: "Your reports helped responders prioritize 4 city blocks last week.",
            es: "Tus reportes ayudaron a priorizar 4 cuadras la semana pasada.",
            fr: "Vos rapports ont aidé à prioriser 4 îlots la semaine dernière.",
            ar: "ساعدت بلاغاتك على تحديد أولوية 4 أحياء الأسبوع الماضي.",
            zh: "你的报告帮助上周优先处理了12个街区。",
            ru: "Ваши сообщения помогли приоритизировать 4 квартала на прошлой неделе.",
          }[lang]}
        </p>
        <div style={{ display: "flex", gap: 18, paddingTop: 6, borderTop: `1px solid ${theme.line}` }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, letterSpacing: -0.5 }}>12</div>
            <div style={{ fontSize: 10.5, color: theme.inkSoft, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>{t("reports")}</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, letterSpacing: -0.5 }}>8</div>
            <div style={{ fontSize: 10.5, color: theme.inkSoft, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>
              {{ en: "buildings mapped", es: "edificios mapeados", fr: "bâtiments cartographiés", ar: "مبانٍ مُدوَّنة", zh: "已映射建筑", ru: "зданий отмечено" }[lang]}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, letterSpacing: -0.5 }}>3</div>
            <div style={{ fontSize: 10.5, color: theme.inkSoft, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>
              {{ en: "responders helped", es: "equipos ayudados", fr: "équipes aidées", ar: "فرق ساعدتها", zh: "协助团队", ru: "бригад использовали" }[lang]}
            </div>
          </div>
        </div>
      </div>

      <SectionHead label={{ en: "Recognition", es: "Reconocimiento", fr: "Reconnaissance", ar: "تقدير", zh: "认可", ru: "Признание" }[lang]} />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.line}`, borderRadius: 14,
        padding: "16px 16px", marginBottom: 24, display: "flex", gap: 14, alignItems: "flex-start",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", right: -28, top: -28, width: 110, height: 110,
          borderRadius: "50%", background: theme.accent, opacity: 0.06,
        }}/>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: theme.accentInk, position: "relative",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M14 5v12M8 11h12M10 7l8 8M18 7l-8 8" stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
            <path d="M9 17l-2 8 7-3 7 3-2-8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
          </svg>
          <div style={{
            position: "absolute", bottom: -3, right: -3, width: 18, height: 18, borderRadius: "50%",
            background: theme.success, border: `2px solid ${theme.surface}`, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
          }}>✓</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span>{{ en: "Verified Contributor", es: "Contribuyente Verificado", fr: "Contributeur Vérifié", ar: "مساهم موثَّق", zh: "已验证贡献者", ru: "Проверенный участник" }[lang]}</span>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: theme.success + "22", color: theme.success, letterSpacing: 0.4, textTransform: "uppercase" }}>UN · UNDP</span>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 12, lineHeight: 1.5, color: theme.inkSoft }}>
            {{
              en: "Awarded after 5 of your reports were validated by UNDP responders on the ground. Your contributions directly informed early-recovery decisions.",
              es: "Otorgado tras validar 5 de tus reportes por equipos del PNUD. Tus aportes informan decisiones de recuperación.",
              fr: "Décerné après validation de 5 de vos rapports par les équipes du PNUD sur le terrain.",
              ar: "مُنحت بعد التحقق من 5 من بلاغاتك من قبل فرق UNDP الميدانية.",
              zh: "在 UNDP 现场团队验证了你的 5 份报告后授予。你的贡献直接影响了早期恢复决策。",
              ru: "Присвоено после проверки 5 ваших сообщений командами ПРООН на месте.",
            }[lang]}
          </p>
          <div style={{ fontSize: 10.5, color: theme.inkSoft, marginTop: 8, fontFamily: "ui-monospace, monospace", letterSpacing: 0.3 }}>
            {{ en: "Issued", es: "Emitido", fr: "Émis", ar: "صدر", zh: "签发", ru: "Выдано" }[lang]} · 2026-04-22 · ID UN-RO-2K7P
          </div>
        </div>
      </div>
      <button onClick={async () => {
        const url = `https://rapid-observer.app/r/${encodeURIComponent(alias)}`;
        const title = { en: "My Rapid Observer profile", es: "Mi perfil Rapid Observer", fr: "Mon profil Rapid Observer", ar: "ملفي على Rapid Observer", zh: "我的 Rapid Observer 主页", ru: "Мой профиль Rapid Observer" }[lang];
        const text = { en: `${alias} — 12 reports contributed to crisis response.`, es: `${alias} — 12 reportes para la respuesta.`, fr: `${alias} — 12 rapports contribués.`, ar: `${alias} — 12 بلاغًا.`, zh: `${alias} — 已贡献12份报告。`, ru: `${alias} — 12 сообщений.` }[lang];
        try {
          if (navigator.share) await navigator.share({ title, text, url });
          else { await navigator.clipboard.writeText(url); alert(({ en: "Link copied", es: "Enlace copiado", fr: "Lien copié", ar: "نُسخ الرابط", zh: "已复制链接", ru: "Ссылка скопирована" }[lang])); }
        } catch {}
      }} style={{
        width: "100%", padding: "14px 16px", borderRadius: 14,
        background: theme.surface, border: `1px solid ${theme.line}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "inherit", cursor: "pointer", textAlign: "start", marginBottom: 8,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="4" cy="9" r="2" stroke={theme.accent} strokeWidth="1.6"/>
            <circle cx="14" cy="4" r="2" stroke={theme.accent} strokeWidth="1.6"/>
            <circle cx="14" cy="14" r="2" stroke={theme.accent} strokeWidth="1.6"/>
            <path d="M6 8l6-3M6 10l6 3" stroke={theme.accent} strokeWidth="1.6"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: theme.ink }}>
            {{ en: "Share my profile", es: "Compartir mi perfil", fr: "Partager mon profil", ar: "مشاركة ملفي", zh: "分享我的主页", ru: "Поделиться профилем" }[lang]}
          </span>
        </span>
        <span style={{ fontSize: 11, color: theme.inkSoft, fontFamily: "ui-monospace, monospace" }}>/r/{alias}</span>
      </button>

      <button onClick={onChangeLang} style={{
        width: "100%", padding: "14px 16px", borderRadius: 14,
        background: theme.surface, border: `1px solid ${theme.line}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "inherit", cursor: "pointer", textAlign: "start",
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: theme.ink }}>{t("changeLang")}</span>
        <span style={{ fontSize: 13, color: theme.inkSoft }}>{LANGS.find(l => l.code === lang)?.native} {lang === "ar" ? "‹" : "›"}</span>
      </button>
    </div>
  );
}

/* ---------- EXPORT SHEET ---------- */
function ExportSheet({ onClose, reports }) {
  const theme = useTheme();
  const { t, lang } = useI18n();
  const [format, setFormat] = useState(null);

  const csvSample = `id,ts,lat,lng,level,type,crisis,debris\n${reports.slice(0,3).map(r => `${r.id},${new Date(r.ts).toISOString()},${r.lat.toFixed(5)},${r.lng.toFixed(5)},${r.level},${r.type},earthquake,false`).join("\n")}\n…(${reports.length} rows)`;
  const geojsonSample = `{
  "type": "FeatureCollection",
  "features": [${reports.slice(0,2).map(r => `
    { "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [${r.lng.toFixed(5)}, ${r.lat.toFixed(5)}] },
      "properties": { "id": "${r.id}", "level": "${r.level}", "type": "${r.type}" } }`).join(",")},
    …(${reports.length} features)
  ]
}`;

  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "flex-end", zIndex: 50,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: theme.bg, width: "100%", borderRadius: "22px 22px 0 0",
        padding: "12px 20px 28px", maxHeight: "85%", overflow: "auto",
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 2, background: theme.line, margin: "4px auto 16px" }}/>
        <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 600 }}>{t("export")}</h3>
        <p style={{ margin: "0 0 18px", color: theme.inkSoft, fontSize: 13 }}>{t("exportHint")}</p>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <button onClick={() => setFormat("csv")} style={{
            flex: 1, padding: "16px 14px", borderRadius: 14,
            background: format === "csv" ? theme.ink : theme.surface,
            color: format === "csv" ? theme.bg : theme.ink,
            border: `1px solid ${format === "csv" ? theme.ink : theme.line}`,
            fontFamily: "inherit", cursor: "pointer", textAlign: "start",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t("csv")}</div>
            <div style={{ fontSize: 11, opacity: 0.65 }}>.csv · {reports.length} rows</div>
          </button>
          <button onClick={() => setFormat("geojson")} style={{
            flex: 1, padding: "16px 14px", borderRadius: 14,
            background: format === "geojson" ? theme.ink : theme.surface,
            color: format === "geojson" ? theme.bg : theme.ink,
            border: `1px solid ${format === "geojson" ? theme.ink : theme.line}`,
            fontFamily: "inherit", cursor: "pointer", textAlign: "start",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t("geojson")}</div>
            <div style={{ fontSize: 11, opacity: 0.65 }}>.geojson</div>
          </button>
        </div>

        {format && (
          <div style={{
            background: theme.ink, color: theme.bg, padding: "14px 16px",
            borderRadius: 12, fontFamily: "ui-monospace, 'SF Mono', monospace",
            fontSize: 11, lineHeight: 1.5, whiteSpace: "pre-wrap", overflow: "auto",
            maxHeight: 200, marginBottom: 14,
          }}>{format === "csv" ? csvSample : geojsonSample}</div>
        )}

        <PrimaryButton onClick={onClose} disabled={!format}>
          {format ? `Download .${format}` : t("export")}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------- CONNECTIVITY TOGGLE (mock control) ---------- */
function ConnectivityToggle({ online, setOnline }) {
  const theme = useTheme();
  return (
    <button onClick={() => setOnline(!online)} title="Toggle connectivity (demo control)" style={{
      position: "absolute", right: 8, top: 8, zIndex: 60,
      background: online ? theme.success : theme.warn,
      color: "#fff", border: "none", padding: "4px 8px",
      borderRadius: 8, fontSize: 9.5, fontFamily: "inherit",
      cursor: "pointer", opacity: 0.85, fontWeight: 700, letterSpacing: 0.5,
      textTransform: "uppercase",
    }}>
      ◉ {online ? "online" : "offline"}
    </button>
  );
}

/* ---------- MOUNT ---------- */
window.RapidObserverApp = App;
