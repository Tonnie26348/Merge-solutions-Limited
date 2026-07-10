# Disaster Recovery Plan - MERGE Platform

## 1. RTO & RPO Targets
*   **RTO (Recovery Time Objective):** 4 Hours.
*   **RPO (Recovery Point Objective):** 1 Hour (based on hourly snapshots).

## 2. Backup Strategy
*   **PostgreSQL:** Automated hourly `pg_dump` via `scripts/db-backup.sh` (triggered by cron).
*   **File Storage:** Supabase-level storage snapshots (managed by infrastructure provider).

## 3. Disaster Recovery Procedure
1.  **Detection:** Trigger alert via Sentry/Monitoring.
2.  **Environment Provisioning:** Spin up new Docker containers using `docker-compose up -d`.
3.  **Data Restoration:**
    ```bash
    cat backup_file.sql | docker exec -i merge-postgres-1 psql -U $POSTGRES_USER -d merge_db
    ```
4.  **Verification:** Run `health` endpoint checks.
5.  **Traffic Failover:** Update DNS to point to the new infrastructure.
