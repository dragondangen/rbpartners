# RB Partners — React

Чистая пересборка сайта **www.rbpartners.ru** на React + TypeScript + Vite.
Старый сайт (WordPress 5.6) был заражён бэкдорами и C2-загрузчиком, поэтому от
PHP/WordPress отказались полностью. Сюда перенесён только проверенный контент
(тексты, изображения), извлечённый из дампа БД. См. `../SECURITY-REPORT.md`.

## Стек
- React 18 + TypeScript + Vite
- react-router-dom (SPA)
- DOMPurify — санитизация всего перенесённого HTML
- nginx (раздача статики) в Docker

## Структура
```
src/
  content/        # JSON, извлечённый из БД (ru.* / en.*): страницы, новости, сделки, команда
  components/     # Header, Footer, Layout, Html (санитайзер), Thumb
  pages/          # Home, Deals, News, Team, GenericPage, NotFound, ...
  content.ts      # загрузчик контента + нормализация URL ассетов
  lang.tsx        # переключатель RU/EN
public/
  i/, wp-content/uploads/   # изображения, перенесённые из старого сайта (только картинки, без PHP)
```

## Запуск в Docker (основной способ)
```bash
docker compose up -d --build
# открыть http://localhost:8080
```
Остановить: `docker compose down`.

## Локальная разработка
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
npm run preview  # предпросмотр сборки на :4173
```

### Локальные варианты дизайна

После `npm run dev` откройте:

- [Редакционный](http://localhost:5173/designs/editorial/) — тёплая палитра, архитектурная фотография, крупная антиква и карточки сделок.
- [Меридиан](http://localhost:5173/designs/meridian/) — тёмная палитра, векторная схема направлений и каталог сделок в виде списка.
- [Партнёрство](http://localhost:5173/designs/partnership/) — отдельный вариант по референсу с цветами `#162B4B` и `#802E3C`, шрифтами Cormorant Garamond и Manrope и архитектурной фотографией. Фотография и шрифты сохранены локально в `public/design-media/partnership/`.

У каждого варианта есть свои главная, услуги, сделки и страницы отдельных сделок, команда, контакты, «О компании» и Globalscope. Переключатель RU/EN в шапке использует общий язык сайта. Из подвала можно перейти в другие варианты или в исходную версию. Сборка включает все варианты по тем же путям.

## Контент и языки
- Контент извлечён из `host1618689_partners.sql` (таблицы `pu5f_*` — RU, `pu5f_en_*` — EN)
  и лежит в `src/content/*.json`. Переключатель языка — в шапке (RU/EN), выбор хранится в localStorage.
- Изображения отдаются по историческим путям (`/i/...`, `/wp-content/uploads/...`),
  абсолютные URL старых доменов нормализуются в `content.ts`.

## Безопасность
- Статика без серверного кода; запрос к `*.php` блокируется на уровне nginx.
- CSP и security-заголовки заданы в `nginx.conf`.
- Контейнер: `read_only`, `no-new-privileges`, `cap_drop: ALL` (см. `docker-compose.yml`).
