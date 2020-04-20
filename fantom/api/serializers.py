from django.contrib.auth.models import Group
from fantom.models import Account, FBPage, VideoSeries, RawVideo, CustomizedVideo, TasksRender, Subscription
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['id',
                  'business_name',
                  'username',
                  'email',
                  'url',
                  'logo',
                  'first_insert',
                  'first_insert_audio',
                  'second_insert',
                  'second_insert_audio',
                  'address1',
                  'address2',
                  'zip_code',
                  'state',
                  'city',
                  'country',
                  'client',
                  'first_name',
                  'last_name',
                  'password'
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance



class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']



class FBPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FBPage
        fields = ('owner', 'fb_userID', 'fb_pageID', 'fb_pageName')
        read_only_fields = ('owner',)


class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoSeries

        fields = ('id',
                  'name',
                  'hosts',
                  'channels',
                  'thumbnail',
                  'description',
                  'average_length',
                  'recommended_profiles',
                  'recommended_age_range',
                  'delivered',
                  'raw_videos')

        depth = 1

class RawVideoSerializer(serializers.ModelSerializer):

    def validate_insert_time_1(self, value):
        try:
            times = [int(t) for t in value.split(":")]
        except:
            raise serializers.ValidationError("insert_time_1 format should be hours:minutes:seconds:frames")
        return value

    class Meta:
        model = RawVideo
        fields = ('id',
                'video',
                  'title',
                'thumbnail',
                'series',
                'date_created',
                'social_copy',
                'insert_time_1',
                'hosts',
                'description',
                'sports',
                'length',
                'dim_x',
                'dim_y',
                'num_downloads',
                'projected_score')
        depth = 1

class CustomizedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomizedVideo
        fields = ('id',
                  'url',
                  'video',
                  'user',
                  'notified',
                  'downloaded',
                  'date_rendered')
        # depth = 1


class TasksRenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasksRender
        fields = ('id',
                  'video',
                  'user',
                  'priority',
                  'date_requested')



class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

