#!/bin/bash
docker pull gaugau3000/nog_api:tmp
docker login gaugau3000 -p "${DOCKER_PASSWORD}"
docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:"${GITHUB_REF_SLUG}"
docker push gaugau3000/nog_api:"${GITHUB_REF_SLUG}"

if [ "$GITHUB_REF_SLUG" = "master" ]
then
    docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:latest \
    docker push gaugau3000/nog_api:latest
fi