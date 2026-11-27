const { MongoClient, ObjectId } = require('mongodb');

if (process.env.GITHUB_ACTIONS !== 'true' || process.env.PORTFOLIO_CI_FIXTURE !== '1') {
  throw new Error('The portfolio fixture may run only in the CI MongoDB service');
}
const uri = process.env.DB_CONN_STRING || '';
const port = process.env.PORTFOLIO_CI_MONGO_PORT || '27017';
if (!/^\d{4,5}$/.test(port) || !new RegExp(`^mongodb://(?:127\\.0\\.0\\.1|localhost):${port}(?:/|\\?|$)`).test(uri)) throw new Error('CI fixture requires loopback MongoDB');
const id = suffix => new ObjectId(`0000000000000000000000${suffix}`);
const project = (suffix, title, technology) => ({
  _id: id(suffix), title, brief: `${technology} backend project with accessible interfaces and secure service boundaries.`,
  description: `Implementation details for ${title}: validation, reliability, and deployment decisions.`,
  image_url: '/projectImages/myPortfolio.png', priority: Number(suffix), date: '2026',
  deployed_url: 'https://example.com', github_url: 'https://github.com/GreenJ84', categories: ['Backend'], key_techs: [technology],
});
(async () => {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db('PersonalPortfolio');
    if ((await db.listCollections({}, { nameOnly: true }).toArray()).some(item => ['project', 'certification', 'skill'].includes(item.name))) {
      throw new Error('Refusing to seed a non-empty portfolio database');
    }
    await db.collection('project').insertMany([
      project('01', 'Rust Service', 'Rust'), project('02', 'TypeScript Platform', 'TypeScript'), project('03', 'Python Automation', 'Python'),
    ]);
    await db.collection('certification').insertOne({ _id: id('04'), title: 'SecurityX', brief: 'CompTIA', image_url: '/assets/load_icon.svg', description: 'Advanced security', priority: 1, date: '2026', url: 'https://example.com', techs: ['Security'] });
    await db.collection('education').insertOne({ _id: id('05'), title: 'M.S. Cybersecurity', brief: 'WGU', image_url: '/assets/load_icon.svg', description: 'Cybersecurity and Information Assurance', url: 'https://example.com', start_date: new Date('2025-01-01T00:00:00Z'), end_date: new Date('2025-10-31T00:00:00Z'), details: ['Security'] });
    await db.collection('work').insertOne({ _id: id('06'), title: 'Backend Engineer', brief: 'Example', image_url: '/assets/load_icon.svg', primary: true, location: 'Remote', start_date: '2025-01', details: ['Rust services'] });
    await db.collection('resume').insertOne({ _id: id('07'), title: 'Backend Resume', brief: '/assets/resumes/JesseGreenough.React.Resume_03.png', image_url: '/assets/resumes/JesseGreenough.React.Resume_03.png', download: '/assets/resumes/JesseGreenough.React.Resume_03.pdf', categories: ['Backend'] });
    await db.collection('skill').insertMany([
      { _id: id('08'), title: 'Rust', name: 'Rust', brief: '', image_url: 'Rust', category: 'languages', rating: 4, sortOrder: 0, visible: true, normalizedName: 'rust' },
      { _id: id('09'), title: 'TypeScript', name: 'TypeScript', brief: '', image_url: 'TypeScript', category: 'languages', rating: 5, sortOrder: 1, visible: true, normalizedName: 'typescript' },
    ]);
    console.log('Seeded disposable CI portfolio fixture');
  } finally { await client.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
