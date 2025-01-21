from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/temp-sensor")
def read_temp_sensor():
    return {"temperature": 21.5}


@app.get("/humidity-sensor")
def read_humidity_sensor():
    return {"humidity": 45.5}


@app.get("/light-sensor")
def read_light_sensor():
    return {"light": 1000}


@app.get("/motion-sensor")
def read_motion_sensor():
    return {"motion": "detected"}


@app.get("/proximity-sensor")
def read_proximity_sensor():
    return {"proximity": 5}
