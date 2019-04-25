class BackendRoutes {
	static url() {
		return "http://127.0.0.1:3001";
	}
	
	static users(namespace) {
		if(namespace === "create") {
			return this.url().concat('/api/users');
		}
	}
}

export default BackendRoutes;