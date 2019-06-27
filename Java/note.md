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
  ```java
  int pounds = 60;
  double poundsToKilo = pounds * 0.45359237d;
  System.out.println(poundsToKilo); // 27.2155422
  ```

<h2 name="5">5. Getting To Know Primitive Data Types - Char And Boolean</h2>
  
  ```java
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

    ```java
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
 
<h2 name="8">8. Method Overloading</h2>
  
  ```java
  public class Main {

      public static void main(String[] args) {
        int newScore = calculateScore("Jay", 500);
        System.out.println("New score is " + newScore)  ;
        calculateScore(75);
      }

      public static int calculateScore(String playerName, int score) {
        System.out.println("Player " + playerName + " scored " + score + " points");
        return score * 1000;
      }

      public static int calculateScore(int score) {
          System.out.println("Unnamed player scored " + score + " points");
          return score * 1000;
      }

      public static int calculateScore() {
        System.out.println("No player name, no player score.");
        return 0;
      }
  }

  // Player Jay scored 500 points
  // New score is 500000
  // Unnamed player scored 75 points
  // No player name, no player score.

  ```
- When we overloading our method, we need to create unique method signature(method name). 

<h2 name="9">9. Method Overloading Recap</h2>

- Method overloading is a feature that allows us to have more than one method with the same name, so long as we use different parameters.
- It is the ability to create multiple methods of the same name with different implementations. 
- Calls to an overloaded method will run a specific implementation of that method. 
- 화면에 내용을 출력할때 사용하는 println이 좋은예
  ```java
  System.out.println('Hello');
  System.out.println(1);
  System.out.println(57,9);
  ```
- It improves code readability and re-uability
- It is easier to remember one method name instead of remembering multiple names.
- Achieves consistency in naming. One name for methods that are commonly used for example println.
- Overloaded methods give programmers the flexibility to call a similar method with different types of data. 
- Challenege
  - Create a method called getDurationString with two parameters, first parameter minutes and 2nd parameter seconds.
  - You should validate that the first parameter minutes is >=0.
  - You should validate that the 2nd parameter seconds is >=0 and <=59.
  - The method should return "Invalid value" in the method if either of the above are not true.
  - If the parameters are valid then calculate how many hours minutes and secods equal the minutes and seconds passed to this method and return that value as string in format "XXh YYm ZZs" where XX represents a number of hours, YY the minutes and ZZ the seconds.
  - Create a 2nd method of the same name but with only one parameter seconds.
  - Validate that it is >=0, and return "Invalid value" if it is not true.
  - If it is valid, then calculate how many minutes are in the seconds value and then call the other overloaded method passing the correct minutes and seconds calculated so that it can calculate correctly.
  - Call both methods to print values to the console.
  - Tips: 
    - Use int or long for your number data types is probably a good idea.
    - 1 minute = 60 seconds and 1 hour = 60 minutes or 3600 seconds.
    - Methods should be static as we have used previously.
  ```java
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
  ```

<h2 name="10">10. Switch Statement</h2>

- Challenge
  - Create a new switch statement using char instead of int
  - create a new char variable
  - create a switch statment testing for
  - A, B, C, D
  - display a message if any of these are found and then break
  - Add a default which displays a message saying not found
  ```java
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
          System.out.println("The value was A"); // The value was A
          break;
      default:
          System.out.println("None of these are found");
          break;
      }
  }
  ```

<h2 name="11">11. Parsing Values from a String</h2>

  ```java
  public static void main(String[] args) {
    String numberAsString = "2018";
      System.out.println("numberAsString = " + numberAsString);

      // Integer는 primitive 타입의 wrapper 클래스
      // Integer는 parseInt뿐만 아니라 다른 메소드들도 가지고 있다
      // parseInt는 string에서 number로 전환
      int number = Integer.parseInt(numberAsString);
      System.out.println(number); // 2018

      numberAsString += 1; // 20181
      number += 1; // 2019
  }
  ```

<h2 name="12">12. Reading User Input</h2>

  ```java
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
  ```