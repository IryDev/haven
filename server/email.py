import os

import resend

# TODO implement the logic email sending depend on the type of alert


resend.api_key = os.environ["RESEND_API_KEY"]

params: resend.Emails.SendParams = {
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "subject": "Haven : a new message",
    "html": "<strong>it works!</strong>",
}

email = resend.Emails.send(params)
print(email)
