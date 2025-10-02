from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import User
from projects.models import Project


class Command(BaseCommand):
    help = "Seed demo users and projects"

    def handle(self, *args, **options):
        admin, _ = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@company.com",
                "role": "admin",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if not admin.has_usable_password():
            admin.set_password("admin123")
            admin.save()

        intern1, _ = User.objects.get_or_create(
            username="sarah",
            defaults={"email": "sarah@intern.company.com", "role": "intern"},
        )
        if not intern1.has_usable_password():
            intern1.set_password("intern123")
            intern1.save()

        intern2, _ = User.objects.get_or_create(
            username="alex",
            defaults={"email": "alex@intern.company.com", "role": "intern"},
        )
        if not intern2.has_usable_password():
            intern2.set_password("intern123")
            intern2.save()

        proj1, _ = Project.objects.get_or_create(
            title="E-commerce Mobile App",
            defaults={
                "description": "Building a React Native app for online shopping",
                "status": Project.STATUS_IN_PROGRESS,
                "progress": 65,
                "due_date": timezone.now().date(),
            },
        )
        proj1.interns.set([intern1])

        proj2, _ = Project.objects.get_or_create(
            title="Data Analytics Dashboard",
            defaults={
                "description": "Creating interactive charts and visualization tools",
                "status": Project.STATUS_PLANNING,
                "progress": 25,
                "due_date": timezone.now().date(),
            },
        )
        proj2.interns.set([intern2])

        self.stdout.write(self.style.SUCCESS("Seeded demo data."))



