#!/bin/bash

/usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:8000/'

parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

cd "$parent_path"
python -m SimpleHTTPServer

