# Collapse table
## Таблица со скрываемыми рядами данных

[GitHub pages](https://kantrop.github.io/Collapse-Table/)
* Без js библиотек
* Без css библиотек
* ES2019 (не работает в Safari, т.к. используются стрелочные ф-ции в классе)

Таблица генерируется из плоского JSON.
Метод получения данных не влияет на работу модуля. Рассматривается кейс уже полученных данных.

Под капотом происходит агрегация полученных данных в древовидный объект, на основании которого создаются строки в таблице и связи между ними. Связи нисходящие - ребенок не знает о родителе. Вложеность не ограничена.

### Рендер
Рендер осуществляется через темплейт, чтобы отделить логику от отображения. При желании можно заменить нативный table на блочные элементы мимикрирующие под таблицу. Это позволит сделать правильную вложенность элементов, в отличие от таблицы, где все элементы одноранговые. Или сделать фабрику.

### Фильтрация
Фильтрация осуществляется пересозданием дочерних элементов таблицы. Если подразумевается использование большого количества строк, или они с сильной динамикой, то лучше слегка переделать и фильтровать уже созданные элементы без их пересоздания.

Фильтруются все получаемые данные, т.е. затрагиваются и дочерние элементы. Если нужна фильтрация только первого уровня, то стоит фильтровать сформированное Дерево