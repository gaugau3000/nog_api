#!/bin/bash
docker pull gaugau3000/nog_api:tmp
"${DOCKER_PASSWORD}" | docker login -u gaugau3000 --password-stdin "${DOCKER_PASSWORD}" || return 1
docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:"${GITHUB_REF_SLUG}"
docker push gaugau3000/nog_api:"${GITHUB_REF_SLUG}"

if [ "$GITHUB_REF_SLUG" = "master" ]
then
    docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:latest \
    docker push gaugau3000/nog_api:latest
fi