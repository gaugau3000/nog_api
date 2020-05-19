#!/bin/bash
docker_image="${GITHUB_REPOSITORY}":"${BRANCH_NAME}"
docker stop "${CONTENER_NAME}" || true
docker rm "${CONTENER_NAME}" || true
docker pull "${docker_image}"
docker run -d --restart unless-stopped --name "${CONTENER_NAME}" \
--env MAIl_HOST=notonlygeek_mail --env SMTP_PORT=25 \
--network notonlygeek \
"${docker_image}"
docker network connect "${NETWORK}" "${CONTENER_NAME}" --alias api
docker run --rm --network "${NETWORK}" willwill/wait-for-it api:3000