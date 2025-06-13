module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    const collection = db.collection('books');

    const initialBooks = [
      {
        name: 'Dom Casmurro',
        author: 'Machado de Assis',
        avaliation: 5,
        description: 'Um clássico da literatura brasileira',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await collection.insertMany(initialBooks);

    const now = new Date();

    await collection.updateMany(
      { name: { $exists: false } },
      { $set: { name: '' } },
    );

    await collection.updateMany(
      { author: { $exists: false } },
      { $set: { author: '' } },
    );

    await collection.updateMany(
      { avaliation: { $exists: false } },
      { $set: { avaliation: 0 } },
    );

    await collection.updateMany(
      { description: { $exists: false } },
      { $set: { description: '' } },
    );

    await collection.updateMany(
      { created_at: { $exists: false } },
      { $set: { created_at: now } },
    );

    await collection.updateMany(
      { updated_at: { $exists: false } },
      { $set: { updated_at: now } },
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    await db.collection('books').deleteMany({});
  }
};
