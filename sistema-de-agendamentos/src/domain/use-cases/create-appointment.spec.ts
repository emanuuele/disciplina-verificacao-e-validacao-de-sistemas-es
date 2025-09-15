import { expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointmentUseCase } from "./create-appointment";
import { PastDateSchedulingError } from "./errors/past-date-scheduling-error";

test("Deve ser possível realizar um agendamento", () => {
  const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
  const createAppointentUseCase = new CreateAppointmentUseCase(
    inMemoryAppointmentsRepository
  );

  createAppointentUseCase.execute({
    client: "Augusto César",
    date: new Date(2025, 9, 20),
    employee: "Maria José",
    service: "Corte de Cabelo",
  });

  const appointment = inMemoryAppointmentsRepository.appointments[0];
  expect(appointment.client).toBe("Augusto César");
});

test("Não deve ser possível realizar um agendamento em uma data passada", () => {
  const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
  const createAppointentUseCase = new CreateAppointmentUseCase(
    inMemoryAppointmentsRepository
  );

  expect(() =>
    createAppointentUseCase.execute({
      client: "Augusto César",
      date: new Date(2020, 7, 20), // Data no passado
      employee: "Maria José",
      service: "Corte de Cabelo",
    })
  ).toThrow(PastDateSchedulingError);
});
