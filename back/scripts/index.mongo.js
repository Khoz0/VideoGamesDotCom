

db.getCollection('people').createIndex(
    {pseudo: 1},
    {unique: true}
);

db.getCollection('people').createIndex(
    {mail: 1},
    {unique: true}
);

db.getCollection('games').createIndex(
    {title: 1},
    {unique: true}
);

db.getCollection('discussions').createIndex(
    {_id: 1},
    {unique: true}
);

db.getCollection('posts').createIndex(
    {_id: 1},
    {unique: true}
);

db.getCollection('actualites').createIndex(
    {title: 1},
    {unique: true}
);