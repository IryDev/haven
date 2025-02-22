import os

import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    try:
        return pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            cursorclass=pymysql.cursors.DictCursor,
        )
    except Exception as e:
        print(f"Erreur connexion MySQL: {e}")
        return None
