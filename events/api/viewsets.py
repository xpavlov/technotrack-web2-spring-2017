
from rest_framework.viewsets import ModelViewSet
from serializers import EventSerializer
from events.models import Event
from core.permissions import permissions, ReadOnly

# Create your views here.


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly, )

    def get_queryset(self):
        qs = super(EventViewSet, self).get_queryset()
        qs = qs.filter(author__in=self.request.user.following.all())
        return qs

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)