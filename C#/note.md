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
  - User meaningfule names (recommendation)
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

<h2 name="7">7. Variables and Constants</h2>

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