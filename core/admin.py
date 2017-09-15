from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline
from .models import User, Post, Comment, Like


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    pass


class LikesInline(GenericStackedInline):

    model = Like
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class LikeAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline,


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count',


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    pass
