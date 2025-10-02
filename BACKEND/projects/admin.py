from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "progress", "due_date", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "description")

# Register your models here.
