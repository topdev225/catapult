from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, FBPage, VideoSeries, RawVideo, CustomizedVideo, TasksRender, Subscription


@admin.register(Account)
class AccountAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'business_name', 'zip_code', 'city', 'state', 'country')
    fieldsets = (
        ('Personal Details',
         {'fields': ('username', 'email', 'business_name', 'description', 'coupon_description', 'address1', 'address2', 'zip_code', 'city', 'state', 'country')}),
        ('Media',
         {'fields': ('logo',
                     'first_insert',
                     'first_insert_audio',
                     'second_insert',
                     'second_insert_audio')}),
        ('Permission', {'fields': ('is_superuser', 'is_staff')}),
        ('Password Details', {'fields': ('password',)})
    )


@admin.register(FBPage)
class FBPage(admin.ModelAdmin):
    pass


@admin.register(VideoSeries)
class VideoSeries(admin.ModelAdmin):
    list_display = ('name', 'thumbnail', 'average_length', 'hosts', 'channels', 'description')
    list_filter = ('hosts', 'channels')

@admin.register(RawVideo)
class RawVideo(admin.ModelAdmin):
    list_display = ('id', 'video', 'thumbnail_url', 'series', 'length', 'date_created')
    list_filter = ('series',)

@admin.register(CustomizedVideo)
class CustomizedVideo(admin.ModelAdmin):
    list_display = ('id','user', 'video', 'url', 'notified')
    list_filter = ('user', 'video')


@admin.register(TasksRender)
class TasksRender(admin.ModelAdmin):
    list_display = ('user', 'video', 'priority', 'date_requested')
    list_filter = ('user', 'video', 'priority', 'date_requested')

@admin.register(Subscription)
class Subscription(admin.ModelAdmin):
    list_display = ('id', 'user', 'series', 'date_created')
    list_filter = ('user', 'series')



