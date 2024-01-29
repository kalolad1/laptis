from django.http import JsonResponse

from .models import Center
from .serializers import CenterSerializer


def home(request):
    return "DUMMY HOME"


def get_centers(request):
    if request.method == "GET":
        centers = Center.objects.all()
        serializer = CenterSerializer(centers, many=True)
        return JsonResponse(serializer.data, safe=False)
