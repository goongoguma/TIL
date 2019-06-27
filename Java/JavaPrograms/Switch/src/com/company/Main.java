package com.company;

public class Main {

    public static void main(String[] args) {

    char character = 'A';

    switch(character) {
        case 'B':
            System.out.println("The value was B");
            break;
        case 'C':
            System.out.println("The value was C");
            break;
        case 'D':
            System.out.println("The value was D");
            break;
        case 'F':
            System.out.println("The value was F");
            break;
        case 'A':
            System.out.println("The value was A");
             break;
        default:
            System.out.println("None of these are found");
            break;
        }
    }
}
