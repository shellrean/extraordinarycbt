export default {
	methods: {
		$can(permissionName) {
			let Permission = this.$store.state.user.authenticated.permission
			if (typeof Permission != 'undefined') {
                return Permission.indexOf(permissionName) !== -1;
            }
		},
		$role(namerole) {
			let roles = this.$store.state.user.authenticated.roles
			if(roles) {
				if(roles[0].name == namerole) {
					return true;
				}
			}
			return false;
		}
	}
}