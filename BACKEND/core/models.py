from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_ADMIN = 'admin'
    ROLE_INTERN = 'intern'
    ROLE_CHOICES = [
        (ROLE_ADMIN, 'Admin'),
        (ROLE_INTERN, 'Intern'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_INTERN)

    def __str__(self) -> str:
        return f"{self.username} ({self.role})"

# Create your models here.
