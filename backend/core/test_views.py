import json

from django.test import TestCase


class ViewsTestCase(TestCase):
    fixtures = ["test_db.json"]

    def test_get_centers(self):
        response = self.client.get("/centers")
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(len(response_data), 3)

    def test_get_center(self):
        response = self.client.get("/centers/3")
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data["name"], "PAATHS Program")

    def test_filter_centers_one(self):
        SAMPLE_PATIENT_CONTEXT = {
            "sex": "male",
            "age": 23,
            "streetAddress": "22 Sagemore Lane",
            "city": "Bordentown",
            "state": "NJ",
            "country": "us",
            "zipCode": "08505",
            "medicationAssistedTherapy": "methadone",
            "substanceUse": "cocaine,heroin",
            "mentalHealthDiagnoses": "ADHD,depression",
            "suicidalIdeation": "no",
            "healthInsurance": "MassHealth",
            "healthInsuranceIdentifier": "14000000000",
            "hasDisability": "yes",
            "isOpenToFaithBasedTreatment": "yes",
        }

        response = self.client.post(
            "/filter_centers",
            json.dumps(SAMPLE_PATIENT_CONTEXT),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]["name"], "Victory House")

    def test_filter_centers_two(self):
        SAMPLE_PATIENT_CONTEXT = {
            "sex": "female",
            "age": 86,
            "streetAddress": "22 Sagemore Lane",
            "city": "Bordentown",
            "state": "NJ",
            "country": "us",
            "zipCode": "08505",
            "medicationAssistedTherapy": "methadone",
            "substanceUse": "cocaine,heroin",
            "mentalHealthDiagnoses": "PTSD,anxiety",
            "suicidalIdeation": "no",
            "healthInsurance": "Aetna",
            "healthInsuranceIdentifier": "14000000000",
            "hasDisability": "no",
            "isOpenToFaithBasedTreatment": "yes",
        }

        response = self.client.post(
            "/filter_centers",
            json.dumps(SAMPLE_PATIENT_CONTEXT),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]["name"], "PAATHS Program")
