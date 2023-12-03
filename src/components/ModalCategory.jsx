import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import "sweetalert2/src/sweetalert2.scss";
import { Modal } from "rsuite";
import { useForm } from "react-hook-form";
import {
  categoryAdd,
  categoryList,
  categoryDelete,
  categoryUpdate,
} from "../api/categoriasApi";

const ModalCategory = ({ show, handleClose }) => {
  const [datosCategorias, setDatosCategorias] = useState(null);
  const [overflow, setOverflow] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    mode: "onChange", // Validar al cambiar el formulario
  });

  useEffect(() => {
    traerCategorias();
  }, []);

  const traerCategorias = async () => {
    const { categorias } = await categoryList();
    setDatosCategorias(categorias);
  };

  const newCategory = async (data) => {
    const nombreCategoria = data.nombre.toUpperCase(); // Convertir a mayúsculas
    const categoriaExistente = datosCategorias.find(
      (categoria) => categoria.nombre === nombreCategoria
    );

    if (categoriaExistente) {
      Swal.fire({
        title: "La Categoría ya existe",
        text: "La categoría ingresada existe en la base de datos.",
        icon: "error",
      });
    } else {
      // Categoría no existe, guardar
      await categoryAdd({ nombre: nombreCategoria }); // Guardar en la base de datos
      Swal.fire({
        title: "Categoría guardada con éxito",
        text: "La categoría se ha creado en la base de datos",
        icon: "success",
      });
      traerCategorias()
      reset();
      handleClose();
    }
  };

  const deleteCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Desactivará la categoría",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Desactivar",
      });

      if (result.isConfirmed) {
        // Llamada a la función categoryDelete con el id
        const response = await categoryDelete(id);

        if (response) {
          // Categoría eliminada con éxito
          Swal.fire("Eliminada", "La categoría ha sido eliminada.", "success");
          traerCategorias();
        }
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al eliminar la categoría.", "error");
      traerCategorias();
    }
  };

  const activeCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Activará la categoría",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Activar",
      });

      if (result.isConfirmed) {
        // Llamada a la función categoryDelete con el id
        const response = await categoryUpdate(id, { estado: true });

        if (response) {
          // Categoría eliminada con éxito
          Swal.fire("Activada", "La categoría ha sido activada.", "success");
          traerCategorias();
        } 
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al activar la categoría.", "error");
      traerCategorias();
    }
  };

const [tableVisible, setTableVisible] = useState(false);
const handleToggleTable = () => {
  setTableVisible(!tableVisible);
};

const [formVisible, setFormVisible] = useState(false);
const handleToggleForm = () => {
  setFormVisible(!formVisible);
};

  return (
    <>
      <Modal overflow={overflow} open={show} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="fw-bold text-center">
            Menu de Categorias
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white d-flex container flex-column justify-content-center">
          <div className="text-center mt-3">
            <Button
              variant="outline-secondary"
              onClick={handleToggleForm}
              size="sm"
              className="ms-2"
            >
              {formVisible ? "Ocultar Crear Categoria" : "Crear Categoria"}
            </Button>
          </div>
          {formVisible && (
            <form
              noValidate
              onSubmit={handleSubmit(newCategory)}
              className="bg-light text-dark p-0 m-0 rounded w-100"
            >
              <section className="row">
                <fieldset className="col-12 col-md-12 mb-1">
                  <label htmlFor="nameProduct-input" className="form-label">
                    Nueva categoria
                  </label>
                  <input
                    type="text"
                    id="nameProduct-input"
                    className="form-control"
                    {...register("nombre", {
                      required: "Debe Ingresar una categoria.",
                      minLength: {
                        value: 5,
                        message: "Su Nombre debe tener mas de 5 caracteres.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Su Nombre debe tener maximo 20 caracteres.",
                      },
                    })}
                    required
                    minLength={5}
                    maxLength={20}
                    placeholder="Ingrese la nueva categoria"
                  />
                  <div>
                    <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                      {errors.nombre?.message}
                    </p>
                  </div>
                </fieldset>
              </section>
              <div className="text-center mt-2">
                <Button
                  className="ms-2"
                  type="submit"
                  variant="outline-success"
                  size="sm"
                >
                  Guardar
                </Button>
              </div>
            </form>
          )}
          <div className="text-center mt-3">
            <Button
              variant="outline-primary"
              onClick={handleToggleTable}
              size="sm"
              className="ms-2"
            >
              {tableVisible
                ? "Ocultar Lista de Categorias"
                : "Ver Lista de Categorias"}
            </Button>
          </div>
          <div
            className="mt-2"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {tableVisible && (
              <Table
                responsive
                striped
                bordered
                hover
                variant="white text-center"
              >
                <thead>
                  <tr>
                    <th>Disponible</th>
                    <th>Des/Act</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {datosCategorias?.length > 0 &&
                    datosCategorias.map((categoria) => (
                      <tr key={categoria._id}>
                        <td>
                          {categoria.estado == true ? (
                            <FaCircleCheck className="text-primary" />
                          ) : (
                            <FaCircleXmark className="text-danger" />
                          )}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="danger"
                            className="ms-1"
                            onClick={() => deleteCategory(categoria._id)}
                          >
                            <FaCircleXmark />
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            className="ms-1"
                            onClick={() => activeCategory(categoria._id)}
                          >
                            <FaCircleCheck />
                          </Button>
                        </td>
                        <td>{categoria.nombre}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCategory;
