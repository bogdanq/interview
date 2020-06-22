## Основы ООП

Основная идея ООП заключается в том, что мы используем обьекты для отображения реального мира в программе и/или упрощения доступа к функциям, методам, которые в противном случае было бы трудно использовать.
Они могут содержать данные и информацию о том, что вы пытаетесь смоделировать и возможности и поведения этих обьектов. Эти обьекты обычно называются классами `class`, они содержат в себе логику и поведения класса, создают свой екземпляр `instance`, аосолютно обособленный, путем вызова функции-конструктора.
В ООП можно создавать новые классы на основе других - `наследование` классов, через слово `extends`, класс может наследовать только 1класс, но эта цпочка не ограничена в глубину (что может привести к сильной связанности классов и плохо переиспользуемому коду).
[некоторые паттерны](https://github.com/bogdanq/patterns)

      В TS есть возможность создать интерфейс класса или abstract class, с описанием его методов

- method - функция внутри класса
- extends - используется для определениянаследования
- super - метод, который устанавливает свойства наследования за счет вызова родительского конструктора
- get - вернет значение
- set - установит значение
- new - создаст екземпляр класса
- private - показывает, что метод или переменная приватны (только внутри класса) ts
- static - показывает, что метод или свойство доступны до вызова конструктора (не имеет this)

JS использует специальные функции, называемые конструкторами для определенияобьектов и их свойств (Любая функция вызванная через `new` - является конструктором. JS - не имеет наследования, как в других языках, его он реализует с помощью прототипного наследоввания. `Функция-конструктор` - указывается в свойство `__proto__` - для своего екземпляра.

      children.__proto__ === Parent.prototype
      Parent.__proto__ === Function.prototype

      Стоит заметить, что prototype - это самостоятельный обьект, есть только у классов и функций,
      исключая стрелочную функцию.

```js
function Person(age, name) {
  this.age = age;
  this.name = name;
}

Person.prototype.getInfo = function () {
  return this;
};

const john = new Person(22, "John");
```

## Понятия ООП

- Инкапсуляция
- Полиморфизм
- Наследование

## Теория принципы SOLID

- `S single responsebility` (принцип единой ответственности)
- `O open-closed` (принцип открытости-закрытости)
- `L liskov substition` (принцип подсановки Барбары Лисков)
- `I interface segregation` (принцип разделение интерфейса)
- `D dependency inversion` (принцип инверсии зависимостей)

## Инкапсуляция

[демо](https://www.typescriptlang.org/play/index.html?ssl=1&ssc=1&pln=22&pc=32#code/MYGwhgzhAEDCD2BXAdgFwKYCdoG8BQ00ADpgJYBuYG0wSaAXNMogLYBGWBN8yEqmiYKniYAFAEpcXQqgAWpCADpaKVNAC80AAxcAvni5FEbEKWA1TwANYSphGfKUq0AahfTomdKkSZk0OQVFAHNvBFUJPQNCIxMzaFDUcLRbfHtPb19-QKc6VEVhABl4YDAQdABlflJkYMjCfX08Wl41ZwxsTWR0AHc4PKxbA3asZUsbcWaBzDGzCanVUdA5yJaIeHLFEHg6kZnE5NQJcSA)

Позволяет максимально изолировать обьект от внешних воздействий.
Для примера сделали класс `Counter` - его свойства спрятаны внутри, изолированы от внешнего воздействия, добраться до него можно только обьявленными методами.

```js
class Counter {
  private count: number
  constructor() {
    this.count = 0
  }

  public click() {
    this.count++
    return this.getCount()
  }

  public getCount() {
    return this.count.toLocaleString()
  }
}

const counter = new Counter()

counter.click()
counter.click()
counter.click()
console.log(counter.getCount())
```

## Полиморфизм

[демо](https://www.typescriptlang.org/play/index.html?ssl=1&ssc=1&pln=74&pc=6#code/MYewdgzgLgBAtiYBrAIgQymmBeGBvAKBhgCcBXALhgG0jj8YBLAEyoEYAaGKRqAGwCmVAERthXZgIjASjAA49wIsTAC+HOsTxNWMAExce-ITGF7xMSdNkLGS0+bUb6DFlQDMh3oJHuLVmXlFMF9hJzoAXQ1VAG4CAigATzkBGAA5AQB3CBxXXTAyOAAjARIY7m8TaFkwAHNygJtgqmrGOrU4hOTUgCUpOXAIAXRMXMJiZgw0KgBBEhI0RIAeDOyAPhgAHxoIuNj40EhYNDlGXIAKYDI+KDISE2FyCySUlqga2oBKKgAFEhA4Iwhks+hABpBhlMNtg1nQwFkYH8AUCBOdziQIJ8cBsMedtJNMFQEMgRmhqFcbncBBEtttqDTVJ9Pp00EVqmhgLBgHw0BAcj8yEU+IxgBg7JB8HQ5LIAG4YVIU273ERPOLEaWMOVQVIvKrvNr1KWy+UweHZWbzRYrLIQNadYiHapkTkgEh4mCKqmGbpqKjaT3K0yq7jdN4fNRY8b0KAACyBADoA6lcEm1dG4xB47rcrq08RYwmzTlcPS06p4urBcLgDBeYkwDXagIoKsIAAZIFQc6RzQewawfFTNS5NCZNC8Wunc4FzNJwwZrPdZm9+5KsCWKZliswDVa1JDFs285Fi0LZattY9lwz+NF3JFrdSqsimBNqAAYTu9zAh8y5zcpqFCUJBXvQq53OuN5FvGABmbTMGivACHAWIwkw2pwPGLA4NguAsMuxDluWBDcryORzDw3KpAIAAe2pgMw-LPqKwQ5FGu4mmgJCUYIECnlaF5po67zOlArrnHIix8CAaC6P61xKg8wa6mGBoRpKLgQGQKRupJiTSbJBHpgmXE8VIuSlnQxGVkKL51g2r7NhRIq8d2Gn0MJG6jLgo7jrAN5vq2HbQN2ebcAupkueZuAEmgYXgSQkELu8aCQDBrpwAAKiAzlUaFVnbhx2rcAsaUZdluWCG5UbEAlSUmdxUWZnAJxopFVGoRseK9sQAHtYIWHMM4LiWFIgS2PY-UCPGjRBOKw2EUyW7EZ5U33gilWolGSYqmQ4h0CpphCiAtT7YyLKNVRdDxm+m0QN212xgIYBohinWkJij0xs9r2Yti7kOoMIADdJtTopi5QAPSQzAgCCIIAQiCAAwg8OADIggAcIFZzJAA)

Это свойство родственных обьектов (имеющих общего родителя). ОНи решают разные проблемы схожими способами. Создавая конкретные классы у родителя и абстрактные для переопределения, можно решить задачу различными способами. НАследник должен реализовать все абстрактные методы родителя. Если нет абстрактных классов, можно и переопределить метод ролителя в наследнике - это и есть полиморфизм.
В примере есть абстрактный классс `Publications`, у него есть абстрактый метод getTypesNews, который у каждого типа может быть свой. Так же родитель содержит логику получения списка новостей, так как она всегда одинакова, мы можем унаследовать от него еще классы и использовать их друг вместо друга. Наследники обязаны реализовать абстрактные методы. Но так же наследника можно расширять новыми свойствами. Этот способ позволил вынести базовую логику в родителя и использовать ее в других классах путем наследования.

```ts
const mockData = {
  ru: [
    { id: 1, title: "1", description: "1" },
    { id: 2, title: "2", description: "2" },
    { id: 3, title: "3", description: "3" },
  ],
};

type News = { id: number; title: string; description: string };

type ResponseData = {
  data: Array<News>;
};

const api = (culture: "ru", type: string): Promise<ResponseData> =>
  new Promise((rs) => rs({ data: mockData[culture] || [] }));

abstract class Publications {
  private culture: "ru";
  private type: string;
  private news: Array<News>;

  constructor({ culture, type }: { culture: "ru"; type: string }) {
    this.culture = culture;
    this.type = type;
    this.news = [];
  }

  public async getNewsList() {
    const { data } = await api(this.culture, this.type);
    return data;
  }

  private setNews(news: Array<News>) {
    this.news = news;
  }

  public getCurrentNew(id: number) {
    return this.news.find((item) => item.id === id);
  }

  abstract getTypesNews(): Promise<Array<{ id: number; description: string }>>;
}

class Article extends Publications {
  private articles: Array<News>;
  constructor(payload: { culture: "ru"; type: string }) {
    super(payload);
    this.articles = [];
  }

  public async getTypesNews() {
    const data = await this.getNewsList();
    this.articles = data;
    const result = this.transformToArticle();
    return result;
  }

  private transformToArticle() {
    return this.articles.map((article) => ({
      id: article.id,
      description: article.description,
    }));
  }
}

const article = new Article({
  culture: "ru",
  type: "blog",
});

article
  .getTypesNews()
  .then((rs) => rs)
  .then((rs) => {
    console.log(rs); // статьи
  });
```

## SRP

Данный принцип указывает на то, что обьект должен иметь только ОДНУ обязанность и эта обязанность должна быть полносью инкапсулированна. Все методы класса должны быть направлены исключительно на обеспечение этой обязанности.
Следование принципу заключается в декомпозиции больших классов на более мелкие, но с конкретной реализацией задачи. Такие классы легче модифицировть и при этом не бояться, что они поломают что то из вне. Инкапсуляция защищает внутренние переменные от внешнего воздействия.
Но этот принцип можно применить и для того, чтобы вынести повторяющуюся логику в свой класс и переиспользовать ее в других. Наиболее яркий антипатерн - "Божественный обьект", разработчики выносят туда всю логику и он может разрастись до огромных размеров, поддерживать его будет очень трудно.

## Open-closed

Данный принцип декларирует, что сущности (классы, модули) - могут быть расширяемы, но они закрыты для модификаций. Тоесть они могут менять свое поведения посредством расширения, а не имзенения своего кода (например с помощью декораторов или же наследования).
Открытость для расширения - это возможность добавить новый функционал, не озменив исходный класс. Данная спецификация указывает, что интерфейс для наследника можно изменить и он не обязан использовать строго исходный.

      Полиморфный принцип - подразумевает использование от абстрактного интерфейса,
      он не может быть изменен, но новые обьекты могут от него наследоваться и они должны как минимум
      реализовывать этот интерфейс.

Основная выгода полиморфизама - это легкость создания производных классов

- Методы, которые нужно переопределить, называют `абстрактными`
- Обьект абстрактного класса не возможно создать, только отнаследоваться
- Производный класс должен описать все абстрактные методы родителя, может иметь свои
- Суть абстракций, определаить методы там, где о них больше всего извесно

## liskov substition

Данный принцип декларирует, что класс - наследник, использующий базовый тип (родителя), должен использовать подтип базового класса, не зная об этом. Тоесть создаваемые наследники должны корректно реализовывать инерфейс родительского класса, его поведение. Проще - если базовый тип реализовывает поведение - его наследники должны соответствовать контракту интерфейса базового класса.
Наследник класса - должен дополнить родителя, но не заменить, тоесть везде, где используется базовый класс, можно взять наследника и не должно быть ошибок. Этот принцип предполагает, что любой созданный класс-наследник использует ранее реализованные модули и может иметь новое поведение.

## interface segregation

Принцип декларирует, что клиентский класс не должен зависеть от методов интерфейса, которые он не использует. Данные принцип перекликается с SRP - интерфейс не должен быть перегружен, что хорошо для поддержания класса и его модификации. Если интерфейс громоздкий, есть смысл его декомпозиции на более мелкие.

## dependency inversion

Принцип декларирует, что Абстрактный класс не должен зависить от реализации методов наследника, модули верхних уровней не зависят от нижних, но нижние должны зависить от верхних. Этот принцип заставляет реализовывать высокоуровневые абстракции, без привязки к конкретным наследникам, тоесть этот класс может содержать методы, а наследники их реализацию. Этот подход упростит следование принципу подстановки, та как любой класс, наследованный от такой абстракции может быть легко заменен таким же классом. Например сохранение файлов на облаке и на диске, родитель может содержать абстрактую логику, а наследники конкретную реализацию и эти классы легко подставить друг вместо друга или использовать вместе.
