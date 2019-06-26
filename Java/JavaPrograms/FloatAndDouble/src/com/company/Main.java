package com.company;

public class Main {

    public static void main(String[] args) {
	    int myIntValue = 5 / 2;
	    float myFloatValue = 5f / 3f;
	    double myDoubleValue = 5d / 3d;
        System.out.println("my int value: " + myIntValue);
        System.out.println("my float value: " + myFloatValue);
        System.out.println("my double value: " + myDoubleValue);

//        - Challenge : Convert a given number of pounds to kilograms
//        1. Create a variable to store the number of pounds
//        2. Calculate the number of Kilograms for the number above and store in a variable.
//        3. Print out the result.
//        Note: 1 pound is equal to 0.45359237 kilograms.

        int pounds = 60;

        double poundsToKilo = pounds * 0.45359237d;

        System.out.println(poundsToKilo);

    }
}
