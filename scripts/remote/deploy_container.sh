#!/bin/bash
docker stop "${CONTENER_NAME}" || true
docker rm "${CONTENER_NAME}" || true
docker pull "${GITHUB_REPOSITORY}"
docker run -d --restart unless-stopped --name "${CONTENER_NAME}" \
--env MAIl_HOST=notonlygeek_mail --env SMTP_PORT=25 \
--network notonlygeek \
"${GITHUB_REPOSITORY}":latest
docker network connect "${NETWORK}" "${CONTENER_NAME}" --alias api
docker run --rm --network "${NETWORK}" willwill/wait-for-it api:3000