from django.contrib import admin
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminBase, SortableInlineAdminMixin
from .models import Slider, SliderItem


class SliderItemInline(SortableInlineAdminMixin, admin.TabularInline):
    """Inline админка для элементов слайдера с drag&drop сортировкой"""
    model = SliderItem
    extra = 1
    fields = ('image_thumbnail', 'title', 'image', 'is_active')
    readonly_fields = ('image_thumbnail',)
    ordering = ('order',)
    
    def image_thumbnail(self, obj):
        """Отображение миниатюры изображения в inline"""
        if obj and obj.pk and obj.image:
            try:
                from easy_thumbnails.files import get_thumbnailer
                thumbnailer = get_thumbnailer(obj.image)
                thumbnail = thumbnailer.get_thumbnail({
                    'size': (80, 80),
                    'crop': False,
                })
                img_url = thumbnail.url
            except:
                img_url = obj.image.url
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px; object-fit: contain;" />',
                img_url
            )
        return format_html('<span style="color: #999;">Загрузите изображение</span>')
    image_thumbnail.short_description = 'Превью'


@admin.register(Slider)
class SliderAdmin(SortableAdminBase, admin.ModelAdmin):
    """Админка для слайдеров с inline элементами"""
    
    list_display = ('title', 'slug', 'items_count', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'slug')
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'is_active')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [SliderItemInline]
    
    def items_count(self, obj):
        """Количество элементов в слайдере"""
        if obj.pk:
            return obj.items.count()
        return 0
    items_count.short_description = 'Элементов'


@admin.register(SliderItem)
class SliderItemAdmin(admin.ModelAdmin):
    """Админка для элементов слайдера (отдельно, если нужно)"""
    
    list_display = ('title', 'slider', 'image_thumbnail', 'is_active', 'created_at')
    list_display_links = ('title', 'image_thumbnail')
    list_filter = ('slider', 'is_active', 'created_at')
    search_fields = ('title', 'slider__title')
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('slider', 'title', 'image', 'image_preview', 'is_active')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_thumbnail(self, obj):
        """Отображение миниатюры изображения в списке"""
        if obj.image:
            try:
                from easy_thumbnails.files import get_thumbnailer
                thumbnailer = get_thumbnailer(obj.image)
                thumbnail = thumbnailer.get_thumbnail({
                    'size': (100, 100),
                    'crop': False,
                })
                img_url = thumbnail.url
            except:
                img_url = obj.image.url
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px; object-fit: contain;" />',
                img_url
            )
        return format_html('<span style="color: #999;">Нет изображения</span>')
    image_thumbnail.short_description = 'Изображение'
    
    def image_preview(self, obj):
        """Отображение превью изображения в форме редактирования"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 500px; max-height: 500px; object-fit: contain;" />',
                obj.image.url
            )
        return format_html('<span style="color: #999;">Нет изображения</span>')
    image_preview.short_description = 'Превью изображения'
