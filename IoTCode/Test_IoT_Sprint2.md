# Pruebas IoT_Sprint2

Para estas pruebas evaluaremos la complejidad ciclomática y pondremos casos de pruebas para ellas

## Función: **setup**

Esta función se encarga de establecer los parametros que requeriremos en nuestro micro.

<img src="https://user-images.githubusercontent.com/48103674/140690753-0383db54-b617-4f90-991e-36a82c1a69a9.png" alt="setup function" width="600">

Usando la formmula **V(G) = c + 1** podemos encontrar que la complejidad cilomática de esta función es de: **4**

### Pruebas a realizar: 

<table>
    <tr>
        <th>Linea</th>
        <th>Prueba</th>
        <th>Valores</th>
        <th>Resultado</th>
    </tr>
    <tr>
        <td>20</td>
        <td>Espera WiFi a estar conectado</td>
        <td>Sin conexión (WL_CONNECT_FAILED | otros) / Con conexión (WL_CONNECTED</td>
        <td>Repetir ciclo / continuar</td>
    </tr>
    <tr>
        <td>29</td>
        <td>Cliente conectado?</td>
        <td>Sin conexión (false)/ Con conexión (true)</td>
        <td>Intenta conectar / Continuar</td>
    </tr>
    <tr>
        <td>32</td>
        <td>El cliente pudo conectarse?</td>
        <td>Conectado (true) / Sin conectar (false)</td>
        <td>Continuar / Esperar y volver a intentar</td>
    </tr>
</table>