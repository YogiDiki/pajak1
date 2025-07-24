# emydnpajak/urls.py (Tidak perlu perubahan)

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('id/', include('company_profile.urls')),
    # path('', views.home_view, name='root_home'), # Jika Anda menggunakannya
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)