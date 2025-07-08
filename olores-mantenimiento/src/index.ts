// ===================================================================
// PARTE 1: DEFINICIONES DE CLASES CON "SMELLS"
// ===================================================================

// Una clase simple para representar un Pedido
class Order {
  constructor(public orderId: number, public totalAmount: number) {}
}

// Una clase para representar al Cliente
class Customer {
  constructor(public customerId: number, public name: string) {}

  // Este método valida la dirección del cliente.
  // Si la lógica de validación de la calle o ciudad cambia,
  // habría que modificar este método.
  public validateAddress(street: string, city: string, zipCode: string): boolean {
    if (zipCode.length < 3) {
      console.error("Error de Cliente: El código postal parece inválido.");
      return false;
    }
    // ... más validaciones de dirección ...
    return true;
  }
}

// La clase principal que procesa los pedidos y contiene los smells
class OrderProcessor {
  /**
   * --- SMELL 1: GRUPOS DE DATOS (Data Clumps) ---
   * ¿Notan algo raro en los parámetros de este método?
   * `street`, `city`, `state`, y `zipCode` son un "montoncito de datos"
   * que siempre van juntos. Representan un concepto: una Dirección.
   * Pasarlos como parámetros individuales es engorroso y propenso a errores.
   */
  public shipOrder(
    order: Order,
    customer: Customer,
    street: string,
    city: string,
    state: string,
    zipCode: string
  ): void {
    console.log(`\nProcesando envío para el pedido #${order.orderId}...`);

    /**
     * --- SMELL 2: CIRUGÍA DE ESCOPETA (Shotgun Surgery) ---
     * Para enviar un pedido, esta clase necesita validar la dirección.
     * Pero la lógica de validación está repartida. Una parte está acá
     * y otra parte está en la clase `Customer`.
     *
     * IMAGINEN ESTO: Si la regla de negocio para validar una calle cambia,
     * tendríamos que modificar el código AQUÍ y también en el método
     * `validateAddress` de la clase `Customer`.
     *
     * Un solo cambio conceptual ("validar dirección") nos obliga a "disparar"
     * a múltiples clases. Eso es Cirugía de Escopeta.
     */
    if (street.trim() === '') {
      console.error("Error de Procesador: La calle no puede estar vacía.");
      return;
    }
    // Llama a la otra parte de la validación en la otra clase
    if (!customer.validateAddress(street, city, zipCode)) {
      console.error("Error de Procesador: La dirección del cliente es inválida.");
      return;
    }

    console.log(`Enviando a: ${street}, ${city}, ${state} ${zipCode}`);
    console.log("¡Pedido enviado con éxito!");
  }
}

// ===================================================================
// PARTE 2: EJECUCIÓN DEL CÓDIGO CON "SMELLS"
// ===================================================================

console.log("--- Iniciando demo de 'Los que duelen en el mantenimiento' ---");

// Creamos nuestras instancias
const processor = new OrderProcessor();
const customer = new Customer(101, 'Constructora S.A.');
const order = new Order(2025, 45000);

// --- El "Data Clump" en acción ---
// Miren qué feo es llamar al método con todos estos parámetros sueltos.
// Es fácil equivocarse en el orden.
const shippingStreet = 'Av. Siempre Viva 742';
const shippingCity = 'Springfield';
const shippingState = 'Provincia X';
const shippingZipCode = 'B1675';

processor.shipOrder(
  order,
  customer,
  shippingStreet,
  shippingCity,
  shippingState,
  shippingZipCode
);

// Ejemplo con una dirección inválida para ver la "Cirugía de Escopeta"
const invalidZipCode = 'AB';
processor.shipOrder(
  new Order(2026, 1500),
  customer,
  'Otra Calle 123',
  'Otra Ciudad',
  'Provincia Y',
  invalidZipCode
);

console.log("\n--- Fin de la demo ---");
