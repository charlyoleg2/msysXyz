# Xyz_assembly_fc.py
# run the script with:
# freecad.cmd myScript.py
# This script is now obsolet because Systemix generates it in the directory tmp/
# This script is not deleted as it acts as reference and example

import FreeCAD as App
#import Part
import Mesh

#print(sys.argv)
outFileName = "Xyz_assembly_fc"
if (len(sys.argv) == 3):
    outFileName = sys.argv[2]
print(f"outFileName: {outFileName}")

### converting Mesh to Part
#def fex_Xyz_assembly():
#	MEX = Mesh.Mesh('Xyz_stage1_fc.stl')
#	shape = Part.Shape()
#	shape.makeShapeFromMesh(MEX.Topology, 0.05)
#	solid = Part.makeSolid(shape)
#	VEX = solid
#	VR1 = VEX.rotate(App.Vector(0, 0, 0), App.Vector(1, 0, 0), 0.0000)
#	VR2 = VR1.rotate(App.Vector(0, 0, 0), App.Vector(0, 1, 0), 0.0000)
#	VR3 = VR2.rotate(App.Vector(0, 0, 0), App.Vector(0, 0, 1), 0.0000)
#	VFP = VR3.translate(App.Vector(0.0000, 0.0000, 0.0000))
#	return VFP
#Xyz_assembly = fex_Xyz_assembly()
#
#Xyz_assembly.check()
##Xyz_assembly.exportBrep(f"{outFileName}.brep")
##Xyz_assembly.exportIges(f"{outFileName}.igs")
##Xyz_assembly.exportStep(f"{outFileName}.stp")
#Xyz_assembly.exportStl(f"{outFileName}.stl")

### directly working with Mesh
def mesh_Xyz_assembly():
	STAGE1 = Mesh.Mesh('Xyz_stage1_fc.stl')
	STAGE1.Placement.Base = (App.Vector(0, 0, 0))
	STAGE2 = Mesh.Mesh('Xyz_stage2_fc.stl')
	STAGE2.Placement.Base = (App.Vector(0, 0, 100))
	STAGE3 = Mesh.Mesh('Xyz_stage3_fc.stl')
	STAGE3.Placement.Base = (App.Vector(0, 0, 200))
	STAGE2_Refine = Mesh.Mesh('Xyz_stage2_refine_fc.stl')
	STAGE2_Refine.Placement.Base = (App.Vector(0, 0, 100))
	assembly = STAGE1
	#assembly = assembly.unite(STAGE2)
	assembly = assembly.unite(STAGE3)
	assembly = assembly.unite(STAGE2_Refine)
	#assembly.write(f"{outFileName}.stl", "AST")
	assembly.write(f"{outFileName}.stl")

mesh_Xyz_assembly()
