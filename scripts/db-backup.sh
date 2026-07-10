#!/bin/bash
# Backup script for MERGE PostgreSQL
set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_CONTAINER="merge-postgres-1"

mkdir -p $BACKUP_DIR

echo "Starting backup for $DB_CONTAINER..."

docker exec $DB_CONTAINER pg_dump -U $POSTGRES_USER merge_db > $BACKUP_DIR/merge_db_$TIMESTAMP.sql

echo "Backup completed: $BACKUP_DIR/merge_db_$TIMESTAMP.sql"
