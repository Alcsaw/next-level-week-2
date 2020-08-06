import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
};

export default class LessonsController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search for lessons'
            });
        }

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const timeInMinutes = convertHourToMinutes(time);

        const lessons = await db('lessons')
            .whereExists(function() {
                this.select('lessons_schedule.*')
                    .from('lessons_schedule')
                    .whereRaw('`lessons_schedule`.`lesson_id` = `lessons`.`id`')
                    .whereRaw('`lessons_schedule`. `week_day` = ??', [Number(week_day)])
                    .whereRaw('`lessons_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`lessons_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('lessons.subject', '=', subject)
            .join('users', 'lessons.user_id', '=', 'users.id')
            .select(['lessons.*', 'users.*']);

        response.json(lessons);
    };

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            phone,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                phone,
                bio,
            });

            const user_id = insertedUsersIds[0];

            const insertedLessonsIds = await trx('lessons').insert({
                subject,
                cost,
                user_id,
            });

            const lesson_id = insertedLessonsIds[0];

            const lessonSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    lesson_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });

            await trx('lessons_schedule').insert(lessonSchedule);

            await trx.commit();

            return response.status(201).json({ message: 'Hi there!' });
        } catch (err) {
            console.log(err);

            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
};
