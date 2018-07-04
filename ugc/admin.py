
from django.contrib import admin
from .models import Post, Comment, Like
from django.contrib.contenttypes.admin import GenericStackedInline

# Register your models here.


class LikesInline(GenericStackedInline):
    model = Like
    extra = 0
    verbose_name_plural = 'Likes'
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class CommentsInline(GenericStackedInline):
    model = Comment
    extra = 0
    verbose_name_plural = 'Comments'
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class LikeableAdmin(admin.ModelAdmin):
    inlines = LikesInline,


class CommentableAdmin(admin.ModelAdmin):
    inlines = CommentsInline,


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = LikesInline, CommentsInline,
    readonly_fields = 'likes_count', 'comments_count',


@admin.register(Comment)
class CommentAdmin(LikeableAdmin):
    readonly_fields = 'likes_count',


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass


