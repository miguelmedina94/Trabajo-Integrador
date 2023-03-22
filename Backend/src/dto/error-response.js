class ErrorResponse extends Error{
    notFoundError(){
        this.message = "Error - object not found";
        this.code = 404;
        return this;
    }

    BadRequestError(){
        this.message = "Error - Bad Request";
        this.code = 400;
        return this;
    }

    BadRequestError(errors){
        this.message = "Error - Bad Request";
        this.code = 400;
        this.errors = errors
        return this;
    }
}

module.exports = ErrorResponse