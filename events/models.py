# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import serializers
from core.models import AuthorableModel, DateableModel
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models


class Event(AuthorableModel, DateableModel):
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField(default=0)
    object = GenericForeignKey('content_type', 'object_id')
    title = models.TextField()

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    def __unicode__(self):
        return "event: {}".format(self.title)