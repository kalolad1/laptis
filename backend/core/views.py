import json

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .api.typeform_response_getter import TypeformResponseGetter
from .center_filterer import CenterFilterer
from .serializers import (
    CenterSerializer,
    PatientSerializer,
    PatientApplicationContextSerializer,
)

from .models.application import Application, PatientApplicationContext
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
@permission_classes([IsAuthenticated])
def filter_centers(request: Request) -> Response:
    user_patient_id = request.data["user_patient_id"]
    patient_application_context_id = request.data["patient_application_context_id"]

    user = User.objects.get(id=user_patient_id)
    pac = PatientApplicationContext.objects.get(
        patient_application_context_id=patient_application_context_id
    )

    centers = CenterFilterer(user, pac).get_centers()
    serializer = CenterSerializer(centers, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
def get_typeform_response(request: Request) -> Response:
    form_id = request.data.get("form_id", "")
    response_id = request.data.get("response_id", "")

    answers = TypeformResponseGetter(form_id, response_id).get_answers()
    answers_json = json.dumps(answers)
    return Response(answers_json)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_patient(request: Request) -> Response:
    if not request.user.is_anonymous:
        User.objects.create_patient(provider=request.user.provider, **request.data)
    return Response(status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_patients(request: Request) -> Response:
    if not request.user.is_anonymous:
        patients = request.user.provider.patient_set.all()
        serializer = PatientSerializer(
            patients, many=True, context={"request": request}
        )
        return Response(serializer.data)
    assert False


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_patient_application_context(request: Request) -> Response:
    print(request.data)
    user_patient_id = request.data["user_patient_id"]
    has_had_suicidal_thoughts_in_last_90_days = request.data[
        "has_had_suicidal_thoughts_in_last_90_days"
    ]
    has_used_drugs_in_last_90_days = request.data["has_used_drugs_in_last_90_days"]

    pac = PatientApplicationContext.objects.create(
        user=User.objects.get(id=user_patient_id),
    )
    pac.has_had_suicidal_thoughts_in_last_90_days = (
        has_had_suicidal_thoughts_in_last_90_days
    )
    pac.has_used_drugs_in_last_90_days = has_used_drugs_in_last_90_days
    pac.save()
    serializer = PatientApplicationContextSerializer(pac, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
def create_application(request: Request) -> Response:
    Application.objects.create(**request.data)
    return Response(status=200)


# User
@api_view(["POST"])
def sign_up(request: Request) -> Response:
    # Check if user with email already exists
    if User.objects.filter(email=request.data["email"]).exists():
        return Response(status=400)

    # Pop email from dict
    email = request.data.pop("email")
    password = request.data.pop("password")
    user_type = request.data.pop("user_type")
    is_patient = user_type == "patient"
    is_provider = user_type == "provider"

    user = User.objects.create_new_user(
        email=email,
        password=password,
        is_patient=is_patient,
        is_provider=is_provider,
        **request.data
    )
    user_id_json = json.dumps({"user_id": user.id})
    return Response(user_id_json)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
