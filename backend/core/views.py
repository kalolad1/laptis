from django.shortcuts import render
from .models import Center, CenterType
from .forms import SignUpForm, LogInForm
from django.contrib.auth import logout, login
from django.shortcuts import redirect


def home(request):
    print(request.user)
    print(request.user.is_authenticated)

    centers = Center.objects.all()
    center_types = CenterType.values
    return render(
        request, "index.html", {"centers": centers, "center_types": center_types}
    )


def homepage_with_filter(request, center_type: str):
    centers = Center.objects.filter(center_type=center_type)
    center_types = CenterType.values
    return render(
        request,
        "index.html",
        {
            "centers": centers,
            "center_types": center_types,
            "selected_center_type": center_type,
        },
    )


def center_view(request, pk: int):
    center = Center.objects.get(pk=pk)
    return render(request, "center.html", {"center": center})


def sign_up(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")
        else:
            print(form.errors)
            print("Form is not valid")
    return redirect("home")


def log_in(request):
    if request.method == "POST":
        form = LogInForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("home")

    return render(request, "index.html")


def log_out(request):
    logout(request)
    return redirect("home")
