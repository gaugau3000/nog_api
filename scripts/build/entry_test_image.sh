#!/bin/bash
yarn eslint
yarn test
bash <(curl -s https://codecov.io/bash)