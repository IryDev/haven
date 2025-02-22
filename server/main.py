from app.api.sensors import router as sensor_router
from fastapi import FastAPI

app = FastAPI(
    title="Haven Sensor API",
    description="API pour gérer les capteurs de température, humidité, mouvement et lumière.",
    version="1.0.0",
)

# Inclusion des routes de l'API
app.include_router(sensor_router, prefix="/sensors", tags=["Sensors"])


@app.get("/")
def root():
    return {"message": "Bienvenue sur l'API Haven Sensors"}
