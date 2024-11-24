
**Установка Mysql**
```bash
sudo apt update
```

```bash
sudo apt install mysql-server
```

```bash
sudo systemctl status mysql
```

```bash
sudo apt-get install php-mysql
```

**Первый вход и создание пользователя**
```bash
sudo mysql
```

```bash
CREATE USER 'name'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

Выдать все права
```bash
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

Вход под новым пользователем
```bash
mysql -h localhost -u admin -p
```

**БД**
создать БД (c названием в .env)
```bash
php bin/console doctrine:database:create
```


**Миграции**
Создание миграции:
```bash
php bin/console make:migration
```

Применение миграций
```bash
php bin/console doctrine:migrations:migrate
```