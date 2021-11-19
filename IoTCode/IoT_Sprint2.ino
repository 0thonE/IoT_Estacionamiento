//Libraries
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

//Constants
#define SS_PIN 5
#define RST_PIN 0
#define parkingSize 5
#define sensorTH 2100

MFRC522 rfid = MFRC522(SS_PIN, RST_PIN);
byte rfid_token[4];
String tokenPub;

struct PLot{
  int lotNo;        // Número del lote de estacionamiento
  bool isFree;      // Esta ocupado o no
  String carID;     // Placa del carro asignado
};

PLot parking[parkingSize];
int sensorArray[parkingSize] = {36, 39, 34, 35, 32};
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
  
  SPI.begin();
  rfid.PCD_Init();
  setupLots();
  
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
  sensorReadLoop();
  readRFID();
  
  delay(1000);
}


// Esta función estara detectando si hay una lectura de RFID periodicamente
void readRFID(){
  // Revisamos si hay nuevas tarjetas  presentes
  if ( rfid.PICC_IsNewCardPresent()) {  
    //Seleccionamos una tarjeta
    if ( rfid.PICC_ReadCardSerial()) {
      // Enviamos serialemente su UID
      Serial.print("Card UID:");
      for (byte i = 0; i < rfid.uid.size; i++) {
        Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(rfid.uid.uidByte[i], HEX);
        rfid_token[i] = rfid.uid.uidByte[i];
      }
      Serial.println();
      publishStatusRFID();
      // Terminamos la lectura de la tarjeta  actual
      rfid.PICC_HaltA();         
    }      
  }
}

// Función para enviar el estado de los estacionamientos a la nube
void publishStatusRFID(){
  String payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"rfid0\":";
         payload += rfid_token[0];
         payload += "}}";

  if (client.publish(pubTopic1, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"rfid1\":";
         payload += rfid_token[1];
         payload += "}}";

  if (client.publish(pubTopic1, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"rfid2\":";
         payload += rfid_token[2];
         payload += "}}";

  if (client.publish(pubTopic1, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"rfid3\":";
         payload += rfid_token[3];
         payload += "}}";

  if (client.publish(pubTopic1, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
}

void setupLots(){
  for(int i = 0; i < parkingSize; i++){
    parking[i].lotNo = i;
    parking[i].isFree = true;
  }
}

// Esta función realiza un barrido a los sensores para ver el status
void sensorReadLoop(){
  for(int i = 0; i < parkingSize; i++){
    sensorRead = analogRead(sensorArray[i]);
    Serial.println("Lote " + String(i, DEC) + ": " + sensorRead);
    // Límites de la medición del sensor
    if(sensorRead > sensorTH && parking[i].isFree == true){
      usingLot(i, tokenPub);
    } else if(sensorRead < sensorTH && parking[i].isFree == false){
      freeLot(i);
    }
  }
}

// Función para marcar un lote como ocupado
void usingLot(int lot, String carID){
  parking[lot].isFree = false;
  parking[lot].carID = carID;
  Serial.println("El auto con placas: " + carID + " ha tomado el lote No: " + lot);
  publishStatusLots();
}

// Función para marcar un lote como libre
void freeLot(int lot){
  parking[lot].isFree = true;
  parking[lot].carID = "";
  Serial.println("Se ha liberado el lote " + lot);
  publishStatusLots();
}

// Función para enviar el estado de los estacionamientos a la nube
void publishStatusLots(){
  String payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot0\":";
         payload += parking[0].isFree;
         payload += "}}";

  if (client.publish(pubTopic2, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot1\":";
         payload += parking[1].isFree;
         payload += "}}";

  if (client.publish(pubTopic2, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot2\":";
         payload += parking[2].isFree;
         payload += "}}";

  if (client.publish(pubTopic2, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot3\":";
         payload += parking[3].isFree;
         payload += "}}";

  if (client.publish(pubTopic2, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

         payload = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";
         payload += ",\"lot4\":";
         payload += parking[4].isFree;
         payload += "}}";

  if (client.publish(pubTopic2, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
}
