import { AppointmentsRepository } from "../repositories/appointments-repository";

export default class ListEmployeeDayAppointmentsUseCase {
    constructor(private appointmentsRepository: AppointmentsRepository) {}

    execute(employee: string, date: string) {
        return this.appointmentsRepository.findByEmployee(employee, date);
    }
}
