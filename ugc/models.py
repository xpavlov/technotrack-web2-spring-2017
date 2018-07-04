# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from core.models import AuthorableModel, DateableModel, ModelWithApi
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.db.models.signals import post_save
from django.contrib.contenttypes.models import ContentType
from events.inheritance_models import WatchableModel

from django.db import models

# Create your models here.


class Like(AuthorableModel, DateableModel, WatchableModel, ModelWithApi):

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField(default=0)
    object = GenericForeignKey('content_type', 'object_id')

    def get_title_for_event(self):
        return "{} liked {}".format(self.author.username, self.content_type.model_class().objects.get(id=self.object_id))

    def get_event_type(self):
        return self.activity_event

    def __unicode__(self):
        return "Received like from user {}".format(self.author.username)

    class Meta:
        verbose_name = 'Like'
        verbose_name_plural = 'Like'


class LikeableModel(models.Model):

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0, verbose_name='Всего лайков')

    class Meta:
        abstract = True


class Comment(AuthorableModel, DateableModel, LikeableModel, WatchableModel, ModelWithApi):

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField(default=0)
    object = GenericForeignKey('content_type', 'object_id')

    text = models.TextField(verbose_name='comment text')

    def get_title_for_event(self):
        return "{} leaved a comment: \"{}\"".format(self.author.username, self.text[:50])

    def get_event_type(self):
        return self.activity_event

    def __unicode__(self):
        return "comment: \"{}\" from {}".format(self.text[:50], self.author.username)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'


class CommentableModel(models.Model):

    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type')
    comments_count = models.IntegerField(default=0, verbose_name='Total comments')

    class Meta:
        abstract = True


class Post(AuthorableModel, DateableModel, CommentableModel, LikeableModel, WatchableModel, ModelWithApi):

    text = models.TextField(verbose_name='Post text')

    def get_title_for_event(self):
        return "{} posted: \"{}\"".format(self.author.username, self.text[:50])

    def get_event_type(self):
        return self.activity_event

    def __unicode__(self):
        return "New \"{}\" from {}".format(self.text[:50], self.author.username)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'