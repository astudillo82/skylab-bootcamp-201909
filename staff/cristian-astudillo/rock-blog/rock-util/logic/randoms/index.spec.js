const { expect } = require("chai") 
const random = require('./index')

describe.only('Util - Randoms', () => {
    describe('...OnlyOne', () => {         
        it('should to return a random number if the arguments are correct values', () => {
            const response = random.integer(1,89)
            expect(response).to.equal(response)
            expect(response).to.be.greaterThan(0)
        })

        it('should to return error if the arguments are voids', () => {          
            expect(() => random.integer()).to.throw(Error, 'The arguments are voids')
        })

        it('should to return error if the arguments are float numbers', () => {
            expect(()=> random.integer(4.6, 8)).to.throw(Error, 'One or two of them are float numbers')
        })         
    })    

    describe ('...Array', () => {
        it('should to return a random number if the arguments are correct values', () => {
            const response = random.array(['a','n','u'])

            expect(response).to.have.lengthOf(3);            
            expect(response).to.equal(response)
           
        })

        it('should to return error if the arguments are voids', () => {          
            expect(() => random.array()).to.throw(Error, 'The arguments are voids')
        })       
    })   
})       




 
            