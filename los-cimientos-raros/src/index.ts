// ===================================================================
// PARTE 1: NUEVA ESTRUCTURA DE CLASES REFACTORIZADA
// ===================================================================

// Creamos una clase base abstracta que define el "contrato" para todos los empleados.
// Obliga a que cada tipo de empleado implemente su propio cálculo de bono.
abstract class Employee {
  constructor(public name: string, public salary: number) {}

  /**
   * --- SOLUCIÓN AL "ABUSO DE CONDICIONALES" ---
   * Este método es abstracto. Forzamos a que cada subclase defina su propia
   * lógica para calcular el bono. Así, si mañana creamos un nuevo rol,
   * TypeScript nos obligará a implementar este método, y no tendremos que
   * modificar ningún switch existente.
   */
  abstract calculateBonus(): number;

  /**
   * --- SOLUCIÓN A LA "ENVIDIA DE FUNCIONALIDAD" ---
   * La lógica para generar el reporte ahora vive DENTRO de la clase Employee.
   * Ya no hay una clase externa "envidiosa" de sus datos. Este método
   * puede ser extendido por las subclases si necesitan agregar información.
   */
  public getReportLine(): string {
    return `REPORTE: ${this.name} (${this.constructor.name}) - Salario: $${this.salary}`;
  }
}

// Creamos clases específicas para cada rol, que heredan de Employee.

class Manager extends Employee {
  constructor(
    name: string,
    salary: number,
    public projectsManaged: string[]
  ) {
    super(name, salary);
  }

  // Implementación específica para el Manager
  public calculateBonus(): number {
    return this.salary * 0.2;
  }

  // Sobrescribimos el método del padre para agregar más información
  public getReportLine(): string {
    const baseReport = super.getReportLine(); // Reutilizamos la lógica base
    return `${baseReport} | Proyectos: ${this.projectsManaged.length}`;
  }
}

class Engineer extends Employee {
  // Implementación específica para el Engineer
  public calculateBonus(): number {
    return this.salary * 0.1;
  }
}

class Intern extends Employee {
  // Implementación específica para el Intern
  public calculateBonus(): number {
    return 500; // Bono fijo
  }
}


// ===================================================================
// PARTE 2: EJECUCIÓN DEL CÓDIGO REFACTORIZADO
// ===================================================================
// ¡Notá cómo las clases BonusCalculator y ReportGenerator ya no existen!
// La lógica ahora está donde debe estar, y el código es más limpio.

console.log("--- Iniciando demo de código REFACTORIZADO ---");

// Creamos una lista de empleados usando nuestras nuevas clases específicas.
// El tipo de empleado ahora está definido por la clase que instanciamos.
const employees: Employee[] = [
  new Manager('Ana', 5000, ['Proyecto Phoenix', 'Proyecto Hydra']),
  new Engineer('Juan', 3000),
  new Intern('Lucía', 1000),
  // Si quisiéramos agregar un nuevo rol, solo crearíamos una nueva clase
  // y el resto del código funcionaría sin cambios.
];

// El código que consume a los empleados ahora es mucho más simple y directo.
employees.forEach(employee => {
  // Ya no necesitamos una clase externa. Llamamos al método directamente.
  const bonus = employee.calculateBonus();
  const report = employee.getReportLine();

  console.log(report);
  console.log(`  -> Bono calculado: $${bonus}\n`);
});

console.log("--- Fin de la demo ---");

