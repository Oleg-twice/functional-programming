import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const markdownContent = `
# Функциональное программирование в JavaScript

## 1. Вступление

### Что такое функциональное программирование?

Функциональное программирование (FP) — это парадигма программирования, в которой программы строятся на основе функций и их композиций.  
FP позволяет создавать модульный и повторно используемый код путем разбиения задач на более мелкие **чистые функции**, которые можно легко комбинировать.

### Основные принципы функционального программирования:

- **Иммутабельность**: данные не изменяются после создания, вместо этого создаются новые объекты с обновленными значениями.
- **Функции первого класса**: функции можно передавать как аргументы, возвращать из других функций и присваивать переменным (JavaScript поддерживает это).
- **Чистые функции**: функции, которые при одинаковых входных данных всегда возвращают одинаковый результат без побочных эффектов.

#### Пример чистой функции:

\`\`\`js
['Vasya', 'Petya'].map((name, index) => ({ name, order: index }));
\`\`\`

Здесь \`map\` принимает функцию в качестве аргумента и **не изменяет** исходный массив.

#### Пример не чистой функции:

\`\`\`js
const addItemToArray = (arr, item) => {
   arr.push(item);
   return arr;
};
\`\`\`
Здесь изменяется входной массив \`arr\`, нарушая принцип **иммутабельности**.

Еще пример:

\`\`\`js
const logSum = (a, b) => {
    console.log(a + b); // Побочный эффект: функция влияет на консоль.
};
\`\`\`

## 2. Создание функциональной библиотеки

### 2.1 Функции-композиции

Композиция позволяет объединять **простые** функции, как части головоломки, создавая сложные цепочки обработки данных. Однако важно не переусложнять: слишком длинные композиции (например, 40 функций) будут плохо читаться.

Создадим функцию **pipe**, которая позволит нам объединять функции:

\`\`\`js
const pipe = (...fns) => (val) => fns.reduce((v, f) => f(v), val);
\`\`\`

#### Использование:

\`\`\`js
const premiumUsers = [
  { name: 'Vasya', bDay: '05.09.1990', id: 1 }, 
  { name: 'Petya', bDay: '06.07.2000', id: 2 }
];

const getIsBDayToday = ({ bDay }) => {
  const today = new Date();
  const userBDay = new Date(bDay);
  return userBDay.getDate() === today.getDate() && userBDay.getMonth() === today.getMonth();
};

const filterByBDay = (users) => users.filter(getIsBDayToday);
const addPromocode = (users) => users.map(user => ({ ...user, presentPromoCode: 'PROMO-B-DAY' }));

const usersWithPromocode = pipe(filterByBDay, addPromocode)(premiumUsers);
\`\`\`

### 2.2 Каррирование и функции-обертки

Каррирование позволяет **частично** применять аргументы к функциям, упрощая композицию.
**Каррирование** - это преобразование функции с множеством аргументов в набор вложенных функций
с одним аргументом.
То есть, если у нас есть функция которая принимает три аргумента, но мы вызываем ее с меньшим количеством аргументов,
такая функция будет возвращать другую функцию ожидающую остальных аргументов и только когда
все аргументы будут переданы - она вернет вычисленное значение.

#### Пример с каррированием:
\`\`\`js
const curry = (func) => {
    return (...args) => {
        if (args.length < func.length) {
            return (...newArgs) => curry(func)(...args, ...newArgs)
        }
        return func(...args);
    };
}

const filter = curry((callback, array) => array.filter(callback));
const map = curry((callback, array) => array.map(callback));

const filterUsersByAge = filter(user => user.age >= 18);
const addAccessRights = map(user => ({ ...user, accessToData: true }));

const usersWithAccess = pipe(filterUsersByAge, addAccessRights)(users);
\`\`\`

### **Вывод**
Каррирование делает функции более гибкими, позволяет **частично применять аргументы** и **упрощает композицию**, не требуя сразу всех входных данных.
`;

const components = {
    code({ inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
            <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
};

const Article = () => {
    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", textAlign: 'left' }}>
            <ReactMarkdown components={components}>{markdownContent}</ReactMarkdown>
        </div>
    );
};

export default Article;
