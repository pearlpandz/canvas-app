from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password

def authenticate_user(request, user_model, user_type):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        raise AuthenticationFailed("email and password are required.")

    user = user_model.objects.filter(email=email).first()

    if not user or not check_password(password, user.password):
        raise AuthenticationFailed(f"Invalid credentials for {user_type}.")

    if not user.is_verified:
        raise AuthenticationFailed(f"{user_type} account is not verified.")

    refresh = RefreshToken.for_user(user)

    response = Response({
        "user": {
            "id": user.id,
            "email": user.email,
            "name": f"{user.first_name} {user.last_name}"
        },
    })

    response.set_cookie("refresh_token", str(refresh), httponly=True)
    response.set_cookie("access_token", str(refresh.access_token), httponly=True)

    return response