// Clase Libro
class Libro {
    constructor(id, titulo, autor) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.disponible = true; // Por defecto, el libro está disponible
    }

    prestar() {
        if (this.disponible) {
            this.disponible = false;
            return true;
        }
        return false;
    }

    devolver() {
        this.disponible = true;
    }

    info() {
        return `${this.titulo} - ${this.autor} (${this.disponible ? "Disponible" : "Prestado"})`;
    }
}

// Clase Usuario
class Usuario {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.librosPrestados = [];
    }

    tomarPrestado(libro) {
        if (libro.prestar()) {
            this.librosPrestados.push(libro);
            console.log(`${this.nombre} tomó prestado: ${libro.titulo}`);
        } else {
            console.log(`El libro "${libro.titulo}" no está disponible.`);
        }
    }

    devolverLibro(libro) {
        let index = this.librosPrestados.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.librosPrestados.splice(index, 1);
            console.log(`${this.nombre} devolvió: ${libro.titulo}`);
        }
    }

    info() {
        return `${this.nombre} (${this.librosPrestados.length} libros prestados)`;
    }
}

// Clase Biblioteca
class Biblioteca {
    constructor() {
        this.libros = [];
        this.usuarios = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    eliminarLibro(id) {
        this.libros = this.libros.filter(libro => libro.id !== id);
    }

    registrarUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    mostrarLibrosDisponibles() {
        console.log("Libros disponibles:");
        this.libros.forEach(libro => {
            if (libro.disponible) console.log(libro.info());
        });
    }
}

// -------------------- Pruebas --------------------

// Crear biblioteca
const biblioteca = new Biblioteca();

// Agregar libros
const libro1 = new Libro(1, "El Principito", "Antoine de Saint-Exupéry");
const libro2 = new Libro(2, "Cien Años de Soledad", "Gabriel García Márquez");
biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);

// Registrar usuarios
const usuario1 = new Usuario(1, "Juan Pérez");
biblioteca.registrarUsuario(usuario1);

// Mostrar libros disponibles
biblioteca.mostrarLibrosDisponibles();

// Usuario toma un libro prestado
usuario1.tomarPrestado(libro1);

// Mostrar libros después del préstamo
biblioteca.mostrarLibrosDisponibles();

// Usuario devuelve el libro
usuario1.devolverLibro(libro1);

// Mostrar libros después de la devolución
biblioteca.mostrarLibrosDisponibles();
