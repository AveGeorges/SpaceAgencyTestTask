from django.db import models
from django.utils.translation import gettext_lazy as _
from filer.fields.image import FilerImageField


class Slider(models.Model):
    """Модель слайдера"""
    
    class Meta:
        verbose_name = _('Слайдер')
        verbose_name_plural = _('Слайдеры')
        ordering = ['-created_at']
    
    title = models.CharField(
        max_length=200,
        verbose_name=_('Название'),
        help_text=_('Название слайдера для отображения в админке')
    )
    
    slug = models.SlugField(
        max_length=200,
        unique=True,
        verbose_name=_('URL-адрес'),
        help_text=_('Уникальный идентификатор для URL (например: main-gallery)')
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Активен'),
        help_text=_('Показывать ли слайдер на сайте')
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Дата создания')
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Дата обновления')
    )
    
    def __str__(self):
        return self.title
    
    def get_active_items(self):
        """Возвращает активные элементы слайдера"""
        return self.items.filter(is_active=True).order_by('order')


class SliderItem(models.Model):
    """Модель элемента слайдера"""
    
    class Meta:
        verbose_name = _('Элемент слайдера')
        verbose_name_plural = _('Элементы слайдера')
        ordering = ['order']
    
    slider = models.ForeignKey(
        Slider,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name=_('Слайдер'),
        help_text=_('Слайдер, к которому относится этот элемент')
    )
    
    order = models.PositiveIntegerField(
        default=0,
        editable=True,
        db_index=True,
        verbose_name=_('Порядок')
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name=_('Название'),
        help_text=_('Название изображения для отображения в админке')
    )
    
    image = FilerImageField(
        on_delete=models.CASCADE,
        related_name='slider_items',
        verbose_name=_('Изображение'),
        help_text=_('Изображение для слайдера')
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Активен'),
        help_text=_('Показывать ли элемент в слайдере')
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Дата создания')
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Дата обновления')
    )
    
    def __str__(self):
        return f"{self.slider.title} - {self.title}"
    
    @property
    def image_url(self):
        """Возвращает URL изображения"""
        if self.image:
            return self.image.url
        return None
