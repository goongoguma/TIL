<h2 name="1">1. Creating Your first Java Program</h2>
  ```java
  public class Hello {

      // 자바를 시작하기 위한 entry 포인트
      public static void main(String[] args) {
          // 약자로 sout를 치면 intellij가 자동완성 해준다 
          System.out.println("Hello World!"); // Hello World!
      }
  }
  ```

<h2 name="2">2. What are variables?</h2>
  ```java
  public class Hello {

      public static void main(String[] args) {
          int myFirstNumber = 10 + 5;
          System.out.println(myFirstNumber); // 15
      }
  }
  ```

<h2 name="3">3. Getting To Know Primitive Data Types - The Byte, Short, Int And Long</h2>
  ```java
  package com.company;

  public class Main {

      public static void main(String[] args) {
        // long의 범위
        // long has a width of 64
        long myLongMinValue = -9223372036854775808L;
        long myLongMaxValue = 9223372036854775807L;

        // integer의 범위 
        // int has a width of 32
        int myIntMinValue = -2147483648;
        int myIntMaxValue = 2147483647;

        // short의 범위
        // short has a width of 16
        short myShortMinValue = -32768;
        short myShortMaxValue = 32767;

        // byte의 범위
        // byte has a width of 8
        byte myByteMinVlaue = -128;
        byte myByteMaxValue = 127;
      }
  }
  ```
- 보통 숫자를 다룰경우 int를 많이 사용하며 int 사용을 추천
- 캐스팅 (casting)
  ```java
  byte myByteMinVlaue = -128;
  byte myByteMaxValue = (myByteMinVlaue / 2); 
  // 에러가 뜬다
  // myByteMinValue를 2로 나누면 byte가 아닌 int가 되기때문
  // 이럴경우 캐스팅을 사용한다

  // myByteMinVlaue / 2를 바이트로 다루라는 의미 
  byte myByteMaxValue = (byte)(myByteMinVlaue / 2);  // -64
  ```
- Challenge
1. Create a byte variable and set it to any valid byte number.
2. Create a short variable and set it to any valid short number.
3. Create a int variable and set it to any valid int number.
4. Create a variable of type long and make it equal to 50000 + 10 times the sum of the byte, plus the short plus the int 
  ```java
  // 1. Create a byte variable and set it to any valid byte number.
  byte myByteVariable = 100;
  // 2. Create a short variable and set it to any valid short number.
  short myShortVariable = 3000;
  // 3. Create a int variable and set it to any valid int number.
  int myIntVariable = 2000000000;
  // 4. Create a variable of type long and make it equal to 50000 + 10 times the sum of the byte, plus the short plus the int.
  long longTotal = 5000L + 10L +  (myByteVariable + myShortVariable + myIntVariable);
  System.out.println(longTotal); // 2000008110
  ```

<h2 name="4">4. Getting To Know Primitive Data Types - Float And Double</h2>

- 소수점 다루기 
  ```java
  public static void main(String[] args) {
    // width of int = 32 (4 bytes)
    int myIntValue = 5 / 2;;
    // width of float = 32 (4 bytes)
    // float는 f로 표시
    float myFloatValue = 5f / 2f;
    // width of double = 64 (8 bytes)
    // double은 d
    double myDoubleValue = 5d / 2d;

    System.out.println("my int value: " + myIntValue); // my int value: 2
    System.out.println("my float value: " + myFloatValue); // my float value: 1.6666666
    System.out.println("my double value: " + myDoubleValue); // my double value: 1.6666666666666667
  }
  ```
- double이 float보다 크지만 double을 쓰는것을 추천
  - 현재 컴퓨터의 double 속도는 빠르다.
  - 자바 안에있는 계산 메소드들은 double을 사용한다.
  - double이 float보다 정확하다. 
- Challenge : Convert a given number of pounds to kilograms
1. Create a variable to store the number of pounds
2. Calculate the number of Kilograms for the number above and store in a variable.
3. Print out the result.
Note: 1 pound is equalt to 0.45359237 kilograms.
  ```c
  int pounds = 60;
  double poundsToKilo = pounds * 0.45359237d;
  System.out.println(poundsToKilo); // 27.2155422
  ```

<h2 name="5">5. Getting To Know Primitive Data Types - Char And Boolean</h2>
  ```c
  public static void main(String[] args) {
      // char에는 딱 하나의 알파벳이나 유니코드 캐릭터만
    char myChar = 't';

    boolean myBoolean = false;
    boolean isMale = true;
  }
  ```
- Challenge
1. Find the code for the registered symbol on the same line as the copyright symbol.
2. Create a variable of type char and assign it the unicode value for that symbol.
3. Display in on screen.
  ```java
  char myUniCode = '\u00AE';
  System.out.println(myUniCode);
  ```

<h2 name="6">6. Understanding Strings And Finishing Up Primitive Data Types</h2>
  ```java
  public static void main(String[] args) {
    String myString = "This is a string";
      System.out.println("myString is equal to " + myString); // myString is equal to This is a string
  }
  ```

<h2 name="7">7. More On Methods And A Challenge</h2>

- Challenge
  - Create a method called displayHighScorePosition
  - it should a players name as a parameter and a 2nd parameter as a position in the high score table.
  - You should display the players name along with a message like " managed to get into position " and the position they got and a further message " on the high score table ".

  - Create a 2nd method called calculateHighScorePosition.
  - It should be sent one argument only, the player score
  - it should return an int
  - the return data should be
  1. if the score is >= 1000
  2. if the score is >= 500 and < 1000
  3. if the score is >= 100 and < 500
  4. in all other cases
  - call both methods and display the results of the following
  - a score of 1500, 900, 400 and 50

    ```c
    public static void main(String[] args) {
      int position = calculateHighScorePosition(1000);
      displayHighScorePosition("Jae", position);
      position = calculateHighScorePosition(900);
      displayHighScorePosition("Jane", position);
      position = calculateHighScorePosition(400);
      displayHighScorePosition("Jim", position);
      position = calculateHighScorePosition(50);
      displayHighScorePosition("Marek", position);
    }

    public static void displayHighScorePosition(String name, int position) {
      System.out.println(name + " managed to get into position and positioned " + position + " on the high score table.");
    }

    public static int calculateHighScorePosition(int score) {
      if (score >= 1000) {
          return 1;
      } else if (score >= 500) {
          return 2;
      } else if (score >= 100) {
          return 3;
      } 
      return 4;
    }

    // Jae managed to get into position and positioned 1 on the high score table.
    // Jane managed to get into position and positioned 2 on the high score table.
    // Jim managed to get into position and positioned 3 on the high score table.
    // Marek managed to get into position and positioned 4 on the high score table.
    ```
 