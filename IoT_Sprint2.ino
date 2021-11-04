#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

#define parkingSize 2
#define sensorTH 2100
#define RST_PIN  9   //Pin 9 para el reset del RC522
#define SS_PIN  10   //Pin 10 para el SS (SDA) del RC522
MFRC522 mfrc522(SS_PIN, RST_PIN); //Creamos el objeto para el RC522

struct PLot{
  int lotNo;        // Número del lote de estacionamiento
  bool isFree;      // Esta ocupado o no
  bool isAssigned;  // Si el lote se ha asignado a un carro
  String carID;     // Placa del carro asignado
};

PLot parking[parkingSize];
#define Sensor0 34
#define Sensor1 35
int sensorRead = 0;

/********** Variables para la configuración de la conexión a la nube *************/
const char* ssid = "TP-Link_9BEC";
const char* password = "41874042";
#define ORG "1krrqi" 
#define DEVICE_TYPE "ESP32" 
#define DEVICE_ID "D0BBDEAB6224" 
#define TOKEN "TTda@4QJrCYffo3oW2" 
char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char pubTopic1[] = "iot-2/evt/status0/fmt/json";
char pubTopic2[] = "iot-2/evt/status1/fmt/json";
char authMethod[] = "use-token-auth";
char token[] = TOKEN;
char clientId[] = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;
WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);

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

void loop() {
  client.loop();

  readRFID();
  sensorReadLoop();
  publishStatus();
  
  delay(1000);
}


// Esta función estara detectando si hay una lectura de RFID periodicamente
void readRFID(){
  // Revisamos si hay nuevas tarjetas  presentes
  if ( mfrc522.PICC_IsNewCardPresent()) {  
    //Seleccionamos una tarjeta
    if ( mfrc522.PICC_ReadCardSerial()) {
      // Enviamos serialemente su UID
      Serial.print("Card UID:");
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(mfrc522.uid.uidByte[i], HEX);   
      } 
      Serial.println();
      // Terminamos la lectura de la tarjeta  actual
      mfrc522.PICC_HaltA();         
    }      
  }
}

// Esta función realiza un barrido a los sensores para ver el status
void sensorReadLoop(){
  sensorRead = analogRead(Sensor0);
  Serial.println(sensorRead);
  // Límites de la medición del sensor
  if(sensorRead > sensorTH && parking[0].isFree == true){
    usingLot(0, "ABC-123");
  } else if(sensorRead < sensorTH && parking[0].isFree == false){
    freeLot(0);
  }

  sensorRead = analogRead(Sensor1);
  Serial.println(sensorRead);
  // Límites de la medición del sensor
  if(sensorRead > sensorTH && parking[1].isFree == true){
    usingLot(1, "ABC-123");
  } else if(sensorRead < sensorTH && parking[1].isFree == false){
    freeLot(1);
  }
}

// Función para marcar un lote como ocupado
void usingLot(int lot, String carID){
  parking[lot].isFree = false;
  parking[lot].carID = carID;
  Serial.println("El auto con placas: " + carID + " ha tomado el lote No: " + lot);
}

// Función para marcar un lote como libre
void freeLot(int lot){
  parking[lot].isFree = true;
  parking[lot].carID = "";
  Serial.println("Se ha liberado el lote " + lot);
}

// Función para enviar el estado de los estacionamientos a la nube
void publishStatus(){
  String payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot0\":";
         payload += parking[0].isFree;
         payload += "}}";

  if (client.publish(pubTopic1, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
  String payload1 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload1 += ",\"lot1\":";
         payload1 += parking[1].isFree;
         payload1 += "}}";
       
  if (client.publish(pubTopic2, (char*) payload1.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
}
