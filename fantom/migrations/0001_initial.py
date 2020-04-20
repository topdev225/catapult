# Generated by Django 2.1.7 on 2019-08-06 14:25

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import django_countries.fields
import fantom.models
import localflavor.us.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.CharField(max_length=254, unique=True)),
                ('business_name', models.CharField(max_length=254)),
                ('address1', models.CharField(max_length=254)),
                ('address2', models.CharField(blank=True, max_length=100)),
                ('zip_code', models.CharField(max_length=12)),
                ('state', localflavor.us.models.USStateField(max_length=2)),
                ('city', models.CharField(max_length=254)),
                ('country', django_countries.fields.CountryField(default='US', max_length=2)),
                ('logo', models.ImageField(blank=True, upload_to='logos')),
                ('description', models.TextField()),
                ('coupon_description', models.TextField(blank=True)),
                ('first_insert', models.FileField(blank=True, upload_to=fantom.models.user_directory_path_insert1)),
                ('first_insert_audio', models.FileField(blank=True, upload_to=fantom.models.user_directory_path_audio1)),
                ('second_insert', models.FileField(blank=True, upload_to=fantom.models.user_directory_path_insert2)),
                ('second_insert_audio', models.FileField(blank=True, upload_to=fantom.models.user_directory_path_audio2)),
                ('credit', models.IntegerField(default=100)),
                ('client', models.CharField(blank=True, max_length=256)),
                ('name', models.CharField(blank=True, max_length=256)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Account',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='CustomizedVideo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=1024)),
                ('notified', models.BooleanField(default=False)),
                ('downloaded', models.BooleanField(default=False)),
                ('date_rendered', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FBPage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fb_userID', models.CharField(max_length=50)),
                ('fb_pageID', models.CharField(max_length=50)),
                ('fb_pageName', models.CharField(max_length=256)),
                ('fb_pageAccessToken', models.CharField(max_length=256)),
                ('token_expiration', models.DateTimeField(default=None, null=True)),
                ('added_timestamp', models.DateTimeField(default=None, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RawVideo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='logos')),
                ('title', models.TextField(blank=True, max_length=256)),
                ('thumbnail', models.ImageField(upload_to='logos')),
                ('length', models.PositiveIntegerField()),
                ('dim_x', models.PositiveIntegerField()),
                ('dim_y', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('sports', models.CharField(blank=True, max_length=256)),
                ('insert_time_1', models.CharField(blank=True, help_text='Format is hours:minutes:seconds:frames', max_length=100)),
                ('hosts', models.CharField(blank=True, max_length=256)),
                ('num_downloads', models.PositiveIntegerField(default=0)),
                ('social_copy', models.TextField(blank=True)),
                ('projected_score', models.FloatField(default=100.0)),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='TasksRender',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.IntegerField(default=5)),
                ('date_requested', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fantom.RawVideo')),
            ],
        ),
        migrations.CreateModel(
            name='VideoSeries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('hosts', models.CharField(blank=True, max_length=256)),
                ('channels', models.CharField(blank=True, max_length=256)),
                ('delivered', models.CharField(blank=True, max_length=256)),
                ('description', models.TextField()),
                ('average_length', models.DurationField()),
                ('recommended_profiles', models.CharField(blank=True, max_length=256)),
                ('recommended_age_range', models.CharField(blank=True, max_length=256)),
                ('thumbnail', models.ImageField(blank=True, upload_to='logos')),
            ],
        ),
        migrations.AddField(
            model_name='subscription',
            name='series',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fantom.VideoSeries'),
        ),
        migrations.AddField(
            model_name='subscription',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='rawvideo',
            name='series',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='raw_videos', to='fantom.VideoSeries'),
        ),
        migrations.AddField(
            model_name='customizedvideo',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fantom.RawVideo'),
        ),
    ]
