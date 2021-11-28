
db.getCollection('people').insertMany([
    {
        pseudo: 'DJ',
        mail: "DJ@gmail.com",
        password: "Test123",
        role: "Admin"
    },
    {
        pseudo: 'LS',
        mail: "LS@gmail.com",
        password: "123Test",
        role: "User"
    },
    {
        pseudo: 'LD',
        mail: "LD@gmail.com",
        password: "T123est",
        role: "User"
    },
]);

db.getCollection('people').find({});