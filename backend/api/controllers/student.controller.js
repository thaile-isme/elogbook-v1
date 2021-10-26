import { default as db } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';

export default {
    async findAllStudents(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });
        const allStudentData = await db.student.findAll({
            where: { schoolId: req.schoolId },
        });
        for (const studentData of allStudentData) {
            delete studentData.dataValues.password;
            delete studentData.dataValues.schoolId;
        }
        res.send(allStudentData);
    },
    async findStudent(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
        });
        const studentData = await db.student.findOne({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: req.userId },
        });
        if (req.params.studentId.length > 30) {
            const studentData = await db.student.findOne({
                where: { id: req.params.studentId },
            });

            const schoolData = await db.school.findOne({
                where: { id: studentData.dataValues.schoolId },
            });
            studentData.dataValues.schoolName = schoolData.dataValues.name;
            delete studentData.dataValues.password;
            delete studentData.dataValues.schoolId;
            delete studentData.dataValues.id;
            return res.send(studentData);
        }
        if (studentData.dataValues.classes.length === 0) {
            return res.json({
                message: 'Student does not belong to any class',
            });
        }
        const studentClassId =
            studentData.dataValues.classes.pop().dataValues.id;
        const classData = await db.class.findOne({
            include: [{ model: db.student, though: 'class_student' }],
            where: { id: studentClassId },
        });
        const teacherData = await db.teacher.findOne({
            where: { id: classData.dataValues.teacherId },
        });
        const schoolData = await db.school.findOne({
            where: { id: classData.dataValues.schoolId },
        });
        const studentNames = [];
        for (const student of classData.dataValues.students) {
            studentNames.push({
                id: student.dataValues.id,
                name: student.dataValues.name,
            });
        }
        const fullData = {
            schoolId: schoolData.dataValues.idSchool,
            schoolName: schoolData.dataValues.name,
            className: classData.dataValues.name,
            teacherName: teacherData.dataValues.name,
            students: studentNames,
        };
        res.json(fullData);
    },
    async rankingByWeek(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });
        const allClassData = await db.class.findAll({
            where: { schoolId: req.schoolId, academicYearId: req.params.year },
        });
        const fullData = [];
        for (const classData of allClassData) {
            const allTimetableData = await db.timetable.findAll({
                where: { classId: classData.dataValues.id },
            });

            let totalPoint = 0;
            for (const timetableData of allTimetableData) {
                const allLogbookData = await db.logbook.findAll({
                    where: {
                        week: req.params.week,
                        timetableId: timetableData.dataValues.id,
                    },
                });
                for (const logbookData of allLogbookData) {
                    totalPoint += logbookData.dataValues.grade;
                }
            }
            const headTeacherData = await db.teacher.findOne({
                where: { id: classData.dataValues.teacherId },
            });
            let headTeacherName = headTeacherData
                ? headTeacherData.dataValues.name
                : 'not found!';
            fullData.push({
                className: classData.dataValues.name,
                academicYear: classData.dataValues.academicYearId,
                headTeacherName: headTeacherName,
                week: req.params.week,
                grade: totalPoint,
            });
        }

        res.json(fullData);
    },
    async rankingByYear(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });
        const allClassData = await db.class.findAll({
            where: { schoolId: req.schoolId, academicYearId: req.params.year },
        });
        const fullData = [];
        for (const classData of allClassData) {
            const allTimetableData = await db.timetable.findAll({
                where: { classId: classData.dataValues.id },
            });

            let totalPoint = 0;
            for (const timetableData of allTimetableData) {
                const allLogbookData = await db.logbook.findAll({
                    where: {
                        timetableId: timetableData.dataValues.id,
                    },
                });
                for (const logbookData of allLogbookData) {
                    totalPoint += logbookData.dataValues.grade;
                }
            }
            const headTeacherData = await db.teacher.findOne({
                where: { id: classData.dataValues.teacherId },
            });
            let headTeacherName = headTeacherData
                ? headTeacherData.dataValues.name
                : 'not found!';
            console.log(headTeacherData);
            fullData.push({
                className: classData.dataValues.name,
                academicYear: classData.dataValues.academicYearId,
                headTeacherName: headTeacherName,
                week: req.params.week,
                grade: totalPoint,
            });
        }

        res.json(fullData);
    },
};