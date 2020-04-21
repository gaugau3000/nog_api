#!/bin/bash
 docker build --target install_dev --cache-from=gaugau3000/nog_api:install_dev \
--tag gaugau3000/nog_api:install_dev .
docker build --target install_prod --cache-from=gaugau3000/nog_api:install_prod \
--tag gaugau3000/nog_api:install_prod .
docker build --target test --cache-from=gaugau3000/nog_api:test \
--tag gaugau3000/nog_api:test .
docker build --target build --cache-from=gaugau3000/nog_api:build \
--tag gaugau3000/nog_api:build .
docker build --target start --cache-from=gaugau3000/nog_api:latest \
--tag gaugau3000/nog_api:latest .