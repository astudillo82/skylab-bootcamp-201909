require('dotenv').config() 
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const  logic  = require('..')
const { random } = require('rock-util')

const { database, ObjectId, models: { User, Post} } = require('rock-data')
debugger
random()

describe('Logic - Retrieve Post', () => {
    before (() => database.connect(TEST_DB_URL))

    let id, name, surname, username, email,password, post_ids, title, description

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

        const insertion = []
        
        for (let i = 0; i < 10; i++) {
            const posts = {               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId(id)               
            } 

            insertion.push(Post.create(posts).then(post => post_ids.push(post.id)))

            title.push(posts.title)
            description.push(posts.description)
            owner.push(posts.owner)            
        }

        for (let i = 0; i < 10; i++) {
            insertion.push(Post.create({               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId()
            }))
        }        
        await Promise.all(insertion)
    })

    it('should to get correct user and post data', async() => {debugger
       
        const postId = post_ids.random()

        const response = await logic.retrievePost(id, postId)
        expect(response).to.not.exist

     
        const post = await Post.findById(id)
        expect(post).to.not.exist        
        
    })

    it('Should to fail or unexisting user and correct post data', async () => {
       
        const id = ObjectId().toString()
        const postId = post_ids.random()

        try {
            await logic.retrievePost(id,postId)           
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }

    })

    it('Should to fail on correct user and unexisting post data', async () => {
        const postId = ObjectId().toString()
        
        try {
            await logic.retrievePost(id,postId)            

            
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not match to post with id ${postId}`)
        }

    })
 
    it('Should to fail on correct user and wrong post data', async () => {
        const postId = ObjectId().toString()
        
        try {
            await logic.retrievePost(id,postId)                       
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not match to post with id ${postId}`)
        }

    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))
})

