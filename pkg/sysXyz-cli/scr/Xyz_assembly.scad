// Xyz_assembly.scad


module Xyz_stage1 () {
	translate( [ 0, 0, 0 ])
		rotate( [ 0, 0, 0 ])
			   import("./Xyz_stage1.stl");
}

module Xyz_stage2 () {
	translate( [ 0, 0, 100 ])
		rotate( [ 0, 0, 0 ])
			   import("./Xyz_stage2.stl");
}

module Xyz_stage3 () {
	translate( [ 0, 0, 200 ])
		rotate( [ 0, 0, 0 ])
			   import("./Xyz_stage3.stl");
}

module Xyz_stage2_refine () {
	translate( [ 0, 0, 100 ])
		rotate( [ 0, 0, 0 ])
			   import("./Xyz_stage2_refine.stl");
}

module Xyz_system () {
	union () {
		Xyz_stage1();
		//Xyz_stage2();
		Xyz_stage3();
		Xyz_stage2_refine();
	}
}

Xyz_system();
