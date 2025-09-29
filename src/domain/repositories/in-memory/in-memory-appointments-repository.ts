import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];
  
  create(appointment: Appointment): void {
    this.appointments.push(appointment);
  }
  
  findMany(): Appointment[] {
    return this.appointments;
  }

  findByEmployee(employee: string, date: string): Appointment[] | null {
    const appointment = this.appointments.filter(a => a.employee === employee && a.date === new Date(date));
    return appointment;
  }
  
  findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find(a => 
      a.date.getTime() === date.getTime()
    );
    return appointment || null;
  }

  edit(appointment: Appointment): void {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index] = appointment;
    }
  }
}
