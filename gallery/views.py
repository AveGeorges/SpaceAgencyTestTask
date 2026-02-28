from django.shortcuts import render, get_object_or_404
from .models import Slider


def gallery_view(request, slug=None):
    """View для отображения страницы галереи со слайдером"""
    if slug:
        slider = get_object_or_404(Slider, slug=slug, is_active=True)
    else:
        slider = Slider.objects.filter(is_active=True).first()
        if not slider:
            slider_items = []
            context = {
                'slider': None,
                'slider_items': slider_items,
            }
            return render(request, 'gallery/gallery.html', context)
    
    slider_items = slider.get_active_items()
    
    context = {
        'slider': slider,
        'slider_items': slider_items,
    }
    
    return render(request, 'gallery/gallery.html', context)
