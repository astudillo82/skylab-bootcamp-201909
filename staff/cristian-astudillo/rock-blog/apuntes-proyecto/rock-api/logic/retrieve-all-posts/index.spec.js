require('dotenv').config() 
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const  logic  = require('..')
const { database, ObjectId, models: { User, Post} } = require('rock-data')


describe('Logic - Retrieve All Posts', () =>{
    before (() => database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password, title, description

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`

        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({name, surname, username, email, password})
        id = user.id  

        post_ids = []
        title = []
        description = []
        owner = []

        const insertions = []

        for (let i = 0; i < 10; i++) {
            const posts = {               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId(id)               
            }    

            insertions.push(Post.create(posts).then(post => post_ids.push(post.id)))

            title.push(posts.title)
            description.push(posts.description)
            owner.push(posts.owner)
        }

        for (let i = 0; i < 10; i++) {
            insertions.push(Post.create({               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId()
            }))
        }
        
        await Promise.all(insertions)

    })

    it(`should to get correct user and posts data`, async() => {
        const posts = await logic.retrieveAllPosts(id)        
        expect(posts).to.exist
        expect(posts).to.have.lengthOf(10)
        
        posts.forEach(post => {
            expect(post.id).to.exist
            expect(post.id).to.be.a('string')
            expect(post.id).to.have.length.greaterThan(0)   

            expect(post.owner).to.equal(id)

            expect(post.title).to.exist
            expect(post.title).to.be.a('string')
            expect(post.title).to.have.length.greaterThan(0)    

            expect(post.description).to.exist
            expect(post.description).to.be.a('string')
            expect(post.description).to.have.length.greaterThan(0) 
        })
    })   
    
    
    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})
