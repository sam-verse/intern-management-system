from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'role', '') == 'admin')


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status__iexact=status_filter)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(title__icontains=search)
        # Non-admins only see their assigned projects
        user = self.request.user
        if not (user and user.is_authenticated and getattr(user, 'role', '') == 'admin'):
            qs = qs.filter(interns=user)
        return qs

# Create your views here.
