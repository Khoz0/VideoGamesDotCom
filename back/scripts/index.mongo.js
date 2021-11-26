

db.getCollection('people').createIndex(
    {pseudo: 1},
    {unique: true}
);

db.getCollection('people').createIndex(
    {mail: 1},
    {unique: true}
);