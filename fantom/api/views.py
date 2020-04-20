from django.contrib.auth.models import Group
from django.http import JsonResponse
from django.conf import settings

from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from fantom.models import Account, FBPage, VideoSeries, RawVideo, CustomizedVideo, TasksRender, Subscription
from fantom import views as faviews
from fantom.views import Status
from .serializers import *

import traceback
import threading
import time

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer



class FBPageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = FBPageSerializer
    queryset = FBPage.objects.all()


class SeriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = SeriesSerializer
    queryset = VideoSeries.objects.all()
    ordering_fields = '__all__'

class RawVideoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = RawVideoSerializer
    queryset = RawVideo.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering = ['-date_created']
    ordering_fields = '__all__'


class TasksRenderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TasksRenderSerializer
    queryset = TasksRender.objects.all()
    ordering_fields = '__all__'
    filterset_fields = '__all__'

class SubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    ordering_fields = '__all__'
    filterset_fields = '__all__'


class CustomizedVideoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CustomizedVideoSerializer
    queryset = CustomizedVideo.objects.all()
    ordering_fields = '__all__'

    @action(methods=['get'], detail=False, permission_classes=(permissions.IsAuthenticated,), url_path='(?P<userid>\d+)/(?P<videoid>\d+)')
    def request_customized_video(self, request, pk=None, userid=None, videoid=None):
        maybe_start_renderer_thread()

        try:
            user = Account.objects.get(pk=userid)
        except:
            return JsonResponse({"status": "error", "message": "user %s doesn't exist" % userid})

        try:
            video = RawVideo.objects.get(pk=videoid)
        except:
            return JsonResponse({"status": "error", "message": "video %s doesn't exist" % videoid})

        try:
            cv = CustomizedVideo.objects.filter(user=user, video=video)
            if cv.exists():
                cc = cv.first()
                print("found customized video %s for user %s" % (video, user))

                return JsonResponse({"status": "ready", "message":
                    ("http://" + settings.DEFAULT_DOMAIN + cc.url)})

            # no customized video ready yet

            rt = TasksRender.objects.filter(user=user, video=video)
            if rt.exists():
                rrr = rt.first()
                print("Task %s to render video %s for user %s was found"  % (rrr, video, user))
                return JsonResponse({"status": "pending", "message": "already existed"})
            else:
                eligible, msg = userEligibleToRenderVideo(user, video)
                if eligible:
                    addRenderTask(user, video)
                    return JsonResponse({"status": "pending", "message": "added now"})
                else:
                    return JsonResponse({"status": "error", "message": "user %s not eligible to render video %s: %s" % (user, video, msg)})
        except Exception as e:
            print(traceback.format_exc())
            return JsonResponse({"status": "error", "message": str(e)})

def userEligibleToRenderVideo(user, video):
    if user.eligible():
        return True, "user has assets OK"
    else:
        return False, "no assets for rendering found"

def addRenderTask(user, video):
    task = TasksRender(user=user, video=video)
    task.save()
    print("adding task to render video %s for user %s" % (video, user))



def maybe_start_renderer_thread():
    if settings.RENDERER_THREAD is not None:
        return

    print("Starting a rendered thread")
    settings.RENDERER_THREAD = threading.Thread(target=do_rendering_tasks, name="rendering videos")
    settings.RENDERER_THREAD.setDaemon(True)
    settings.RENDERER_THREAD.start()


def do_rendering_tasks():
    while True:
        tasks = TasksRender.objects.all().order_by('-priority','date_requested')
        if tasks.exists():
            task = tasks.first()
            try:
                user = task.user
                video = task.video
            except:
                if task.priority < 0:
                    print("error while reading rendering task, deleting this task %s" % task)
                    task.delete()
                else:
                    print("error while reading rendering task %s" % task)
                    task.priority = task.priority - 5
                    task.save()
                continue

            if not user.eligible():
                task.priority = 0
                task.save()
                print("WARNING: task %s to render for user %s (%s) - user is ineligible.")
                continue
            else:
                print("Doing task %s with priority %d: render video %s for user %s (%s)" % (
                    task.id, task.priority, video, user.id, user))

                video_url, composite_name = faviews.render_video_for_user(user, video)
                if video_url == Status.FAIL:
                    print('damn this error')
                    task.priority = 0
                    task.save()
                else:
                    faviews.save_video_for_user(user, video, video_url)
                    task.delete()
                    faviews.notify_user_task_rendered(user, video, video_url)

        time.sleep(5)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})

