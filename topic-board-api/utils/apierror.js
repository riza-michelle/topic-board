class APIError{
	constructor(code, message, response){
		this.code = code;
		this.message = message;
		this.response = response
	}
	get code(){
		return this._code;
	}
	set code(code){
		this._code = code;
	}
	toJSON(){
		return {code: this._code, message: this.message, response: this.response}
	}

}

module.exports = APIError;
