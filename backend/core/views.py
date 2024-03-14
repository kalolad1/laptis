import json

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from .api.typeform_response_getter import TypeformResponseGetter
from .center_filterer import CenterFilterer
from .serializers import CenterSerializer, PatientSerializer

from .models.center import Center
from .models.user import User


@api_view(["GET"])
def get_centers(request: Request) -> Response:
    centers = Center.objects.all()
    serializer = CenterSerializer(centers, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def get_center(request: Request, id: str) -> Response:
    center = Center.objects.get(id=id)
    serializer = CenterSerializer(center, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
def filter_centers(request: Request) -> Response:
    centers = CenterFilterer(patient_context=request.data).get_centers()
    serializer = CenterSerializer(centers, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def get_typeform_response(request: Request) -> Response:
    form_id = request.query_params.get("form_id", "")
    response_id = request.query_params.get("response_id", "")

    answers = TypeformResponseGetter(form_id, response_id).get_answers()
    answers_json = json.dumps(answers)
    return Response(answers_json)


@api_view(["POST"])
def create_new_patient(request: Request) -> Response:
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    age = request.data["age"]

    User.objects.create_patient(first_name=first_name, last_name=last_name, age=age)
    return Response(status=200)


# TODO: Implement such that provider gets their own patients, rather than all
@api_view(["GET"])
def get_patients(request: Request) -> Response:
    users = User.objects.filter(is_patient=True)
    patients = [user.patient for user in users]
    serializer = PatientSerializer(patients, many=True, context={"request": request})
    return Response(serializer.data)
