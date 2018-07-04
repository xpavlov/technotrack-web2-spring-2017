
from django.db.models.signals import post_save, pre_delete
from django.db.models import F
from .tasks import send_new_post_mail
from .models import Comment, Like, Post
from django.db import transaction


def count_likes(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('likes_count') + 1)
    elif deleted:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('likes_count') - 1)


def count_comments(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('comments_count') + 1)
    elif deleted:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('comments_count') - 1)


def confirm_new_post(instance, created=False, *args, **kwargs):
    if created:
        transaction.on_commit(lambda: (send_new_post_mail.apply_async([instance.pk, ], {})))


# post_save.connect(confirm_new_post, Post)
post_save.connect(count_likes, Like)
pre_delete.connect(count_likes, Like)
post_save.connect(count_comments, Comment)
pre_delete.connect(count_comments, Comment)
