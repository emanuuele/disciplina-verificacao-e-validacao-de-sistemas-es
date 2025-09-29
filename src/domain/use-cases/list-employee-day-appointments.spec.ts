import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import ListEmployeeDayAppointmentsUseCase from "./list-employee-day-appointments";

describe("List Employee Day Appointments", () => {
   let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
   let listEmployeeDayAppointmentsUseCase: ListEmployeeDayAppointmentsUseCase;
 
   beforeEach(() => {
     inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
     listEmployeeDayAppointmentsUseCase = new ListEmployeeDayAppointmentsUseCase(inMemoryAppointmentsRepository);
   });
 
   test("Deve ser possível listar os agendamentos de um funcionário em um dia específico", () => {
     inMemoryAppointmentsRepository.appointments.push({
       id: "1",
       service: "Corte de Cabelo",
       client: "Augusto César",
       employee: "Maria José",
       date: new Date(2025, 9, 20, 10, 0, 0),
     });
 
     inMemoryAppointmentsRepository.appointments.push({
       id: "2",
       service: "Barba",
       client: "João Silva",
       employee: "Maria José",
       date: new Date(2025, 9, 20, 11, 0, 0),
     });
 
     inMemoryAppointmentsRepository.appointments.push({
       id: "3",
       service: "Manicure",
       client: "Ana Paula",
       employee: "Carlos Alberto",
       date: new Date(2025, 9, 20, 10, 0, 0),
     });
 
     const appointments = listEmployeeDayAppointmentsUseCase.execute("Maria José", "2025-10-20");
   });
});