export const castles = [
  {
    id: 'versailles',
    name: 'Versailles',
    fullName: 'Château de Versailles',
    region: 'Île-de-France',
    constructed: 1631,
    style: 'French Baroque',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Versailles-Chateau-Jardins02.jpg',
    seedParams: { chaos: 0.8, scaleVariance: 3.0, hue: 45, fontFamily: '"Syne", sans-serif' },
    en: {
      philosophy: 'Spectacle',
      question: 'Do you crave the intoxication of absolute power — the gilded cage where every mirror reflects your glory?',
      description: 'Originally a humble hunting lodge, transformed by the Sun King into the absolute epicenter of French royal power. A monument to unimaginable luxury and the ultimate expression of absolute monarchy. To live here is to live as performance — every meal, every step, every breath observed and choreographed.',
      dailyLife: {
        morning: 'You wake at 7:30 in the Chambre du Roi. Sunlight floods through 357 mirrors in the Grande Galerie. A valet draws your curtains. Your day is already choreographed — every gesture is a political act.',
        afternoon: 'Lunch is a spectacle: 30 courses, eaten in public. Courtiers watch you chew. After, you stroll the 800-hectare gardens designed by Le Nôtre — each fountain a statement of your dominion over nature itself.',
        evening: 'Opera at the Royal Chapel, then a masked ball in the Hall of Mirrors. You retire at midnight, but the palace never sleeps. Intrigue hums through 2,300 rooms like electricity.',
      },
      career: {
        title: 'The Path to Versailles',
        paths: [
          { role: 'Sovereign Wealth Fund Director', salary: '€800K–€2M/yr', years: '20+ years in global finance' },
          { role: 'Dynasty Heir / Old Money', salary: 'Inherited capital > €500M', years: 'Born into it' },
          { role: 'Tech Empire Founder (post-exit)', salary: 'Exit > €1B', years: '15–25 years building' },
        ],
        estimatedCost: '€2B+ (national treasure, cannot be purchased — but you can lease wings for €50K/night)',
        reality: 'Versailles is owned by the French Republic. The closest modern equivalent: building your own palace. Budget: €200M minimum for land, construction, and staff of 200+.',
      }
    },
    ja: {
      philosophy: '狂騒と権力',
      question: 'すべての鏡があなたの栄光を映し出す、黄金の鳥籠。絶対的な権力の陶酔を渇望しますか？',
      description: '質素な狩猟小屋から、太陽王によってフランス王権の絶対的中心地へと変貌した宮殿。想像を絶する贅沢の記念碑であり、絶対王政の究極の表現。ここに住むということは、人生そのものが「演劇」になるということだ。',
      dailyLife: {
        morning: '朝7時30分、王の寝室で目覚める。「鏡の間」の357枚の鏡に朝日が反射する。従者がカーテンを開く。あなたの一日はすでに振り付けられており、すべての仕草が政治的行為となる。',
        afternoon: '昼食はもはやショーだ。30品のコース料理を公開で食べる。廷臣たちがあなたの咀嚼を見つめる。その後、ル・ノートルが設計した800ヘクタールの庭園を散策する。',
        evening: '王室礼拝堂でのオペラ、そして仮面舞踏会。深夜に床に就くが、宮殿が眠ることはない。2,300の部屋には常に陰謀の熱気が渦巻いている。',
      },
      career: {
        title: 'ヴェルサイユへの道',
        paths: [
          { role: '政府系ファンド(SWF) 理事', salary: '年収1億〜3億円', years: '国際金融で20年以上の実績' },
          { role: '財閥の御曹司・令嬢', salary: '継承資産 800億円以上', years: '生まれながらにして' },
          { role: '巨大IT企業創業者 (イグジット後)', salary: '売却益 1500億円以上', years: '15〜25年の事業構築' },
        ],
        estimatedCost: '3000億円以上（国宝のため購入不可。ただし1泊800万円で一部貸切可能）',
        reality: 'ヴェルサイユ宮殿はフランス共和国の所有物だ。現代でこれに最も近いのは、自らの宮殿をゼロから建てること。土地・建築・200人以上の使用人を雇うための最低予算は約300億円。',
      }
    }
  },
  {
    id: 'chambord',
    name: 'Chambord',
    fullName: 'Château de Chambord',
    region: 'Loire Valley',
    constructed: 1519,
    style: 'French Renaissance',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Aerial_image_of_Ch%C3%A2teau_de_Chambord_%28view_from_the_southeast%29.jpg',
    seedParams: { chaos: 0.5, scaleVariance: 2.0, hue: 210, fontFamily: '"Cinzel", serif' },
    en: {
      philosophy: 'Solitude',
      question: 'Do you seek the silence of a vast forest, where architecture itself becomes a riddle?',
      description: 'A masterpiece of the French Renaissance, born from the dreams of King Francis I. Its distinctive roofline and double-helix staircase suggest the genius of Leonardo da Vinci. It stands solitary within Europe\'s largest enclosed forest park. To live here is to live in contemplation — surrounded by geometry and wilderness.',
      dailyLife: {
        morning: 'Dawn breaks over 5,440 hectares of forest. Deer move through the mist outside your window. You descend the double-helix staircase — designed so two people can traverse it without ever meeting.',
        afternoon: 'You read in the library, surrounded by 440 rooms, most of them empty. The silence is architectural. You ride horses through ancient hunting grounds where François I once pursued wild boar.',
        evening: 'A fire in the grand fireplace — one of 365 in the château. You dine alone, or with one chosen companion. The roofline above you is a forest of towers, a stone skyline for one.',
      },
      career: {
        title: 'The Path to Chambord',
        paths: [
          { role: 'Bestselling Author / Philosopher', salary: '€2M–€10M from royalties', years: '10–20 years of literary output' },
          { role: 'Remote Tech Architect', salary: '€400K–€800K/yr', years: '15 years in distributed systems' },
          { role: 'Vineyard Owner', salary: '€5M–€50M estate value', years: '20+ years building a domaine' },
        ],
        estimatedCost: 'State-owned. Similar Loire Valley châteaux: €2M–€15M. Maintenance: €300K–€1M/yr.',
        reality: 'You can buy a comparable Loire château with 10–50 rooms for €3M–€8M. The real cost is the solitude — are you ready for 440 empty rooms and your own thoughts?',
      }
    },
    ja: {
      philosophy: '孤高と沈思',
      question: '広大な森の静寂と、建築そのものが謎解きとなるような、絶対的な孤独を求めますか？',
      description: 'フランソワ1世の夢から生まれたフランス・ルネサンスの最高傑作。その特徴的な屋根のシルエットと二重らせん階段は、レオナルド・ダ・ヴィンチの天才的な構想を示唆している。ヨーロッパ最大の森林公園の中にポツンと佇む。ここに住むということは、幾何学と大自然に囲まれた「沈思黙考」の生活だ。',
      dailyLife: {
        morning: '5,440ヘクタールの森に夜明けが訪れる。窓の外では霧の中を鹿が動く。あなたは二重らせん階段を降りる——二人の人間がすれ違うことなく昇り降りできる設計だ。',
        afternoon: '図書室で読書をする。周囲には440もの部屋があるが、そのほとんどは空っぽだ。沈黙が建物を満たしている。かつて王がイノシシを追った古代の狩猟場を馬で駆ける。',
        evening: '城内にある365の暖炉の一つに火をくべる。一人で、あるいはただ一人の選ばれた同伴者とともに夕食をとる。頭上の複雑な屋根は、あなただけのための「石のスカイライン」だ。',
      },
      career: {
        title: 'シャンボールへの道',
        paths: [
          { role: '世界的ベストセラー作家', salary: '印税収入 3億〜15億円', years: '10〜20年の執筆活動' },
          { role: 'フルリモートの天才アーキテクト', salary: '年収 6000万〜1.2億円', years: '分散システムの設計に15年' },
          { role: 'シャトー・ワイナリーのオーナー', salary: '資産価値 10億〜80億円', years: 'ドメーヌの育成に20年以上' },
        ],
        estimatedCost: '国有財産。類似のロワール地方の古城：3億〜20億円。維持費：年5000万〜1.5億円',
        reality: '10〜50部屋程度のロワール渓谷の城なら4億〜12億円で購入可能だ。しかし本当の代償は「孤独」である。あなたは440の空き部屋と、自分自身の思考だけに向き合う覚悟があるか？',
      }
    }
  },
  {
    id: 'chenonceau',
    name: 'Chenonceau',
    fullName: 'Château de Chenonceau',
    region: 'Loire Valley',
    constructed: 1514,
    style: 'Renaissance / Gothic',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Chateau_de_Chenonceau_2008E_%28adjusted2%29.jpg',
    seedParams: { chaos: 0.3, scaleVariance: 1.5, hue: 320, fontFamily: '"Cormorant Garamond", serif' },
    en: {
      philosophy: 'Grace',
      question: 'Do you dream of a life suspended between earth and water — shaped not by kings but by the women who outlasted them?',
      description: 'Known as the "Château des Dames." Gracefully spanning the River Cher, it was shaped by powerful women including Diane de Poitiers and Catherine de\' Medici. An architectural jewel floating on water. To live here is to live in elegance — where power wears silk, not armor.',
      dailyLife: {
        morning: 'You wake to the sound of the River Cher flowing beneath your bedroom. Light ripples on the ceiling — reflections from the water below. You tend the garden Diane de Poitiers designed 500 years ago.',
        afternoon: 'You host a small salon of artists and thinkers in the Grande Galerie — the longest room built over water in Europe. Conversation drifts like the river. You serve wine from the château\'s own vines.',
        evening: 'Candlelight dinner in the intimate dining room. The bridge below glows in the dusk. You walk the gardens at twilight, where Catherine de\' Medici once plotted the future of France.',
      },
      career: {
        title: 'The Path to Chenonceau',
        paths: [
          { role: 'Art World Maven / Gallery Owner', salary: '€1M–€5M/yr', years: '15 years building cultural capital' },
          { role: 'Luxury Brand Creative Director', salary: '€500K–€1.5M/yr', years: '12–18 years in fashion/design' },
          { role: 'Diplomatic / Cultural Attaché', salary: '€200K + residence benefits', years: '20 years in international relations' },
        ],
        estimatedCost: 'Privately owned (Menier family). Similar river châteaux: €5M–€20M.',
        reality: 'Chenonceau is the most-visited private château in France. To live this life, find a waterside château in the Loire — budget €4M–€12M. Staff of 8–15 for gardens and upkeep.',
      }
    },
    ja: {
      philosophy: '優雅と調和',
      question: '大地と水の中間に浮かぶような生活を夢見ますか？王たちではなく、彼らより長く生きた女性たちが形作った美の世界を。',
      description: '「貴婦人たちの城」として知られる。シェール川を優雅に跨ぐこの城は、ディアーヌ・ド・ポワチエやカトリーヌ・ド・メディシスなど、強力な女性たちによって形作られた。水に浮かぶ建築の宝石。ここに住むということは、武具ではなくシルクを纏う「エレガンスの権力」を生きることだ。',
      dailyLife: {
        morning: '寝室の下を流れるシェール川のせせらぎで目を覚ます。水面からの反射光が天井で揺らめいている。500年前に設計された庭園を手入れする。',
        afternoon: 'ヨーロッパで最も長い、水上のギャラリーで芸術家や思想家を招いて小さなサロンを開く。川の流れのように会話が漂う。城の敷地内で造られたワインを振る舞う。',
        evening: '親密なダイニングルームでのキャンドルライト・ディナー。夕暮れ時、眼下の橋が仄かに光る。かつて王妃がフランスの未来を画策した黄昏の庭園を散歩する。',
      },
      career: {
        title: 'シュノンソーへの道',
        paths: [
          { role: '国際的なトップギャラリスト', salary: '年収 1.5億〜7億円', years: '文化資本の構築に15年' },
          { role: 'ラグジュアリーブランドのCD', salary: '年収 7000万〜2億円', years: 'ファッション界で15年のキャリア' },
          { role: '外交官 / 文化大使', salary: '年収 3000万円＋歴史的公邸', years: '国際関係・外交での20年' },
        ],
        estimatedCost: '個人所有（ムニエ家）。類似の水上・川辺の城：7億〜30億円',
        reality: 'シュノンソーはフランスで最も訪問者の多い私有の城だ。この生活を実現するには、ロワール地方の水辺の城を探すこと。予算は6億〜18億円。庭園と建物の維持に8〜15人のスタッフが必要になる。',
      }
    }
  },
  {
    id: 'fontainebleau',
    name: 'Fontainebleau',
    fullName: 'Château de Fontainebleau',
    region: 'Île-de-France',
    constructed: 1137,
    style: 'Renaissance / Classical',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Ch%C3%A2teau_de_Fontainebleau_%28Fontainebleau%29_edited_%281%29.jpg',
    seedParams: { chaos: 0.9, scaleVariance: 4.0, hue: 15, fontFamily: '"Syne", sans-serif' },
    en: {
      philosophy: 'Endurance',
      question: 'Do you long for continuity — to inhabit a place that has witnessed every revolution, every empire, every collapse, and still stands?',
      description: 'The true home of French kings, continuously inhabited for eight centuries. Napoleon called it "the true home of kings, the house of ages." Its sprawling, organic architecture tells the entire history of France in stone. To live here is to live inside history itself — accumulating, never erasing.',
      dailyLife: {
        morning: 'You walk through rooms where every French monarch from Louis VII to Napoleon III has slept. Each corridor is a different century. Your morning coffee is in a room that was medieval, then Renaissance, then Baroque — all at once.',
        afternoon: 'You study in Napoleon\'s private library — 16,000 volumes he personally selected. The forest of Fontainebleau, 25,000 hectares, is your backyard. You climb the same sandstone boulders artists have climbed since the Barbizon School.',
        evening: 'Dinner in a room where Napoleon signed his abdication. The weight of history is literal here — 1,500 rooms accumulated over 800 years. You don\'t own this place. It owns you.',
      },
      career: {
        title: 'The Path to Fontainebleau',
        paths: [
          { role: 'INSEAD Professor / Dean', salary: '€300K–€700K/yr', years: 'INSEAD is located in Fontainebleau' },
          { role: 'Heritage Foundation Director', salary: '€150K–€400K + prestige', years: '20 years in cultural preservation' },
          { role: 'Multi-generational Family Office', salary: 'Family capital > €100M', years: '3+ generations of stewardship' },
        ],
        estimatedCost: 'State-owned. Regional equivalent châteaux: €1.5M–€8M.',
        reality: 'The Fontainebleau life is about accumulation over time, not a single purchase. Buy a nearby château for €2M–€5M, then spend decades making it yours — layer by layer, generation by generation.',
      }
    },
    ja: {
      philosophy: '継承と耐久',
      question: 'すべての革命、帝国、崩壊を見届け、なおも立ち続ける場所。そんな永続性の中に身を置きたいですか？',
      description: '8世紀にわたり王たちが住み続けた、真のフランス王室の居城。ナポレオンはここを「王たちの真の家、世紀の家」と呼んだ。無秩序に増築された有機的な建築は、フランスの全歴史を石で語っている。ここに住むということは、歴史そのものの中に生きるということだ。決して消し去らず、蓄積し続ける人生。',
      dailyLife: {
        morning: 'ルイ7世からナポレオン3世まで、すべての君主が眠った部屋を歩く。廊下を曲がるごとに世紀が変わる。中世からルネサンス、そしてバロックへと変貌を遂げた部屋でモーニングコーヒーを飲む。',
        afternoon: 'ナポレオンが個人的に選んだ1万6000冊の蔵書がある私室で学ぶ。2万5000ヘクタールのフォンテーヌブローの森があなたの裏庭だ。バルビゾン派の画家たちが愛した砂岩の巨岩を登る。',
        evening: 'ナポレオンが退位を署名した部屋で夕食をとる。歴史の重みはここでは物理的だ。800年かけて蓄積された1,500の部屋。あなたがこの場所を所有するのではない。この場所があなたを所有するのだ。',
      },
      career: {
        title: 'フォンテーヌブローへの道',
        paths: [
          { role: 'INSEADビジネススクール 学長/教授', salary: '年収 4500万〜1億円', years: '（同校はフォンテーヌブローに所在）' },
          { role: '文化遺産財団のディレクター', salary: '年収 2000万〜6000万円＋名誉', years: '文化保存活動に20年' },
          { role: '歴史的ファミリーオフィス（一族）', salary: '一族の資産 150億円以上', years: '3世代以上の資産継承と管理' },
        ],
        estimatedCost: '国有財産。近郊の同規模の城：2億〜12億円',
        reality: 'フォンテーヌブローの生活とは、単発の購入ではなく「時間の蓄積」である。近郊の城を3億〜7億円で購入し、そこから何十年もかけて自分の色を重ねていく。世代を超えて受け継ぐ覚悟が必要だ。',
      }
    }
  }
];
