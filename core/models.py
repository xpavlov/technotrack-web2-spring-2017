from __future__ import unicode_literals

from django.db.models.signals import m2m_changed
from events.inheritance_models import WatchableModel
from django.contrib.auth.models import AbstractUser
from django.db import models


class ModelWithApi(models.Model):
    hasAPI = True

    class Meta:
        abstract = True


class DateableModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser, DateableModel, WatchableModel, ModelWithApi):

    following = models.ManyToManyField('self', blank=True, related_name="followers", symmetrical=False)
    # wall = models.ManyToMany(Event, blank=True)

    @classmethod
    def set_signal(cls, handler):
        m2m_changed.connect(handler, User.following.through)

    def get_title_for_event(self):
        return "{} now is subscribed to {}".format(self.username,'{}')

    def get_event_type(self):
        return self.follow_event

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class AuthorableModel(models.Model):
    author = models.ForeignKey(User, verbose_name='Author')

    class Meta:
        abstract = True
