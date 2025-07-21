#!/usr/bin/env bash
# gen_stl_Xyz.sh

cd $(dirname $0)/..

echo "gen_stl_Xyz.sh says Hello"

echo "generate OpenSCAD scripts"
npx desi77-cli --design desi77/square --param tmp/px_Xyz_stage1.json --outDir tmp2 --outFileName Xyz_stage1.scad write scad_3d_openscad
#npx desi77-cli --design desi77/square --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2.scad write scad_3d_openscad
npx desi77-cli --design desi77/triangle --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2.scad write scad_3d_openscad
#npx desi77-cli --design desi77/cylinder --param tmp/px_Xyz_stage2.json --outDir tmp2 --outFileName Xyz_stage2.scad write scad_3d_openscad
npx desi77-cli --design desi77/cylinder --param tmp/px_Xyz_stage3.json --outDir tmp2 --outFileName Xyz_stage3.scad write scad_3d_openscad
npx desi77-cli --design desi77/triangle --param tmp/px_Xyz_stage2_refine.json --outDir tmp2 --outFileName Xyz_stage2_refine.scad write scad_3d_openscad

echo "generate STL with OpenSCAD"
openscad -o tmp2/Xyz_stage1.stl tmp2/Xyz_stage1.scad
openscad -o tmp2/Xyz_stage2.stl tmp2/Xyz_stage2.scad
openscad -o tmp2/Xyz_stage3.stl tmp2/Xyz_stage3.scad
openscad -o tmp2/Xyz_stage2_refine.stl tmp2/Xyz_stage2_refine.scad

echo "generate STL-assembly with OpenSCAD"
cp scr/Xyz_assembly.scad tmp2/
openscad -o tmp2/Xyz_assembly.stl tmp2/Xyz_assembly.scad

echo "ls -ltra pkg/sysXyz-cli/tmp2"
ls -ltra tmp2
echo "(cd pkg/sysXyz-cli && f3d tmp2/Xyz_assembly.stl)"
echo "gen_stl_Xyz.sh says Bye"
