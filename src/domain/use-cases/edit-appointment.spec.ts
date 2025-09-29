import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { EditAppointmentUseCase } from "./edit-appointment";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

describe("Edit Appointment", () => {
    let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
    let editAppointmentUseCase: EditAppointmentUseCase;
    beforeEach(() => {
        inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
        editAppointmentUseCase = new EditAppointmentUseCase(inMemoryAppointmentsRepository);
    });

    test("Deve ser possível editar um agendamento", () => {
        inMemoryAppointmentsRepository.appointments.push({
            id: "1",
            service: "Corte de Cabelo",
            client: "Augusto César",
            employee: "Maria José",
            date: new Date(2025, 9, 20),
        });

        editAppointmentUseCase.execute({
            id: "1",
            client: "João Silva",
            date: new Date(2025, 9, 21),
            employee: "Ana Paula",
            service: "Barba",
        });

        const appointment = inMemoryAppointmentsRepository.appointments[0];
        expect(appointment.client).toBe("João Silva");
        expect(appointment.date).toEqual(new Date(2025, 9, 21));
        expect(appointment.employee).toBe("Ana Paula");
        expect(appointment.service).toBe("Barba");
    });

    test("Não deve ser possível editar um agendamento para uma data já agendada", () => {
        inMemoryAppointmentsRepository.appointments.push({
            id: "1",
            service: "Corte de Cabelo",
            client: "Augusto César",
            employee: "Maria José",
            date: new Date(2025, 9, 20),
        });

        inMemoryAppointmentsRepository.appointments.push({
            id: "2",
            service: "Barba",
            client: "João Silva",
            employee: "Ana Paula",
            date: new Date(2025, 9, 21),
        });

        expect(() =>
            editAppointmentUseCase.execute({
                id: "1",
                client: "Augusto César",
                date: new Date(2025, 9, 21), // Data já agendada
                employee: "Maria José",
                service: "Corte de Cabelo",
            })
        ).toThrow(DateAlreadyBookedError);
    });
});