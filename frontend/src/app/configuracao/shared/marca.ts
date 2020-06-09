
import { Component } from '@angular/core';

export enum Marca{
    FIAT= 'Fiat',
    CHEVROLET= 'Chevrolet',
    TOYOTA= 'Toyota',
    VOLKSWAGEN = 'Volkswagen',
    RENAULT = 'Renault',
    FORD = 'Ford',
    PEUGEOT = 'Peugeot',
    HONDA = 'Honda',
    YAMAHA = 'Yamaha',
    OUTRO = 'Outro' 
}
export const marcas: Marca[] = [
    Marca.CHEVROLET, Marca.FIAT, Marca.FORD, Marca.HONDA, Marca.OUTRO,
    Marca.PEUGEOT, Marca.RENAULT, Marca.TOYOTA, Marca.VOLKSWAGEN, Marca.YAMAHA
];
