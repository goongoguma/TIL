package com.company;

public class Main {

    public static void main(String[] args) {
	    String numberAsString = "2018";
        System.out.println("numberAsString = " + numberAsString);

        int number = Integer.parseInt(numberAsString);
        System.out.println(number);

        numberAsString += 1; // 20181
        number += 1; // 2019
    }
}
