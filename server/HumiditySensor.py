from Sensor import Sensor


class HumiditySensor(Sensor):
    def __init__(self, pin_number=16):
        super().__init__(pin_number)

    def read(self):
        return self.pir_sensor.value()
