import os
import requests
from typing import Any, Dict


class TypeformResponseGetter:
    def __init__(self, form_id: str, response_id: str) -> None:
        self.form_id = form_id
        self.response_id = response_id

    def get_answers(self) -> Dict[Any, Any]:
        TYPEFORM_API_URL = "https://api.typeform.com"
        BEARER_TOKEN = os.environ.get("TYPEFORM_BEARER_TOKEN")

        request_url = (
            f"{TYPEFORM_API_URL}/forms/{self.form_id}"
            f"/responses?included_response_ids={self.response_id}"
        )
        response = requests.get(
            request_url,
            headers={"Authorization": f"Bearer {BEARER_TOKEN}"},
        )

        answers = {}
        for field in response.json()["items"][0]["answers"]:
            field_name = field["field"]["ref"]
            field_value = field[field["type"]]
            answers[field_name] = field_value
        return answers
