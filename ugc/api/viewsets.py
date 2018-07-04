
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django.shortcuts import get_object_or_404
from serializers import PostSerializer, CommentSerializer, LikeSerializer, ContentTypeSerializer, serializers
from django.contrib.contenttypes.models import ContentType
from ugc.models import Post, Comment, Like, models
from core.permissions import IsOwnerOrReadOnly, ReadOnly, permissions
import sys

# Create your views here.


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        return qs

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all().order_by('-created')
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class ContentTypeViewSet(ModelViewSet):
    # queryset = ContentType.objects.none()
    serializer_class = ContentTypeSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly, )

    def get_queryset(self):
        queryset = ContentType.objects.all()
        hasApi = []
        for q in queryset:
            if hasattr(q.model_class(), 'hasAPI'):
                if q.model_class().hasAPI:
                    hasApi.append(q.id)
        return queryset.filter(id__in=hasApi)


class ContentViewSet(ReadOnlyModelViewSet):

    def get_model_name(self):
        model_id = self.request.query_params.get('type_id', None)
        queryset = ContentType.objects.all()
        found = get_object_or_404(queryset, pk=model_id)
        model_name = found.model
        model_name = model_name[:1].upper() + model_name[1:]
        return model_name

    def get_queryset(self):
        model_name = self.get_model_name()
        model = getattr(sys.modules[__name__], model_name)
        print model
        return model.objects.all()

    def get_serializer(self, *args, **kwargs):
        model_name = self.get_model_name()
        serializer_name = '{}{}'.format(model_name, 'Serializer')
        serializer_class = getattr(sys.modules[__name__], serializer_name)
        print serializer_class
        return serializer_class(*args, **kwargs)
