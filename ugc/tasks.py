
# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from templated_email import InlineImage
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from .models import Post
from core.models import User


def send_mail(subject, text, template, context, to):

    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]
    email = EmailMultiAlternatives(subject, text, 'noreply@localhost', to)
    html = render_to_string(template, context)
    email.attach_alternative(html, 'text/html')
    email.send()


@shared_task
def send_new_post_mail(post_pk):

    post = Post.objects.all().prefetch_related('author').get(pk=post_pk)

    if post.author.email is None:
        return
    to = post.author.email

    subject = 'Post created'
    text = 'Check it at: http://0.0.0.0:8000'

    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]

    context = {'username': post.author.username, 'html_text': 'Post details: {}'.format(post.text)}
    send_mail(subject, text, 'emails/new_post_letter.html', context, to)


@shared_task
def send_events_feed(user):

    if user.email is None:
        return
    to = user.email

    subject = 'Subscriptions: new event occured'
    text = 'You can check ur event list here: http://0.0.0.0:8000'

    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]

    context = {'username': user.username}
    send_mail(subject, text, 'emails/events_letter.html', context, to)


