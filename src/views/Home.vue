<template>
	<div class="c-body">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
            	<div class="card">
            		<div class="card-header">Dashboard</div>
            		<div class="card-body">
						<div class="row">
							<div class="col-lg-3">
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
								<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-education"></i>
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
								<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-bar-chart"></i>
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
							<div class="col-lg-9">
								<div class="card">
									<div class="card-header">Ujian mendatang</div>
									<div class="card-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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