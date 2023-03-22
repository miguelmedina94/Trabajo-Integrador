class SuccessResponse {
    OkMessage(data) {
        this.message = "OK";
        this.code = 200;
        this.data = data;
        return this;
    }

    CreatedMessage(data) {
        this.message = "Created";
        this.code = 201;
        this.data = data;
        return this;
    }
}

module.exports = SuccessResponse