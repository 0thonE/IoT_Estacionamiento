# Pruebas IoT_Sprint2

Para estas pruebas evaluaremos la complejidad ciclomática y pondremos casos de pruebas para ellas

## Funcioón: setup

Esta función se encarga de establecer los parametros que requeriremos en nuestro micro.

```c++
void setup() {
  Serial.begin(115200);
  
  SPI.begin();        //Iniciamos el Bus SPI
  mfrc522.PCD_Init(); // Iniciamos  el MFRC522
  
  // Valores de los lotes de estacionamiento
  parking[0].lotNo = 0;
  parking[1].lotNo = 1;
  
  parking[0].isFree = true;
  parking[1].isFree = true;

  // Setup de los pines de lectura de los sensores
  pinMode(Sensor0, INPUT);
  pinMode(Sensor1, INPUT);
  
  // Setup de la conexión a internet y a la nube
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  } 
  Serial.println("");
    
  Serial.print("WiFi connected, IP address: "); 
  Serial.println(WiFi.localIP());

  if (!client.connected()) {
    Serial.print("Reconnecting client to ");
    Serial.println(server);
    while (!client.connect(clientId, authMethod, token)) {
      Serial.print(".");
      delay(500);
    }
    Serial.println("Bluemix connected");
  }
  

}
```

Usando la formmula **V(G) = c + 1** podemos encontrar que la complejidad cilomática de esta función es de: **4**



