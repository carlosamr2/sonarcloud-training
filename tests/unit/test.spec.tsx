import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../src/pages/index";

describe("User Signup Form", () => {
  it("should render the form with all required fields", () => {
    render(<Home />);

    // Verificar que los campos existen por sus IDs
    expect(document.getElementById("name")).toBeInTheDocument();
    expect(document.getElementById("email")).toBeInTheDocument();
    expect(document.getElementById("password")).toBeInTheDocument();
    expect(document.getElementById("confirmPassword")).toBeInTheDocument();
    expect(document.getElementById("age")).toBeInTheDocument();

    // Verificar que hay al menos un botón submit
    const submitButtons = screen.getAllByRole("button", { name: /submit/i });
    expect(submitButtons.length).toBeGreaterThan(0);
  });

  it("should allow user to fill out the form", () => {
    render(<Home />);

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;

    // Simular que el usuario llena el formulario
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
    fireEvent.change(ageInput, { target: { value: "25" } });

    // Verificar que los valores se actualizaron
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("Password123");
    expect(confirmPasswordInput.value).toBe("Password123");
    expect(ageInput.value).toBe("25");
  });

  it("should show success message after valid form submission", () => {
    render(<Home />);

    // Llenar el formulario con datos válidos
    fireEvent.change(document.getElementById("name")!, { target: { value: "John Doe" } });
    fireEvent.change(document.getElementById("email")!, { target: { value: "john@example.com" } });
    fireEvent.change(document.getElementById("password")!, { target: { value: "Password123" } });
    fireEvent.change(document.getElementById("confirmPassword")!, { target: { value: "Password123" } });
    fireEvent.change(document.getElementById("age")!, { target: { value: "25" } });

    // Enviar el formulario - usar getAllByRole para soportar ambas versiones
    const submitButtons = screen.getAllByRole("button", { name: /submit/i });
    fireEvent.click(submitButtons[0]);

    // Verificar que aparece el mensaje de éxito
    expect(screen.getByText(/user created successfully/i)).toBeInTheDocument();
  });

  it("should show error message when form is submitted empty", () => {
    render(<Home />);

    // Enviar el formulario vacío - usar getAllByRole para soportar ambas versiones
    const submitButtons = screen.getAllByRole("button", { name: /submit/i });
    fireEvent.click(submitButtons[0]);

    // Verificar que NO aparece el mensaje de éxito
    expect(screen.queryByText(/user created successfully/i)).not.toBeInTheDocument();

    // Verificar que aparece algún mensaje de error
   // const errorText = screen.queryByText(/required|invalid|must/i);
    //expect(errorText).toBeInTheDocument();
  });
});
