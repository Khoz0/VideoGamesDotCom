
db.getCollection('people').insertMany([
    {
        firstname: 'Jean',
        lastname:  'Durand',
        pseudo: 'DJ',
        mail: "DJ@gmail.com",
        password: "Test123"
    },
    {
        firstname: 'Louis',
        lastname:  'Soleil',
        pseudo: 'LS',
        mail: "LS@gmail.com",
        password: "123Test"
    },
    {
        firstname: 'Lucie',
        lastname:  'Denvers',
        pseudo: 'LD',
        mail: "LD@gmail.com",
        password: "T123est"
    },
]);

db.getCollection('people').find({});