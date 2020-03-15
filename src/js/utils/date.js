const date = new Date();
const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
const dateLastWeek = new Date();
dateLastWeek.setDate(dateLastWeek.getDate() - 7);
const lastWeek = dateLastWeek.getFullYear() + '-' + (dateLastWeek.getMonth() + 1) + '-' + dateLastWeek.getDate();

const monthNames = [ "Января",
                    "Февраля",
                    "Марта",
                    "Апреля",
                    "Мая",
                    "Июня",
                    "Июля",
                    "Августя",
                    "Сентября",
                    "Октября",
                    "Ноября",
                    "Декабря"
                ];

export { today, lastWeek, monthNames };