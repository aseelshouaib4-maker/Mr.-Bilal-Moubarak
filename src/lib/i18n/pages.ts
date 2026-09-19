/**
 * Copy for the inner pages (about, services, projects, process, contact).
 * Drawn from the studio's discovery answers; wording is placeholder until
 * the studio signs it off.
 */

export type ProjectCategory = "atlas" | "education" | "thematic" | "tourism" | "reference";

export const pagesEn = {
  common: {
    legend: "Legend",
    ctaEyebrow: "Start a project",
    ctaTitle: ["Have a project in mind?"],
    ctaBody: "Tell us the place, the data and the audience.",
    ctaButton: "Start a project",
    footerExplore: "Explore",
    footerContact: "Contact",
  },

  about: {
    eyebrow: "About the studio",
    title: ["Art & science of maps."],
    body: "An independent studio built on 34 years of cartography.",
    facts: [
      { k: "34+", v: "Years in professional cartography" },
      { k: "Head", v: "Of a cartography department" },
      { k: "Beirut", v: "Independent studio" },
    ],
    storyLabel: "The studio",
    storyTitle: ["34 years, one practice."],
    story: [
      "The studio is not simply a map-design service. It carries forward a career that includes many years leading a cartography department and overseeing the development and production of a wide range of cartographic projects.",
      "That experience now meets modern GIS technology and digital production, bringing geographic knowledge, scientific accuracy, editorial thinking and visual design to every sheet.",
    ],
    quote: "A map is not simply a drawing that shows locations. It is a means of organising information, understanding places and communicating knowledge.",
    judgementLabel: "What sets us apart",
    judgementTitle: ["Judgement, not software."],
    judgementBody: "Good maps come from good decisions.",
    judgementFigure: "Years of decisions behind every map",
    visual: {
      layers: ["Relief", "Rivers", "Place names", "Decoration"],
      legend: ["Capital", "City", "Main road", "River"],
      scale: "km",
      profile: "Elevation profile",
      pen: "Pen & ink",
      gis: "GIS",
    },
    judgement: [
      { t: "What to show", d: "Selecting the information a map needs, and removing everything that competes with it." },
      { t: "Scale & projection", d: "Choosing the frame that keeps the geography true to its purpose." },
      { t: "Symbols & colour", d: "A visual language the reader understands at a glance." },
      { t: "Heritage meets technology", d: "Decades of cartographic practice, produced with modern GIS and digital methods." },
    ],
    sectorsNote:
      "These sectors reflect a professional career, including work led within a previous cartography department. They are not presented as direct clients of the new studio.",
  },

  services: {
    eyebrow: "Services",
    title: ["Maps made to measure."],
    body: "Every map is built around its purpose and audience.",
    countLabel: "Services",
    formatLabel: "Formats",
    formats: "Print · Digital · Multilingual",
    items: [
      {
        t: "Atlases",
        d: "National, educational and reference atlases, from plan to print.",
        tags: ["National atlases", "Reference atlases", "Thematic atlases"],
      },
      {
        t: "Educational maps",
        d: "Maps for textbooks, curricula and school atlases.",
        tags: ["Textbook maps", "School atlases", "Wall maps"],
      },
      {
        t: "Thematic maps",
        d: "Complex data turned into maps anyone can read.",
        tags: ["Statistical", "Demographic", "Environmental"],
      },
      {
        t: "Tourism maps",
        d: "Maps for cities, regions and destinations.",
        tags: ["City maps", "Regional maps", "Visitor guides"],
      },
      {
        t: "Custom projects",
        d: "Cartography shaped around one brief.",
        tags: ["Bespoke briefs", "Print & digital", "Multilingual"],
      },
      {
        t: "GIS & data",
        d: "Geographic data prepared for production.",
        tags: ["Data preparation", "Processing", "Layer structure"],
      },
    ],
    audienceLabel: "Who we work with",
    audienceTitle: ["Expert or just starting."],
    audience: [
      {
        k: "You know what you need",
        d: "Publishers, educational institutions, government bodies and researchers with a defined brief find depth of expertise and technical capability.",
      },
      {
        k: "You have data or an idea",
        d: "Geographic data, educational content or an idea for an atlas: we explain clearly how it can become a professional cartographic product.",
      },
    ],
  },

  projects: {
    eyebrow: "Our work",
    title: ["34 years of maps."],
    body: "A careful selection, each with the role held.",
    filters: {
      all: "All work",
      atlas: "Atlases",
      education: "Educational",
      thematic: "Thematic",
      tourism: "Tourism",
      reference: "Physical & political",
    },
    shown: "shown",
    roleLabel: "Role",
    items: [
      { t: "UAE National Atlas", cat: "atlas", k: "National atlas", role: "Cartographic direction", y: "2018", d: "Physical, political, thematic and statistical maps of the country." },
      { t: "Lebanon Reference Atlas", cat: "atlas", k: "Reference atlas", role: "Development & supervision", y: "2016", d: "Detailed reference maps with thematic layers and geographic content." },
      { t: "Historical Atlas of the Region", cat: "atlas", k: "Historical atlas", role: "Editing & supervision", y: "2015", d: "The region through its periods and civilisations." },
      { t: "Bahrain Educational Atlas", cat: "education", k: "Educational atlas", role: "Cartographic design", y: "2015", d: "A curriculum-aligned atlas for schools." },
      { t: "School Wall Map Series", cat: "education", k: "Wall maps", role: "Development", y: "2017", d: "Clear, durable maps designed for classroom learning." },
      { t: "Population Density Map", cat: "thematic", k: "Thematic map", role: "Data & design", y: "2022", d: "Population distribution and density from GIS data." },
      { t: "Lebanon Tourism Map", cat: "tourism", k: "Tourism map", role: "Design", y: "2021", d: "Attractions, heritage sites and travel information." },
      { t: "Middle East Physical Map", cat: "reference", k: "Physical map", role: "Editing & production", y: "2020", d: "Terrain, landforms and hydrography of the region." },
      { t: "Arab World Political Map", cat: "reference", k: "Political map", role: "Cartographic design", y: "2019", d: "Administrative boundaries, cities and key geographic data." },
    ] as { t: string; cat: ProjectCategory; k: string; role: string; y: string; d: string }[],
    caseLabel: "Flagship project",
    caseTitle: "UAE National Atlas",
    caseMeta: "National atlas · 2018 · Cartographic direction",
    caseSteps: [
      { k: "The challenge", d: "Bring the physical, political, thematic and statistical geography of a whole country into one coherent reference work." },
      { k: "The cartographic approach", d: "A single scale system, a consistent symbol library and a strict information hierarchy, edited across every plate." },
      { k: "The final result", d: "An atlas that reads as one work, clear for students and precise enough for professional reference." },
    ],
    note: "Project titles, years and roles are placeholders, to be confirmed with the studio.",
  },

  process: {
    eyebrow: "Method",
    title: ["Understand first, then draw."],
    body: "Every map starts with the problem it must solve.",
    stageLabel: "Stage",
    stagesLabel: "Stages",
    steps: [
      { t: "The brief", d: "Understanding the project's objective, target audience, geographic scope and the intended use of the final product.", points: ["Objective & audience", "Geographic scope", "Intended use"] },
      { t: "Data research", d: "Gathering the geographic and statistical data and reference materials required, and evaluating their accuracy and relevance.", points: ["Sources & references", "Accuracy", "Relevance"] },
      { t: "Planning", d: "Determining scale, projection, geographic extent, information hierarchy and the overall structure of the map.", points: ["Scale & projection", "Extent", "Hierarchy"] },
      { t: "GIS preparation", d: "Organising, processing and preparing geographic data for cartographic production.", points: ["Cleaning", "Layer structure", "GIS preparation"] },
      { t: "Design", d: "Developing the visual language of the map: symbols, colour, typography, hierarchy and the presentation of geographic information.", points: ["Symbols", "Colour & type", "Visual hierarchy"] },
      { t: "Editing & checks", d: "Reviewing geographic accuracy, place names, information, consistency, readability and visual balance.", points: ["Place names", "Consistency", "Readability"] },
      { t: "Delivery", d: "Preparing the final files to the required specifications for print, digital publishing or other intended uses.", points: ["Print", "Digital publishing", "Specifications"] },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: ["Let's talk maps."],
    body: "Tell us about your map. We reply with an approach.",
    hoursLabel: "Studio hours",
    hours: "Mon – Fri · 9:00 – 18:00 (GMT+2)",
    locationLabel: "Location",
    formTitle: "Send an enquiry",
    orgPlaceholder: "Publisher, ministry, university…",
    typePlaceholder: "Select a project type",
    optional: "optional",
    channelsLabel: "Direct lines",
    channels: {
      email: { k: "Email", d: "Replies within two working days." },
      phone: { k: "Phone", d: "Mon – Fri, 9:00 – 18:00 (GMT+2)." },
      visit: { k: "Studio visits", v: "Beirut, Lebanon", d: "By appointment." },
      follow: { k: "Follow", d: "Work in progress and new sheets." },
    },
    faqLabel: "Questions",
    faqTitle: ["Before you write."],
    faq: [
      { q: "Do you work outside Lebanon?", a: "Yes. The studio works with clients across the Middle East and beyond, and projects can be run remotely." },
      { q: "Can you work with data we already have?", a: "Yes. Existing data, reference maps and statistics are evaluated for accuracy and relevance, then prepared for production." },
      { q: "Print, digital, or both?", a: "Both. Final files are prepared to the specifications of print publishing, digital platforms or any other intended use." },
      { q: "Can maps be produced in Arabic and English?", a: "Yes. Maps and atlases can be produced in Arabic, English or other languages, with place names checked in each." },
      { q: "How is a project priced?", a: "Every project is scoped individually after the brief, based on its extent, data, complexity and formats." },
    ],
  },
};

export type PagesDict = typeof pagesEn;

export const pagesAr: PagesDict = {
  common: {
    legend: "مفتاح الخريطة",
    ctaEyebrow: "ابدأ مشروعك",
    ctaTitle: ["هل لديك مشروع في ذهنك؟"],
    ctaBody: "أخبرنا عن المكان والبيانات والجمهور.",
    ctaButton: "ابدأ مشروعك",
    footerExplore: "استكشف",
    footerContact: "تواصل",
  },

  about: {
    eyebrow: "عن الستوديو",
    title: ["فنّ الخرائط وعلمها."],
    body: "ستوديو مستقل يقوم على 34 عاماً من الكارتوغرافيا.",
    facts: [
      { k: "+34", v: "عاماً في الكارتوغرافيا المهنية" },
      { k: "رئيس", v: "قسم للخرائط سابقاً" },
      { k: "بيروت", v: "ستوديو مستقل" },
    ],
    storyLabel: "الستوديو",
    storyTitle: ["34 عاماً، ممارسة واحدة."],
    story: [
      "الستوديو ليس مجرد خدمة لتصميم الخرائط، بل هو امتداد لمسيرة مهنية تضمّنت سنوات طويلة في قيادة قسم للخرائط والإشراف على تطوير وإنتاج مجموعة واسعة من المشاريع الكارتوغرافية.",
      "تلتقي هذه الخبرة اليوم بتقنيات نظم المعلومات الجغرافية والإنتاج الرقمي، لتجمع المعرفة الجغرافية والدقة العلمية والتفكير التحريري والتصميم البصري في كل لوحة.",
    ],
    quote: "الخريطة ليست مجرد رسم يُظهر المواقع، بل وسيلة لتنظيم المعلومات وفهم الأماكن ونقل المعرفة.",
    judgementLabel: "ما يميّزنا",
    judgementTitle: ["حكم خبير، لا برمجيات."],
    judgementBody: "الخرائط الجيدة تصنعها القرارات الجيدة.",
    judgementFigure: "عاماً من القرارات خلف كل خريطة",
    visual: {
      layers: ["التضاريس", "الأنهار", "أسماء الأماكن", "الزخرفة"],
      legend: ["عاصمة", "مدينة", "طريق رئيسي", "نهر"],
      scale: "كم",
      profile: "مقطع الارتفاع",
      pen: "القلم والحبر",
      gis: "نظم المعلومات",
    },
    judgement: [
      { t: "ما يُعرض", d: "اختيار المعلومات التي تحتاجها الخريطة، وإزالة كل ما يزاحمها." },
      { t: "المقياس والإسقاط", d: "اختيار الإطار الذي يحفظ صدق الجغرافيا وفق هدفها." },
      { t: "الرموز والألوان", d: "لغة بصرية يفهمها القارئ من النظرة الأولى." },
      { t: "التراث يلتقي بالتقنية", d: "عقود من الممارسة الكارتوغرافية، تُنتَج بأدوات نظم المعلومات والأساليب الرقمية الحديثة." },
    ],
    sectorsNote:
      "تعكس هذه القطاعات مسيرة مهنية تشمل أعمالاً أُنجزت ضمن قسم خرائط سابق، ولا تُقدَّم بوصفها عملاء مباشرين للستوديو الجديد.",
  },

  services: {
    eyebrow: "الخدمات",
    title: ["خرائط على المقاس."],
    body: "تُبنى كل خريطة حول هدفها وجمهورها.",
    countLabel: "خدمات",
    formatLabel: "الصيغ",
    formats: "طباعة · رقمي · متعدد اللغات",
    items: [
      {
        t: "الأطالس",
        d: "أطالس وطنية وتعليمية ومرجعية، من التخطيط إلى الطباعة.",
        tags: ["أطالس وطنية", "أطالس مرجعية", "أطالس موضوعية"],
      },
      {
        t: "الخرائط التعليمية",
        d: "خرائط للكتب المدرسية والمناهج والأطالس المدرسية.",
        tags: ["خرائط الكتب", "أطالس مدرسية", "خرائط جدارية"],
      },
      {
        t: "الخرائط الموضوعية",
        d: "بيانات معقّدة تتحوّل إلى خرائط سهلة القراءة.",
        tags: ["إحصائية", "ديموغرافية", "بيئية"],
      },
      {
        t: "الخرائط السياحية",
        d: "خرائط للمدن والمناطق والوجهات.",
        tags: ["خرائط المدن", "خرائط إقليمية", "أدلة الزوّار"],
      },
      {
        t: "مشاريع مخصّصة",
        d: "كارتوغرافيا تُصمَّم حول موجز واحد.",
        tags: ["موجز مخصّص", "طباعة ورقمي", "متعدد اللغات"],
      },
      {
        t: "نظم المعلومات والبيانات",
        d: "بيانات جغرافية مُعدّة للإنتاج.",
        tags: ["إعداد البيانات", "المعالجة", "بنية الطبقات"],
      },
    ],
    audienceLabel: "مع من نعمل",
    audienceTitle: ["خبيراً كنت أو مبتدئاً."],
    audience: [
      {
        k: "تعرف ما تحتاجه",
        d: "دور النشر والمؤسسات التعليمية والجهات الحكومية والباحثون أصحاب الموجز الواضح يجدون عمق الخبرة والقدرة التقنية.",
      },
      {
        k: "لديك بيانات أو فكرة",
        d: "بيانات جغرافية أو محتوى تعليمي أو فكرة لأطلس: نشرح بوضوح كيف يمكن أن تتحوّل إلى منتج كارتوغرافي مهني.",
      },
    ],
  },

  projects: {
    eyebrow: "أعمالنا",
    title: ["34 عاماً من الخرائط."],
    body: "اختيار مدروس، مع الدور في كل مشروع.",
    filters: {
      all: "كل الأعمال",
      atlas: "أطالس",
      education: "تعليمية",
      thematic: "موضوعية",
      tourism: "سياحية",
      reference: "طبيعية وسياسية",
    },
    shown: "معروضة",
    roleLabel: "الدور",
    items: [
      { t: "الأطلس الوطني للإمارات", cat: "atlas", k: "أطلس وطني", role: "إدارة كارتوغرافية", y: "2018", d: "خرائط طبيعية وسياسية وموضوعية وإحصائية للدولة." },
      { t: "أطلس لبنان المرجعي", cat: "atlas", k: "أطلس مرجعي", role: "تطوير وإشراف", y: "2016", d: "خرائط مرجعية مفصّلة مع طبقات موضوعية ومحتوى جغرافي." },
      { t: "الأطلس التاريخي للمنطقة", cat: "atlas", k: "أطلس تاريخي", role: "تحرير وإشراف", y: "2015", d: "المنطقة عبر حقبها وحضاراتها." },
      { t: "أطلس البحرين التعليمي", cat: "education", k: "أطلس تعليمي", role: "تصميم كارتوغرافي", y: "2015", d: "أطلس مدرسي متوافق مع المنهج." },
      { t: "سلسلة الخرائط الجدارية المدرسية", cat: "education", k: "خرائط جدارية", role: "تطوير", y: "2017", d: "خرائط واضحة ومتينة مصمّمة للتعلّم في الصف." },
      { t: "خريطة الكثافة السكانية", cat: "thematic", k: "خريطة موضوعية", role: "بيانات وتصميم", y: "2022", d: "توزّع السكان وكثافتهم من بيانات نظم المعلومات." },
      { t: "خريطة لبنان السياحية", cat: "tourism", k: "خريطة سياحية", role: "تصميم", y: "2021", d: "المعالم والمواقع التراثية ومعلومات السفر." },
      { t: "الخريطة الطبيعية للشرق الأوسط", cat: "reference", k: "خريطة طبيعية", role: "تحرير وإنتاج", y: "2020", d: "التضاريس وأشكال السطح والمياه في المنطقة." },
      { t: "الخريطة السياسية للعالم العربي", cat: "reference", k: "خريطة سياسية", role: "تصميم كارتوغرافي", y: "2019", d: "الحدود الإدارية والمدن والبيانات الجغرافية الأساسية." },
    ],
    caseLabel: "مشروع رئيسي",
    caseTitle: "الأطلس الوطني للإمارات",
    caseMeta: "أطلس وطني · 2018 · إدارة كارتوغرافية",
    caseSteps: [
      { k: "التحدّي", d: "جمع الجغرافيا الطبيعية والسياسية والموضوعية والإحصائية لدولة كاملة في عمل مرجعي واحد متماسك." },
      { k: "المقاربة الكارتوغرافية", d: "نظام مقاييس موحّد ومكتبة رموز متّسقة وتسلسل صارم للمعلومات، مع تحرير يشمل كل لوحة." },
      { k: "النتيجة النهائية", d: "أطلس يُقرأ كعمل واحد، واضح للطلاب ودقيق بما يكفي للمرجعية المهنية." },
    ],
    note: "عناوين المشاريع وسنواتها والأدوار مؤقتة، وسيتم تأكيدها مع الستوديو.",
  },

  process: {
    eyebrow: "المنهجية",
    title: ["الفهم أولاً، ثم الرسم."],
    body: "تبدأ كل خريطة بالمشكلة التي عليها حلّها.",
    stageLabel: "المرحلة",
    stagesLabel: "مراحل",
    steps: [
      { t: "الموجز", d: "فهم هدف المشروع والجمهور المستهدف والنطاق الجغرافي والاستخدام المقصود للمنتج النهائي.", points: ["الهدف والجمهور", "النطاق الجغرافي", "الاستخدام المقصود"] },
      { t: "بحث البيانات", d: "جمع البيانات الجغرافية والإحصائية والمراجع المطلوبة، وتقييم دقتها وملاءمتها.", points: ["المصادر والمراجع", "الدقة", "الملاءمة"] },
      { t: "التخطيط", d: "تحديد المقياس والإسقاط والامتداد الجغرافي وتسلسل المعلومات والبنية العامة للخريطة.", points: ["المقياس والإسقاط", "الامتداد", "التسلسل"] },
      { t: "تحضير نظم المعلومات", d: "تنظيم البيانات الجغرافية ومعالجتها وتحضيرها للإنتاج الكارتوغرافي.", points: ["التنقية", "بنية الطبقات", "تحضير نظم المعلومات"] },
      { t: "التصميم", d: "تطوير اللغة البصرية للخريطة: الرموز والألوان والخطوط والتسلسل وطريقة عرض المعلومات الجغرافية.", points: ["الرموز", "الألوان والخطوط", "التسلسل البصري"] },
      { t: "التحرير والمراجعة", d: "مراجعة الدقة الجغرافية وأسماء الأماكن والمعلومات والاتساق والمقروئية والتوازن البصري.", points: ["أسماء الأماكن", "الاتساق", "المقروئية"] },
      { t: "التسليم", d: "تحضير الملفات النهائية وفق المواصفات المطلوبة للطباعة أو النشر الرقمي أو أي استخدام آخر.", points: ["الطباعة", "النشر الرقمي", "المواصفات"] },
    ],
  },

  contact: {
    eyebrow: "تواصل",
    title: ["لنتحدّث عن الخرائط."],
    body: "أخبرنا عن خريطتك، ونردّ بمقاربة.",
    hoursLabel: "ساعات العمل",
    hours: "الإثنين – الجمعة · 9:00 – 18:00 (GMT+2)",
    locationLabel: "الموقع",
    formTitle: "أرسل استفساراً",
    orgPlaceholder: "دار نشر، وزارة، جامعة…",
    typePlaceholder: "اختر نوع المشروع",
    optional: "اختياري",
    channelsLabel: "قنوات مباشرة",
    channels: {
      email: { k: "البريد الإلكتروني", d: "نردّ خلال يومَي عمل." },
      phone: { k: "الهاتف", d: "الإثنين – الجمعة، 9:00 – 18:00 (GMT+2)." },
      visit: { k: "زيارة الستوديو", v: "بيروت، لبنان", d: "بموعد مسبق." },
      follow: { k: "تابعنا", d: "أعمال قيد الإنجاز ولوحات جديدة." },
    },
    faqLabel: "أسئلة",
    faqTitle: ["قبل أن تكتب."],
    faq: [
      { q: "هل تعملون خارج لبنان؟", a: "نعم. يعمل الستوديو مع عملاء في أنحاء الشرق الأوسط وخارجه، ويمكن إدارة المشاريع عن بُعد." },
      { q: "هل يمكنكم العمل على بيانات لدينا مسبقاً؟", a: "نعم. تُقيَّم البيانات والخرائط المرجعية والإحصاءات الموجودة من حيث الدقة والملاءمة، ثم تُحضَّر للإنتاج." },
      { q: "طباعة أم رقمي أم كلاهما؟", a: "كلاهما. تُحضَّر الملفات النهائية وفق مواصفات النشر المطبوع أو المنصات الرقمية أو أي استخدام آخر." },
      { q: "هل يمكن إنتاج الخرائط بالعربية والإنجليزية؟", a: "نعم. يمكن إنتاج الخرائط والأطالس بالعربية أو الإنجليزية أو لغات أخرى، مع مراجعة أسماء الأماكن في كل منها." },
      { q: "كيف تُسعَّر المشاريع؟", a: "يُحدَّد نطاق كل مشروع على حدة بعد الموجز، بحسب امتداده وبياناته ودرجة تعقيده وصيغه." },
    ],
  },
};
