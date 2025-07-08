// ===================================================================
// PARTE 1: DEFINICIONES DE NUESTRAS CLASES BASE
// ===================================================================

// Definimos los tipos de empleados que manejamos para tener algo de type-safety.
type EmployeeType = 'manager' | 'engineer' | 'intern';

// Nuestra clase principal que solo contiene datos.
class Employee {
  constructor(
    public name: string,
    public type: EmployeeType,
    public salary: number,
    // Propiedades que solo aplican a ciertos roles:
    public projectsManaged?: string[]
  ) {}
}

// ===================================================================
// PARTE 2: LAS CLASES CON LOS "CODE SMELLS"
// ===================================================================

class BonusCalculator {
  /**
   * --- SMELL 1: ABUSO DE CONDICIONALES (Switch Statements) ---
   * Este método usa un `switch` para cambiar su comportamiento según el tipo de empleado.
   * El problema: si mañana agregamos un nuevo rol (ej: 'designer'), estamos OBLIGADOS
   * a venir y modificar este switch. La clase no está "cerrada a la modificación".
   * Esto viola el Principio de Abierto/Cerrado.
   */
  public calculateBonus(employee: Employee): number {
    console.log(`Calculando bono para ${employee.name}...`);
    switch (employee.type) {
      case 'manager':
        return employee.salary * 0.2;
      case 'engineer':
        return employee.salary * 0.1;
      case 'intern':
        return 500; // Los pasantes reciben un bono fijo
      default:
        // ¿Qué pasa si el tipo es nuevo y no lo agregamos acá? ¡Error!
        return 0;
    }
  }
}

class ReportGenerator {
  /**
   * --- SMELL 2: ENVIDIA DE FUNCIONALIDAD (Feature Envy) ---
   * Este método está "envidioso" de la clase `Employee`.
   * Para generar el reporte, le pide a `Employee` un montón de sus datos
   * (name, type, salary, projectsManaged) y arma la lógica acá afuera.
   *
   * Este método parece más interesado en los datos de `Employee` que en los de su propia clase.
   * Probablemente, toda esta lógica de "describirse a sí mismo" debería estar
   * DENTRO de la clase `Employee` en un método como `getReportLine()`.
   */
  public generateReportLine(employee: Employee): string {
    let reportLine = `REPORTE: ${employee.name} (${employee.type}) - Salario: $${employee.salary}`;

    // La envidia continúa: necesita saber detalles internos para agregar más datos.
    if (employee.type === 'manager' && employee.projectsManaged) {
      reportLine += ` | Proyectos: ${employee.projectsManaged.length}`;
    }

    return reportLine;
  }
}

// ===================================================================
// PARTE 3: EJECUCIÓN DEL CÓDIGO CON SMELLS
// ===================================================================

console.log("--- Iniciando demo de 'Cimientos Raros' ---");

// Creamos nuestras clases "con olor"
const bonusCalculator = new BonusCalculator();
const reportGenerator = new ReportGenerator();

// Creamos una lista de empleados de distintos tipos
const employees: Employee[] = [
  new Employee('Ana', 'manager', 5000, ['Proyecto Phoenix', 'Proyecto Hydra']),
  new Employee('Juan', 'engineer', 3000),
  new Employee('Lucía', 'intern', 1000),
];

// Usamos las clases para procesar a cada empleado
employees.forEach(employee => {
  const bonus = bonusCalculator.calculateBonus(employee);
  const report = reportGenerator.generateReportLine(employee);

  console.log(report);
  console.log(`  -> Bono calculado: $${bonus}\n`);
});

console.log("--- Fin de la demo ---");
