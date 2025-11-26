# backend/api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    # Campo extra para confirmar contraseña
    password2 = serializers.CharField(
        write_only=True,    # No se devuelve en la respuesta
        required=True,
        style={'input_type': 'password'}  # Oculta en formularios
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},  # Nunca se devuelve
            'email': {'required': False}       # Opcional
        }

    # VALIDACIÓN PERSONALIZADA
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden"
            })
        return data

    # CREACIÓN DEL USUARIO
    def create(self, validated_data):
        # Quitamos password2 porque no va en el User
        validated_data.pop('password2')
        
        # Creamos el usuario con contraseña encriptada
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
    