#!/bin/bash

mv /tmp/esl-resources.zip .
unzip esl-resources.zip

rm -r dist/ src/

mv esl-resources/* .
rm -r esl-resources*
