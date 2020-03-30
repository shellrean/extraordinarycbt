<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                   Analys banksoal
                </div>
                <div class="card-body">
                     <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Analys banksoal</h4>
                            <div class="small text-muted">Pilih soal yang akan dilihat analysanya</div>
                        </div>
                    </div>
                    <br>
                    <template v-if="banksoals && typeof banksoals.data != 'undefined'">
                        <b-table striped hover bordered small :fields="fields" :items="banksoals.data" show-empty>
                           <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'analys.banksoal_soal', params: {banksoal_id: row.item.id} }" class="btn btn-info btn-sm mr-1"><i class="cil-chart-pie"></i> Hasil analisa</router-link>
                            </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p v-if="banksoals.data"><i class="fa fa-bars"></i> {{ banksoals.data.length }} item dari {{ banksoals.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="banksoals.total"
                                        :per-page="banksoals.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center text-light my-2">
                            <b-spinner small type="grow"></b-spinner>
                        </div>
                    </template>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'DataBanksoal',
    created() {
        this.getBanksoals().then(() => { this.isBusy = false })
    },
    data() {
        return {
            fields: [
                { key: 'kode_banksoal', label: 'Kode banksoal'},
                { key: 'matpel.nama', label: 'Mata pelajaran'},
                { key: 'actions', label: 'Aksi' }
            ],
            selected: '',
            isBusy: true,
            update: 0
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('banksoal', {
            banksoals: state => state.banksoals
        }),
        page: {
            get() {
                return this.$store.state.banksoal.page
            },
            set(val) {
                this.$store.commit('banksoal/SET_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('banksoal', ['getBanksoals'])
    },
    watch: {
        page() {
            this.getBanksoals()
        },
        search() {
            this.getBanksoals(this.search)
        }
    },
}
</script>
