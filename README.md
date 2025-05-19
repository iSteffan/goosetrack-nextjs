# Goosetrack

**[LIVE PAGE](https://goosetrack-nextjs.vercel.app/en)**

<img width="100%" src="./public/images/readme/readme-title.jpg" alt="main page"/>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#features">Features</a> •
  <a href="#components-api">Components API</a> •
  <a href="#credits">Credits</a> •
  <a href="#getting-started">Getting started</a>
</p>

## Components API

Here you may find a list with the most common components:

- #### AuthForm

| Prop   | Value              | Description         |
| ------ | ------------------ | ------------------- |
| `type` | `signUp` / `logIn` | required, form type |

- #### BurgerMenu

| Prop      | Value      | Description                |
| --------- | ---------- | -------------------------- |
| `isOpen`  | `boolean`  | required, set open state   |
| `onClose` | `function` | required, close BurgerMenu |

- #### CalendarToolbar

| Prop             | Value           | Description                  |
| ---------------- | --------------- | ---------------------------- |
| `currentDate`    | `string`        | required, current date       |
| `periodType`     | `day` / `month` | required, period type        |
| `onDateChange`   | `function`      | required, change date func   |
| `onPeriodChange` | `function`      | required, change period func |

- #### ChoosedDay

| Prop           | Value      | Description                |
| -------------- | ---------- | -------------------------- |
| `selectedDate` | `string`   | required, selected date    |
| `onDateChange` | `function` | required, change date func |

- #### ChoosedMonth

| Prop           | Value    | Description             |
| -------------- | -------- | ----------------------- |
| `selectedDate` | `string` | required, selected date |

- #### FeedbackForm

| Prop              | Value                     | Description                  |
| ----------------- | ------------------------- | ---------------------------- |
| `onClose`         | `function`                | required, close modal window |
| `review`          | `IReview[]` / `undefined` | required, review data        |
| `isReviewLoading` | `boolean`                 | required, set skeleton state |

- #### Header

| Prop       | Value      | Description             |
| ---------- | ---------- | ----------------------- |
| `pageName` | `string`   | required, set page name |
| `onOpen`   | `function` | optional, open feedback |

- #### ReviewSlider

| Prop      | Value       | Description            |
| --------- | ----------- | ---------------------- |
| `reviews` | `IReview[]` | required, reviews data |

- #### SideBar

| Prop           | Value      | Description                   |
| -------------- | ---------- | ----------------------------- |
| `onClose`      | `function` | optional, close menu func     |
| `isBurgerMenu` | `boolean`  | optional, set specific styles |

- #### StatisticsChart

| Prop           | Value    | Description             |
| -------------- | -------- | ----------------------- |
| `tasks`        | `Task[]` | required, tasks data    |
| `selectedDate` | `string` | required, selected date |

- #### TaskForm

| Prop           | Value                            | Description                  |
| -------------- | -------------------------------- | ---------------------------- |
| `initialData`  | `object`                         | optional, task data          |
| `onClose`      | `function`                       | required, close modal window |
| `category`     | `To Do` / `In Progress` / `Done` | required, set task category  |
| `selectedDate` | `string`                         | required, selected date      |

- #### AddFeedbackBtn

| Prop     | Value      | Description                 |
| -------- | ---------- | --------------------------- |
| `onOpen` | `function` | required, open modal window |

- #### Avatar

| Prop        | Value    | Description           |
| ----------- | -------- | --------------------- |
| `avatarURL` | `string` | optional, avatar url  |
| `name`      | `string` | optional, username    |
| `size`      | `number` | optional, avatar size |

- #### CalendarTable

| Prop          | Value    | Description            |
| ------------- | -------- | ---------------------- |
| `currentDate` | `string` | required, current date |

- #### DayCalendarHead

| Prop           | Value      | Description                |
| -------------- | ---------- | -------------------------- |
| `weekDays`     | `Date[]`   | required, days of the week |
| `selectedDate` | `string`   | required, selected date    |
| `onDateChange` | `function` | required, change date func |

- #### Modal

| Prop         | Value       | Description                   |
| ------------ | ----------- | ----------------------------- |
| `isOpen`     | `boolean`   | required, set open statet     |
| `onClose`    | `function`  | required, close modal window  |
| `children`   | `ReactNode` | required, react node          |
| `isFeedback` | `boolean`   | optional, set specific styles |

- #### PeriodPaginator

| Prop           | Value           | Description                |
| -------------- | --------------- | -------------------------- |
| `periodType`   | `day` / `month` | required, period type      |
| `selectedDate` | `string`        | required, selected date    |
| `onDateChange` | `function`      | required, change date func |

- #### PeriodTypeSelect

| Prop           | Value           | Description                |
| -------------- | --------------- | -------------------------- |
| `periodType`   | `day` / `month` | required, period type      |
| `onDateChange` | `function`      | required, change date func |

- #### QueryProvider

| Prop       | Value       | Description          |
| ---------- | ----------- | -------------------- |
| `children` | `ReactNode` | required, react node |

- #### ReviewSliderCard

| Prop   | Value     | Description           |
| ------ | --------- | --------------------- |
| `data` | `IReview` | required, review data |

- #### TasksColumnsList

| Prop           | Value    | Description             |
| -------------- | -------- | ----------------------- |
| `selectedDate` | `string` | required, selected date |

- #### TasksColumn

| Prop           | Value                            | Description             |
| -------------- | -------------------------------- | ----------------------- |
| `title`        | `To Do` / `In Progress` / `Done` | required, task category |
| `selectedDate` | `string`                         | required, selected date |
| `tasks`        | `ITask[]`                        | required, tasks data    |

- #### AddTaskBtn

| Prop     | Value      | Description                 |
| -------- | ---------- | --------------------------- |
| `onOpen` | `function` | required, open modal window |

- #### ColumnHeadBar

| Prop        | Value                            | Description                   |
| ----------- | -------------------------------- | ----------------------------- |
| `title`     | `To Do` / `In Progress` / `Done` | required, task category       |
| `onOpen`    | `function`                       | required, open modal window   |
| `className` | `string`                         | optional, set specific styles |

- #### ColumnsTasksList

| Prop        | Value     | Description          |
| ----------- | --------- | -------------------- |
| `tasks`     | `ITask[]` | required, tasks data |
| `maxHeight` | `string`  | required, set height |

- #### TaskColumnCard

| Prop   | Value   | Description         |
| ------ | ------- | ------------------- |
| `task` | `ITask` | required, task data |

- #### TaskToolbar

| Prop       | Value                            | Description                 |
| ---------- | -------------------------------- | --------------------------- |
| `taskId`   | `string`                         | required, task id           |
| `category` | `To Do` / `In Progress` / `Done` | required, task category     |
| `onOpen`   | `function`                       | required, open modal window |

- #### UserNav

| Prop      | Value      | Description                 |
| --------- | ---------- | --------------------------- |
| `onClose` | `function` | optional, close burger menu |

## Credits

This software uses the following open source packages:

| 🧩 General                                    | 🎨 Frontend                                                                          | 🛠️ Backend                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                | [date-fns](https://www.npmjs.com/package/date-fns)                                   | [bcrypt](https://www.npmjs.com/package/bcrypt)                                |
| [TypeScript](https://www.typescriptlang.org/) | [Tailwindcss](https://tailwindcss.com/)                                              | [cloudinary](https://cloudinary.com/documentation/solution_overview#security) |
| [axios](https://www.npmjs.com/package/axios)  | [HeadlessUI](https://headlessui.com/)                                                | [mongoose](https://www.npmjs.com/package/mongoose)                            |
|                                               | [Swiper](https://swiperjs.com/)                                                      | [next-auth](https://www.npmjs.com/package/next-auth)                          |
|                                               | [next-intl](https://next-intl.dev/)                                                  | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)                    |
|                                               | [next-themes](https://www.npmjs.com/package/next-themes)                             |                                                                               |
|                                               | [react-hook-form](https://react-hook-form.com/)                                      |
|                                               | [resize-observer-polyfills](https://www.npmjs.com/package/resize-observer-polyfills) |
|                                               | [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)       |                                                                               |
|                                               | [react-number-format](https://www.npmjs.com/package/react-number-format)             |                                                                               |
|                                               | [react-spinners](https://www.npmjs.com/package/react-spinners)                       |                                                                               |
|                                               | [react-stars](https://www.npmjs.com/package/react-stars)                             |                                                                               |
|                                               | [react-toastify](https://www.npmjs.com/package/react-toastify)                       |                                                                               |
|                                               | [recharts](https://www.npmjs.com/package/recharts)                                   |                                                                               |
|                                               | [svgr](https://www.npmjs.com/package/@svgr/webpack)                                  |                                                                               |
|                                               | [zustand](https://www.npmjs.com/package/zustand)                                     |                                                                               |
|                                               | [tanstack/react-query](https://tanstack.com/query/latest)                            |                                                                               |
|                                               | [classnames](https://www.npmjs.com/package/classnames)                               |                                                                               |

## Getting Started

- **Clone the repository to local machine**

```bash
https://github.com/iSteffan/goosetrack-nextjs.git
```

- **Install dependencies** via npm:

```
npm install
```

- **Run the project in local environment**

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
