import { Appointment } from "../entities/appointment";

export interface AppointmentsRepository {
  create(appointment: Appointment): void;
  findMany(): Appointment[];
  findByDate(date: Date): Appointment | null;
  edit(appointment: Appointment): void;
  findByEmployee(employee: string, date: string): Appointment[];
}
