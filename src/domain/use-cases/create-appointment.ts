import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { PastDateSchedulingError } from "./errors/past-date-scheduling-error";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

type CreateAppointmentUseCaseRequest = {
  service: string;
  client: string;
  employee: string;
  date: Date;
};

type CreateAppointmentUseCaseResponse = {
  appointment: Appointment;
};

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  execute(
    request: CreateAppointmentUseCaseRequest
  ): CreateAppointmentUseCaseResponse {
    const dateNow = new Date();

    if (request.date < dateNow) {
      throw new PastDateSchedulingError();
    }

    const existingAppointment = this.appointmentsRepository.findByDate(request.date);
    if (existingAppointment) {
      throw new DateAlreadyBookedError();
    }

    const appointment = new Appointment(
      "1",
      request.service,
      request.client,
      request.employee,
      request.date
    );

    this.appointmentsRepository.create(appointment);

    return {
      appointment,
    };
  }
}
