from .inheritance_models import WatchableModel
from django.contrib.contenttypes.models import ContentType
from .models import Event
from django.db.models.signals import post_save
from .tasks import notify_users
from django.db import transaction


def create_event(instance, created=False, *args, **kwargs):
    if instance.get_event_type() is WatchableModel.activity_event:
        if created:
            event = Event()
            event.author = instance.author
            event.title = instance.get_title_for_event()
            event.content_type = ContentType.objects.get(model=instance.__class__.__name__)
            event.object_id = instance.id
            event.save()
    elif instance.get_event_type() is WatchableModel.follow_event:
        action = kwargs.get('action')
        if action and action in 'post_add':
            fuid = next(iter(kwargs['pk_set']))
            model = kwargs['model']
            event = Event()
            event.author = instance
            event.title = instance.get_title_for_event().format(model.objects.get(id=fuid))
            event.content_type = ContentType.objects.get(model=instance.__class__.__name__)
            event.object_id = fuid
            event.save()


for model in WatchableModel.__subclasses__():
    model.set_signal(create_event)
    # print 'set watchable signal for {}'.format(model)


def notify(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        transaction.on_commit(lambda: (notify_users.apply_async([instance.pk, ], {})))


post_save.connect(notify, Event)



