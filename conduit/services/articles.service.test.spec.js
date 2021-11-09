const { iteratee } = require('lodash');
const { ServiceBroker, Context } = require('moleculer');
const articlesService = require('./articles.service.js');
const usersService = require('./users.service.js');
const favoritesService = require('./favorites.service.js');

describe("Test articles service", () => {
    describe ("test service actions", () => {
        const broker = new ServiceBroker();
        broker.createService(articlesService);
        broker.createService(usersService); //should be a mock
        broker.createService(favoritesService); //should be a mock

        beforeAll(async() => {
            await broker.start();
        });

        afterAll(async() =>{
            broker.stop();
        });

        describe("test action Create",() =>{
            it('should create an article Happy Day', async () => {
                const testUserName = 't123';
                const testTitle = '1234';
                const ctx = { 
                     meta: {
                        user: {
                             _id: '19II6j1xReKznHsS',
                            username: testUserName,
                            email: 'tes@test.test',
                            image: null
                        },
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5SUk2ajF4UmVLem5Ic1MiLCJ1c2VybmFtZSI6InQxMjMiLCJleHAiOjE2NDE2MjYwMjAsImlhdCI6MTYzNjQ0MjAyMH0.ApshC6gC8XoyY0GuIEeTR9GGZbhQBAGr-kYsyMuYhBk',
                        userID: '19II6j1xReKznHsS'
                    }
                };
                const result = await  broker.call('articles.create',  {article:{title: testTitle, description: '456678', body: '989876', tagList: Array(0)}},ctx);
                expect(result).toEqual(
                    {
                        "article": {
                            "_id": expect.anything(), 
                            "author": {
                                "bio": "", 
                                "image": null, 
                                "username": testUserName
                            },
                            "body": "989876",
                            "createdAt": expect.anything(), 
                            "description": "456678",
                            "favorited": false,
                            "favoritesCount": 0,
                            "slug": expect.anything(),
                            "tagList": [],
                            "title": testTitle,
                            "updatedAt": expect.anything()
                        }
                    });
 
            })
        });
    });
}
)
