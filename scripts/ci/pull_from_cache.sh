docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker pull gaugau3000/nog_api:install_dev || true
docker pull gaugau3000/nog_api:install_prod || true
docker pull gaugau3000/nog_api:test || true
docker pull gaugau3000/nog_api:build || true
docker pull gaugau3000/nog_api:latest || true