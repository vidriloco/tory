import Host from './Host';

class BackendRoutes {
	static url() {
		return Host.address();
	}
	
	static users(namespace) {
		if(namespace === "create" || namespace === "details") {
			return this.url().concat('/api/users');
		} else if(namespace === "update" || namespace === "changeAvatar") {
			return this.url().concat('/api/users/update');
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
	
	static offers(namespace, id) {
		if(namespace === "create" || namespace === "list") {
			return this.url().concat('/api/offers');
		} else if(namespace === "delete") {
			return this.url().concat('/api/offers/'.concat(id));
	    }
	}
    
    static donations(namespace) {
		if(namespace === "list") {
			return this.url().concat('/api/donations');
		}
    }
    
    static avatars(namespace) {
        if(namespace === "list") {
            return this.url().concat('/api/avatars');
        }
    }
}

export default BackendRoutes;