export default function (sequelize, Sequelize) {
    const Lesson = sequelize.define('lessons', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        course_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Lesson;
}
