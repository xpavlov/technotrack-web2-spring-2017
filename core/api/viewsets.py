from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import list_route
from serializers import BasicUserSerializer, FullUserSerializer, RegistrationUserSerializer
from core.permissions import permissions, ReadOnly
from core.models import User
from ugc.models import Post
from ugc.api.serializers import PostSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer
    permission_classes = (ReadOnly,)

    def get_serializer(self, instance=None, *args, **kwargs):
        if self.request.method == 'PUT' and instance == self.request.user:
            return FullUserSerializer(instance, *args, **kwargs)
        else:
            return super(UserViewSet, self).get_serializer(instance=instance, *args, **kwargs)

    @list_route(methods=['post'], url_path='register')
    def create_auth(self, request):
        serialized = RegistrationUserSerializer(data=request.data)
        if serialized.is_valid():
            serialized.create(serialized.validated_data)
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get', 'put'], permission_classes=[permissions.IsAuthenticated], url_path='me')
    def my_profile(self, request):
        if request.method == 'PUT':
            serialized = FullUserSerializer(User.objects.get(id=request.user.id), data=request.data)
            if serialized.is_valid():
                serialized.save()
            else:
                return Response(serialized.errors,
                                status=status.HTTP_400_BAD_REQUEST)

        serialized = FullUserSerializer(User.objects.get(id=request.user.id))
        return Response(serialized.data, status=status.HTTP_200_OK)

    @list_route(methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me/following')
    def my_followings(self, request):
        serialized = BasicUserSerializer(User.objects.get(id=request.user.id).following, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    @list_route(methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me/followers')
    def my_followers(self, request):
        serialized = BasicUserSerializer(User.objects.get(id=request.user.id).followers, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    @list_route(methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me/posts')
    def my_posts(self, request):
        serialized = PostSerializer(Post.objects.filter(author=request.user), many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)
