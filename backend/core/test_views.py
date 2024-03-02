import json

from django.test import TestCase

from .models import Center


class ViewsTestCase(TestCase):
    def setUp(self):
        Center.objects.create(
            name="Center 1",
            address="Address 1",
            center_type="detox",
            image="https://picsum.photos/200/300",
            id=1,
        )
        Center.objects.create(
            name="Center 2",
            address="Address 2",
            center_type="detox",
            image="https://picsum.photos/200/300",
            id=2,
        )

    def test_get_centers(self):
        response = self.client.get("/centers")
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(len(response_data), 2)

    def test_get_center(self):
        response = self.client.get("/centers/1")
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data["name"], "Center 1")

    def test_filter_centers(self):
        SAMPLE_PATIENT_CONTEXT = {
            "sex": "male",
            "dateOfBirth": "Sun Feb 08 1998 00:00:00 GMT-0500 (Eastern Standard Time)",
            "streetAddress": "22 Sagemore Lane",
            "city": "Bordentown",
            "state": "NJ",
            "country": "us",
            "zipCode": "08505",
            "medicationAssistedTherapy": "methadone",
            "substanceUse": "cocaine,heroin",
            "mentalHealthDiagnoses": "ADHD",
            "suicidalIdeation": "no",
            "healthInsurance": "MassHealth",
            "healthInsuranceIdentifier": "14000000000",
            "mobilityRestrictions": "no",
            "faithBasedTreatment": "yes",
        }

        response = self.client.post("/filter_centers", SAMPLE_PATIENT_CONTEXT)
        self.assertEqual(response.status_code, 200)
