import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ArticulosTable from "../components/articulos/ArticulosTable";

// 🔹 Mockea dependencias externas
vi.mock("../hooks/useFetchData", () => ({
    useFetchData: () => ({
        data: [
            {
                idArticulo: 1,
                nombre: "Zapatillas Nike",
                codigo: "NK123",
                precioVenta: 250.0,
                categoria: "Calzado",
                genero: { nombre: "Hombre" },
                estado: true,
            },
        ],
        loading: false,
        error: null,
    }),
}));

// 🔹 Mockea Modal y ArticuloForm para no renderizar todo
vi.mock("../common/Modal", () => ({
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="modal">Modal abierto</div> : null,
}));


describe("ArticulosTable", () => {

    test("debería abrir el modal al hacer clic en el botón de editar", async () => {
        render(<ArticulosTable />);
        const editButtons = await screen.findAllByRole("button");
        expect(editButtons.length).toBeGreaterThan(0);

        // Simula clic
        fireEvent.click(editButtons[0]);

        // Espera que se abra el modal
        await waitFor(() => {
            expect(screen.getByText(/Editar Articulo/i)).toBeInTheDocument();
        });

    });
    test("debería renderizar el modal solo una vez al hacer clic en editar", () => {
        render(<ArticulosTable/>);

        // Buscar el icono de editar del primer artículo
        const editButton = screen.getByTestId("edit-1");

        // Antes de hacer clic no hay modal
        expect(screen.queryByTestId("modal")).toBeNull();

        // Clic en el botón de editar
        fireEvent.click(editButton);

        // Debería aparecer un modal
        const modal = screen.getByTestId("modal");
        expect(modal).toBeInTheDocument();

        // Asegurar que solo haya un modal
        const allModals = screen.getAllByTestId("modal");
        expect(allModals).toHaveLength(1);

        // Clic otra vez para abrir el mismo modal
        fireEvent.click(editButton);

        // Verificar que no se haya duplicado el modal
        const modalsAfterSecondClick = screen.getAllByTestId("modal");
        expect(modalsAfterSecondClick).toHaveLength(1);
    });
});
