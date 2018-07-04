from __future__ import unicode_literals

from django.apps import AppConfig


class UgcConfig(AppConfig):
    name = 'ugc'
    verbose_name = 'User-generated content'

    def ready(self):
        import signals
