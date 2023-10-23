class Pila {
  constructor() {
    this.items = [];
  }

  // Agregar un elemento a la pila
  push(elemento) {
    this.items.push(elemento);
  }

  // Eliminar y devolver el elemento superior de la pila
  pop() {
    if (this.isEmpty()) {
      return "La pila está vacía";
    }
    return this.items.pop();
  }

  // Ver el elemento superior de la pila sin eliminarlo
  peek() {
    if (this.isEmpty()) {
      return "La pila está vacía";
    }
    return this.items[this.items.length - 1];
  }

  // Verificar si la pila está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener el tamaño de la pila
  size() {
    return this.items.length;
  }

  // Vaciar la pila
  clear() {
    this.items = [];
  }
}

// Ejemplo de uso
const miPila = new Pila();

miPila.push(1);
miPila.push(2);
miPila.push(3);

console.log("Elemento superior:", miPila.peek()); // Output: 3

console.log("Eliminando elemento superior:", miPila.pop()); // Output: 3

console.log("Tamaño de la pila:", miPila.size()); // Output: 2

miPila.clear();
console.log("La pila está vacía:", miPila.isEmpty()); // Output: true
