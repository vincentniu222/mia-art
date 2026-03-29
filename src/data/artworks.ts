export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Artwork {
  id: string;
  src: string;
  title: { zh: string; en: string };
  season: Season;
  description?: { zh: string; en: string };
}

export const artworks: Artwork[] = [
  // Spring 春
  {
    id: 'narcissus',
    src: '/artworks/spring/narcissus.jpg',
    title: { zh: '水仙花', en: 'Narcissus' },
    season: 'spring',
  },
  {
    id: 'poppies',
    src: '/artworks/spring/poppies.jpg',
    title: { zh: '虞美人', en: 'Poppies' },
    season: 'spring',
  },
  {
    id: 'fortune-horse',
    src: '/artworks/spring/fortune-horse.jpg',
    title: { zh: '马上有福', en: 'Fortune Horse' },
    season: 'spring',
    description: { zh: '新年贺卡', en: 'Chinese New Year greeting' },
  },
  // Summer 夏
  {
    id: 'sunflowers',
    src: '/artworks/summer/sunflowers.jpg',
    title: { zh: '向日葵', en: 'Sunflowers' },
    season: 'summer',
  },
  {
    id: 'lobster',
    src: '/artworks/summer/lobster.jpg',
    title: { zh: '小龙虾', en: 'Lobster' },
    season: 'summer',
  },
  {
    id: 'zongzi',
    src: '/artworks/summer/zongzi.jpg',
    title: { zh: '粽子与咸鸭蛋', en: 'Zongzi & Salted Eggs' },
    season: 'summer',
    description: { zh: '端午节', en: 'Dragon Boat Festival' },
  },
  {
    id: 'skewers',
    src: '/artworks/summer/skewers.jpg',
    title: { zh: '烤串', en: 'Grilled Skewers' },
    season: 'summer',
  },
  // Autumn 秋
  {
    id: 'rabbit-mooncake',
    src: '/artworks/autumn/rabbit-mooncake.jpg',
    title: { zh: '玉兔与月饼', en: 'Rabbit & Mooncake' },
    season: 'autumn',
    description: { zh: '中秋节', en: 'Mid-Autumn Festival' },
  },
  {
    id: 'rooster',
    src: '/artworks/autumn/rooster.jpg',
    title: { zh: '公鸡', en: 'Rooster' },
    season: 'autumn',
  },
  {
    id: 'lion',
    src: '/artworks/autumn/lion.jpg',
    title: { zh: '狮子', en: 'Lion' },
    season: 'autumn',
  },
  // Winter 冬
  {
    id: 'santa',
    src: '/artworks/winter/santa.jpg',
    title: { zh: '圣诞老人', en: 'Sleeping Santa' },
    season: 'winter',
  },
  {
    id: 'polar-bears',
    src: '/artworks/winter/polar-bears.jpg',
    title: { zh: '北极熊', en: 'Polar Bears' },
    season: 'winter',
  },
  {
    id: 'puppy',
    src: '/artworks/winter/puppy.jpg',
    title: { zh: '小狗', en: 'Puppy' },
    season: 'winter',
  },
];

export const seasons: { key: Season; title: { zh: string; en: string }; subtitle: { zh: string; en: string } }[] = [
  { key: 'spring', title: { zh: '春', en: 'Spring' }, subtitle: { zh: '万物生长', en: 'Everything Grows' } },
  { key: 'summer', title: { zh: '夏', en: 'Summer' }, subtitle: { zh: '热烈绽放', en: 'In Full Bloom' } },
  { key: 'autumn', title: { zh: '秋', en: 'Autumn' }, subtitle: { zh: '丰收时节', en: 'Harvest Time' } },
  { key: 'winter', title: { zh: '冬', en: 'Winter' }, subtitle: { zh: '温暖如初', en: 'Warm As Ever' } },
];
