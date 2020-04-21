#!/bin/bash
docker stop "${CONTENER_NAME}" || true
docker rm "${CONTENER_NAME}" || true
docker pull "${GITHUB_REPOSITORY}"
docker run -d --restart unless-stopped --name "${CONTENER_NAME}" \
--env MAIl_HOST=notonlygeek_mail --env SMTP_PORT=25 \
--network notonlygeek \
"${GITHUB_REPOSITORY}":latest
docker network connect "notonlygeek_${APP_ENV}" "${CONTENER_NAME}" --alias api