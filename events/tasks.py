# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Event
import json
import requests

from cent.core import generate_api_sign

@shared_task
def notify_users(event_pk):

    event = Event.objects.all().prefetch_related('author').get(pk=event_pk)
    followers = event.author.followers.all()
    for follower in followers:
        commands = [
            {
                "method": "publish",
                "params": {"channel": "events-{}".format(follower.pk), "data": "{}".format(event.title)}
            }
        ]
        encoded_data = json.dumps(commands)
        sign = generate_api_sign("5q65807c-1ff63-578b-10f0-7e45e6f00f30", encoded_data)
        headers = {'Content-type': 'application/json', 'X-API-Sign': sign}
        requests.post("http://0.0.0.0:8081/api/", data=encoded_data, headers=headers)
