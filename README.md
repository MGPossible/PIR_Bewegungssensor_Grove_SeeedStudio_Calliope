# Grove PIR Bewegungssensor Erweiterung für den Calliope mini

Diese Erweiterung ermöglicht die einfache Nutzung eines Grove PIR Bewegungssensors mit dem Calliope mini im MakeCode Editor.

Mit dieser Erweiterung können Bewegungen erkannt, Bewegungsänderungen überwacht und Zeiträume ohne Bewegung gemessen werden.

---

# Funktionen

Diese Erweiterung bietet:

* PIR Sensor initialisieren
* Bewegung erkennen
* Keine Bewegung erkennen
* Auf Bewegung warten
* Auf Ende einer Bewegung warten
* Bewegungsänderungen erkennen
* Bewegungen zählen
* Zeit seit letzter Bewegung messen
* Timeout-Funktionen
* Erkennung langer Inaktivität

---

# Unterstützte Hardware

Benötigte Komponenten:

* Calliope mini
* Grove PIR Motion Sensor
* Grove Shield oder Grove Adapter
* Verbindungskabel

---

# Anschluss

Standardanschluss:

| PIR Sensor | Calliope mini |
| ---------- | ------------- |
| Signal     | C16           |
| VCC        | 3V            |
| GND        | GND           |

Standardmäßig wird Pin **C16** verwendet.

---

# Installation

## Erweiterung hinzufügen

1. MakeCode öffnen
2. Neues Projekt erstellen
3. Zahnrad → **Erweiterungen**
4. Repository-URL einfügen

```text
https://github.com/MGPossible/Grove_PIR_Calliope
```

5. Erweiterung hinzufügen

---

# Hinweise zum PIR Sensor

PIR-Sensoren benötigen nach dem Einschalten eine kurze Stabilisierung.

Deshalb wartet die Erweiterung nach dem Initialisieren automatisch:

```text
ca. 2 Sekunden
```

Während dieser Zeit können ungenaue Werte auftreten.

---

# Grundfunktionen

## Sensor initialisieren

Legt fest, an welchem Pin der Sensor angeschlossen ist.

```typescript
pirsensor.initialisieren(
    DigitalPin.C16
)
```

---

## Bewegung erkennen

Liefert:

* wahr → Bewegung erkannt
* falsch → keine Bewegung

```typescript
if (
    pirsensor.bewegung()
) {

}
```

---

## Keine Bewegung erkennen

```typescript
if (
    pirsensor.keineBewegung()
) {

}
```

---

# Erweiterte Funktionen

## Warten bis Bewegung erkannt wird

```typescript
pirsensor.warteBisBewegung()
```

Das Programm pausiert bis Bewegung erkannt wird.

---

## Warten bis keine Bewegung mehr erkannt wird

```typescript
pirsensor.warteBisKeineBewegung()
```

---

## Bewegungsstatus geändert

Diese Funktion reagiert nur auf Änderungen.

```typescript
if (
    pirsensor.statusGeaendert()
) {

}
```

Typischer Einsatz:

* Trigger nur einmal auslösen
* Dauertrigger vermeiden

---

## Bewegungen zählen

```typescript
let anzahl =
pirsensor.anzahlBewegungen()
```

Zurücksetzen:

```typescript
pirsensor.resetZaehler()
```

---

## Zeit seit letzter Bewegung

```typescript
let zeit =
pirsensor.zeitSeitLetzterBewegung()
```

Ergebnis:

```text
Millisekunden
```

---

## Prüfen ob lange keine Bewegung erkannt wurde

```typescript
if (
    pirsensor.keineBewegungSeit(
        30000
    )
) {

}
```

Beispiel:

```text
30000 ms = 30 Sekunden
```

---

## Bewegung mit Timeout

```typescript
let erkannt =
pirsensor.warteAufBewegungTimeout(
    10000
)
```

Ergebnis:

* wahr → Bewegung erkannt
* falsch → Timeout erreicht

---

# Beispielprojekt 1: Bewegungsmelder

```typescript
pirsensor.initialisieren(
    DigitalPin.C16
)

basic.forever(function () {

    if (
        pirsensor.bewegung()
    ) {

        basic.showIcon(
            IconNames.Yes
        )

    } else {

        basic.showIcon(
            IconNames.No
        )
    }

    basic.pause(100)
})
```

---

# Beispielprojekt 2: Alarmanlage

```typescript
basic.forever(function () {

    if (
        pirsensor.statusGeaendert()
        &&
        pirsensor.bewegung()
    ) {

        music.playTone(
            880,
            500
        )
    }
})
```

---

# Typische Probleme

## Sensor reagiert nicht

Prüfen:

* richtiger Pin gewählt
* Stromversorgung vorhanden
* Sensor korrekt angeschlossen

---

## Falsche Trigger

Mögliche Ursachen:

* Aufwärmphase noch nicht beendet
* Wärmequellen im Raum
* Direkte Sonneneinstrahlung
* Bewegende Luft

---

## Dauerhaft Bewegung erkannt

Prüfen:

* Empfindlichkeit reduzieren
* Abstand erhöhen
* Sensor neu starten

---

# Hinweise

PIR Sensoren erkennen Temperaturänderungen.

Deshalb reagieren sie besonders gut auf:

* Menschen
* Tiere
* Wärmequellen in Bewegung

Nicht geeignet für:

* Glasdurchgänge
* sehr langsame Bewegungen
* exakte Distanzmessungen

---

# Lizenz

MIT License
