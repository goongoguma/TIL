package com.company;

public class Main {

    public static void main(String[] args) {
        getDurationString(3945);
    }

    private static String getDurationString (int minutes, long seconds) {
        if (minutes < 0 || (seconds < 0 && seconds > 59)) {
            return "Invalid value";
        }

        int hour = minutes / 60;
        int remainingMinutes = minutes % 60;
        System.out.println("The total is "+hour+"h "+remainingMinutes+"m "+seconds+"s");
        return "This is the time now";
    }

    private  static String getDurationString(long seconds) {
        if (seconds < 0) {
            return "Invalid value";
        }

        int minutes = (int)(seconds / 60);
        long remainingSeconds = seconds % 60;
        return getDurationString(minutes, remainingSeconds);
    }

//    public static double calcFeetAndInchesToCentimeters (double feet, double inches) {
//
//        if ((feet < 0) || (inches < 0) || (inches > 12)) {
//            System.out.println("Invalid feet or inches parameters");
//            return -1;
//        }
//
//        // feet 더하기
//        double centimeters = (feet * 12) * 2.54;
//        // inches 더하기
//        centimeters += inches * 2.54;
//        System.out.println(feet + " feet, " + inches + " inches = " + centimeters + " cm");
//        return centimeters;
//    }
//
//    public static double calcFeetAndInchesToCentimeters (double inches) {
//        if (inches < 0) {
//            return -1;
//        }
//
//        double feet = (int) inches / 12;
//        double remainingInches = (int) inches % 12;
//        System.out.println(inches + " inches is equal to " + feet + " feet and " + remainingInches + " inches");
//        return calcFeetAndInchesToCentimeters(feet, remainingInches);
//    }


}
