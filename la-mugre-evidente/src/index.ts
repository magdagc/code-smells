// ===================================================================
// PARTE 1: DEFINICIONES (Interfaces y Clases)
// ===================================================================

// Para que el ejemplo funcione, definimos un tipo simple para el Usuario
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {

  // --- SMELL 3: CÓDIGO MUERTO (Dead Code) ---
  private creationDate = new Date();

  /**
   * --- SMELL 2: MÉTODO LARGO (Long Method) ---
   */
  public generateActiveUsersReport(users: User[]): void {
    console.log('--- Iniciando la generación del reporte ---');

    // 1. Filtrar usuarios activos
    const activeUsers = users.filter(user => user.isActive);
    console.log(`Se encontraron ${activeUsers.length} usuarios activos.`);

    // --- SMELL 3: CÓDIGO MUERTO (Dead Code) ---
    let reportHasData = false;

    // 2. Procesar y mostrar cada usuario activo
    console.log('--- REPORTE DE USUARIOS ---');
    for (const user of activeUsers) {
      
      // --- SMELL 1: CÓDIGO DUPLICADO (Duplicate Code) ---
      if (!user.name || user.name.trim() === '') {
        console.log(`ADVERTENCIA: Usuario con ID ${user.id} tiene nombre inválido.`);
        continue;
      }
      if (!user.email || !user.email.includes('@')) {
        console.log(`ADVERTENCIA: Usuario con ID ${user.id} tiene email inválido.`);
        continue;
      }
      // --- Fin del bloque duplicado ---

      const reportLine = `  - ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
      console.log(reportLine);
      reportHasData = true; 
    }

    this.logReportGeneration('ADMIN');

    console.log('--- Fin del reporte ---');
  }

  public registerNewUser(name: string, email: string): boolean {
    // --- SMELL 1: CÓDIGO DUPLICADO (Duplicate Code) ---
    if (!name || name.trim() === '') {
      console.log('Error: El nombre es requerido.');
      return false;
    }
    if (!email || !email.includes('@')) {
      console.log('Error: El formato de email es inválido.');
      return false;
    }
    // --- Fin del bloque duplicado ---

    console.log(`Usuario "${name}" registrado correctamente.`);
    return true;
  }

  // --- SMELL 3: CÓDIGO MUERTO (Dead Code) ---
  private logReportGeneration(userType: string): void {
    console.log(`El reporte fue generado el ${new Date().toLocaleDateString()}`);
  }

  // --- SMELL 3: CÓDIGO MUERTO (Dead Code) ---
  private archiveOldReports(): void {
    console.log('Archivando reportes viejos...');
  }
}

// ===================================================================
// PARTE 2: EJECUCIÓN (El bloque que efectivamente corre)
// ===================================================================

console.log("Iniciando el script de demostración...");

const userManager = new UserManager();
const misUsuarios: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', isActive: true },
  { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', isActive: false },
  { id: 3, name: '', email: 'email.invalido', isActive: true },
  { id: 4, name: 'Carlos Duty', email: 'carlos.duty@example.com', isActive: true },
];

userManager.generateActiveUsersReport(misUsuarios);

console.log("Script de demostración finalizado.");
