# Space Agency Test Task - Галерея изображений

Проект реализован с использованием Django 5.2, MySQL, Bootstrap 5 и Slick Slider.

## Требования

- Python 3.12
- MySQL
- pip

## Быстрый старт

### 1. Установка зависимостей

```bash
pip install -r req.pip
```

### 2. Настройка переменных окружения

Скопируйте файл `env.example` в `.env`:

**Windows (PowerShell):**
```powershell
Copy-Item env.example .env
```

**Linux/Mac:**
```bash
cp env.example .env
```

Отредактируйте `.env` и укажите свои значения:
- `SECRET_KEY` - секретный ключ Django (обязательно измените в продакшене!)
- `DEBUG` - режим отладки (True/False)
- `ALLOWED_HOSTS` - разрешенные хосты (через запятую)
- `DB_NAME` - имя базы данных MySQL (по умолчанию `space_agency_db`)
- `DB_USER` - пользователь MySQL (по умолчанию `root`)
- `DB_PASSWORD` - пароль MySQL
- `DB_HOST` - хост MySQL (по умолчанию `localhost`)
- `DB_PORT` - порт MySQL (по умолчанию `3306`)

### 3. Создание базы данных

Создайте базу данных MySQL с именем, указанным в `.env` (по умолчанию `space_agency_db`):

```sql
CREATE DATABASE space_agency_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Выполнение миграций

```bash
python manage.py migrate
```

### 5. Создание суперпользователя

```bash
python manage.py createsuperuser
```

### 6. Сбор статических файлов

```bash
python manage.py collectstatic --noinput
```

## Запуск

```bash
python manage.py runserver
```

После запуска:
- Главная страница галереи: http://127.0.0.1:8000/
- Админ-панель: http://127.0.0.1:8000/admin/

## Использование

1. Войдите в админ-панель Django
2. Перейдите в раздел "Галерея" -> "Слайдеры"
3. Создайте новый слайдер (например, "Главная галерея")
4. Внутри слайдера добавьте элементы через inline-форму
5. Используйте drag&drop для сортировки элементов (перетаскивайте за иконку слева)
6. Загружайте изображения через django-filer
7. На главной странице будет отображаться слайдер с синхронизацией между основным и навигационным слайдерами
8. При клике на большое изображение откроется полноэкранная галерея

## Дополнительные команды

### Создание новых миграций

```bash
python manage.py makemigrations
```

### Форматирование кода

```bash
black .
isort .
```

### Проверка кода линтером

```bash
flake8 . --exclude=migrations,venv,env,.venv,__pycache__,staticfiles,media
```

### Запуск тестов

```bash
python manage.py test
```

## Инструменты разработки

Проект использует следующие инструменты для поддержания качества кода:

- **Black** - автоматическое форматирование кода Python
- **isort** - сортировка импортов
- **flake8** - проверка стиля кода и ошибок

## Особенности

- ✅ Bootstrap 5 для стилизации
- ✅ Slick Slider с синхронизацией слайдеров (Slider Syncing)
- ✅ Полноэкранная галерея при клике на изображение
- ✅ Управление изображениями через django-filer
- ✅ Drag&drop сортировка в админке (django-admin-sortable2)
- ✅ Русский интерфейс админки
- ✅ Отображение миниатюр изображений в списке записей
- ✅ Настроенные форматтеры и линтеры
- ✅ Структура с моделью Slider и связанными SliderItem
