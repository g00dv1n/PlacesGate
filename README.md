# PlacesGate

Простой Gate для коллекта возможних сигнатур по положению.

Принимает данные в json формате.

```
  POST http://host:port/places
```

Пример:
```javascript
  {
  	"author": "cuckoo",
  	"type": "PL",
  	"data": "C:\\Users\\Andy Harrison\\AppData\\Local\\Temp\\SomePUPinstallr.exe",
  	"name": "PUP.Gen",
  	"md5": "c71dab63f248d51712b70f02173f8e43"
  }
```

Поле data преобразуется (если возможно) в соотвествии с переменным окружения. В ответ прийдет добавленный обьект. 
Так же в json формате.

Пример:
```javascript
  {
    "__v": 0,
    "type": "PL",
    "data": "%temp%\\SomePUPinstall.exe",
    "md5": "c71dab63f248d51712b70f02173f8e43",
    "_id": "57da9b6d801e6c6d8153612a",
    "created": "2016-09-15T13:00:29.793Z",
    "name": "PUP.Gen",
    "author": "cuckoo"
  }
```


Для запроса используется: 

```
GET  http://host:port/places?from=0&to=150&q={"type":"RPL"}
```

q , from , to - необязательные параметры.

q - запрос в формате mongodb 

Одинаковые не пропускаются. Так же проверяется на наличиие в white листе.
В итогде можно редатировать эти записи, добавлять новые, смотреть статистику по переменным окружения.

Статистика запрашивается так:
```
  GET http://host:port/places/stat
```
Пример ответа:
```javascript
  {
    "%startup%": 0,
    "%programs%": 0,
    "%startmenu%": 0,
    "%appdata%": 3,
    "%temp%": 23,
    "%mydoc%": 0,
    "%desktop%": 0,
    "%chromeprofile%": 0,
    "%commonappdata%": 0,
    "%commondesktopdir%": 0,
    "%commondir%": 0,
    "%favorites%": 0,
    "%localappdata%": 0,
    "%local%": 0,
    "%programfiles%": 16,
    "%tasks%": 0,
    "%systemdir%": 1,
    "%windir%": 0
  }
```

#TODO
* ~~Умный фильтр на фронте~~
* Дополнительные сортировки и фильтры.
