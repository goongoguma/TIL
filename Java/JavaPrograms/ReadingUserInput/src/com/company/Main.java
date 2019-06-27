package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        // Scanner는 자바의 클래스로서 유저의 입력값을 받는다
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter your year of birth");

        // 다음에 입력된 값이 integer인지 확인한다.
        boolean hasNextInt = scanner.hasNextInt();

        if(hasNextInt) {
            // Scanner는 입력을 문자열로 받지만 nextInt 메소드를 이용해 문자열 -> 숫자 가능
            int yearOfBirth = scanner.nextInt();

            // handle next line character (enter key)
            scanner.nextLine();

            System.out.println("Enter your name: ");
            String name = scanner.nextLine();
            int age = 2019 - yearOfBirth;

            // 입력한 생일의 유효성을 확인
            if(age >= 0 && age <= 100) {
                // name에는 유저가 입력한 값이 들어있다.
                System.out.println("Your name is " + name + ", and you are " + age + " year old.");
            } else {
                System.out.println("Invalid year of birth");
            }
        } else {
            System.out.println("Unable to parse year of birth.");
        }

        // Scanner를 쓰지않는다면 지우는게 좋다
        scanner.close();
    }
}
