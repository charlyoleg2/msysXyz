#!/usr/bin/env bash
# gen_stl_Xyz.sh

cd $(dirname $0)/..

echo "gen_stl_Xyz.sh says Hello"
npx desi77-cli --design desi77/square --param tmp/px_Xyz_stage1.json --outDir tmp2 --outFileName Xyz_stage1.scad write scad_3d_openscad
echo "gen_stl_Xyz.sh says Bye"
