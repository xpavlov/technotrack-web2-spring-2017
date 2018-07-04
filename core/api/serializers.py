from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from core.models import User


class RegistrationUserSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',)


class BasicUserSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.ReadOnlyField()
    first_name = serializers.ReadOnlyField()
    last_name = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    # following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)
        # read_only_fields = ['followers',]


class FullUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
