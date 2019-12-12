const { expect } = require("chai") 
const validate = require('./index')

describe('Validate - To validate the correct dates...', () => {

    describe('Some strings...', () => {
        it('In case if it is correct data return undefined', () => {
            const str = 'r'
            const response = validate.string(str)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error', () => {
            expect(() => validate.string(str)).to.throw(Error, 'str is not defined')
            expect(() => validate.string(undefined)).to.throw(Error, 'undefined is not a string')
            expect(() => validate.string(true)).to.throw(Error, 'true is not a string')
            expect(() => validate.string(false)).to.throw(Error , 'false is not a string')
            expect(() => validate.string([])).to.throw(Error , ' is not a string')
            expect(() => validate.string({})).to.throw(Error , '[object Object] is not a string')
        })
    })

    describe('Some numbers...', () => {
        it('In case if it is correct number return undefined', () => {
            const num = 5

            const response = validate.number(num)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error', () => {
            expect(() => validate.number('a')).to.throw(Error, 'a is not a number')
            expect(() => validate.number(true)).to.throw(Error, 'true is not a number')
            expect(() => validate.number(false)).to.throw(Error , 'false is not a number')
            expect(() => validate.number([])).to.throw(Error , ' is not a number')
            expect(() => validate.number({})).to.throw(Error , '[object Object] is not a number')
        })
    })

    describe('Some booleans...', () => {        
        it( 'In case if it is correct boolean return undefined', () =>{
            const bool = true
            const response = validate.boolean(bool)

            expect(response).to.be.undefined
        })
        
        it('In case if it is incorrect data return Error', () => {
            expect(() => validate.boolean('a')).to.throw(Error, 'a is not a boolean')
        })
    })

    describe('Some arrays...', () => {
        it('In case if it is correct array return undefined', () => {
            const array = ['a']

            const response = validate.array(array)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error', () => {
            expect(() => validate.array('a')).to.throw(Error, 'a is not an array')
        })

    })

    describe('Email...', () => {
        it('In case if it is correct email return undefined', () => {
            const email = 'a@a.com'

            const response = validate.email(email)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error', () =>{
            expect(() => validate.email('a')).to.throw(Error, 'a is not an email')

        })
    })

    describe('Some objects...', () => {
        it ('In case if it is correct object return undefined ' , () => {
            const object = { 'a': 1, 'b': 2 }

            const response = validate.object(object)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error' , () => {
            expect(() => validate.object('a')).to.throw(Error, 'a is not an object')
        })
    })

    describe('Some functions...', () =>{
        it ('In case if it is correct function return undefined' , () =>{
            const func = function sum (a,b) { return a + b }

            const response = validate.function(func)
            expect(response).to.be.undefined
        })

        it('In case if it is incorrect data return Error' , () => {
            expect(() => validate.function('a')).to.throw(Error, 'a is not a function')
        })
    })
}) 



