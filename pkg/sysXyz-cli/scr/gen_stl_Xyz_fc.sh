#!/usr/bin/env bash
# gen_stl_Xyz_fc.sh

cd $(dirname $0)/..

echo "gen_stl_Xyz_fc.sh says Hello"

echo "generate FreeCAD scripts"
npx desi77-cli --design desi77/square --param tmp/px_Xyz_stage1.json --outDir tmp2 --outFileName Xyz_stage1_fc.py write py_3d_freecad
#npx desi77-cli --design desi77/square --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2_fc.py write py_3d_freecad
npx desi77-cli --design desi77/triangle --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2_fc.py write py_3d_freecad
#npx desi77-cli --design desi77/cylinder --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2_fc.py write py_3d_freecad
npx desi77-cli --design desi77/cylinder --param tmp/px_Xyz_stage3.json --outDir tmp2 --outFileName Xyz_stage3_fc.py write py_3d_freecad
npx desi77-cli --design desi77/triangle --param tmp/px_Xyz_stage2_refine.json --outDir tmp2 --outFileName Xyz_stage2_refine_fc.py write py_3d_freecad

#echo "generate STL with FreeCAD"
cd tmp2
freecad.cmd Xyz_stage1_fc.py Xyz_stage1
freecad.cmd Xyz_stage2_fc.py Xyz_stage2
freecad.cmd Xyz_stage3_fc.py Xyz_stage3
freecad.cmd Xyz_stage2_refine_fc.py Xyz_stage2_refine

echo "generate STL-assembly with FreeCAD"
cp ../scr/Xyz_assembly_fc.py ./
freecad.cmd Xyz_assembly_fc.py Xyz_assembly

echo "gen_stl_Xyz_fc.sh says Bye"
