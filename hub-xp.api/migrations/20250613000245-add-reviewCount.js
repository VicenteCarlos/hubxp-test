module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('books').updateMany(
      { reviewCount: { $exists: false } },
      {
        $set: { reviewCount: 1 },
      },
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Remove os livros inseridos pela migration
    await db.collection('books').deleteMany({
      name: {
        $in: [
          'Clean Code',
          'Domain-Driven Design',
          'Refactoring',
          'Design Patterns',
          'Pragmatic Programmer',
        ],
      },
    });

    // Remove o campo reviewCount de todos os outros livros
    await db.collection('books').updateMany(
      {},
      {
        $unset: { reviewCount: '' },
      },
    );
  },
};
