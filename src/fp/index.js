import { PREMIUM_USERS } from "../constants";

export const pipe = (...fns) => (val) => fns.reduce((v, f) => f(v), val); // реализация

export const compose = (...fns) => (val) => fns.reduceRight((v, f) => f(v), val);

/* использование pipe
Задача:
У нас есть массив юзеров и нам нужно выбрать всех юзеров у которых сегодня день рождения
и добавить им промо код
*/

const getIsBDayToday = ({ bDay }) => {
    const today = new Date();
    const userBDay = new Date(bDay);
    return userBDay.getDate() === today.getDate() && userBDay.getMonth() === today.getMonth();
};

const addPromoToUser = (user) => ({ ...user, presentPromoCode: 'B-DAY-PROMO' });

const filterByBDay = (users) => users.filter(getIsBDayToday);

const addPromocode = (users) => users.map(addPromoToUser);

export const usersWithPromocode = pipe(filterByBDay, addPromocode)(PREMIUM_USERS); // вот это должно заработать

/* Пример каррирования
  const usersWithStatuses = pipe(
        filter((user) => user.isAdmin),
        map((user) => ({ ...user, status: 'Company administrator' }))
    )(PREMIUM_USERS)
*/

// const filter = (cb) => (arr) => arr.filter(cb, arr); // мы можем сделать так
// но тогда у нас не будет возможности вызывать эту функцию целиком и сразу
// filter((user) => user.isAdmin)(PREMIUM_USERS);

// чтобы мы могли вызывать эту функцию так:
// filter((user) => user.isAdmin, PREMIUM_USERS);
// и вот так:
//  filter((user) => user.isAdmin)(PREMIUM_USERS);
// нам нужно применить каррирование

const curry = (cb) => (...args) => {
    if (args.length < cb.length) {
        return (...additionalArgs) => curry(cb)(...args, ...additionalArgs);
    }

    return cb(...args);
};

// Теперь создадим функции filter, map, reduce с каррированием
export const map = curry((cb, arr) => arr.map(cb, arr));
export const filter = curry((cb, arr) => arr.filter(cb, arr));
export const includes = curry((v, arr) => arr.includes(v));


const props = curry((path, obj) => obj[path]); // nameList[0] { nameList: ['vasya']}
const first = arr => arr[0];

export const ageOfFirstUser = pipe(first, props('age'))(PREMIUM_USERS);



// чтобы у нас сработало следующая композиция:

// const filterUsersByAge = filter(user => user.age >= 18);
// const addAccessRights = map(user => ({ ...user, accessToData: true }));

export const usersWithAccess = pipe(
    filter(user => user.age >= 18),
    map(user => ({ ...user, accessToData: true })))(PREMIUM_USERS);
