class BackendRoutes {
	static url() {
		return "http://127.0.0.1:3001";
	}
	
	static users(namespace) {
		if(namespace === "create") {
			return this.url().concat('/api/users');
		}
	}
	
	static sessions(namespace) {
		if(namespace === "create") {
			return this.url().concat('/api/sessions');
		}
	}
	
	static materials(namespace) {
		if(namespace === "list") {
			return this.url().concat('/api/materials');
		}
	}
	
	static offers(namespace) {
		if(namespace === "create" || namespace === "list") {
			return this.url().concat('/api/offers');
		}
	}
}

export default BackendRoutes;