
db.getCollection('people').insertMany([
    {
        pseudo: 'DJ',
        mail: "DJ@gmail.com",
        password: "Test123"
    },
    {
        pseudo: 'LS',
        mail: "LS@gmail.com",
        password: "123Test"
    },
    {
        pseudo: 'LD',
        mail: "LD@gmail.com",
        password: "T123est"
    },
]);

db.getCollection('people').find({});