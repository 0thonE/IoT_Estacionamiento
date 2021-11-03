#include <SPI.h>
#include <MFRC522.h>

#define parkingSize 2
#define LED1 4
#define sensorTH 1500
#define RST_PIN  9   //Pin 9 para el reset del RC522
#define SS_PIN  10   //Pin 10 para el SS (SDA) del RC522

struct PLot{
  int lotNo;        // Número del lote de estacionamiento
  bool isFree;      // Esta ocupado o no
  bool isAssigned;  // Si el lote se ha asignado a un carro
  String carID;     // Placa del carro asignado
};

PLot parking[parkingSize];
int SensorArray[parkingSize] = {2, 3};
MFRC522 mfrc522(SS_PIN, RST_PIN); //Creamos el objeto para el RC522

void setup() {
  Serial.begin(115200);
  SPI.begin();        //Iniciamos el Bus SPI
  mfrc522.PCD_Init(); // Iniciamos  el MFRC522
  Serial.println("Lectura del UID");

  // Valores de los lotes de estacionamiento
  parking[0].lotNo = 0;
  parking[1].lotNo = 1;
  
  parking[0].isFree = true;
  parking[1].isFree = true;

  // Setup de los pines de lectura de los sensores
  pinMode(SensorArray[0], INPUT);
  pinMode(SensorArray[1], INPUT);
  pinMode(LED1, OUTPUT);
}

void loop() {

  readRFID();
  sensorReadLoop();

  delay(1000);
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

void sensorReadLoop(){
  int sensorRead = 0;
  
  for (byte i = 0; i < parkingSize; i++) {
    sensorRead = analogRead(SensorArray[i]);
  
    // Límites de la medición del sensor
    if(sensorRead > sensorTH && parking[i].isFree == true){
      usingLot(i, "ABC-123");
      digitalWrite(LED1, LOW);
    } else if(sensorRead < sensorTH && parking[i].isFree == false){
      freeLot(i);
      digitalWrite(LED1, HIGH);
    }
  } 
}

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
