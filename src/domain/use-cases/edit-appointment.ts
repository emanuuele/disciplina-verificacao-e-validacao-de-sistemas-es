import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

type EditAppointmentUseCaseRequest = {
    service: string;
    client: string;
    employee: string;
    date: Date;
    id: string;
};

type EditAppointmentUseCaseResponse = {
    appointment: Appointment;
};

export class EditAppointmentUseCase {
    constructor(private appointmentsRepository: AppointmentsRepository){}

    execute(request: EditAppointmentUseCaseRequest): EditAppointmentUseCaseResponse {
        if (this.appointmentsRepository.findByDate(request.date)) {
            throw new DateAlreadyBookedError();
        }
        const appointment = new Appointment(
            request.id,
            request.service,
            request.client,
            request.employee,
            request.date
        );

        this.appointmentsRepository.edit(appointment);

        return {
            appointment,
        };
    }
}