# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig


class EventsConfig(AppConfig):
    name = 'events'
    verbose_name = 'Events'

    def ready(self):
        import signals
