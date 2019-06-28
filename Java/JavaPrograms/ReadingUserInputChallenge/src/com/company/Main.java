package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int count = 1;
        int sum = 0;
        while(count <= 10) {
            System.out.println("Enter number #" + count + ":");
            boolean hasNextInt = scanner.hasNextInt();
            if (hasNextInt) {
                int sequenceNumber = scanner.nextInt();
                count++;
                sum += sequenceNumber;
            } else {
                System.out.println("Invalid Input");
            }
            scanner.nextLine();
        }
        System.out.println("The sum of input numbers is " + sum);
        scanner.close();
    }
}
