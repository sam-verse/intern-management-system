# IMSS Backend (Django + DRF)

## Setup

1. Create venv and install deps:
`ash
cd BACKEND
py -3 -m venv .venv
. .venv\Scripts\Activate.ps1
pip install -r requirements.txt
`

2. Create .env in BACKEND:
`env
DJANGO_SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=*
CORS_ALLOW_ALL_ORIGINS=true
`

3. Run migrations and create superuser:
`ash
python manage.py migrate
python manage.py createsuperuser
`

4. (Optional) Seed demo data:
`ash
python manage.py seed_demo
`

5. Run server:
`ash
python manage.py runserver 8000
`

## API
- Auth:
  - POST /api/auth/token/ { username, password }
  - POST /api/auth/token/refresh/ { refresh }
- Health: GET /api/health/`r
- Projects:
  - GET /api/projects/ list, supports ?search= and ?status=
  - POST /api/projects/ admin only
  - GET /api/projects/{id}/`r
  - PATCH/PUT/DELETE /api/projects/{id}/ admin only

Send Authorization: Bearer <token> for authenticated endpoints.

