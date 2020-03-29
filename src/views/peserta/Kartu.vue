<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'peserta.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                    <button class="btn float-right btn-primary btn-sm mx-1" @click="print">Print</button>
                </div>
                <div class="card-body back" >
                	<div class="paper" id="printKartu">
                		<div class="page" v-for="peserta in pesertas.data">
							<center>
								<table align="center" width="100%">
						        	<tr>
						        		<td style="padding:3px;">
											<table style="width:10.4cm;border:1px solid #666;" class="kartu" >
												<tr>
													<td colspan="3" style="border-bottom:1px solid #666; padding: 0;">
														<table width="100%" class="kartu">
														<tr>
															<td style="width: 30px"><img src="/img/brand/logo.ico" height="40"></td>
															<td align="center" style="font-weight:bold; padding: 4px;">
																<span class="upper">Kartu Login</span><br> 
																<span class="upper">USBN SMK 2019/2020</span>
															</td>
															<td style="width: 30px">&nbsp;</td>
														</tr>
														</table>
													</td>
												</tr>
												<tr><td width="125">Nama Peserta</td><td width="1">:</td><td v-text="peserta.nama"></td></tr>
												<tr><td>Sesi</td><td>:</td><td v-text="peserta.sesi"></td></tr>
												<tr><td>Username</td><td>:</td><td style="font-size:12px;font-weight:bold;" v-text="peserta.no_ujian"></td></tr>
												<tr><td>Password</td><td>:</td><td style="font-size:12px;font-weight:bold;" v-text="peserta.password"></td></tr>
												<tr><td>Server</td><td>:</td><td v-text="peserta.name_server"></td></tr>
											</table>
										</td>
						    		</tr>
						   		</table>
							</center>
						</div>
                	</div>
                </div>
            </div>
        </div>
        <div class="col-md-12 text-center" v-if="pesertas.data">
            <div class="ml-auto">
                <b-pagination		
                	size="sm"
                    v-model="page"
                    :total-rows="pesertas.total"
                    :per-page="pesertas.per_page"
                    aria-controls="pesertas"
                    v-if="pesertas.data && pesertas.data.length > 0"
                    ></b-pagination>
            </div>
        </div>
                   
    </div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	export default {
	name: 'KartuPeserat',
	created() {
		if(this.$route.params.id != 0 && this.$route.params.id != null) {
			this.getPesertas({
				sekolah: this.$route.params.id
			})
		}
	},
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('peserta', {
			pesertas: state => state.pesertas
		}),
		...mapState('sekolah', {
			sekolahs: state => state.sekolah
		}),
		page: {
			get() {
				return this.$store.state.peserta.page
			},
			set(val) {
				this.$store.commit('peserta/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('peserta', ['getPesertas','removePeserta']),
		...mapActions('sekolah', ['getAllSekolah', ]),
        print() {
            this.$htmlToPaper('printKartu');
        }
	},
	watch: {
		page() {
			this.getPesertas()
		}
	}
}
</script>
<style>
	@media print {
	    footer {page-break-after: always; }
		@page {
		  size: A4;
		  margin-bottom:60px;
		  margin-top:40px;
		  margin-left: 40px;
		  margin-right: 40px;	  
		}
	}
/*	.paper {
		max-width: 1140px;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
		background: #fff;
		border: 4px double #ccc;
	}*/
	.back {
		background: #3c4b640d
	}
	.page {
    position: relative;
    width: 21cm;
    min-height: 29cm;
    page-break-after: always;
    margin: 0.5cm auto;
    background: #FFF;
    padding: 1.5cm;
    /*box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);*/
    border: 4px double #ccc;
    -webkit-box-sizing: initial;
    -moz-box-sizing: initial;
    box-sizing: initial;
    page-break-after: always
}

.page * {
    font-family: arial;
    font-size: 11px
}
@media print {
    body {
        background: #fff;
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt
    }
    div {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt
    }
    td {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt
    }
    p {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt
    }
    .page {
        height: 10cm;
        padding: 0.7cm;
        box-shadow: none;
        margin: 0;
        page-break-before: always;
    }
    @page {
        size: A4;
        margin: 0;
        -webkit-print-color-adjust: exact
    }
    .page-landscape {
        height: 10cm;
        padding: 0.7cm;
        box-shadow: none;
        margin: 0
    }
    .footer {
        bottom: 0.7cm;
        left: 0.7cm;
        right: 0.7cm
    }
}
</style>