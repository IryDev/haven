# TODO a generic class Sensor that can be extended by other sensors

import time

from email_sender import EmailSender
from machine import Pin


class Sensor:
    def __init__(self, pin_number=16):
        self.pir_sensor = Pin(pin_number, Pin.IN)
        self.email_sender = EmailSender()
