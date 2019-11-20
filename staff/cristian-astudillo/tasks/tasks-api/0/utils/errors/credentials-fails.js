module.exports = class CredentialsFails extends Error{
    constructor(message){
        super(message)

        Error.captureStackTrace(this.CredentialsFails)

        this.name = CredentialsFails.name
    
    }

}