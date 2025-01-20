#!/bin/bash

# Устанавливаем пути к .env файлу и docker-compose файлам
ENV_FILE="./.env"
DOCKER_COMPOSE_DB="./docker/db/db.docker-compose.yaml"
DOCKER_COMPOSE_API="./docker/api/api.docker-compose.yaml"

# Проверяем, существует ли .env файл
if [ ! -f "$ENV_FILE" ]; then
    echo "Ошибка: файл .env не найден!"
    exit 1
fi

# Считываем переменные окружения из .env
source "$ENV_FILE"

# Проверяем, задана ли переменная NODE_ENV
if [ -z "$NODE_ENV" ]; then
    echo "Ошибка: переменная NODE_ENV не задана в .env файле!"
    exit 1
fi

# Функция для удаления старых данных
cleanup() {
    echo "Очистка старых контейнеров и данных..."
    docker stop postgres_container api_container 2>/dev/null || true
    docker rm postgres_container api_container 2>/dev/null || true
    docker volume rm db_postgres-data 2>/dev/null || true
    echo "Очистка завершена."
}

# Функция для запуска базы данных
start_db() {
    echo "Запуск контейнеров базы данных..."
    docker compose --env-file "$ENV_FILE" -f "$DOCKER_COMPOSE_DB" up --build -d
    if [ $? -eq 0 ]; then
        echo "Контейнеры базы данных успешно запущены!"
    else
        echo "Ошибка при запуске контейнеров базы данных!"
        exit 1
    fi
}

# Функция для запуска API
start_api() {
    echo "Запуск API-контейнера в режиме $NODE_ENV..."
    docker compose --env-file "$ENV_FILE" -f "$DOCKER_COMPOSE_API" up --build -d
    if [ $? -eq 0 ]; then
        echo "API-контейнер успешно запущен в режиме $NODE_ENV!"
    else
        echo "Ошибка при запуске API-контейнера!"
        exit 1
    fi
}

# Основной процесс
echo "Запуск процесса..."

# cleanup
start_db
start_api

echo "Все сервисы успешно запущены!"