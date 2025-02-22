from pydantic import BaseModel


class SensorUpdate(BaseModel):
    value: float
