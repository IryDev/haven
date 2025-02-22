import os
from app.utils.sendEmail import AlertEmail, ResendClient
from dotenv import load_dotenv

load_dotenv()

resend_client = ResendClient(api_key=os.getenv("RESEND_API_KEY"))


def send_alert_email(alert_type: str):
    alert = AlertEmail(alert_type=alert_type)
    email_details = alert.get_email_details()

    resend_client.send_email(
        from_email="Acme <onboarding@resend.dev>",
        to_email=["ryvernet@outlook.fr"],
        subject=email_details["subject"],
        html=email_details["html"],
    )
