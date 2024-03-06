from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from .center_filterer import CenterFilterer
from .models import Center
from .serializers import CenterSerializer


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
