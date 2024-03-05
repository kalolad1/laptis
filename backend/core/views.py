from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request

from .models import Center
from .serializers import CenterSerializer
from .center_filterer import CenterFilterer


@api_view(["GET"])
def get_centers(request: Request) -> Response:
    if request.method == "GET":
        centers = Center.objects.all()
        serializer = CenterSerializer(centers, many=True, context={"request": request})
        return Response(serializer.data)


@api_view(["GET"])
def get_center(request: Request, id: str) -> Response:
    if request.method == "GET":
        center = Center.objects.get(id=id)
        serializer = CenterSerializer(center, context={"request": request})
        return Response(serializer.data)


@api_view(["POST"])
def filter_centers(request: Request) -> Response:
    if request.method == "POST":
        centers = CenterFilterer(patient_context=request.data).get_centers()
        serializer = CenterSerializer(centers, many=True, context={"request": request})
        return Response(serializer.data)
