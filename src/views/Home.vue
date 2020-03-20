<template>
	<div class="c-body">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
            	<div class="card">
            		<div class="card-body">
						<div class="row">
							<div class="col-6 col-lg-3">
								<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-storage"></i>
										</div>
										<div>
											<div class="text-value text-primary"><i class="c-icon cil-infinity"></i></div>
											<div class="text-muted text-uppercase font-weight-bold small">Server sekolah</div>
										</div>
									</div>
									<div class="card-footer px-3 py-2">
											<router-link :to="{ name: 'server.data' }" class="btn-block text-muted d-flex justify-content-between align-items-center" href="#"><span class="small font-weight-bold">View More</span>
												<i class="c-icon cil-chevron-right"></i>
											</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				    <div class="card-footer">
				    	
				    </div>
				</div>
            </div>
          </div>
        </main>
      </div>
</template>