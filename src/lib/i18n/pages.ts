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
    ctaTitle: ["Have a project", "in mind?"],
    ctaBody: "Tell us about the geography, the data and the audience. We reply with a cartographic approach, not a template.",
    ctaButton: "Start a project",
    footerExplore: "Explore",
    footerContact: "Contact",
  },

  about: {
    eyebrow: "About the studio",
    title: ["The art & science", "of cartography."],
    body: "Bilal Moubarak Cartography Studio is an independent, specialised studio founded on more than 34 years of professional experience in maps and cartography.",
    facts: [
      { k: "34+", v: "Years in professional cartography" },
      { k: "Head", v: "Of a cartography department" },
      { k: "Beirut", v: "Independent studio" },
    ],
    storyLabel: "The studio",
    storyTitle: ["A continuation of", "accumulated experience."],
    story: [
      "The studio is not simply a map-design service. It carries forward a career that includes many years leading a cartography department and overseeing the development and production of a wide range of cartographic projects.",
      "That experience now meets modern GIS technology and digital production, bringing geographic knowledge, scientific accuracy, editorial thinking and visual design to every sheet.",
    ],
    quote: "A map is not simply a drawing that shows locations. It is a means of organising information, understanding places and communicating knowledge.",
    judgementLabel: "What sets the studio apart",
    judgementTitle: ["Cartographic judgement,", "not just software."],
    judgementBody: "Software can help produce maps. Professional cartography depends on the decisions made at every stage.",
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
      { t: "What to show, and what to leave out", d: "Selecting the information a map needs, and removing everything that competes with it." },
      { t: "Scale & projection", d: "Choosing the frame that keeps the geography true to its purpose." },
      { t: "Symbols, colour & hierarchy", d: "A visual language the reader understands at a glance." },
      { t: "Heritage meets technology", d: "Decades of cartographic practice, produced with modern GIS and digital methods." },
    ],
    sectorsNote:
      "These sectors reflect a professional career, including work led within a previous cartography department. They are not presented as direct clients of the new studio.",
  },

  services: {
    eyebrow: "Services",
    title: ["Customised", "cartographic solutions."],
    body: "We do not offer ready-made map templates. Each map is developed around the project's purpose, its information and the audience it is intended to serve.",
    countLabel: "Services",
    formatLabel: "Formats",
    formats: "Print · Digital · Multilingual",
    items: [
      {
        t: "Atlas Development & Publishing Cartography",
        d: "Development of national, educational, thematic and reference atlases, from structure and content planning to final production.",
        tags: ["National atlases", "Reference atlases", "Thematic atlases"],
      },
      {
        t: "Educational Cartography",
        d: "Maps and geographic content for textbooks, curricula, educational atlases, publishers and educational institutions.",
        tags: ["Textbook maps", "School atlases", "Wall maps"],
      },
      {
        t: "Thematic & Data-Driven Mapping",
        d: "Statistical, demographic, economic and environmental data transformed into maps that make complex information easier to understand.",
        tags: ["Statistical", "Demographic", "Environmental"],
      },
      {
        t: "Tourism & Destination Mapping",
        d: "Maps for cities, regions, tourism destinations and the organisations that promote them.",
        tags: ["City maps", "Regional maps", "Visitor guides"],
      },
      {
        t: "Custom Cartographic Projects",
        d: "Specialised cartographic solutions designed around the nature, audience and purpose of each project.",
        tags: ["Bespoke briefs", "Print & digital", "Multilingual"],
      },
      {
        t: "GIS & Geographic Data Services",
        d: "Preparation, processing and organisation of the geographic information required for professional cartographic production.",
        tags: ["Data preparation", "Processing", "Layer structure"],
      },
    ],
    audienceLabel: "Who the studio works with",
    audienceTitle: ["Whether you know cartography", "or are just starting."],
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
    eyebrow: "Selected work & professional experience",
    title: ["Selected cartographic work", "from 34+ years of experience."],
    body: "A careful selection rather than a large collection. Some projects were produced during a previous role as Head of a Cartography Department; each one names the role held.",
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
    title: ["Mapmaking begins with", "understanding, not drawing."],
    body: "Professional cartography does not begin with graphic design. It begins with understanding the problem the map is intended to solve.",
    stageLabel: "Stage",
    stagesLabel: "Stages",
    steps: [
      { t: "Project understanding & cartographic brief", d: "Understanding the project's objective, target audience, geographic scope and the intended use of the final product.", points: ["Objective & audience", "Geographic scope", "Intended use"] },
      { t: "Data research, collection & evaluation", d: "Gathering the geographic and statistical data and reference materials required, and evaluating their accuracy and relevance.", points: ["Sources & references", "Accuracy", "Relevance"] },
      { t: "Geographic & cartographic planning", d: "Determining scale, projection, geographic extent, information hierarchy and the overall structure of the map.", points: ["Scale & projection", "Extent", "Hierarchy"] },
      { t: "Data processing & GIS preparation", d: "Organising, processing and preparing geographic data for cartographic production.", points: ["Cleaning", "Layer structure", "GIS preparation"] },
      { t: "Cartographic design", d: "Developing the visual language of the map: symbols, colour, typography, hierarchy and the presentation of geographic information.", points: ["Symbols", "Colour & type", "Visual hierarchy"] },
      { t: "Cartographic editing & quality control", d: "Reviewing geographic accuracy, place names, information, consistency, readability and visual balance.", points: ["Place names", "Consistency", "Readability"] },
      { t: "Final production & delivery", d: "Preparing the final files to the required specifications for print, digital publishing or other intended uses.", points: ["Print", "Digital publishing", "Specifications"] },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: ["Let's start your next", "cartographic project."],
    body: "Tell us about the geography, the data and the people the map is for. We reply with an approach, not a template.",
    hoursLabel: "Studio hours",
    hours: "Mon – Fri · 9:00 – 18:00 (GMT+2)",
    locationLabel: "Location",
    formTitle: "Send an enquiry",
    orgPlaceholder: "Publisher, ministry, university…",
    typePlaceholder: "Select a project type",
    optional: "optional",
    nextLabel: "What happens next",
    next: [
      { t: "We read your brief", d: "Every enquiry is read by Bilal Moubarak himself." },
      { t: "A short conversation", d: "We clarify the purpose, the audience, the scope and the data." },
      { t: "A cartographic approach", d: "You receive a proposed approach, timeline and deliverables." },
    ],
    channelsLabel: "Direct lines",
    channels: {
      email: { k: "Email", d: "Replies within two working days." },
      phone: { k: "Phone", d: "Mon – Fri, 9:00 – 18:00 (GMT+2)." },
      visit: { k: "Studio visits", v: "Beirut, Lebanon", d: "By appointment." },
      follow: { k: "Follow", d: "Work in progress and new sheets." },
    },
    briefLabel: "Writing your brief",
    briefTitle: ["A good map starts", "with a clear brief."],
    briefBody: "You do not need to know cartography. These five points help us understand the project from the first message.",
    brief: [
      { k: "Purpose", d: "What the map should help people understand or do." },
      { k: "Audience", d: "Who will read it: students, specialists, travellers or the public." },
      { k: "Geography", d: "The area covered and the level of detail it needs." },
      { k: "Material", d: "Data, references or existing maps you already have." },
      { k: "Format & timing", d: "Print, digital or both, with sizes and deadlines." },
    ],
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
    ctaTitle: ["هل لديك مشروع", "في ذهنك؟"],
    ctaBody: "أخبرنا عن الجغرافيا والبيانات والجمهور، ونردّ بمقاربة كارتوغرافية لا بقالب جاهز.",
    ctaButton: "ابدأ مشروعك",
    footerExplore: "استكشف",
    footerContact: "تواصل",
  },

  about: {
    eyebrow: "عن الستوديو",
    title: ["فنّ الكارتوغرافيا", "وعلمها."],
    body: "ستوديو بلال مبارك للخرائط ستوديو مستقل ومتخصّص، يقوم على أكثر من 34 عاماً من الخبرة المهنية في الخرائط والكارتوغرافيا.",
    facts: [
      { k: "+34", v: "عاماً في الكارتوغرافيا المهنية" },
      { k: "رئيس", v: "قسم للخرائط سابقاً" },
      { k: "بيروت", v: "ستوديو مستقل" },
    ],
    storyLabel: "الستوديو",
    storyTitle: ["امتداد لخبرة", "تراكمت عبر السنين."],
    story: [
      "الستوديو ليس مجرد خدمة لتصميم الخرائط، بل هو امتداد لمسيرة مهنية تضمّنت سنوات طويلة في قيادة قسم للخرائط والإشراف على تطوير وإنتاج مجموعة واسعة من المشاريع الكارتوغرافية.",
      "تلتقي هذه الخبرة اليوم بتقنيات نظم المعلومات الجغرافية والإنتاج الرقمي، لتجمع المعرفة الجغرافية والدقة العلمية والتفكير التحريري والتصميم البصري في كل لوحة.",
    ],
    quote: "الخريطة ليست مجرد رسم يُظهر المواقع، بل وسيلة لتنظيم المعلومات وفهم الأماكن ونقل المعرفة.",
    judgementLabel: "ما يميّز الستوديو",
    judgementTitle: ["حكم كارتوغرافي،", "لا مجرد برمجيات."],
    judgementBody: "قد تساعد البرمجيات في إنتاج الخرائط، لكن الكارتوغرافيا المهنية تعتمد على القرارات المتّخذة في كل مرحلة.",
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
      { t: "ما يُعرض وما يُحذف", d: "اختيار المعلومات التي تحتاجها الخريطة، وإزالة كل ما يزاحمها." },
      { t: "المقياس والإسقاط", d: "اختيار الإطار الذي يحفظ صدق الجغرافيا وفق هدفها." },
      { t: "الرموز والألوان والتسلسل", d: "لغة بصرية يفهمها القارئ من النظرة الأولى." },
      { t: "التراث يلتقي بالتقنية", d: "عقود من الممارسة الكارتوغرافية، تُنتَج بأدوات نظم المعلومات والأساليب الرقمية الحديثة." },
    ],
    sectorsNote:
      "تعكس هذه القطاعات مسيرة مهنية تشمل أعمالاً أُنجزت ضمن قسم خرائط سابق، ولا تُقدَّم بوصفها عملاء مباشرين للستوديو الجديد.",
  },

  services: {
    eyebrow: "الخدمات",
    title: ["حلول كارتوغرافية", "مصمّمة خصيصاً."],
    body: "لا نقدّم قوالب خرائط جاهزة. تُطوَّر كل خريطة حول هدف المشروع ومعلوماته والجمهور الذي تخدمه.",
    countLabel: "خدمات",
    formatLabel: "الصيغ",
    formats: "طباعة · رقمي · متعدد اللغات",
    items: [
      {
        t: "تطوير الأطالس وكارتوغرافيا النشر",
        d: "تطوير الأطالس الوطنية والتعليمية والموضوعية والمرجعية، من تخطيط البنية والمحتوى إلى الإنتاج النهائي.",
        tags: ["أطالس وطنية", "أطالس مرجعية", "أطالس موضوعية"],
      },
      {
        t: "الكارتوغرافيا التعليمية",
        d: "خرائط ومحتوى جغرافي للكتب المدرسية والمناهج والأطالس التعليمية ودور النشر والمؤسسات التعليمية.",
        tags: ["خرائط الكتب", "أطالس مدرسية", "خرائط جدارية"],
      },
      {
        t: "الخرائط الموضوعية والقائمة على البيانات",
        d: "تحويل البيانات الإحصائية والديموغرافية والاقتصادية والبيئية إلى خرائط تجعل المعلومات المعقّدة أسهل فهماً.",
        tags: ["إحصائية", "ديموغرافية", "بيئية"],
      },
      {
        t: "خرائط السياحة والوجهات",
        d: "خرائط للمدن والمناطق والوجهات السياحية والجهات التي تروّج لها.",
        tags: ["خرائط المدن", "خرائط إقليمية", "أدلة الزوّار"],
      },
      {
        t: "مشاريع كارتوغرافية مخصّصة",
        d: "حلول كارتوغرافية متخصّصة تُصمَّم وفق طبيعة كل مشروع وجمهوره وهدفه.",
        tags: ["موجز مخصّص", "طباعة ورقمي", "متعدد اللغات"],
      },
      {
        t: "خدمات نظم المعلومات والبيانات الجغرافية",
        d: "إعداد ومعالجة وتنظيم المعلومات الجغرافية اللازمة للإنتاج الكارتوغرافي المهني.",
        tags: ["إعداد البيانات", "المعالجة", "بنية الطبقات"],
      },
    ],
    audienceLabel: "مع من يعمل الستوديو",
    audienceTitle: ["سواء كنت تعرف الكارتوغرافيا", "أو تبدأ للتوّ."],
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
    eyebrow: "أعمال مختارة وخبرة مهنية",
    title: ["أعمال كارتوغرافية مختارة", "من أكثر من 34 عاماً من الخبرة."],
    body: "اختيار مدروس لا مجموعة كبيرة. أُنتج بعض هذه المشاريع خلال العمل رئيساً لقسم الخرائط سابقاً، ويُذكر في كل منها الدور الذي أُدّي.",
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
    title: ["صناعة الخريطة تبدأ", "بالفهم، لا بالرسم."],
    body: "لا تبدأ الكارتوغرافيا المهنية بالتصميم الغرافيكي، بل بفهم المشكلة التي يُراد للخريطة أن تحلّها.",
    stageLabel: "المرحلة",
    stagesLabel: "مراحل",
    steps: [
      { t: "فهم المشروع والموجز الكارتوغرافي", d: "فهم هدف المشروع والجمهور المستهدف والنطاق الجغرافي والاستخدام المقصود للمنتج النهائي.", points: ["الهدف والجمهور", "النطاق الجغرافي", "الاستخدام المقصود"] },
      { t: "بحث البيانات وجمعها وتقييمها", d: "جمع البيانات الجغرافية والإحصائية والمراجع المطلوبة، وتقييم دقتها وملاءمتها.", points: ["المصادر والمراجع", "الدقة", "الملاءمة"] },
      { t: "التخطيط الجغرافي والكارتوغرافي", d: "تحديد المقياس والإسقاط والامتداد الجغرافي وتسلسل المعلومات والبنية العامة للخريطة.", points: ["المقياس والإسقاط", "الامتداد", "التسلسل"] },
      { t: "معالجة البيانات وتحضير نظم المعلومات", d: "تنظيم البيانات الجغرافية ومعالجتها وتحضيرها للإنتاج الكارتوغرافي.", points: ["التنقية", "بنية الطبقات", "تحضير نظم المعلومات"] },
      { t: "التصميم الكارتوغرافي", d: "تطوير اللغة البصرية للخريطة: الرموز والألوان والخطوط والتسلسل وطريقة عرض المعلومات الجغرافية.", points: ["الرموز", "الألوان والخطوط", "التسلسل البصري"] },
      { t: "التحرير الكارتوغرافي ومراقبة الجودة", d: "مراجعة الدقة الجغرافية وأسماء الأماكن والمعلومات والاتساق والمقروئية والتوازن البصري.", points: ["أسماء الأماكن", "الاتساق", "المقروئية"] },
      { t: "الإنتاج النهائي والتسليم", d: "تحضير الملفات النهائية وفق المواصفات المطلوبة للطباعة أو النشر الرقمي أو أي استخدام آخر.", points: ["الطباعة", "النشر الرقمي", "المواصفات"] },
    ],
  },

  contact: {
    eyebrow: "تواصل",
    title: ["لنبدأ مشروعك", "الكارتوغرافي التالي."],
    body: "أخبرنا عن الجغرافيا والبيانات والجمهور الذي تُصنع له الخريطة، ونردّ بمقاربة لا بقالب جاهز.",
    hoursLabel: "ساعات العمل",
    hours: "الإثنين – الجمعة · 9:00 – 18:00 (GMT+2)",
    locationLabel: "الموقع",
    formTitle: "أرسل استفساراً",
    orgPlaceholder: "دار نشر، وزارة، جامعة…",
    typePlaceholder: "اختر نوع المشروع",
    optional: "اختياري",
    nextLabel: "ماذا يحدث بعد ذلك",
    next: [
      { t: "نقرأ موجزك", d: "يقرأ بلال مبارك كل استفسار بنفسه." },
      { t: "محادثة قصيرة", d: "نوضّح الهدف والجمهور والنطاق والبيانات." },
      { t: "مقاربة كارتوغرافية", d: "تتلقّى مقاربة مقترحة وجدولاً زمنياً والمخرجات." },
    ],
    channelsLabel: "قنوات مباشرة",
    channels: {
      email: { k: "البريد الإلكتروني", d: "نردّ خلال يومَي عمل." },
      phone: { k: "الهاتف", d: "الإثنين – الجمعة، 9:00 – 18:00 (GMT+2)." },
      visit: { k: "زيارة الستوديو", v: "بيروت، لبنان", d: "بموعد مسبق." },
      follow: { k: "تابعنا", d: "أعمال قيد الإنجاز ولوحات جديدة." },
    },
    briefLabel: "كتابة الموجز",
    briefTitle: ["الخريطة الجيدة تبدأ", "بموجز واضح."],
    briefBody: "لا تحتاج إلى معرفة بالكارتوغرافيا. تساعدنا هذه النقاط الخمس على فهم المشروع من الرسالة الأولى.",
    brief: [
      { k: "الهدف", d: "ما الذي يجب أن تساعد الخريطة الناس على فهمه أو فعله." },
      { k: "الجمهور", d: "من سيقرؤها: طلاب أو متخصصون أو مسافرون أو عامة الناس." },
      { k: "الجغرافيا", d: "المنطقة المشمولة ومستوى التفصيل المطلوب." },
      { k: "المواد", d: "البيانات أو المراجع أو الخرائط المتوفّرة لديك." },
      { k: "الصيغة والتوقيت", d: "طباعة أو رقمي أو كلاهما، مع المقاسات والمواعيد." },
    ],
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
