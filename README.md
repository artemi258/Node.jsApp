
## Описание
Приложение node.js с регистрацией и авторизацией.

## Запуска проекта

- `npm run start` запуск проекта из папки dist.
- `npm run dev` запуск проекта в режиме разработки.
- `npm run build` запуск команды tsc.
- `npm run test` запуск тестов Jest.
- `npm run test:e2e` запуск тестов 2e2 тестов.

## Стэк
- JavaScript, TypeScript, Node.js, Express, Prisma, Sqlite.
  
## Пример
- post запрос '/users/register'
- {
	"email": "ar@ar.ru",
	"password": "123",
	"name": "ARtem"
}
- post запрос '/users/login'
- {
	"email": "ar@ar.ru",
	"password": "123"
}

## Статус проекта
- Завершен.
