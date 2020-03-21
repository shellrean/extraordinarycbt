<template>
	<div class="row">
		<div class="col-md-5">
			<div class="card">
				<div class="card-header">
					Assign role to user
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>Role</label>
						<select class="form-control" v-model="role_user.role">
							<option value="">Pilih</option>
							<option v-for="(row,index) in roles" :value="row.name" :key="index">{{ row.name }}</option>
						</select>
						<p class="text-danger" v-if="errors.role_id">{{ errors.role_id[0] }}</p>
					</div>
					<div class="form-group">
						<label>User</label>
						<select class="form-control" v-model="role_user.user_id">
							<option value="">Pilih</option>
							<option v-for="(row,index) in users" :value="row.id" :key="index">{{ row.name }} ({{row.email}})</option>
						</select>
					</div>
					<div class="form-group">
						<button class="btn btn-primary btn-sm" @click="setRole">Set role</button>
					</div>
				</div>
				<div class="card-footer"></div>
			</div>
		</div>
		<div class="col-md-7">
			<div class="card">
				<div class="card-header">Set permission</div>
				<div class="card-body">
					<div class="form-group">
						<label>Role</label>
						<select class="form-control" v-model="role_selected">
							<option value="">Pilih</option>
							<option v-for="(row,index) in roles" :value="row.id" :key="index">{{ row.name }}</option>
						</select>
						<p class="text-danger" v-if="errors.role_id">{{ errors.role_id[0] }}</p>
					</div>
					<div class="form-group">
						<button class="btn btn-primary btn-sm" @click="checkPermission">{{ loading ? 'Loading...' : 'Check' }}</button>
					</div>
					<div class="form-group">
                        <div class="nav-tabs-custom">
                            <div class="nav nav-tabs">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#tab_1">Permissions</a>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="tab_1">
                                         <div class="custom-control custom-switch b-custom-control-lg" 
                                         	v-for="(row, index) in permissions"
                                        	:key="index">
                                         	<input type="checkbox" :value="row.name"
                                            :checked="role_permission.findIndex(x => x.name == row.name) != -1" autocomplete="off" class="custom-control-input" @click="addPermission(row.name)" :id="row.name">
                                         	<label class="custom-control-label" :for="row.name">{{ row.name }}</label>
                                         </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-primary btn-sm" @click="setPermission">
                            <i class="fa fa-send"></i> Set Permission
                        </button>
                    </div>
				</div>
				<div class="card-footer"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
	name: 'SetPermission',
	data() {
		return {
			role_user : {
				role: '',
				user_id: ''
			},
			role_selected: '',
			new_permission: [],
			loading: false,
			alert_permission: false,
			alert_role: false
		}
	},
	created() {
		this.getRoles()
		this.getAllPermission()
		this.getUserLists()
	},
	computed: {
		...mapState(['errors']),
		...mapState('user', {
			users: state => state.users,
			roles: state => state.roles,
			permissions: state => state.permissions,

			role_permission: state => state.role_permission
		})
	},
	methods: {
		...mapActions('user', [
			'getUserLists',
			'getRoles',
			'getAllPermission',
			'getRolePermission',
			'setRolePermission',
			'setRoleUser'
		]),
		...mapMutations('user', ['CLEAR_ROLE_PERMISSION']),
		setRole() {
			this.setRoleUser(this.role_user).then(() => {
				this.$notify({
                  group: 'foo',
                  title: 'Sukses',
                  type: 'success',
                  text: 'Role berhasil ditambah.'
                })
                this.role_user = {
					role: '',
					user_id: '',
				}
			})
		},
		addPermission(name) {
			let index = this.new_permission.findIndex(x => x == name)
			if(index == -1) {
				this.new_permission.push(name)
			}
			else {
				this.new_permission.plice(index,1)
			}
		},
		checkPermission() {
			this.loading = true
			this.getRolePermission(this.role_selected).then(() => {
				this.loading = false
				this.new_permission = this.role_permission
			})
		},
		setPermission() {
			this.setRolePermission({
				role_id: this.role_selected,
				permissions: this.new_permission
			}).then((res) => {
				if (res.status == 'success') {
					this.$notify({
	                  group: 'foo',
	                  title: 'Sukses',
	                  type: 'success',
	                  text: 'Role permission berhasil ditambah.'
	                })
	                this.role_selected = ''
					this.new_permission = []
					this.loading = false
					this.CLEAR_ROLE_PERMISSION() 
				}
			})
		}
	}
}
</script>
<style type="text/css">
.tab-pane {
	height: 250px;
	overflow-y: scroll;
}
</style>