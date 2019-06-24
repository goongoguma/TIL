## Index
- [1. C# vs .NET](#1)
- [2. CLR?](#2)
- [3. .NET의 구조](#3)
- [4. 변수와 상수](#4)
- [5. 오버플로우](#5)
- [6. 스코프](#6)
- [7. 변수와 상수 실습 & 포맷 스트링](#7)
- [8. 타입 변환](#8)
- [9. 연산자](#9)
- [10. 연산자 실습](#10)
- [11. 클래스](#11)
- [12. 클래스 실습](#12)
- [13. 구조체](#13)
- [14. 배열](#14)
- [15. 배열 실습](#15)
- [16. 문자열](#16)
- [17. 문자열 실습](#17)
- [18. Enums](#18)
- [19. Enums 실습](#19)
- [20. 참조타입 vs 값타입](#20)
- [21. 참조타입 vs 값타입 실습 1](#21)
- [22. 참조타입 vs 값타입 실습 2](#22)
- [23. 랜덤 클래스](#23)
- [24. 배열](#24)
- [25. 배열 실습](#25)
- [26. 리스트](#26)
- [27. 리스트 실습](#27)
- [28. 날짜 및 시간](#28)
- [29. 시간 간격](#29)
- [30. 문자열](#30)
- [31. 문자열 실습](#31)
- [32. 텍스트 길이 줄이기 실습](#32)
- [33. 스트링빌더](#33)
- [34. 스트링빌더 실습](#34)


<h2 name="1">1. C# vs .NET</h2>

- C# vs .NET?
  - C# is a programming language
  - .NET is a framework for building applications on Windows
- .NET?
  - CLR (Common Language Runtime)
  - Class Library

<h2 name="2">2. What is CLR?</h2>.

- 기존의 C언어 (C/C++)는 윈도우 환경에서만 작동됨 
- 그래서 C#에서는 C# 언어를 컴파일 할 때 컴퓨터의 환경에 영향을 받지 않는 IL Code (Intermediate Language)로 만든 뒤 Native Code로 변환을 시키는데 이 역할을 CLR이 한다.
- 즉, CLR은 메모리에서 IL 코드를 컴퓨터가 읽기 가능한 코드로 해석해주는 역할을 한다. 그리고 이 과정을 JIT(Just-in-time-Compilation)이라고 한다.

<h2 name="3">3. Architecture of .NET Applications</h2>

- C#에서 어플리케이션은 클래스에 의해 구성되어있다. 
- 이 클래스들은 어플리케이션 런타임때 서로 협력하면서 어플리케이션을 작동시킨다. 
- 클래스는 데이터(어트리뷰트)와 함수(메소드)로 이루어져 있다. 
- 함수는 코드를 실행시킨다. 데이터는 어플리케이션의 상태.
- 예를들어 자동차라는 클래스가 있다면 자동차의 모델이나 색상은 어트리뷰트이고 전진, 후진과 같은 차의 행동은 메소드이다. 
- 어플리케이션이 커지면 커질수록 많은 클래스가 생겨나는데 이 클래스들을 정리하기 위해 네임스페이스(Namespace)를 사용한다. 즉, 네임스페이스는 서로 연관된 클래스들을 담고있는 컨테이너이다. 
- 하지만 어플리케이션의 규모가 증가함에 따라 네임스페이스도 증가하게 되는데 이 연관되어있는 네임스페이스를 담기위한 컨테이너를 어셈블리(Assembly)라고 한다.
- 어셈블리는 디스크에 저장되어있는 파일로서 DLL이나 EXE로 되어있다.
- 어플리케이션을 컴파일 할 때 컴파일러 코드를 어떻게 나누었는지(partition)에 따라 하나 이상의 어셈블리를 만든다. 
- 어플리케이션 > 어셈블리 > 네임스페이스 > 클래스 

<h2 name="4">4. Variables and Constants</h4>

- Variables / Constants
  - variable: a name given to a storage location in memory
  - Constant: an immutable value 
- Declaring Variables / Constants
  ```c
    // you cannot use variable before you initialize it
    int number;
    int Number = 1;
    // declaring constant, it starts with keyword const and data-type, identifier, initial value
    const float Pi = 3.14f;
  ```
- Identifiers
  - It cannot start with a number
    ```c
      1route // x
      oneRoute // o
    ```
  - It cannot include a whitespace.
    ```c
      first name // x
      firstName // o
    ```
  - It cannot be a reserved keyword.
    ```c
      int // x
      @int // o
    ```
  - User meaningful names (recommendation)
    ```c
      fn // x
      firstName // o
    ```
- Naming Conventions
  - For local variables: Camel Case
    ```c
      int number;
    ```
  - For constants: Pascal Case
    ```c
      const int MaxZoom = 5;
    ```
- Non-Primitive Types
  - String
  - Array
  - Enum
  - Class

- Primitive Types in C# (img 이미지 파일 참조)

- Real Numbers (img 이미지 파일 참조)
  - Real Numbers에서 기본값은 double이기 때문에 float이나 decimal을 사용하기 위해서는 뒤에 추가적으로 f나 m같은 접미사를 붙여야 한다. 

<h2 name="5">5. Overflowing</h2>

- Exceed the boundary of data type.
  ```c
  byte number = 255;
  number = number + 1; // 0
  
  number += 2 // 257 - 256 = 1
  ```
- checked 키워드를 사용함으로써 overflowing을 피할 수 있다. instead the program will throw an exception.
  ```c
  checked
  {
    byte number = 255;
    number = number + 1; 
  }
  ```
- 하지만 overflowing을 쓸 일은 많이 없다.

<h2 name="6">6. Scope</h2>

- It is where a variable / constant has meaning.
  ```c
  {
    byte a = 1;
    {
      byte b = 2;
      {
        byte c = 3;
      }
    }
  }
  ```
- 각 스코프들은 해당 스코프 안 아니면 자식 스코프로부터 접근이 가능하며 바깥쪽 블록 영역에서는 접근하지 못한다.

<h2 name="7">7. Demo: Variables and Constants</h2>

  ```c
  using System;

  namespace HelloWorld
  {
      class Program
      {
          static void Main(string[] args)
          {   
            // byte나 int같은 데이터 타입을 사용할 수 있지만 var 키워드도 사용 가능하다.
            // 정수는 주로 byte 보다는 int를 사용하는 편이다.
              byte number = 2;
              int count = 10;
              var totalPrice = 20.95f;
              var character = 'A';
              var firstName = "Jay";
              var isworking = false;
              // blue color texts are reserved keywords

              Console.WriteLine(number);
              Console.WriteLine(count);
              Console.WriteLine(totalPrice);
              Console.WriteLine(character);
              Console.WriteLine(firstName);
              Console.WriteLine(isworking);

          }
      }
  }
  ```
- 포맷 스트링 (format string)

  ```c
  using System;

  namespace HelloWorld
  {
      class Program
      {
          static void Main(string[] args)
          {
            // {0}는 byte.MinValue에 넘긴 값과 연결되어 있고 {1}은 byte.MaxValue에 넘긴 값과 연결되어있다.  
              Console.WriteLine("{0} {1}", byte.MinValue, byte.MaxValue);
          }
      }
  }
  ```
- ctrl + f5를 눌러 실행을 하게 되면 0 255가 나오는데 1바이트에 저장 할 수 있는 값이다. 
- float를 마찬가지로 사용할 수 있다. 
  ```c
  Console.WriteLine("{0} {1}", float.MinValue, float.MaxValue);
  ```
- 실행시키면 -3.402823E+38 3.402823E+38이 나온다. 
- const를 사용하면 값을 변경 할 수 없다. 

<h2 name="8">8. Type Conversion</h2>

- Implicit type conversion (암시적 변환)
- Explicit type conversion (casting) (명시적 변환)
- Conversion between non-compatible types (사용자 정의 변환)

- Implicit Type Conversion (암시적 변환)
  ```c
  byte b = 1;
  int i = b;

  int i = 1;
  float f = i;
  ```
- byte는 1바이트 int는 4바이트의 크기 그러므로 byte를 int에 복사할 수 있다. (int와 float도 마찬가지)
- 컴파일러가 타입들이 서로 호환이 가능하고 데이터 손실이 없는 경우에는 암시적으로(implicitly) 타입 변환이 가능하다. 

- Explicit type Conversion (명시적 변환)
  ```c
  int i = 1;
  byte b = i; // won't compile
  ```
- int를 선언한 뒤, byte에 값을 복사했지만 byte는 1바이트이고 int는 4 바이트이므로 데이터 손실이 발생한다. 
- 이럴경우 컴파일러에게 명시적으로(explicitly) 데이터 손실이 발생할 것을 알고 있으며 변환을 하겠다고 말해야 한다. 
  ```c
  int i = 1;
  // 변수 i의 값을 변환할 byte로 미리 지정하며 캐스팅이라고 부른다 
  byte b = (byte)i;
  ```
- 다른 예시
  ```c
  float f = 1.0f;
  int i = (int)f;
  ```

- Non-compatible types (사용자 정의 변환)
  ```c
  string s = "1";
  int i = (int)s; //won't compile
  ```
- string과 int는 서로 호환이 불가능하므로 문자열 1을 숫자로 바꾸기 위해 다른 방법(Convert class, parse method)이 필요하다.
  ```c
  string s = "1";
  // convert class
  int i = Convert.ToInt32(s);
  // parse method
  int j = int.Parse(s);
  ```
- Convert class에서 사용하는 메소드들
  - ToByte() -> byte
  - ToInt16() -> short
  - ToInt32() -> int
  - ToInt64() -> long

- 사용자 정의 변환에서 에러가 발생할 경우 try, catch를 사용해 오류를 핸들링 할 수 있다. 
  ```c
  using System;

  namespace HelloWorld
  {
      class Program
      {
          static void Main(string[] args)
          {
              try
              {
                  var number = "1234";
                  byte b = Convert.ToByte(number);
                  Console.WriteLine(b);
              }
              catch(Exception)
              {
                  Console.WriteLine("The number could not be converted to a byte.");
              }

          }
      }
  }
  ```

<h2 name="9">9. Operators</h2>

- C# Operators
  - Arithmetic Operators (산술 연산자)
  - Comparison Operators (비교 연산자)
  - Assignment Operators (할당 연산자)
  - Logical Operators (논리 연산자)
  - Bitwise Operators (비트 연산자)

- Arithmetic Operators (산술 연산자)
  - img 폴더에 Arithmetic Operators 1,2 이미지 참조
  ```c
  // Postfix Increment
  int a = 1;
  int b = a++;
  // a = 2, b = 1

  // Prefix Increment
  int a = 1;
  int b = ++a;
  // a = 2, b = 2
  ```

- Comparison Operators
  - img 폴더에 Comparison Operators 이미지 참조

- Assignment Operators
  - img 폴더에 Assignment Operators 이미지 참조

- Logical Operators
  - img 폴더에 Logical Operators 이미지 참조

- Bitwise Operators
  - img 폴더에 Bitwise Operators 이미지 참조

<h2 name="10">10. Demo: Operators</h2>

  ```c
  using System;

  namespace HelloWorld
  {
      class Program
      {
          static void Main(string[] args)
          {
              var a = 10;
              var b = 3;

              Console.WriteLine(a / b); // 3
          }
      }
  }
  ```
- a와 b는 int이기 때문에 나눗셈을 하더라도 int값이 나온다.
- 결과를 소수점까지 보기 위해서는 앞에 float를 붙여야 한다.
  ```c
  using System;

  namespace HelloWorld
  {
      class Program
      {
          static void Main(string[] args)
          {
              var a = 10;
              var b = 3;

              Console.WriteLine((float)a / (float)b); // 3.333333
          }
      }
  }
  ```

<h2 name="11">11. Class</h2>

- Classes
  - Combines related variables (fields) and functions (methods)
- 클래스는 access modifier, class keyword, identifier 순서로 이루어져 있다. 
  ```c
  public class Person
  {

  }
  ```
- access modifier는 누가 클래스에 접근 할 수 있는지를 알려주는데 클래스를 생성할 때 public 키워드를 사용함으로써 어플리케이션의 다양한 곳에서 제한없이 접근하게 한다. 
- 또한 클래스에서는 함수(메소드)를 가질 수 있다. 
  ```c
  public class Person
  {   // 코드블럭이 끝나지 않았으면 세미콜론 붙이기
      public string Name;

      public void Introduce()
      {
          Console.WriteLine("Hi, my name is " + Name);
      }
  }
  ```
  ```c
  public class Calculator
  {
    public int Add(int a, int b)
    {
        return a + b;
    }
  }
  ```
- 객체 생성하기
  ```c
  // primitive와 달리 new 연산자를 사용함으로써 객체를 메모리에 할당하기
  Person person = new Person();
  ```
- C#에서 클래스는 primitive 타입과 다르게 취급된다. 
  ```c
  // var 키워드로 사용 가능
  var person = new Person();
  
  person.Name = "Mosh";
  person.Introduce();
  ```
- Static Modifier
  ```c
    public class Calculator
    {
      public static int Add(int a, int b)
      {
          return a + b;
      }
    }
    ```
  - static을 사용함으로써 Calculator 클래스가 Add 함수에 직접적으로 접근 할 수 있다. 
  - 예를들어 클래스 안에 calc2, calc2, calc3의 객체가 있으며 각각의 객체는 Add()를 지니고있다. (즉, 메모리 세군데 각각 Add() 함수가 존재한다.)
  - 하지만 static 메소드를 사용하면 해당 클래스 하나에 단 하나의 Add() 함수가 존재하게된다. 즉, Add() 메소드가 단 한번만 사용된다.

<h2 name="12">12. Demo: Classes</h2>

  ```c
  namespace CSharpFundamentals
  {
      public class Person
      {
          public string FirstName;
          public string LastName;

          public void Introduce()
          {
              Console.WriteLine("My name is " + FirstName + " " + LastName);            
          }
      }

      class Program
      {
          static void Main(string[] args)
          {
              var john = new Person();
              john.FirstName = "John";
              john.LastName = "Smith";
              john.Introduce();
          }
      }
  }
  ```
- 이렇게 클래스들을 작성할 수 있지만 클래스가 늘어남에 따라 각 클래스별로 개별 파일을 생성하는게 더 효율적 
- 하나의 클래스를 다른 클래스에서 사용하기 위해서는 첫번째로 사용할 클래스는 public이여야 하며 불러오고 싶은 클래스가 다른 폴더에 있을경우 using을 사용한다. 
  ```c
  // Program.cs
  using CSharpFundamentals.Math;

  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var calculator = new Calculator();
              var result = calculator.Add(1, 2);

              System.Console.WriteLine(result);
          }
      }
  }

  // Math/Calculator.cs
  using System;
  using System.Collections.Generic;
  using System.Text;

  namespace CSharpFundamentals.Math   
  {
      public class Calculator
      {
          public int Add(int a, int b)
          {
              return a + b;
          }
      }
  }
  ```

<h2 name="13">13. Structs</h2>

- C#에는 클래스와 비슷한 structs(구조체)라는 것이 있다.
- 클래스는 class 키워드로 시작하는 반면에 구조체는 struct 키워드로 시작한다.
  ```c
  public struct RgbColor
  {
      public int Red;
      public int Green;
      public int Blue;
  }
  ```
- 하지만 구조체보다는 클래스가 자주 쓰인다.
- 강사는 작고 가벼운 객체를 정의할때 구조체 사용을 추천.

<h2 name="14">14. Arrays</h2>

- What is array?
  - A data structure to store a collection of variables of the same type.
    ```c
    int number1;
    int number2;
    int number3;

    // 하나하나 선언하는것보다 하나의 배열에 넣고 number로 선언하기 
    int[] numbers = new int[3];
    ```
- Accessing Array Elements
  ```c
  int[] numbers = new int[3];

  numbers[0] = 1;
  numbers[1] = 2;
  numbers[2] = 3;

  // using object initialization syntax makes it shorter
  int[] numbers = new int[3] {1, 2, 3};
  ```
- 자바스크립트와 다르게 배열에 몇개의 원소가 들어갈 것인지도 정해줘야함. (대괄호 안에있는 숫자)

<h2 name="15">15. Demo: Arrays</h2>

  ```c
  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var numbers = new int[3];
              numbers[0] = 1;

              System.Console.WriteLine(numbers[0]); //1
              System.Console.WriteLine(numbers[1]); //0
              System.Console.WriteLine(numbers[2]); //0
          }
      }
  }
  ```
- 배열에서 값을 초기화 하지 않은 인덱스의 기본값은 0이다.
- 마찬가지로 boolean으로 만든 배열의 인덱스의 기본값은 false이다.
  ```c
  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
             var flags = new bool[3];
              flags[0] = true;

              System.Console.WriteLine(flags[0]); //true
              System.Console.WriteLine(flags[1]); //false
              System.Console.WriteLine(flags[2]); //false

          }
      }
  }
  ```
-  object initialization syntax 사용해보기
  ```c
  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var names = new string[3] { "Jack", "John", "Mary" };
              System.Console.WriteLine(names[0]); //Jack
              System.Console.WriteLine(names[1]); //John
              System.Console.WriteLine(names[2]); //Mary
          }
      }
  }
  ```
- 또한 동적으로 재할당 가능
  ```c
  var names = new string[3] { "Jack", "John", "Mary" };
  names[0] = "Jerry";
  System.Console.WriteLine(names[0]); //Jerry
  System.Console.WriteLine(names[1]); //John
  System.Console.WriteLine(names[2]); //Mary
  ```

<h2 name="16">16. Strings</h2>

- What is String?
  - String is a sequence of characters.
- Creating Strings
  ```c
  string firstName = "Jay";
  
  string name = firstName + " " + lastName;

  string name = string.Format("{0} {1}", firstName, lastName);

  var numbers = new int[3] {1, 2, 3};
  string list = string.Join(",", numbers); //"1,2,3"

  string name = "Jay"
  char firstChar = name[0] //J
  ```
- Strings are Immutable
  - Once you create them, you cannot change them. 
- Escape Characters
  - \n : New Line
  - \t : Tab
  - \\ : Backslash
  - \' : Single Quatation Mark
  - \" : Double Quatation Mark
- Verbatim String
  ```c
  // this looks bit messy
  string path = "c:\\projects\\project1\\folder1";

  // so you can use like this
  string path = @"c:\projects\project1\folder1";

  ```

<h2 name="17">17. Demo: Strings</h2>

  ```c
  // object initialization syntax이용해 string 만들기
  using CSharpFundamentals;

  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var firstName = "Jay";
              var lastName = "An";

              var fullName = firstName + " " + lastName;

              System.Console.WriteLine(fullName);

              var myFullName = string.Format("My name is {0} {1}", firstName, lastName);

              System.Console.WriteLine(myFullName); //My name is Jay An
          }
      }
  }
  ```
  ```c
  // array of names
  using CSharpFundamentals;

  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var firstName = "Jay";
              var lastName = "An";

              var fullName = firstName + " " + lastName;

              var myFullName = string.Format("My name is {0} {1}", firstName, lastName);

              var names = new string[3] { "John", "Jack", "Mary" };

              var formattedNames = string.Join(",", names);

              System.Console.WriteLine(formattedNames); //John,Jack,Mary
          }
      }
  }
  ```
  ```c
  // Verbatim String
  ```c
  using CSharpFundamentals;

  namespace CSharpFundamentals
  {

      class Program
      {
          static void Main(string[] args)
          {
              var firstName = "Jay";
              var lastName = "An";

              var fullName = firstName + " " + lastName;

              var myFullName = string.Format("My name is {0} {1}", firstName, lastName);

              var names = new string[3] { "John", "Jack", "Mary" };

              var formattedNames = string.Join(",", names);

               /*
               var text = "Hi Jay\n Look into the following paths\nc:\\folder1\\folder2\nc:\\folder3\\folder4";
              System.Console.WriteLine(text);
              */

              // text가 너무 복잡하므로 verbatim 문자열을 사용해보자

              var text = @"Hi Jay
              Look into the following paths
              c:\folder1\folder2\nc:\folder3\folder4";
          }
      }
  }
  ```

<h2 name="18">18. Enums</h2>

- enums을 사용함으로써 서로 연관있는 const 값들을 묶는다.
  ```c
  const int RegularAirMail = 1;
  const int RegisteredAirMain = 2;
  const int Express = 3;

  public enum ShippingMethod
  {
    RegularAirMail = 1,
    RegisteredAirMain = 2,
    Express = 3;
  }

  var method = ShippingMethod.Express;
  ```

<h2 name="19">19. Demo: Enums</h2>

    ```c
    // example enum to int, int to enum
    namespace CSharpFundamentals
    {
        public enum ShippingMethod
        {
          // 만일 enum안의 요소들에 값을 초기화 시켜주지 않는다면 첫번째 요소의 값은 자동적으로 0이되고 다른 요소로 넘어가면서 +1 씩 값이 증가한다
          // Enums are internally integers
          // 그러므로 초기값을 설정해 주는것이 best practice이다 
            RegularAirMail = 1,
            RegisteredAirMail = 2,
            Express = 3
        }

        class Program
        {
            static void Main(string[] args)
            {
                var method = ShippingMethod.Express;
                System.Console.WriteLine((int)method); // 3

                // suppose we get the value of 3 in somewhere else
                var methodId = 3;
                // and we want to convert that as a shipping method.
                System.Console.WriteLine((ShippingMethod)methodId); // Express

                // Console.WiteLine은 항상 디폴트 값으로 ToString 메소드를 사용한다. 
                Console.WriteLine(method.ToString()); // Express

                // string값을 enum으로 바꾸고 싶을 경우
                var methodName = "Express";

                var shippingMethod = (ShippingMethod)Enum.Parse(typeof(ShippingMethod), methodName);
            }
        }
    }
  ```
  ```c
  // convert enum to string, string to enum
  // parsing means getting a string and converting that to a different type
  ```

<h2 name="20">20. Reference Types and Value Types</h2>

- Types
  - Structure
    - Primitive types
    - Custom structures
  - Classes 
    - Arrays
    - Strings
    - Custom classes
- Structure은 Value types (값타입)
  - Allocated on stack
  - Memory allocation done automatically
  - Immediately removed when out of scope by CLR
- 클래스는 Reference types (참조타입)
  - You need to allocate memory 
  - Memory allocated on heap
  - Out of scope, but stay in heap a little while
  - Garbage collected by CLR
- 변수에 객체를 복사했을때 그 객체의 값이 Value 타입인지 Reference 타입인지에 따라서 결과가 다르게 나올것 

<h2 name="21">21. Demo: Reference Types and Value Types 1</h2>

  ```c
  namespace CSharpFundamentals
  {
      class Program
      {
          static void Main(string[] args)
          {
              var a = 10;
              var b = a;
              b++; 
              Console.WriteLine(string.Format("a: {0}, b: {1}", a, b)); // a: 10, b: 11
              // when you copy a value type in different variable, the copy of that value is taken and stored in the target variable

              // reference type
              // img 폴더에 Reference Types and Value Types 이미지 참조 
              var array1 = new int[3] { 1, 2, 3 };
              var array2 = array1;
              array2[0] = 0; // 0
              Console.WriteLine(string.Format("array1[0]: {0}, array2[0]: {1}", array1[0], array2[0])); //array1[0]: 0, array2[0]: 0
          }
      }
  }
  ```

<h2 name="22">22. Demo: Reference Types and Value Types 2</h2>

  ```c
  using System;

  namespace CSharpFundamentals
  {
      public class Person
      {
          public int Age;
      }

      class Program
      {
          static void Main(string[] args)
          {
              // Increment 함수의 인수로 전달되었지만 값이 바뀌지 않는다.
              var number = 1;
              Increment(number);
              Console.WriteLine(number); // 1

              // MakeOld 함수의 인수로 전달되어서 값이 바뀌었다. 
              var person = new Person() { Age = 20 };
              MakeOld(person);
              Console.WriteLine(person.Age); // 30
          }

          public static void Increment(int number)
          {
              number += 10;
          }

          public static void MakeOld(Person person)
          {
              person.Age += 10;
          }
      }
  }
  ```

<h2 name="23">23. Random Class</h2>

- Random 클래스를 사용해 무작위 숫자를 만들어낸다. 
  ```c
  using System;

  namespace CSharpFundamentals
  {
      public class Person
      {
          public int Age;
      }

      class Program
      {
          static void Main(string[] args)
          {
              // 랜덤 클래스 인스턴스 생성 
              var random = new Random(); 
              const int passwordLength = 10;

              for (var i = 0; i < 10; i++)
              {   
                // creating random number between 1 and 10
                  Console.WriteLine(random.Next(1, 10));
              }

              // 랜덤 알파벳으로 이루어진 배열만들기
              var buffer = new char[passwordLength];

              for (var i = 0; i < passwordLength; i++)
                  buffer[i] = ((char)('a' + random.Next(0, 26)));

              var password = new string(buffer);

              Console.WriteLine(password);
          }
      }
  }
  ```

<h2 name="24">24. Arrays</h2>

- Array
  - Represents a fixed number of variables of a particular type.
- Types of Arrays
  - Single Dimension
  ```c
   var numbers = new int[5]{1, 2, 3, 4, 5};
  ```
  - Multi Dimension
    - Rectangular
    - Jagged 
    - img폴더 Multi Dimension Arrays 이미지 참조
    
- .NET에서 CLR은 Single Dimension에 최적화 되어있다. 
- 매트릭스 모델은 Jagged가 좋다.
- 2차원 배열 만들기
  ```c
  var matrix = new int[3, 5];

  var matrix = new int[3, 5]
  {
    {1, 2, 3, 4, 5},
    {6, 7, 8, 9, 10},
    {11, 12, 13, 14, 15}
  };

  // accessing element
  var element = matrix[0, 0];
  ```
- 3차원 배열 만들기
  ```c
  var colors = new int[3, 4, 5];
  ```
- Jagged 배열 만드는법
  - img 폴더 Jagged Array 이미지 참조

- Array 타입은 클래스이며 Length 속성을 가질 수 있고 Clear(), Copy(), IndexOf(), Reverse(), Sort()와 같은 메소드를 가지고 있다. 

<h2 name="25">25. Demo: Arrays</h2>

  ```c
  using System;

  namespace array
  {
      class Program
      {
          static void Main(string[] args)
          {
              var numbers = new[] { 3, 7, 9, 2, 14, 6};

              // Length
              Console.WriteLine("Length: " + numbers.Length); // 6

              // IndexOf()
              var index = Array.IndexOf(numbers, 9);
              Console.WriteLine(index); // 2

              // Clear
              Array.Clear(numbers, 0, 2);
              Console.WriteLine("Effect of Clear()");
              foreach (var n in numbers)
                  Console.WriteLine(n); // 0 0 9 2 14 6

              // Copy()
              int[] another = new int[3];
              Array.Copy(numbers, another, 3);
              Console.WriteLine("Effect of Copy()");
              foreach (var n in another)
                  Console.WriteLine(n); // 3 7 9

              // Sort()
              Array.Sort(numbers);
              Console.WriteLine("Effect of Sort()");
              foreach (var n in numbers)
                  Console.WriteLine(n); // 2 3 6 7 9 14

              // Reverse()
              Array.Reverse(numbers);
              Console.WriteLine("Effect of Reverse()");
              foreach (var n in numbers)
                  Console.WriteLine(n); // 6 14 2 9 7 3
          }
      }
  }
  ```

<h2 name="26">26. Lists</h2>

- Array 
  - fixed size
- List
  - dynamic size
- 리스트는 객체와 비슷하나 저장되는 객체의 갯수를 예측하기 힘들때 사용한다. 
- Creating Lists
  ```c
  // <>안에 리스트 타입이 들어간다 
  var numbers = new List<int>();
  
  var numbers = new List<int>() {1, 2, 3, 4};
  ```
- Usefule Methods in Lists
  - Add()
  - AddRange()
  - Remove()
  - RemoveAt()
  - IndexOf()
  - Contains()
  - Count

<h2 name="27">27. Demo: Lists</h2>
  ```
    using System.Collections.Generic;

    namespace Lists
    {
    class Program
    {
    static void Main(string[] args)
    {
    var numbers = new List<int>() { 1, 2, 3, 4 };
    numbers.Add(1);
    numbers.AddRange(new int[3] { 5, 6, 7 });
    foreach(var number in numbers)
        System.Console.WriteLine(number); // 1 2 3 4 1 5 6 7

    System.Console.WriteLine("Index of 1: " + numbers.IndexOf(1)); // Index of 1: 0
    System.Console.WriteLine("Last Index of 1: " + numbers.LastIndexOf(1)); // Last Index of 1: 4

    System.Console.WriteLine("Count: " + numbers.Count); // Count: 8

    numbers.Remove(1);
    foreach (var number in numbers)
        System.Console.WriteLine(number); // 2 3 4 1 5 6 7
    // C#에서 foreach 루프안에 있는 요소들을 수정할 수 없다 하지만 일반적인 for 루프에서는 가능하다

    numbers.Clear();
    System.Console.WriteLine("Count: " + numbers.Count); // Count: 0
    }
    }
    }
  ```

<h2 name="28">28. DateTime</h2>

- New 키워드를 이용해 DateTime 생성가능
- Please note that DateTime objects are immutable. 
  ```c
  var dateTime = new DateTime(2015, 1, 1);

  // 지금 시간
  var now = DateTime.Now;

  // 오늘 날짜
  var today = DateTime.Today;

  // 몇 시
  Console.WriteLine(now.Hour);

  // 몇 분
  Console.WriteLine(now.Minute);

  // 내일 지금 이 시간
  var tomorrow = now.AddDays(1);

  // 어제 지금 이 시간
  var yesterday = now.AddDays(-1);

  // monday, 24 June 2019
  Console.WriteLine(now.ToLongDateString()); 

  // 24/06/2019
  Console.WriteLine(now.ToShortDateString());

  // 13:09:38 PM
   Console.WriteLine(now.ToLongTimeString());

   // 13:09 PM
   Console.WriteLine(now.ToShortTimeString());

   // current date and time
   Console.WriteLine(now.ToString());

   // 2019-06-24 13:13
   Console.WriteLine(now.ToString("yyyy-MM-dd HH:mm"));
  ```

<h2 name="29">29. TimeSpan</h2>

- TimeSpan은 시간의 길이를 나타낸다. 
  ```c
  // TimeSpan(시, 분, 초)
  var timeSpan = new TimeSpan(1, 2, 3);

  // var timeSpan1 = new TimeSpan(1, 0, 0)보다는
  var timeSpan1 = TimeSpan.FromHours(1);

  // 시간 계산
  var start = DateTime.Now;
  var end = DateTime.Now.AddMinutes(2);
  var duration = end - start;
  Console.WriteLine(duration);  // 00:02:00.0007237
  
  // timeSpan의 Properties
  Console.WriteLine("Minutes: " + timeSpan.Minutes); // Minutes: 2
  
  Console.WriteLine("Total Minutes: " + timeSpan.TotalMinutes); // // Total Minutes: 62.05 (Total Minutes converts timeSpan object to a minutes)

  // 시간 더하기
  // 기존 사간에서 +8분 해주기 
  Console.WriteLine(timeSpan.Add(TimeSpan.FromMinutes(8)));
   
  // 시간 빼기
  // 기존 사간에서 -2분 해주기 
  Console.WriteLine(timeSpan.Subtract(TimeSpan.FromMinutes(2))); // 01:00:03

  // 시간을 문자열로 바꾸기 
  Console.WriteLine("ToString" + timeSpan.ToString());

  // 문자열을 시간으로 바꾸기
  Console.WriteLine("Parse: " + TimeSpan.Parse("01:02:03"));
  ```

<h2 name="30">30. Strings</h2>

  ```c
  // 소문자
  ToLower()

  // 대문자
  ToUpper()

  // 공백 제거
  Trim()

  // 캐릭터나 문자열 찾기
  IndexOf('a')

  LastIndexOf("Hello")

  // Substrings
  Substring(startIndex)

  Substring(startIndex, length)

  // 바꾸기
  Replace('a', '!')

  Replace("mosh", "moshfegh")

  // null 체크
  String.IsNullOrEmpty(str)

  String.IsNullOrWhiteSpace(str)

  // 문자열 나누기
  str.Split(' ')

  // 문자열을 숫자로 변환
  string s = "1234";
  int i = int.Parse(s);
  // 문자열이 비어있을 경우를 대비하여 강사는 Convert.ToInt32를 추천 
  int j = Convert.ToInt32(s);

  // 숫자를 문자열로 변환
  int i = 1234;
  string s = i.ToString(); // "1234"
  // C is a format string
  string t = i.ToString("C"); // "$1,234.00"
  string t = i.ToString("C0"); // "$1,234"
  // img 폴더의 Format Strings 이미지 참조
  ```

<h2 name="31">31. Strings 실습</h2>
  ```c
  // trim 메소드
  var fullName = "Jae Hyun  ";
  Console.WriteLine("'{0}'", fullName.Trim()); // 'Jae Hyun'

  // 대문자
  Console.WriteLine("'{0}'", fullName.Trim().ToUpper()); // 'JAE HYUN'

  // 이름 나누기 1
  var index = fullName.IndexOf(' ');
  var firstName = fullName.Substring(0, index);
  var lastName = fullName.Substring(index + 1);
  Console.WriteLine(firstName); // Jae 
  Console.WriteLine(lastName); // Hyun

  // 이름 나누기 2
  var names = fullName.Split(' ');
  Console.WriteLine(names[0] + names[1]);

  // replace 메소드
  var replaceName = fullName.Replace("Jae", "An");
  Console.WriteLine(replaceName); // 'An Hyun'

  // 문자열에서 숫자열로 변환
  var str = "25";
  var age = Convert.ToByte(str);
  Console.WriteLine(age); // 25

  float price = 29.95f;
  Console.WriteLine(price.ToString("C")); // $29.95
  ```

<h2 name="32">32. Live Coding: Summarising Text</h2>

- 텍스트 길이 줄이기
  ```c
  // Programs.cs

  class Program
    {
      static void Main(string[] args)
        {
          var sentence = "This is going to be a really really really long text.";

          var summary = StringUtility.SummarizeText(sentence, 5);
          Console.WriteLine(summary);
        }
    }

  // StringUtility.cs

  public class StringUtility
    {
      public static string SummarizeText(string text, int maxLength = 20)
      {
          if (text.Length < maxLength)
          {
              return text;
          }
          var words = text.Split(' ');
          var totalCharacters = 0;
          var summaryWords = new List<string>();

          foreach (var word in words)
          {
              summaryWords.Add(word);

              totalCharacters = word.Length + 1; // 빈칸까지 포함해서 +1

              if (totalCharacters > maxLength)
                  break;
          }
          return String.Join(' ', summaryWords) + "...";
      }
    }
  ```

<h2 name="33">33. StringBuilder</h2>

- 문자열을 조작해야 하는 일이 많이 있을 경우 StringBuilder를 사용한다.
- StringBuilder
  - Defined in System.Text
  - A mutable string
  - Easy and fast to create and manipulate strings
- But not optimize for searching
  - IndexOf()
  - LastIndexOf()
  - Contains()
  - StartsWith()
  - ...
- String Manipulation Methods
  - Append()
  - Insert()
  - Remove()
  - Replace()
  - Clear()

<h2 name="34">34. StringBuilder 실습</h2>

  ```c
  static void Main(string[] args)
    {
        var builder = new StringBuilder();
        builder
              .Append('-', 10)
              .AppendLine()
              .Append("Header")
              .AppendLine()
              .Append('-', 10);
        Console.WriteLine(builder); 
        
        // ----------
        // Header
        // ----------

        builder.Replace('-', '+');

        // ++++++++++
        // Header
        // ++++++++++

        builder.Remove(0, 10);

        // Header
        // ++++++++++

        builder.Insert(0, new string('-', 10));

        // ----------
        // Header
        // ++++++++++
    }
  ```