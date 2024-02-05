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
