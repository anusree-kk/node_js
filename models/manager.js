const { makeDb } = require('../databaseConnect')


async function addEmployeesWorkschedule(date, timeFrom, timeTo, employeesId) {
    const db = makeDb()
    try {
        const qr = 'insert into workschedules (date,time_from,time_to,employees_id) values (?,?,?,?)'
        const values = [date, timeFrom, timeTo, employeesId]
        await db.query(qr, values)

    } catch (err) {
        console.error('Error:', err.message)
        return false
    }
    finally {
        await db.close()
    }
}

async function checkEmployeesDepartment(department) {
    const db = makeDb()
    try {

        const qr = 'select name from departments where name=?'
        const result = await db.query(qr, department)
        return result
    } catch (err) {
        console.error('Error checking department:', err.message)
        return false

    } finally {
        await db.close()
    }
}

async function checkWorkscheduleAdded(date,timeFrom, timeTo, employeesId) {
    const db = makeDb()
    try {
        const qr = `select id from workschedules where date=? AND time_from=? AND time_to=? AND employees_id=? `

        const values = [date,timeFrom, timeTo, employeesId]
        const checkWorkschedule = await db.query(qr, values)
        return checkWorkschedule

    } catch (err) {
        console.log('Error fetching work details:', err.message)
        return false


    } finally {
        await db.close()
    }
}


module.exports = {

    addEmployeesWorkschedule,
    checkEmployeesDepartment,
    checkWorkscheduleAdded
}

