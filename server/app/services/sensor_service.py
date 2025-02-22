from app.core.database import get_connection


def get_sensor_data():
    conn = get_connection()
    if not conn:
        return None

    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM sensors LIMIT 1")
        return cursor.fetchone()


def update_sensor_value(sensor_type: str, value: float):
    conn = get_connection()
    if not conn:
        return None

    with conn.cursor() as cursor:
        cursor.execute(
            f"UPDATE sensors SET {sensor_type} = %s, last_updated = CURRENT_TIMESTAMP WHERE id = 1",
            (value,),
        )
    conn.commit()
    return value
