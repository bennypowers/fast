import { html, repeat } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { Calendar } from "./calendar";

/**
 * @public
 */
export const CalendarTemplate: ViewTemplate<Calendar> = html`
    <template>
        <div class="title">${x => x.getLocaleMonth()} ${x => x.getLocaleYear()}</div>
        <div class="week-day">
            ${repeat(
                x => x.getLocaleWeekDays(),
                html`
                    <div>${x => x}</div>
                `
            )}
        </div>
        ${x => {
            const getLocaleDay = x.getLocaleDay.bind(x);
            const weeks = x.getDays().reduce(
                (str, week) => `
            ${str}
            <div class="week">
                ${week.reduce(
                    (str, day) =>
                        `${x.isRTL() ? "" : str}
                        <div class="day${day.month !== x.month ? ` off` : ``}${
                            x.isToday(day.year, day.month, day.day) ? ` today` : ``
                        }" data-date="${day.month}-${day.day}-${day.year}">
                            <div>${getLocaleDay(day.month, day.day, day.year)}</div>
                            <slot name="${day.month}-${day.day}-${day.year}"></slot>
                        </div>
                        ${x.isRTL() ? str : ""}
                    `,
                    ``
                )}
            </div>`,
                ``
            );
            return html`
                ${weeks}
            `;
        }}
    </template>
`;