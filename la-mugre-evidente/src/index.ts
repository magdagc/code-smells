// ===================================================================
// PARTE 1: DEFINICIONES DE CLASES REFACTORIZADAS
// ===================================================================

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  // --- SOLUCIÓN AL CÓDIGO MUERTO ---
  // El campo `creationDate` fue eliminado. No se usaba.

  /**
   * --- SOLUCIÓN AL MÉTODO LARGO ---
   * El método original fue descompuesto en varias funciones más pequeñas.
   * Ahora, `generateActiveUsersReport` solo coordina los pasos,
   * haciendo que su propósito sea mucho más claro.
   */
  public generateActiveUsersReport(users: User[]): void {
    this.printReportHeader();

    const activeUsers = users.filter(user => user.isActive);
    console.log(`Se encontraron ${activeUsers.length} usuarios activos.`);

    console.log('--- REPORTE DE USUARIOS ---');
    for (const user of activeUsers) {
      this.processUserForReport(user);
    }

    this.printReportFooter();
  }

  /**
   * --- SOLUCIÓN AL CÓDIGO DUPLICADO ---
   * Creamos un único método privado que contiene la lógica de validación.
   * Ahora, tanto el reporte como el registro de usuarios llaman a este método.
   * Si la regla de validación cambia, solo la modificamos en un lugar.
   */
  private isUserValid(name: string, email: string): boolean {
    if (!name || name.trim() === '') {
      return false;
    }
    if (!email || !email.includes('@')) {
      return false;
    }
    return true;
  }

  public registerNewUser(name: string, email: string): boolean {
    if (!this.isUserValid(name, email)) {
      console.log('Error: Los datos del usuario son inválidos.');
      return false;
    }

    console.log(`Usuario "${name}" registrado correctamente.`);
    // ...lógica para guardar en base de datos...
    return true;
  }

  // --- Métodos extraídos para mejorar la legibilidad ---

  private processUserForReport(user: User): void {
    if (!this.isUserValid(user.name, user.email)) {
      console.log(`ADVERTENCIA: Usuario con ID ${user.id} tiene datos inválidos.`);
      return;
    }
    const reportLine = `  - ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
    console.log(reportLine);
  }

  private printReportHeader(): void {
    console.log('--- Iniciando la generación del reporte ---');
  }

  private printReportFooter(): void {
    // --- SOLUCIÓN AL CÓDIGO MUERTO ---
    // El parámetro `userType` fue eliminado de `logReportGeneration`
    // porque no se utilizaba. Ahora el método se llama `logReportGeneration`.
    this.logReportGeneration();
    console.log('--- Fin del reporte ---');
  }

  private logReportGeneration(): void {
    console.log(`El reporte fue generado el ${new Date().toLocaleDateString()}`);
  }

  // --- SOLUCIÓN AL CÓDIGO MUERTO ---
  // El método `archiveOldReports` fue eliminado por completo.
}

// ===================================================================
// PARTE 2: EJECUCIÓN DEL CÓDIGO REFACTORIZADO
// ===================================================================

console.log("Iniciando el script de demostración refactorizado...");

const userManager = new UserManager();
const misUsuarios: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', isActive: true },
  { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', isActive: false },
  { id: 3, name: '', email: 'email.invalido', isActive: true },
  { id: 4, name: 'Carlos Duty', email: 'carlos.duty@example.com', isActive: true },
];

userManager.generateActiveUsersReport(misUsuarios);

console.log("Script de demostración finalizado.");

