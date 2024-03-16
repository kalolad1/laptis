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
