# -*- coding: utf-8 -*-
from django.db.models.signals import post_save, pre_delete
from django.db.models import F
from .tasks import send_confirmation_mail
from .models import User
from django.db import transaction


def confirm_registration(instance, created=False, *args, **kwargs):
    if created:
        transaction.on_commit(lambda: (send_confirmation_mail.apply_async([instance.pk, ], {})))


post_save.connect(send_confirmation_mail, User)
