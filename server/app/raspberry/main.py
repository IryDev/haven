import dht
import network
import ujson
import urequests as requests
import utime
from machine import ADC, Pin

# Configuration du WiFi
SSID = "Ton_SSID"
PASSWORD = "Your_Password"
SERVER_URL = "http://127.0.0.1:8000/sensors"

# Connexion WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

print("Connexion WiFi en cours...")
while not wlan.isconnected():
    utime.sleep(1)

print(f"Connecté ! IP: {wlan.ifconfig()[0]}")

# Initialisation des capteurs
dht_sensor = dht.DHT22(Pin(2))  # DHT22 sur GPIO 2
motion_sensor = Pin(3, Pin.IN)  # PIR sur GPIO 3
light_sensor = ADC(0)  # LDR sur ADC 0

# Variables pour éviter l'envoi de données inutiles
last_temperature = None
last_humidity = None
last_motion = None
last_light = None


def send_sensor_data(sensor_type, value):
    """Envoie une requête POST si la valeur a changé."""
    try:
        payload = ujson.dumps({"value": value})
        headers = {"Content-Type": "application/json"}
        response = requests.post(
            f"{SERVER_URL}/{sensor_type}", data=payload, headers=headers
        )
        print(f"✅ {sensor_type} envoyé : {value} - Réponse : {response.text}")
        response.close()
    except Exception as e:
        print(f"❌ Erreur lors de l'envoi de {sensor_type} : {e}")


while True:
    try:
        # Lire les valeurs des capteurs
        dht_sensor.measure()
        temperature = round(dht_sensor.temperature(), 1)
        humidity = round(dht_sensor.humidity(), 1)
        motion = motion_sensor.value()  # 0 ou 1 (True/False)
        light = round(light_sensor.read_u16() / 65535 * 100, 1) 

        # Vérifier et envoyer uniquement si la valeur a changé
        if temperature != last_temperature:
            send_sensor_data("temperature", temperature)
            last_temperature = temperature

        if humidity != last_humidity:
            send_sensor_data("humidity", humidity)
            last_humidity = humidity

        if motion != last_motion:
            send_sensor_data("motion", bool(motion))  # Convertir en booléen
            last_motion = motion

        if light != last_light:
            send_sensor_data("light", light)
            last_light = light

        utime.sleep(2)  # Pause de 2 secondes pour éviter le spam

    except Exception as e:
        print(f"❌ Erreur principale : {e}")
        utime.sleep(5)  # Attendre avant de réessayer en cas d'erreur
