import { calendarDay, type CalendarDate } from "./cairo-calendar"

function anniversary(birth: CalendarDate, year: number): CalendarDate {
  const daysInMonth = new Date(Date.UTC(year, birth.month, 0)).getUTCDate()
  return { year, month: birth.month, day: Math.min(birth.day, daysInMonth) }
}

export function lifeMilestones(
  today: CalendarDate,
  birth: CalendarDate,
  completedCertificates: number,
) {
  const currentDay = calendarDay(today)
  const thisBirthday = anniversary(birth, today.year)
  const birthdayDay = calendarDay(thisBirthday)
  const nextBirthday =
    currentDay <= birthdayDay
      ? thisBirthday
      : anniversary(birth, today.year + 1)

  return {
    age: today.year - birth.year - (currentDay < birthdayDay ? 1 : 0),
    daysSinceBirth: currentDay - calendarDay(birth),
    daysUntilNextBirthday: calendarDay(nextBirthday) - currentDay,
    nextBirthday,
    completedCertificates,
  }
}
