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

Одинаковые не пропускаются. Так же проверяется на наличиие в white листе.
В итогде можно редатировать эти записи, добавлять новые, смотреть статистику по переменным окружения.

Статистика запрашивается так:
```
  GET http://host:port/places/stat
```

#TODO
* Умный фильтр на фронте
* Дополнительные сортировки и фильтры.
