# Pruebas IoT_Sprint2

Para estas pruebas evaluaremos la complejidad ciclomática y pondremos casos de pruebas para ellas

## Función: **setup**

Esta función se encarga de establecer los parametros que requeriremos en nuestro micro.

<img src="https://user-images.githubusercontent.com/48103674/140690753-0383db54-b617-4f90-991e-36a82c1a69a9.png" alt="setup function" width="550">

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


## Función: **readRFID**

Esta función se encarga de leer la tarjeta rfid en caso de que se detecte una ante el sensor.

<img src="https://user-images.githubusercontent.com/48103674/141025443-f2b29e3a-a64e-4ace-8610-3d40d7be5f47.png" alt="setup function" width="550">


Usando la formmula **V(G) = c + 1** podemos encontrar que la complejidad cilomática de esta función es de: **3**

### Pruebas a realizar: 

<table>
    <tr>
        <th>Linea</th>
        <th>Prueba</th>
        <th>Valores</th>
        <th>Resultado</th>
    </tr>
    <tr>
        <td>3</td>
        <td>Revisa si hay nuevas tarjetas presentes</td>
        <td>Nueva tarjeta (true) / Sin tarjeta (false)</td>
        <td>Verificar Serial / Continuar (nada)</td>
    </tr>
    <tr>
        <td>5</td>
        <td>El Serial de la tarjeta es legible?</td>
        <td>Legible (true)/ Ilegible (true)</td>
        <td>Leer tarjeta / Continuar (nada)</td>
    </tr>
</table>


## Función: **sensorReadLoop**

Esta función se encarga de verificar si existe un cambio en el estado de los sensores como puede ser el caso de que se ocupe un espacio o se libere

<img src="https://user-images.githubusercontent.com/48103674/141025388-a8e9b00f-33c6-4ffe-9204-fef0529bea84.png" alt="setup function" width="550">

Usando la formmula **V(G) = c + 1** podemos encontrar que la complejidad cilomática de esta función es de: **9**

### Pruebas a realizar: 

<table>
    <tr>
        <th>Linea</th>
        <th>Prueba</th>
        <th>Valores</th>
        <th>Resultado</th>
    </tr>
    <tr>
        <td>6_1</td>
        <td>El sensor a leer es mayor al TH</td>
        <td>Mayor (true) / Menor (false)</td>
        <td>Siguiente condición / Evaluar else</td>
    </tr>
    <tr>
        <td>6_2</td>
        <td>El espacio de estacionamiento esta marcado libre</td>
        <td>Libre (true) / Ocupado (false)</td>
        <td>Marcar espacio como ocupado / Evaluar else</td>
    </tr>
    <tr>
        <td>8_1</td>
        <td>El sensor a leer es menor al TH</td>
        <td>Menor (true) / Mayor (false)</td>
        <td>Siguiente condición / Continuar (nada)</td>
    </tr>
    <tr>
        <td>8_2</td>
        <td>El espacio de estacionamiento esta marcado ocupado</td>
        <td>Ocupado (true) / Libre (false)</td>
        <td>Marcar espacio como libre / Continuar (nada)</td>
    </tr>
    <tr>
        <td>15_1</td>
        <td>El sensor a leer es mayor al TH</td>
        <td>Mayor (true) / Menor (false)</td>
        <td>Siguiente condición / Evaluar else</td>
    </tr>
    <tr>
        <td>15_2</td>
        <td>El espacio de estacionamiento esta marcado libre</td>
        <td>Libre (true) / Ocupado (false)</td>
        <td>Marcar espacio como ocupado / Evaluar else</td>
    </tr>
    <tr>
        <td>17_1</td>
        <td>El sensor a leer es menor al TH</td>
        <td>Menor (true) / Mayor (false)</td>
        <td>Siguiente condición / Continuar (nada)</td>
    </tr>
    <tr>
        <td>17_2</td>
        <td>El espacio de estacionamiento esta marcado ocupado</td>
        <td>Ocupado (true) / Libre (false)</td>
        <td>Marcar espacio como libre / Continuar (nada)</td>
    </tr>
    <tr>
        <td>otros</td>
        <td>Espacio ocupado y sensor marca menos que el TH</td>
        <td>Menor a 2100 / Mayor a 2100</td>
        <td>Se requiere recalibrar / Bien calibrado</td>
    </tr>
    <tr>
        <td>otros</td>
        <td>Espacio libre y sensor marca mas que el TH</td>
        <td>Mayor a 2100 / Menor a 2100</td>
        <td>Se requiere recalibrar / Bien calibrado</td>
    </tr>
</table>


## Función: **publishStatus**

Esta función se encarga de enviar el estado de los estacionamientos a la nube en caso de cambios

<img src="https://user-images.githubusercontent.com/48103674/141025548-49224bf4-9894-49ba-ac99-c920f44b2602.png" alt="setup function" width="550">


Usando la formmula **V(G) = c + 1** podemos encontrar que la complejidad cilomática de esta función es de: **3**

### Pruebas a realizar: 

<table>
    <tr>
        <th>Linea</th>
        <th>Prueba</th>
        <th>Valores</th>
        <th>Resultado</th>
    </tr>
    <tr>
        <td>8</td>
        <td>La publicación a la nube fue exitosa</td>
        <td>Exito (true) / Fallo (false)</td>
        <td>Log ok / Log error</td>
    </tr>
    <tr>
        <td>18</td>
        <td>La publicación a la nube fue exitosa</td>
        <td>Exito (true) / Fallo (false)</td>
        <td>Log ok / Log error</td>
    </tr>
</table>


**Nota:**
**El resto de funciones/código tienen una complejidad ciclomática de 1 por lo que solo se les aplicara la prueba de corrida**
