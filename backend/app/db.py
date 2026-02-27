import psycopg2

DB_CONFIG = {
    "host": "localhost",
    "database": "air_quality_db",
    "user": "postgres",
    "password": "Satya@2005",
    "port": "5432"
}


def get_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn