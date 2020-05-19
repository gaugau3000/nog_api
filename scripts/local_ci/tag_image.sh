#!/bin/bash
docker login gaugau3000 -p "${DOCKER_PASSWORD}"
docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:"${GIT_BRANCH}"
docker push gaugau3000/nog_api:"${GIT_BRANCH}"

if [ "$GIT_BRANCH" = "master" ]
then
    docker tag gaugau3000/nog_api:tmp gaugau3000/nog_api:latest \
    docker push gaugau3000/nog_api:latest
fi