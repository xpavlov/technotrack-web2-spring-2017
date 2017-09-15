from django.db.models.signals import post_save, post_init, pre_save
from .models import Comment, ModelWithAuthor, LikeAble, Like


def comment_init(instance, *args, **kwargs):

    instance.text_was = instance.text


def comment_presave(instance, created=False, *args, **kwargs):

    if not created and instance.text != instance.text_was:
        instance.text_was = instance.text
        instance.edited_count += 1


def comment_postsave(instance, created=False, *args, **kwargs):

    if created:
        instance.post.comments_count += 1
        instance.post.save()


post_save.connect(comment_postsave, Comment)
pre_save.connect(comment_presave, Comment)
post_init.connect(comment_init, Comment)


def model_with_author_post_save(instance, created=False, *args, **kwargs):
    if created:
        instance.author.objects_count += 1
        instance.author.save()


for model in ModelWithAuthor.__subclasses__():
    post_save.connect(model_with_author_post_save, model)
