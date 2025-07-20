# Xyz_assembly_fc.py
# run the script with:
# freecad.cmd myScript.py

import FreeCAD as App
import Part

#print(sys.argv)
outFileName = "Xyz_assembly_fc"
if (len(sys.argv) == 3):
    outFileName = sys.argv[2]
print(f"outFileName: {outFileName}")

