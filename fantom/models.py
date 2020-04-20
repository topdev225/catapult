from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django_countries.fields import CountryField
from localflavor.us.models import USStateField
from django.utils.html import format_html
from django.utils import timezone


def user_directory_path_insert1(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'acct_settings/user_{0}/insert1_{1}'.format(instance.id, filename)


def user_directory_path_audio1(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'acct_settings/user_{0}/audio1_{1}'.format(instance.id, filename)


def user_directory_path_insert2(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'acct_settings/user_{0}/insert2_{1}'.format(instance.id, filename)


def user_directory_path_audio2(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'acct_settings/user_{0}/audio2_{1}'.format(instance.id, filename)


class Account(AbstractUser):
    email = models.CharField(max_length=254, unique=True, null=False)
    business_name = models.CharField(max_length=254)
    address1 = models.CharField(max_length=254)
    address2 = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=12)
    state = USStateField()
    city = models.CharField(max_length=254)
    country = CountryField(default='US')
    logo = models.ImageField(upload_to=settings.LOGOS_ROOT, blank=True)
    description = models.TextField()
    coupon_description = models.TextField(blank=True)
    # first_insert = models.FileField(upload_to=settings.LOGOS_ROOT, blank=True)
    first_insert = models.FileField(upload_to=user_directory_path_insert1, blank=True)
    first_insert_audio = models.FileField(upload_to=user_directory_path_audio1, blank=True)
    second_insert = models.FileField(upload_to=user_directory_path_insert2, blank=True)
    second_insert_audio = models.FileField(upload_to=user_directory_path_audio2, blank=True)
    credit = models.IntegerField(default=100)
    client = models.CharField(max_length=256, blank=True)
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return self.username

    def eligible(self):
        """
        Returns: eligible for rendering a video, only if has logo and inserts

        """
        return bool(self.logo) and bool(self.first_insert)

    class Meta:
        verbose_name = 'Account'


class FBPage(models.Model):
    """ Connects a user (on Catapult) to a FB user, and a single FB page owned by this user. Store permanent page access token."""
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    fb_userID = models.CharField(max_length=50)
    fb_pageID = models.CharField(max_length=50)
    fb_pageName = models.CharField(max_length=256)
    fb_pageAccessToken = models.CharField(max_length=256)
    token_expiration = models.DateTimeField(default=None, null=True)
    added_timestamp = models.DateTimeField(default=None, null=True)

    def __str__(self):
        return "user #%s (%s) -> %s (page %s)" % (self.owner.id, self.owner.username, self.fb_pageName, self.fb_pageID)

    def json(self):
        return {
            'fb_userID': self.fb_userID,
            'fb_pageID': self.fb_pageID,
            'fb_pageName': self.fb_pageName,
            'expiration': self.token_expiration
        }


class VideoSeries(models.Model):
    name = models.CharField(max_length=256)
    hosts = models.CharField(max_length=256, blank=True)
    channels = models.CharField(max_length=256, blank=True)
    delivered = models.CharField(max_length=256, blank=True)
    description = models.TextField()
    average_length = models.DurationField()  # ARIEL TODO CHECK
    recommended_profiles = models.CharField(max_length=256, blank=True)
    recommended_age_range = models.CharField(max_length=256, blank=True)
    thumbnail = models.ImageField(upload_to=settings.LOGOS_ROOT, blank=True)  # ARIEL TODO CHECK

    def __str__(self):
        return self.name


MAX_SIZE = [150, 150]


class RawVideo(models.Model):
    video = models.FileField(upload_to=settings.LOGOS_ROOT)  # ARIEL TODO CHECK
    title = models.TextField(max_length=256, blank=True)
    thumbnail = models.ImageField(upload_to=settings.LOGOS_ROOT)  # ARIEL TODO CHECK
    length = models.PositiveIntegerField()  # in seconds
    dim_x = models.PositiveIntegerField()
    dim_y = models.PositiveIntegerField()
    description = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    sports = models.CharField(max_length=256, blank=True)
    insert_time_1 = models.CharField(max_length=100, blank=True,
                                     help_text="Format is hours:minutes:seconds:frames")
    series = models.ForeignKey(VideoSeries, on_delete=models.CASCADE, related_name='raw_videos')
    hosts = models.CharField(max_length=256, blank=True)
    num_downloads = models.PositiveIntegerField(default=0)
    social_copy = models.TextField(blank=True)
    projected_score = models.FloatField(default=100.0)

    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url

    @property
    def thumbnail_url(self):
        try:
            if bool(self.thumbnail):
                return format_html('<img src="%s" style="max-width:%spx; max-height:%spx;"/>' %
                                   (self.thumbnail.url, *MAX_SIZE))
            else:
                return None
        except:
            print("Video %s has an issue with the thumbnail. %s" % (self.id, self))
            return None

    def __str__(self):
        return str(self.id)


class CustomizedVideo(models.Model):
    url = models.CharField(max_length=1024)
    video = models.ForeignKey(RawVideo, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    notified = models.BooleanField(default=False)
    downloaded = models.BooleanField(default=False)
    date_rendered = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)


class TasksRender(models.Model):
    video = models.ForeignKey(RawVideo, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    priority = models.IntegerField(default=5)
    date_requested = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)


class Subscription(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    series = models.ForeignKey(VideoSeries, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)
