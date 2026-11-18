# Design Sprint Tasks — TU3.0

> Задачи сгенерированы на основе Design Audit Report.
> Каждая задача — промпт для нового контекстного окна Claude Code.

---

## AGENT-TASK-1: Homepage Hero — Светлый стиль с формой
**Роль**: UI Designer / Frontend Developer
**Приоритет**: Critical
**Файлы для изменения**: `src/app/page.tsx`, `src/components/ContactForm.tsx`

### Что сделать:
Переделать hero-секцию главной страницы с тёмного фото-оверлея на светлый стиль, как в оригинале tu.by:

1. **Убрать** тёмный фон с фотографией и оверлеем `bg-[#1a1a2e]/75`
2. **Создать** 2-колоночный layout:
   - **Левая колонка**: Заголовок в 2 строки:
     - Строка 1: "Бутиковое SEO" — `font-size: 30px; font-weight: 300`
     - Строка 2: "агентство" — `font-size: 50px; font-weight: 600; line-height: 1.4em`
     - Подзаголовок — обычный текст, `color: var(--foreground-muted)`
   - **Правая колонка**: Компактная форма обратной связи (4 поля + кнопка)
3. **Фон**: белый `var(--background)`, без изображения
4. **Контейнер**: `container-divi`
5. **Padding-top**: `90px` (из CSS: `.section-homepage-intro { padding-top: 90px }`)

### CSS из child-темы:
```css
#main-content .section-homepage-intro h1 {
    font-size: 30px;
    font-weight: 300;
}
#main-content .section-homepage-intro h1 strong {
    display: block;
    font-size: 50px;
    line-height: 1.4em;
    font-weight: 600;
    padding-bottom: 20px;
}
```

### Критерии приёмки:
- Hero на белом фоне без фото
- 2-колоночный layout (текст + форма)
- Типографика совпадает с child-темой
- Responsive: на mobile — 1 колонка, текст сверху, форма снизу
- `npm run build` проходит

### Референсы:
- Скриншот оригинала: `audit/tu-by-home.png` — белый фон, крупный заголовок слева, форма справа
- CSS: `reference/divi/divi-child/style.css` строки 568-660

---

## AGENT-TASK-2: Homepage Services — List Layout
**Роль**: UI Designer / Frontend Developer
**Приоритет**: Critical
**Файлы для изменения**: `src/app/page.tsx`, новый компонент `src/components/ServiceListItem.tsx`

### Что сделать:
Заменить grid карточек услуг на list-style layout как в оригинале:

1. **Убрать** grid карточек с фотографиями
2. **Создать** компонент `ServiceListItem`:
   - Каждая услуга — строка flex с `justify-content: space-between`
   - Левая часть (66%): h3 (26px/600) + описание (15px)
   - Правая часть (30%): красная outline-кнопка "Подробнее"
   - Разделитель: `border-bottom: 1px solid #E4EDF4`
   - Ховер: текстовый блок `transform: translateX(40px)` с `transition: 150ms`
3. **Кнопка**: `border: 1px solid #E30613; border-radius: 100px; padding: 5px 35px; font-size: 14px`
4. **Кнопка ховер**: `background: #E30613; color: #fff`

### CSS из child-темы:
```css
.section-homepage-services .service-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 1px solid #E4EDF4;
}
.section-homepage-services .service-item:hover .text-box {
    transform: translateX(40px);
}
.section-homepage-services .text-box {
    flex: 0 0 66%;
    max-width: 66%;
    transition: 150ms all ease-out;
}
.section-homepage-services .button-box {
    flex: 0 0 30%;
    max-width: 30%;
    text-align: right;
}
```

### Критерии приёмки:
- Услуги отображаются как список, не карточки
- Ховер-эффект translateX работает
- Кнопки pill-shape с правильными размерами
- На mobile: описание скрыто, кнопка компактная
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-home.png` — секция списка услуг в средней части
- CSS: `reference/divi/divi-child/style.css` строки 823-970

---

## AGENT-TASK-3: Contact Form — 4 поля, 2 колонки
**Роль**: Frontend Developer
**Приоритет**: Critical
**Файлы для изменения**: `src/components/ContactForm.tsx`

### Что сделать:
Расширить форму до 4 полей в 2-колоночном layout:

1. **Ряд 1** (2 колонки): "Имя" + "Email или телефон"
2. **Ряд 2** (2 колонки): "Адрес сайта" + "Тема" (dropdown select)
3. **Ряд 3** (полная ширина): "Сообщение" (textarea)
4. **Чекбокс**: согласие на обработку данных (12px текст)
5. **Кнопка**: "ОТПРАВИТЬ" — pill, `border-radius: 90px; padding: 8px 40px; font-size: 16px; font-weight: 600; uppercase`
6. **Стили полей**: `font-size: 18px; padding: 7px 20px; color: #000; border-bottom: 1px solid #ccc` (без full border, только нижняя линия как в Divi)

### Опции для dropdown "Тема":
- SEO аудит
- SEO продвижение
- Семантическое ядро
- Контент-план
- Миграция сайта
- SEO дашборды
- Другое

### CSS из child-темы:
```css
.section-formbox .wpcf7-form input[type="text"],
.section-formbox .wpcf7-form input[type="email"],
.section-formbox .wpcf7-form textarea {
    width: 100%;
    font-size: 18px;
    padding: 7px 20px;
    color: #000;
}
.field_button input {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Mulish';
    text-transform: uppercase;
    border-radius: 90px;
    padding: 8px 40px;
}
```

### Критерии приёмки:
- 4 поля + textarea + checkbox + кнопка
- 2-колоночный layout на desktop, 1 колонка на mobile
- Dropdown "Тема" со списком услуг
- Кнопка pill-shape, uppercase
- Валидация всех полей
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-contacts.png` — форма с 4 полями
- CSS: `reference/divi/divi-child/style.css` строки 587-633

---

## AGENT-TASK-4: Services Page Layout
**Роль**: UI Designer / Frontend Developer
**Приоритет**: Critical
**Файлы для изменения**: `src/app/services/page.tsx`

### Что сделать:
Переделать страницу услуг на layout как в оригинале:

1. **Заголовок**: "Our offer" (или "Наше предложение" — решить)
2. **Вступительный текст**: абзац описания агентства
3. **Фоновое фото**: секция с background-image (как homepage-cover)
4. **"Scope of the services"**: список услуг в формате service-item (как на главной, AGENT-TASK-2)
5. **Форма внизу**: полная форма обратной связи (из AGENT-TASK-3)

### Критерии приёмки:
- Структура страницы совпадает с оригиналом
- Список услуг с кнопками "Подробнее"
- Форма обратной связи внизу
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-services.png`

---

## AGENT-TASK-5: Footer Redesign
**Роль**: UI Designer
**Приоритет**: Medium
**Файлы для изменения**: `src/components/Footer.tsx`

### Что сделать:
Упростить footer до 2-блочного layout:

1. **Левый блок**: описание агентства + адрес + ИП + email
2. **Правый блок**: 2 колонки ссылок:
   - Колонка 1: Главная, Блог компании, О нас, Контакты, Политика обработки данных
   - Колонка 2: SEO продвижение, SEO аудит, Семантическое ядро, Контент-план, Миграция сайта
3. **Ссылки**: цвет `#E30613` (красный), не серый
4. **Copyright**: "2009 – 2026. SEO Агентство «Точка успеха» tu.by"
5. **Фон**: `#333333` (уже правильно)

### Критерии приёмки:
- 2-блочный layout
- Ссылки красные по умолчанию
- Copyright обновлён
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-home.png` (нижняя часть) и `audit/tu-by-contacts.png`
- Оригинальный footer видно на всех скриншотах tu.by

---

## AGENT-TASK-6: Header — Иконка гамбургера
**Роль**: UI Designer
**Приоритет**: Low
**Файлы для изменения**: `src/components/Header.tsx`

### Что сделать:
Добавить иконку гамбургера (≡) рядом с текстом "Меню":

1. Добавить SVG иконку 3 горизонтальных линий справа от текста "Меню"
2. Размер: 24x24px
3. На mobile: скрыть текст "Меню", показать только иконку 32x32px

### CSS из child-темы:
```css
#menu-toggle {
    background: url(img/menu-icon.png) right -1px no-repeat;
    background-size: 24px 24px;
    padding-right: 36px;
}
/* Mobile */
#menu-toggle span { display: none; }
#menu-toggle { background-size: 32px 32px; }
```

### Критерии приёмки:
- Иконка ≡ видна рядом с "Меню" на desktop
- На mobile — только иконка, текст скрыт
- `npm run build` проходит

---

## AGENT-TASK-7: Blog Page — 2-Column Grid
**Роль**: Frontend Developer
**Приоритет**: Medium
**Файлы для изменения**: `src/app/blog/page.tsx`, `src/components/BlogCard.tsx`

### Что сделать:
1. Blog cards в 2-колоночной сетке (как на tu.by)
2. Каждая карточка: изображение + тег категории + заголовок (22px/600) + автор/дата + excerpt
3. На mobile: 1 колонка

### CSS из child-темы:
```css
#main-content .pix-blog-articles h2 {
    font-size: 22px;
    margin-bottom: 0px;
}
```

### Критерии приёмки:
- 2-колоночная сетка
- Карточки с полной информацией
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-blog.png`

---

## AGENT-TASK-8: Contact Page — Reorder Sections
**Роль**: Frontend Developer
**Приоритет**: Low
**Файлы для изменения**: `src/app/contact/page.tsx`

### Что сделать:
Переставить секции на странице контактов:
1. Контактная информация (адрес, телефон, email, УНП) — **сверху**
2. Google Maps / карта — **в середине** (или placeholder)
3. Форма обратной связи — **снизу**

### Критерии приёмки:
- Порядок секций совпадает с оригиналом
- `npm run build` проходит

### Референсы:
- Скриншот: `audit/tu-by-contacts.png`
