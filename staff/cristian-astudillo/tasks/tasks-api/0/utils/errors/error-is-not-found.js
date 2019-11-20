module.exports = class ErrorIsNotFound extends Error{
    constructor(message){
        super(message)
    
        Error.captureStackTrace(this.ErrorIsNotFound)
    
        this.name = ErrorIsNotFound.name        
    }
    
}