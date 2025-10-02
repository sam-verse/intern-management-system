from rest_framework import serializers
from .models import Project
from core.models import User


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "role"]


class ProjectSerializer(serializers.ModelSerializer):
    interns = UserBasicSerializer(many=True, read_only=True)
    intern_ids = serializers.PrimaryKeyRelatedField(
        source='interns', queryset=User.objects.all(), many=True, write_only=True, required=False
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "status",
            "progress",
            "due_date",
            "interns",
            "intern_ids",
            "created_at",
            "updated_at",
        ]



