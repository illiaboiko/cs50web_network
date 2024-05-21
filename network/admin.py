from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(UserFollowing)

class LikeInline(admin.TabularInline):
    model = Post.likes.through  # Use the through model for the ManyToMany relationship
    extra = 0  # No extra empty rows
    verbose_name = "Like"
    verbose_name_plural = "Likes"

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('user')  # Optimize queries by selecting related user

class PostAdmin(admin.ModelAdmin):
    inlines = [LikeInline]  # Include the inline admin class

    list_display = ('author', 'body', 'created', 'likes_count')  # Customize list display
    search_fields = ('author__username', 'body')  # Add search fields
    list_filter = ('created', 'author')  # Add filters

admin.site.register(Post, PostAdmin)