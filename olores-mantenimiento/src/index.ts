// ===================================================================
// PARTE 1: NUEVA ESTRUCTURA DE CLASES REFACTORIZADA
// ===================================================================

// --- SOLUCIÓN AL "GRUPO DE DATOS" (Data Clump) ---
// Creamos una clase específica para manejar el concepto de Dirección.
// Ahora, en lugar de pasar un montón de strings sueltos, pasaremos un solo objeto Address.
class Address {
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public zipCode: string
  ) {}

  /**
   * --- SOLUCIÓN A LA "CIRUGÍA DE ESCOPETA" (Shotgun Surgery) ---
   * Toda la lógica de validación de una dirección ahora está en un solo lugar.
   * Si las reglas de negocio cambian, solo tenemos que modificar este método.
   * ¡No más disparos a múltiples clases!
   */
  public isValid(): boolean {
    if (this.street.trim() === '') {
      console.error("Error de Dirección: La calle no puede estar vacía.");
      return false;
    }
    if (this.zipCode.length < 3) {
      console.error("Error de Dirección: El código postal parece inválido.");
      return false;
    }
    // ... aquí irían todas las demás validaciones de dirección ...
    return true;
  }

  // Un método de ayuda para obtener la dirección formateada.
  // De nuevo, la responsabilidad está centralizada.
  public getFullAddressString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}`;
  }
}

// La clase Order no cambia.
class Order {
  constructor(public orderId: number, public totalAmount: number) {}
}

// La clase Customer se simplifica. Ya no necesita validar direcciones.
class Customer {
  constructor(public customerId: number, public name: string) {}
  // El método validateAddress() fue eliminado de aquí. ¡Adiós!
}

// La clase OrderProcessor ahora es mucho más limpia y simple.
class OrderProcessor {
  /**
   * ¡Miren qué limpia quedó la firma de este método!
   * Ahora solo recibe un objeto Address, en lugar de un montón de strings.
   */
  public shipOrder(
    order: Order,
    customer: Customer,
    shippingAddress: Address
  ): void {
    console.log(`\nProcesando envío para el pedido #${order.orderId}...`);

    // La validación ahora es una simple llamada a un método.
    // OrderProcessor ya no se preocupa por CÓMO se valida una dirección.
    if (!shippingAddress.isValid()) {
      console.error("Error de Procesador: La dirección de envío es inválida.");
      return;
    }

    console.log(`Enviando a: ${shippingAddress.getFullAddressString()}`);
    console.log("¡Pedido enviado con éxito!");
  }
}

// ===================================================================
// PARTE 2: EJECUCIÓN DEL CÓDIGO REFACTORIZADO
// ===================================================================

console.log("--- Iniciando demo del código REFACTORIZADO ---");

// Creamos nuestras instancias
const processor = new OrderProcessor();
const customer = new Customer(101, 'Constructora S.A.');
const order = new Order(2025, 45000);

// Ahora creamos un objeto Address, que es mucho más semántico y seguro.
const shippingAddress = new Address(
  'Av. Siempre Viva 742',
  'Springfield',
  'Provincia X',
  'B1675'
);

// La llamada al método ahora es mucho más limpia y legible.
processor.shipOrder(order, customer, shippingAddress);

// Ejemplo con una dirección inválida
const invalidAddress = new Address(
  'Otra Calle 123',
  'Otra Ciudad',
  'Provincia Y',
  'AB' // Código postal inválido
);
processor.shipOrder(new Order(2026, 1500), customer, invalidAddress);

console.log("\n--- Fin de la demo ---");

