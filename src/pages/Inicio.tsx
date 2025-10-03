import NavBar from "../components/layout/NavBar"

type CategoriaSeccion = {
    id: number;
    nombre: string;
    items: { id: number; nombre: string; imagen: string }[];
};

const secciones: CategoriaSeccion[] = [
    {
        id: 1,
        nombre: "Tecnología",
        items: [
            { id: 1, nombre: "Smartwatches", imagen: "./reloj.jpeg" },
            { id: 2, nombre: "Smartphones", imagen: "./celular.jpeg" },
            { id: 3, nombre: "Televisores", imagen: "./televisor.jpeg" },
        ],
    },
    {
        id: 2,
        nombre: "Calzado",
        items: [
            { id: 1, nombre: "Zapatillas", imagen: "./zapatillas.jpeg" },
            { id: 2, nombre: "Botas", imagen: "./botas.jpeg" },
            { id: 3, nombre: "Sandalias", imagen: "./sandalias.jpg" },
        ],
    },
    {
        id: 3,
        nombre: "Accesorios y Moda",
        items: [
            { id: 1, nombre: "Mochilas", imagen: "./mochilas.jpg" },
            { id: 2, nombre: "Bolsos", imagen: "./bolsos.jpg" },
            { id: 3, nombre: "Gafas", imagen: "./gafas.jpg" },
        ],
    },
];

const Inicio = () => {

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <NavBar />

            <section className="relative h-[400px] flex items-center justify-center">
                <img
                    src="./banner.jpg"
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <h1 className="relative text-4xl md:text-6xl font-bold text-white z-10">
                    Bienvenido a nuestra tienda
                </h1>
            </section>



            <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                {secciones.map((sec) => (
                    <section key={sec.id}>
                        <h2 className="text-2xl font-semibold mb-6">{sec.nombre}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {sec.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative h-64 w-full rounded-lg overflow-hidden shadow-md group cursor-pointer flex items-center justify-center bg-white"
                                >
                                    <img
                                        src={item.imagen}
                                        alt={item.nombre}
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-lg font-bold">{item.nombre}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default Inicio