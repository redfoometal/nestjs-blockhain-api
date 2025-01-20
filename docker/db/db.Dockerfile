# Используем официальный образ PostgreSQL в качестве базового
FROM postgres:17-alpine3.21

# Конфигурация PostgreSQL
RUN echo "max_connections=50" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "shared_buffers=1GB" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "effective_cache_size=4GB" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "work_mem=16MB" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "maintenance_work_mem=512MB" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "random_page_cost=1.1" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "temp_file_limit=10GB" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "log_min_duration_statement=200ms" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "idle_in_transaction_session_timeout=10s" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "lock_timeout=1s" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "statement_timeout=60s" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "shared_preload_libraries=pg_stat_statements" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "pg_stat_statements.max=10000" >> /usr/share/postgresql/postgresql.conf.sample && \
    echo "pg_stat_statements.track=all" >> /usr/share/postgresql/postgresql.conf.sample

# Копируем скрипты инициализации базы данных (если они есть)
COPY ./init.sql /docker-entrypoint-initdb.d/

# Указываем порт, который будет открыт для соединений
EXPOSE 5432