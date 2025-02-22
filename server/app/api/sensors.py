import os

from app.schemas.sensor import SensorUpdate
from app.services.sensor_service import get_sensor_data, update_sensor_value
from app.utils.email import send_alert_email
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def read_sensors():
    data = get_sensor_data()
    return data if data else {"message": "No data found"}


@router.post("/temperature")
def update_temperature(sensor: SensorUpdate):
    value = update_sensor_value("temperature", sensor.value)
    if value > 30:
        send_alert_email("incendie")
    return {"message": "Temperature updated", "temperature": value}


@router.post("/humidity")
def update_humidity(sensor: SensorUpdate):
    value = update_sensor_value("humidity", sensor.value)

    if value > 80:
        send_alert_email("inondation")

    return {"message": "Humidity updated", "humidity": value}


@router.post("/motion")
def update_motion(sensor: SensorUpdate):
    value = update_sensor_value("motion", sensor.value)

    if value:
        send_alert_email("intrusion")

    return {"message": "Motion updated", "motion": value}


@router.post("/light")
def update_light(sensor: SensorUpdate):
    value = update_sensor_value("light", sensor.value)

    if value > 80:
        send_alert_email("light")

    return {"message": "Light updated", "light": value}
