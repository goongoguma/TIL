package com.company;

import jdk.swing.interop.SwingInterOpUtils;

public class Main {

    public static void main(String[] args) {

    // 1. Create a byte variable and set it to any valid byte number.
        byte myByteVariable = 100;
    // 2. Create a short variable and set it to any valid short number.
        short myShortVariable = 3000;
     // 3. Create a int variable and set it to any valid int number.
        int myIntVariable = 2000000000;
     // 4. Create a variable of type long and make it equal to 50000 + 10 times the sum of the byte, plus the short plus the int.
        long longTotal = 5000L + 10L +  (myByteVariable + myShortVariable + myIntVariable);
        System.out.println(longTotal); // 2000008110

    }
}
