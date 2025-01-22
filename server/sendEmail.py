import os

import resend
from dotenv import load_dotenv

load_dotenv()


class ResendClient:
    def __init__(self, api_key: str):
        resend.api_key = api_key

    def send_email(self, from_email: str, to_email: list, subject: str, html: str):
        """
        Envoie un e-mail en utilisant l'API Resend.
        """
        try:
            params: resend.Emails.SendParams = {
                "from": from_email,
                "to": to_email,
                "subject": subject,
                "html": html,
            }
            email = resend.Emails.send(params)
            print(f"E-mail envoyé avec succès : {email}")
        except Exception as e:
            print(f"Échec de l'envoi de l'e-mail : {e}")


class AlertEmail:

    def __init__(self, alert_type: str, additional_info: str = None):
        self.alert_type = alert_type
        self.additional_info = additional_info or ""
        self.config = self._get_alert_config()

    def _get_alert_config(self):
        """
        Retourne la configuration de l'e-mail selon le type d'alerte.
        """
        return {
            "intrusion": {
                "subject": "🚨 Haven Alert: Intrusion Detected",
                "html": f"<strong>Alert Type:</strong> Intrusion detected.<br>{self.additional_info}",
            },
            "incendie": {
                "subject": "🔥 Haven Alert: Fire Detected",
                "html": f"<strong>Alert Type:</strong> Fire detected!<br>{self.additional_info}",
            },
            "inondation": {
                "subject": "🌊 Haven Alert: Flood Detected",
                "html": f"<strong>Alert Type:</strong> Flood detected.<br>{self.additional_info}",
            },
            "light": {
                "subject": "💡 Haven Alert: Light Sensor Triggered",
                "html": f"<strong>Alert Type:</strong> Light sensor triggered.<br>{self.additional_info}",
            },
        }.get(self.alert_type, None)

    def get_email_details(self):
        if not self.config:
            raise ValueError(f"Unknown alert type: {self.alert_type}")
        return self.config
