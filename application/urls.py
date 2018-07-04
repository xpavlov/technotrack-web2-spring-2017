"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from rest_framework import routers
from ugc.api.viewsets import PostViewSet, CommentViewSet, LikeViewSet, ContentTypeViewSet, ContentViewSet
from django.views.generic import TemplateView
from core.api.viewsets import UserViewSet
from events.api.viewsets import EventViewSet
from django.views.decorators.csrf import ensure_csrf_cookie

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'events', EventViewSet)
router.register(r'types', ContentTypeViewSet, base_name='types')
router.register(r'content', ContentViewSet, base_name='content')


urlpatterns = [
    url(r'^api/v1/', include(router.urls, namespace='api')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^social/', include('social_django.urls', namespace='social')),
    url(r'^admin/', admin.site.urls),
    url(r'^', ensure_csrf_cookie(TemplateView.as_view(template_name='core/core.html'))),
]
# if settings.DEBUG:
#     import debug_toolbar
#
#     urlpatterns += [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ]
