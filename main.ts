// main.ts

/**
 * Grove PIR Bewegungssensor Erweiterung
 */
//% color=#8f3fd1 icon="\uf20e" block="PIR Bewegungssensor MG"
//% groups=['Grundfunktionen', 'Erweiterungen']
namespace pirsensor {

    let sensorPin: DigitalPin = DigitalPin.C16

    let letzterStatus = false
    let bewegungsZaehler = 0
    let letzteBewegungZeit = 0

    /**
     * Sensor initialisieren
     */
    //% group="Grundfunktionen"
    //% block="PIR Sensor initialisieren an Pin %pin"
    //% pin.defl=DigitalPin.C16
    export function initialisieren(
        pin: DigitalPin
    ): void {

        sensorPin = pin

        basic.pause(2000)
    }

    /**
     * Bewegung erkannt
     */
    //% group="Grundfunktionen"
    //% block="Bewegung erkannt"
    export function bewegung(): boolean {

        return pins.digitalReadPin(sensorPin) == 1
    }

    /**
     * Keine Bewegung
     */
    //% group="Grundfunktionen"
    //% block="Keine Bewegung"
    export function keineBewegung(): boolean {

        return !bewegung()
    }

    /**
     * Warte bis Bewegung erkannt
     */
    //% group="Erweiterungen"
    //% block="Warte bis Bewegung"
    export function warteBisBewegung(): void {

        while (!bewegung()) {
            basic.pause(50)
        }
    }

    /**
     * Warte bis keine Bewegung mehr erkannt wird
     */
    //% group="Erweiterungen"
    //% block="Warte bis keine Bewegung"
    export function warteBisKeineBewegung(): void {

        while (bewegung()) {
            basic.pause(50)
        }
    }

    /**
     * Bewegungsänderung erkennen
     */
    //% group="Erweiterungen"
    //% block="Wenn Bewegungsstatus geändert"
    export function statusGeaendert(): boolean {

        let aktuell = bewegung()

        if (aktuell != letzterStatus) {

            letzterStatus = aktuell

            if (aktuell) {

                bewegungsZaehler += 1
                letzteBewegungZeit =
                    control.millis()
            }

            return true
        }

        return false
    }

    /**
     * Anzahl Bewegungen
     */
    //% group="Erweiterungen"
    //% block="Anzahl Bewegungen"
    export function anzahlBewegungen(): number {

        return bewegungsZaehler
    }

    /**
     * Bewegungszähler zurücksetzen
     */
    //% group="Erweiterungen"
    //% block="Bewegungszähler zurücksetzen"
    export function resetZaehler(): void {

        bewegungsZaehler = 0
    }

    /**
     * Zeit seit letzter Bewegung
     */
    //% group="Erweiterungen"
    //% block="Zeit seit letzter Bewegung (ms)"
    export function zeitSeitLetzterBewegung(): number {

        return control.millis()
            - letzteBewegungZeit
    }

    /**
     * Prüfen ob lange keine Bewegung
     */
    //% group="Erweiterungen"
    //% block="Keine Bewegung seit %dauer ms"
    export function keineBewegungSeit(
        dauer: number
    ): boolean {

        return zeitSeitLetzterBewegung()
            > dauer
    }

    /**
     * Bewegung innerhalb Timeout
     */
    //% group="Erweiterungen"
    //% block="Warte auf Bewegung innerhalb %timeout ms"
    export function warteAufBewegungTimeout(
        timeout: number
    ): boolean {

        let start = control.millis()

        while (
            control.millis() - start
            < timeout
        ) {

            if (bewegung()) {

                bewegungsZaehler += 1
                letzteBewegungZeit =
                    control.millis()

                return true
            }

            basic.pause(50)
        }

        return false
    }
}
