#!/bin/bash

mkdir tmp || true
mkdir dist || true

pushd sdl1
emmake make
popd

mv ./sdl1/bn ./tmp/bn.bc
emcc ./tmp/bn.bc -o dist/bn.html --preload-file pdcfont.bmp

