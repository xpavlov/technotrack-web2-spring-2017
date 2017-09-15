from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):

    objects_count = models.IntegerField(default=0)


class ModelWithDates(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):

    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class Like(ModelWithDates, ModelWithAuthor):

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')


class LikeAble(models.Model):

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)

    class Meta:
        abstract = True


class WatchableModel(models.Model):

    def get_title_for_event(self, eventtype):
        raise NotImplementedError

    class Meta:
        abstract = True


class Post(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel):

    title = models.CharField(max_length=255)
    comments_count = models.IntegerField(default=0)


class Comment(ModelWithAuthor, ModelWithDates, LikeAble):

    post = models.ForeignKey(Post)
    text = models.TextField()
    text_was = None
    edited_count = models.IntegerField()
