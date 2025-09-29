import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointmentUseCase } from "./create-appointment";
import { PastDateSchedulingError } from "./errors/past-date-scheduling-error";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

describe("Create Appointment", () => {
  let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      inMemoryAppointmentsRepository
    );
  });

  test("Deve ser possível realizar um agendamento", () => {
    createAppointmentUseCase.execute({
      client: "Augusto César",
      date: new Date(2025, 9, 20),
      employee: "Maria José",
      service: "Corte de Cabelo",
    });

    const appointment = inMemoryAppointmentsRepository.appointments[0];
    expect(appointment.client).toBe("Augusto César");
  });

  test("Não deve ser possível realizar um agendamento em uma data passada", () => {
    expect(() =>
      createAppointmentUseCase.execute({
        client: "Augusto César",
        date: new Date(2020, 7, 20), // Data no passado
        employee: "Maria José",
        service: "Corte de Cabelo",
      })
    ).toThrow(PastDateSchedulingError);
  });

  test("Não deve ser possível realizar dois agendamentos para o mesmo horário", () => {
    const appointmentDate = new Date(2025, 9, 20, 10);

    createAppointmentUseCase.execute({
      client: "Augusto César",
      date: appointmentDate,
      employee: "Maria José",
      service: "Corte de Cabelo",
    });

    expect(() =>
      createAppointmentUseCase.execute({
        client: "João Silva",
        date: appointmentDate,
        employee: "Ana Paula",
        service: "Barba",
      })
    ).toThrow(DateAlreadyBookedError);
  });
});