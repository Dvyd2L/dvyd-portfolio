/**
 * Realiza una solicitud de red y procesa los datos recibidos.
 * @template T - Tipo de datos recibidos.
 * @param {Object} options - Opciones para la solicitud.
 * @param {RequestInfo | URL} options.input - URL o información de solicitud.
 * @param {RequestInit} [options.init] - Opciones adicionales para la solicitud (opcional).
 * @param {(data: T) => void} options.dataHandler - Función que procesa los datos.
 * @param {(error: unknown) => void} options.errorHandler - Función que maneja los errores.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se han manejado los datos.
 */
export const fetchData = async <T>({
  input,
  init,
  dataHandler,
  errorHandler,
}: {
  input: RequestInfo | URL;
  init?: RequestInit;
  dataHandler: (data: T) => void;
  errorHandler: (error: unknown) => void;
}): Promise<void> =>
  await fetch(input, init)
    .then((res) =>
      res.ok
        ? res.json()
        : (() => {
            throw new Error(
              `Error al recuperar los datos: ${res.status} ${res.statusText}`
            );
          })()
    )
    .then((json) => dataHandler(json))
    .catch((err) => errorHandler(err));
