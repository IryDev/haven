from fastapi import FastAPI
from HumiditySensor import HumiditySensor
from LightSensor import LightSensor
from MotionSensor import MotionSensor
from TempSensor import TempSensor

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/temp-sensor")
def read_temp_sensor():
    return {"temperature": 21.5}


@app.get("/motion-sensor")
def read_motion_sensor():
    return {"motion": "detected"}


@app.get("/humidity-sensor")
def read_humidity_sensor():
    return {"humidity": 45.5}


@app.get("/light-sensor")
def read_light_sensor():
    return {"light": 1000}
