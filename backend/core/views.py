from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Center
from .serializers import CenterSerializer


def home(request):
    return "DUMMY HOME"


@api_view(["GET"])
def get_centers(request):
    if request.method == "GET":
        centers = Center.objects.all()
        serializer = CenterSerializer(centers, many=True, context={"request": request})
        return Response(serializer.data)
