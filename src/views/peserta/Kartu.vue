<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'peserta.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                </div>
                <div class="card-body back">
                	<div class="paper">
                		<div class="page" >
							<center>
								<table align="center" width="100%">
						        	<tr>
						        		<td style="padding:3px;display: flex;justify-content: space-around;flex-wrap: wrap;">
											<table style="width:10.4cm;border:1px solid #666;" class="kartu" v-for="peserta in pesertas.data">
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
/*
.page-landscape {
    position: relative;
    width: 29.7cm;
    min-height: 21cm;
    page-break-after: always;
    margin: 0.5cm;
    background: #FFF;
    padding: 1.5cm;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: initial;
    -moz-box-sizing: initial;
    box-sizing: initial;
    page-break-after: always
}

.page-landscape * {
    font-family: arial;
    font-size: 11px
}

.footer {
    position: absolute;
    bottom: 1.5cm;
    left: 1.5cm;
    right: 1.5cm;
    width: auto;
    height: 30px
}

.kanan {
    float: right
}

.barcode {
    font-family: MyBarcode
}

.datatable {
    background: #FFF;
    border-collapse: collapse;
    border: 1px solid #000
}

.datatable th {
    color: #000;
    border: 1px solid #000;
    border-top: 1px solid #000;
    background: #C4BC96;
    padding: 3px;
    border: 1px solid #000
}

.datatable tr:nth-child(even) {
    background: #f8f8f8
}

.datatable td {
    padding: 5px 5px;
    border: 1px solid #000
}

.it-grid {
    background: #FFF;
    border-collapse: collapse;
    border: 1px solid #000
}

.it-grid th {
    color: #000;
    border: 1px solid #000;
    border-top: 1px solid #000;
    background: #C4BC96;
    padding: 3px;
    border: 1px solid #000
}

.it-grid tr:nth-child(even) {
    background: #f8f8f8
}

.it-grid td {
    padding: 3px;
    border: 1px solid #000
}

.seri {
    font-family: 'Lucida Handwriting'
}

.it-cetak td {
    padding: 6px 5px
}

h1 {
    font-weight: normal
}

h2 {
    font-weight: normal
}

h3 {
    font-weight: normal
}

h4 {
    font-weight: normal
}

h5 {
    font-weight: normal
}

h6 {
    font-weight: normal
}

table {
    border-collapse: collapse;
    page-break-inside: auto
}

td {
    padding: 3px
}

.f14 {
    font-size: 14pt
}

.f12 {
    font-size: 12pt
}

.line-bottom {
    border-bottom: 1px solid black
}

.detail {
    margin-top: 10px;
    margin-bottom: 10px
}

.detail td {
    padding: 5px;
    font-size: 12px
}

.detail span {
    border-bottom: 1px solid black;
    display: inline-block;
    font-size: 12px
}

.cetakan {
    font-size: 14px;
    line-height: 1.5em
}

.cetakan * {
    font-size: 14px;
    line-height: 1.5em
}

.cetakan span {
    border-bottom: 1px solid black;
    display: inline-block
}

.full {
    width: 100%
}

nip {
    display: inline-block;
    width: 130px
}

ol {
    margin-left: 30px
}

ol>li {
    padding: 10px
}

tr {
    page-break-inside: avoid;
    page-break-after: auto
}

thead {
    display: table-row-group
}

tfoot {
    display: table-row-group
}

.table th,
.table td {
    padding: 5px
}

.table tbody tr:nth-child(even) {
    background: #EEE
}

.table thead {
    background: #ccc
}*/

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
        margin: 0
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