# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_save


class WatchableModel(models.Model):
    activity_event = 'activity_event'
    follow_event = 'follow_event'

    @classmethod
    def set_signal(cls, handler):
        post_save.connect(handler, cls)

    def get_title_for_event(self):
        raise NotImplemented
        # return 'title: {}'.self.title

    def get_event_type(self):
        raise NotImplemented
    #   return activity_event
    #   return follow_event

    class Meta:
        abstract = True